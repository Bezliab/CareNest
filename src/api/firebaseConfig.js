// /src/services/firebaseConfig.js

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

// Enable offline persistence
firestore().settings({ persistence: true });

export { auth, firestore, storage };
