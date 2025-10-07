// src/services/notifications.js
import messaging from "@react-native-firebase/messaging";
import { Alert, AppRegistry } from "react-native";
import notifee from '@notifee/react-native'; // optional - only if installed

// Request permission and get FCM token
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log("FCM authorization status:", authStatus);
    const token = await messaging().getToken();
    console.log("FCM token:", token);
    return token;
  }
  return null;
}

// Listen for foreground messages
export function registerForegroundHandler() {
  return messaging().onMessage(async remoteMessage => {
    console.log("FCM foreground message:", remoteMessage);
    // show an in-app toast or local notification
    // if notifee installed, show notification:
    try {
      if (remoteMessage?.notification) {
        await notifee.displayNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
        });
      }
    } catch (err) {
      console.warn("Notifee display error", err);
    }
  });
}

// Background message handler - add in index.js (see below)
export async function backgroundMessageHandler(remoteMessage) {
  console.log("FCM background message:", remoteMessage);
  // can display notification via notifee here
  try {
    if (remoteMessage?.notification) {
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
      });
    }
  } catch (err) {
    console.warn("bg notifee error", err);
  }
}
