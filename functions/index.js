// Firebase Cloud Functions for Pregnify app
// Features:
// - Scheduled function to process reminders (push/SMS)
// - Callable function to send SMS (for testing)
// - (Additional functions for appointments, health records, emergencies can be added)

//Setup & deploy instructions

//cd functions && npm install

//Set Africa’s Talking config:

//firebase functions:config:set africastalking.username="YOUR_USERNAME" africastalking.apikey="YOUR_KEY" africastalking.from="Pregnify"


//Deploy scheduled function:

//firebase deploy --only functions:processReminders

//(or firebase deploy --only functions to deploy all)




const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Africastalking = require("africastalking");

admin.initializeApp();

// configure africastalking via functions config:
// firebase functions:config:set africastalking.username="your_user" africastalking.apikey="your_key" africastalking.from="Pregnify"
const atConfig = functions.config().africastalking || {};
const africastalking = Africastalking({
  apiKey: atConfig.apikey || "",
  username: atConfig.username || "",
});
const smsService = africastalking.SMS;

// Utility: send SMS (wraps Africa's Talking)
async function sendSms(to, message) {
  if (!atConfig.apikey || !atConfig.username) {
    console.warn("Africa's Talking not configured. SMS not sent.");
    return { success: false, reason: "no-config" };
  }
  try {
    const res = await smsService.send({
      to: Array.isArray(to) ? to : [to],
      message,
      from: atConfig.from || "Pregnify",
    });
    return { success: true, res };
  } catch (err) {
    console.error("SMS error:", err);
    return { success: false, err };
  }
}

// Scheduled function: runs every minute (adjust in production)
exports.processReminders = functions.pubsub
  .schedule("every 1 minutes")
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();

    const remindersRef = admin.firestore().collection("reminders");
    // Query reminders due now or earlier and pending
    const q = remindersRef
      .where("sentStatus", "==", "pending")
      .where("scheduledAt", "<=", now)
      .limit(100);

    const snap = await q.get();
    if (snap.empty) {
      console.log("No reminders to process.");
      return null;
    }
    console.log(`Processing ${snap.size} reminders`);

    const promises = snap.docs.map(async (doc) => {
      const reminder = doc.data();
      const docId = doc.id;
      try {
        // Fetch user to get push token and phone
        const userSnap = await admin.firestore().collection("users").doc(reminder.userId).get();
        const user = userSnap.exists ? userSnap.data() : null;

        // Prepare message (could be localized using language field)
        const message = reminder.message || "Health reminder from Pregnify";

        let sent = false, sendDetails = null;

        // Attempt push via FCM token
        if (user?.fcmToken) {
          try {
            const payload = {
              token: user.fcmToken,
              notification: {
                title: "Pregnify Reminder",
                body: message,
              },
              data: {
                reminderId: docId,
                type: "reminder",
              },
            };
            const resp = await admin.messaging().send(payload);
            sent = true;
            sendDetails = { method: "fcm", resp };
            console.log("Sent push to", user?.email || user?.phone, resp);
          } catch (pushErr) {
            console.error("Push send failed:", pushErr);
          }
        }

        // If push not sent, fallback to SMS if phone available
        if (!sent && user?.phone) {
          const smsRes = await sendSms(user.phone, message);
          if (smsRes.success) {
            sent = true;
            sendDetails = { method: "sms", smsRes };
            console.log("SMS sent to", user.phone);
          } else {
            console.warn("SMS failed", smsRes);
          }
        }

        // Update reminder document
        await admin.firestore().collection("reminders").doc(docId).update({
          sentStatus: sent ? "sent" : "failed",
          sentAt: admin.firestore.FieldValue.serverTimestamp(),
          sendDetails,
        });
      } catch (err) {
        console.error("Error processing reminder", docId, err);
        await admin.firestore().collection("reminders").doc(docId).update({
          sentStatus: "failed",
          error: String(err),
          attemptedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    });

    await Promise.all(promises);
    return null;
  });

// Optional: callable function to send SMS (for testing)
exports.sendSmsCallable = functions.https.onCall(async (data, context) => {
  const { to, message } = data;
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated");
  }
  const res = await sendSms(to, message);
  return res;
});
/* ---------------- Appointments ---------------- */
// (Additional functions for appointments, health records, emergencies can be added here)