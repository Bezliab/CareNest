// tests/test_firebase_crud.js
// Node script using firebase-admin to test CRUD functions
// Usage:
// 1) For emulator: start firestore emulator (firebase emulators:start --only firestore)
//    then run: FIRESTORE_EMULATOR_HOST=localhost:8080 node tests/test_firebase_crud.js
// 2) For real project: set GOOGLE_APPLICATION_CREDENTIALS path and run node tests/test_firebase_crud.js

const admin = require("firebase-admin");
const path = require("path");

async function init() {
  if (!process.env.FIRESTORE_EMULATOR_HOST) {
    // using real project - requires service account key
    const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!keyPath) {
      console.error("Set GOOGLE_APPLICATION_CREDENTIALS or FIRESTORE_EMULATOR_HOST");
      process.exit(1);
    }
    admin.initializeApp({
      credential: admin.credential.cert(require(path.resolve(keyPath))),
    });
  } else {
    // emulator
    admin.initializeApp();
  }
  return admin.firestore();
}

async function run() {
  const db = await init();
  const uid = `testuser-${Date.now()}`;

  console.log("=== Starting CRUD test ===");
  try {
    // 1) create user doc
    await db.collection("users").doc(uid).set({
      name: "Test User",
      email: "test@example.com",
      role: "mother",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("User created:", uid);

    // 2) add appointment
    const apptRef = await db.collection("appointments").add({
      userId: uid,
      doctorId: "doc-1",
      date: new Date().toISOString(),
      notes: "Initial ANC",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Appointment created:", apptRef.id);

    // 3) add health record
    const hrRef = await db.collection("health_records").add({
      userId: uid,
      type: "blood_pressure",
      value: "120/80",
      recordedAt: new Date().toISOString(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Health record created:", hrRef.id);

    // 4) trigger emergency
    const emRef = await db.collection("emergencies").add({
      userId: uid,
      message: "Test emergency",
      status: "triggered",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Emergency created:", emRef.id);

    // 5) update health record
    await db.collection("health_records").doc(hrRef.id).update({
      value: "115/75",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Health record updated");

    // 6) get appointments for user
    const apptsSnap = await db.collection("appointments").where("userId", "==", uid).get();
    console.log("Appointments count:", apptsSnap.size);

    // 7) cleanup
    await db.collection("appointments").doc(apptRef.id).delete();
    await db.collection("health_records").doc(hrRef.id).delete();
    await db.collection("emergencies").doc(emRef.id).delete();
    await db.collection("users").doc(uid).delete();

    console.log("Cleanup done. Test completed successfully.");
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    process.exit(0);
  }
}

run();



//How to run

//With emulator: firebase emulators:start --only firestore then:

  //FIRESTORE_EMULATOR_HOST=localhost:8080 node tests/test_firebase_crud.js


//With real project: set GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json then:

  //node tests/test_firebase_crud.js


//This script exercises creating docs, updating, reading, and cleanup.