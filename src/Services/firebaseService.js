// src/services/firebaseService.js
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

/**
 * Add a new appointment to Firestore
 * @param {Object} appointmentData - data to store in appointments collection
 */
export const addAppointment = async appointmentData => {
  const user = auth().currentUser;
  if (!user) throw new Error('User not logged in.');

  try {
    const appointmentRef = firestore().collection('appointments').doc();
    const newAppointment = {
      id: appointmentRef.id,
      userId: user.uid,
      ...appointmentData,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    await appointmentRef.set(newAppointment);
    console.log('✅ Appointment added:', newAppointment);
    return newAppointment;
  } catch (error) {
    console.error('❌ Error adding appointment:', error);
    throw error;
  }
};
