import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../api/firebaseConfig';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HealthContext = createContext();

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};

export const HealthProvider = ({ children }) => {
  const [latestHealthData, setLatestHealthData] = useState(null);
  const [healthHistory, setHealthHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      loadFromLocalStorage();
      return;
    }

    // Firebase real-time listener
    const healthMetricsRef = collection(db, 'users', user.uid, 'healthMetrics');
    const healthQuery = query(healthMetricsRef, orderBy('timestamp', 'desc'), limit(50));

    const unsubscribe = onSnapshot(healthQuery, (querySnapshot) => {
      const entries = [];
      querySnapshot.forEach((doc) => {
        entries.push({ id: doc.id, ...doc.data() });
      });
      
      if (entries.length > 0) {
        setLatestHealthData(entries[0]);
        setHealthHistory(entries);
        // Update local storage as backup
        AsyncStorage.setItem('@health_entries_v1', JSON.stringify(entries));
      } else {
        setLatestHealthData(null);
        setHealthHistory([]);
      }
      
      setLoading(false);
    }, (error) => {
      console.warn('Health context Firebase error:', error);
      // Fallback to local storage
      loadFromLocalStorage();
    });

    return unsubscribe;
  }, []);

  const loadFromLocalStorage = async () => {
    try {
      const raw = await AsyncStorage.getItem('@health_entries_v1');
      if (raw) {
        const entries = JSON.parse(raw);
        if (entries.length > 0) {
          setLatestHealthData(entries[0]);
          setHealthHistory(entries);
        } else {
          setLatestHealthData(null);
          setHealthHistory([]);
        }
      }
    } catch (error) {
      console.warn('Error loading health data from local storage:', error);
      setLatestHealthData(null);
      setHealthHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshHealthData = async () => {
    await loadFromLocalStorage();
  };

  const value = {
    latestHealthData,
    healthHistory,
    loading,
    refreshHealthData,
  };

  return (
    <HealthContext.Provider value={value}>
      {children}
    </HealthContext.Provider>
  );
};