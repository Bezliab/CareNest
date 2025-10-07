// src/hooks/useFcmToken.js
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Platform } from "react-native";

export default function useFcmToken() {
  useEffect(() => {
    const updateToken = async () => {
      try {
        const user = auth().currentUser;
        if (!user) return;

        // Request permission (especially for iOS)
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (!enabled) {
          console.log("Push notifications permission denied.");
          return;
        }

        // Get FCM token
        const token = await messaging().getToken();
        if (!token) return;

        // Save to Firestore
        const userRef = firestore().collection("users").doc(user.uid);
        await userRef.set(
          {
            fcmToken: token,
            deviceInfo: {
              platform: Platform.OS,
              updatedAt: firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true }
        );

        console.log("✅ FCM token saved for", user.email);

        // Listen for token refresh (FCM tokens can rotate)
        return messaging().onTokenRefresh(async (newToken) => {
          await userRef.set({ fcmToken: newToken }, { merge: true });
          console.log("🔄 Token refreshed and updated in Firestore");
        });
      } catch (err) {
        console.error("❌ Error saving FCM token:", err);
      }
    };

    updateToken();
  }, []);
}
// Usage: Just call useFcmToken() in your app's root component (e.g., App.js)