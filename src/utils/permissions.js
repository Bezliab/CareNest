// utils/permissions.js
import { PermissionsAndroid, Platform, Alert } from 'react-native';

export async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to find nearby clinics and send it to your emergency contact.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Location permission error', err);
      return false;
    }
  }
  // iOS: permission dialog shown automatically when API is used (Info.plist must contain NSLocationWhenInUseUsageDescription)
  return true;
}

/**
 * Convenience wrapper to ensure permission and show an alert if denied.
 * Returns true if permission granted, false otherwise.
 */
export async function ensureLocationPermissionWithAlert() {
  const ok = await requestLocationPermission();
  if (!ok) {
    Alert.alert(
      'Permission Required',
      'Location permission is required to find nearby clinics and send your location in an emergency.',
    );
  }
  return ok;
}
