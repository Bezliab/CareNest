// /src/screens/NotificationScreen.js
import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { messaging } from '../services/firebaseConfig';

export default function NotificationScreen() {
  useEffect(() => {
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      } else {
        Alert.alert('FCM permission denied');
      }
    };

    requestPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification', remoteMessage.notification?.title || 'You have a message!');
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>Notifications Enabled</Text>
    </View>
  );
}
