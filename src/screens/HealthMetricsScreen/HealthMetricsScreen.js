import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// HealthTrackerScreen
// Single-file React Native screen for inputting BP, Weight, Blood Sugar and Sleep

export default function HealthMetricsScreen() {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString());

  const [entries, setEntries] = useState([]);

  const STORAGE_KEY = '@health_entries_v1';

  useEffect(() => {
    loadEntries();
  }, []);

  const saveEntriesToStorage = async list => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.warn('Failed to write storage', err);
    }
  };

  const loadEntries = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch (err) {
      console.warn('Failed to read storage', err);
    }
  };

  const clearAll = async () => {
    Alert.alert('Clear all data', 'This will delete all stored readings.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem(STORAGE_KEY);
          setEntries([]);
        },
      },
    ]);
  };

  const addEntry = () => {
    // basic validation
    if (!systolic || !diastolic || !weight || !bloodSugar || !sleepHours) {
      Alert.alert(
        'Missing fields',
        'Please fill all fields (BP, Weight, Blood Sugar, Sleep).',
      );
      return;
    }

    const parsed = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      bp: { systolic: Number(systolic), diastolic: Number(diastolic) },
      weight: Number(weight),
      bloodSugar: Number(bloodSugar),
      sleepHours: Number(sleepHours),
      notes: notes.trim(),
    };

    const newList = [parsed, ...entries].slice(0, 200); // keep last 200
    setEntries(newList);
    saveEntriesToStorage(newList);

    // reset inputs but keep date
    setSystolic('');
    setDiastolic('');
    setWeight('');
    setBloodSugar('');
    setSleepHours('');
    setNotes('');
  };

  // derive latest values
  const latest = entries[0] || null;

  // simple helper to render a tiny trend bar (no external chart libs)
  const TrendBar = ({ value, min = 0, max = 200 }) => {
    const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return (
      <View style={styles.trendWrap}>
        <View style={[styles.trendFill, { width: `${pct * 100}%` }]} />
      </View>
    );
  };

  const renderEntry = ({ item }) => (
    <View style={styles.entryCard}>
      <Text style={styles.entryDate}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
      <Text style={styles.entryText}>
        BP: {item.bp.systolic}/{item.bp.diastolic} mmHg
      </Text>
      <Text style={styles.entryText}>Weight: {item.weight} kg</Text>
      <Text style={styles.entryText}>Blood sugar: {item.bloodSugar} mg/dL</Text>
      <Text style={styles.entryText}>Sleep: {item.sleepHours} hrs</Text>
      {item.notes ? (
        <Text style={styles.entryNotes}>Notes: {item.notes}</Text>
      ) : null}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Health Tracker</Text>

      <View style={styles.formRow}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Systolic (mmHg)</Text>
          <TextInput
            keyboardType="numeric"
            value={systolic}
            onChangeText={setSystolic}
            style={styles.input}
            placeholder="e.g. 120"
          />
        </View>

        <View style={styles.halfInput}>
          <Text style={styles.label}>Diastolic (mmHg)</Text>
          <TextInput
            keyboardType="numeric"
            value={diastolic}
            onChangeText={setDiastolic}
            style={styles.input}
            placeholder="e.g. 80"
          />
        </View>
      </View>

      <View style={styles.formRowSingle}>
        <View style={styles.fullInput}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            style={styles.input}
            placeholder="e.g. 72.5"
          />
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Blood sugar (mg/dL)</Text>
          <TextInput
            keyboardType="numeric"
            value={bloodSugar}
            onChangeText={setBloodSugar}
            style={styles.input}
            placeholder="e.g. 95"
          />
        </View>

        <View style={styles.halfInput}>
          <Text style={styles.label}>Sleep (hours)</Text>
          <TextInput
            keyboardType="numeric"
            value={sleepHours}
            onChangeText={setSleepHours}
            style={styles.input}
            placeholder="e.g. 7"
          />
        </View>
      </View>

      <View style={styles.formRowSingle}>
        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          style={[styles.input, { height: 80 }]}
          placeholder="How do you feel? Any medication?"
          multiline
        />
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.saveBtn} onPress={addEntry}>
          <Text style={styles.saveTxt}>Save Reading</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
          <Text style={styles.clearTxt}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dashboard}>
        <Text style={styles.sectionTitle}>Dashboard — Latest</Text>
        {latest ? (
          <View style={styles.cardsRow}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>BP</Text>
              <Text style={styles.cardValue}>
                {latest.bp.systolic}/{latest.bp.diastolic}
              </Text>
              <TrendBar value={latest.bp.systolic} min={80} max={180} />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Weight</Text>
              <Text style={styles.cardValue}>{latest.weight} kg</Text>
              <TrendBar value={latest.weight} min={40} max={140} />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Blood Sugar</Text>
              <Text style={styles.cardValue}>{latest.bloodSugar} mg/dL</Text>
              <TrendBar value={latest.bloodSugar} min={50} max={250} />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Sleep</Text>
              <Text style={styles.cardValue}>{latest.sleepHours} hrs</Text>
              <TrendBar value={latest.sleepHours} min={0} max={12} />
            </View>
          </View>
        ) : (
          <Text style={styles.emptyText}>
            No readings yet — add your first reading above.
          </Text>
        )}
      </View>

      <View style={styles.history}>
        <Text style={styles.sectionTitle}>History</Text>
        {entries.length === 0 ? (
          <Text style={styles.emptyText}>No historical readings.</Text>
        ) : (
          <FlatList
            data={entries}
            keyExtractor={i => i.id}
            renderItem={renderEntry}
          />
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: '#fff', paddingBottom: 60 },
  screenTitle: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  formRow: { flexDirection: 'row', justifyContent: 'space-between' },
  formRowSingle: { marginTop: 12 },
  halfInput: { width: '48%', marginTop: 8 },
  fullInput: { width: '100%', marginTop: 8 },
  label: { fontSize: 13, color: '#444', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  saveBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    flex: 1,
    marginRight: 8,
  },
  saveTxt: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  clearBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    flex: 1,
    marginLeft: 8,
  },
  clearTxt: { textAlign: 'center', fontWeight: '600' },
  dashboard: { marginTop: 18 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#f7f9ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardLabel: { fontSize: 13, color: '#333' },
  cardValue: { fontSize: 20, fontWeight: '700', marginTop: 6 },
  trendWrap: {
    height: 8,
    backgroundColor: '#e6eefc',
    borderRadius: 6,
    marginTop: 8,
    overflow: 'hidden',
  },
  trendFill: { height: '100%', backgroundColor: '#2563eb' },
  history: { marginTop: 16 },
  entryCard: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  entryDate: { fontSize: 12, color: '#666', marginBottom: 6 },
  entryText: { fontSize: 14 },
  entryNotes: { fontSize: 13, color: '#444', marginTop: 6 },
  emptyText: { color: '#666', fontStyle: 'italic' },
});
