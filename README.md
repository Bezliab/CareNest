````markdown
# 🚀 Codefest GWR Hackathon – Submissions Portal

Welcome to the official submission repo for the **Codefest GWR Hackathon**  
Theme: _Build for Nigeria_ 🇳🇬

---

# 🍼 PregAssist (React Native CLI)

PregAssist is a **React Native CLI mobile application** built to support pregnant mothers with features like pregnancy tracking, appointment scheduling, health reminders, and clinic connections.  
It is powered by **Firebase** and supports **offline data sync** using Firestore persistence.

---

## 📖 Project Overview

PregAssist helps expectant mothers manage their pregnancy with ease.  
It tracks their expected delivery date (EDD), connects them with doctors, and provides personalized health information and reminders.

### ✨ Core Features

- 👩‍🍼 **Mother Registration:** Capture mother’s details and Expected Delivery Date (EDD)
- 🗓️ **Pregnancy Tracker:** Automatically calculates weeks and days remaining
- 🧑‍⚕️ **Doctor Dashboard:** Displays assigned doctor and quick access to contact
- 🕒 **Appointments:** Create and view appointments with reminders
- 🔔 **Reminders:** Notify mothers for medications or checkups
- 📍 **Nearby Clinics:** Integrates geolocation for available clinics
- 🌐 **Multi-language Support (i18n):** Switch between multiple languages
- 🛜 **Offline Mode:** Firestore automatically syncs data when online again

---

## 🛠️ Tech Stack

| Technology                              | Purpose                 |
| --------------------------------------- | ----------------------- |
| **React Native CLI**                    | App development         |
| **Firebase (Auth, Firestore, Storage)** | Backend services        |
| **React Navigation**                    | Screen routing          |
| **AsyncStorage**                        | Local data persistence  |
| **React Native Vector Icons**           | Icons                   |
| **Geolocation API**                     | Location-based features |
| **Moment.js / Date-fns**                | Date calculations       |

---

## ⚙️ Installation & Setup

### 1️⃣ Prerequisites

Before starting, make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Java JDK 11+](https://adoptium.net/)
- [Android Studio](https://developer.android.com/studio)
- React Native CLI:
  ```bash
  npm install -g react-native-cli
  ```
````

---

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/Bezliab/Team-04---CareNest.git
cd CareNest
```

---

### 3️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

---

### 4️⃣ Firebase Configuration

Go to [Firebase Console](https://console.firebase.google.com) → Create a project.
Enable:

- Authentication
- Firestore Database
- Storage

Then, create a file:

```
src/api/firebaseConfig.js
```

Paste your Firebase credentials:

```js
import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch(console.warn);

export { db, auth };
```

---

### 5️⃣ Android Setup

- Make sure you have an Android emulator installed, or connect a physical device.
- Then run:

```bash
npx react-native run-android
```

If you get build errors:

```bash
cd android && ./gradlew clean
cd ..
npx react-native run-android
```

---

### 6️⃣ iOS Setup (macOS Only)

If you’re developing on macOS:

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

---

## 🧮 Pregnancy Tracking Logic

When a mother registers, she provides an **Expected Delivery Date (EDD)**.
The app automatically calculates:

- The **current pregnancy week**
- **Days remaining** to delivery
- The **trimester** (1st, 2nd, or 3rd)

This data is displayed dynamically on the **Dashboard** and updates daily.

---

## 🔥 Firestore Collections

| Collection         | Example Fields                                              |
| ------------------ | ----------------------------------------------------------- |
| **users**          | name, email, expectedDeliveryDate, doctor, emergencyContact |
| **appointments**   | userId, doctorId, date, notes, status                       |
| **reminders**      | userId, message, scheduledAt                                |
| **health_records** | userId, bloodPressure, weight, heartRate                    |
| **emergencies**    | userId, location, status                                    |

---

## 🧩 Key Files

| File                     | Description                              |
| ------------------------ | ---------------------------------------- |
| `firebaseService_rnf.js` | Handles Firestore read/write and caching |
| `Dashboard.js`           | Displays live pregnancy progress         |
| `SignupScreen.js`        | Registers new mothers and saves EDD      |
| `DashboardStyle.js`      | Contains dashboard layout and colors     |

---

## 🔄 Offline Mode

Firestore automatically caches user data locally.
This means users can continue using the app without an internet connection.
Once reconnected, updates sync automatically to Firebase.

---

## 🧪 Testing Checklist

✅ Create a new account using Firebase Authentication
✅ Enter EDD and verify correct pregnancy progress
✅ Add reminders and appointments
✅ Simulate offline use (disable internet, re-enable to test sync)
✅ Confirm Firestore data under the correct user document

---

## ⚠️ Common Issues

| Issue                                                | Solution                                       |
| ---------------------------------------------------- | ---------------------------------------------- |
| `FirebaseError: Missing or insufficient permissions` | Update Firestore security rules                |
| `Task :app:mergeDexDebug FAILED`                     | Run `cd android && ./gradlew clean`            |
| `Emulator not found`                                 | Launch AVD manually in Android Studio          |
| `Network Error` when offline                         | Ensure `enableIndexedDbPersistence` is enabled |

---

## 👨‍💻 Author

**PregAssist Development Team**
Built with ❤️ by **Isaac Adeniji & Team**

📧 Contact: [[boluwarin215@gmail.com](mailto:boluwarin215@gmail.com)]

> _“Empowering mothers with care, knowledge, and technology.”_
