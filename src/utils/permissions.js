
import { PermissionsAndroid, Platform, Alert } from "react-native";

export const requestPermissions = async () => {
  try {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      ]);

      const denied = Object.entries(granted).filter(
        ([, status]) => status !== PermissionsAndroid.RESULTS.GRANTED
      );

      if (denied.length > 0) {
        Alert.alert(
          "Permissions Needed",
          "Some permissions were denied. Please allow location, SMS, and call permissions for emergency features to work."
        );
      } else {
        console.log("✅ All permissions granted");
      }
    } else {
      // iOS handles permissions differently (via Info.plist)
      console.log("iOS permissions are handled via plist");
    }
  } catch (err) {
    console.warn("Permission error:", err);
  }
};
