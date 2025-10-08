import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';

// --- Mock Data ---
// In a real app, this data would come from a state management solution or an API.
const pregnancyData = {
  currentWeek: 28,
  totalWeeks: 40,
  trimester: 3,
  dueDate: 'January 15, 2025',
  babySize: 'Large Eggplant',
  babyWeight: '2.2 lbs',
  babyLength: '14.8 inches',
  commonSymptoms: [
    'Backaches',
    'Shortness of breath',
    'Frequent urination',
    'Swelling of ankles',
  ],
  nextAppointment: {
    date: 'October 24, 2024',
    time: '11:00 AM',
    doctor: 'Dr. Adaobi',
  },
  weeklyTodos: [
    { id: 1, task: 'Track daily kick counts', completed: true },
    { id: 2, task: 'Start packing your hospital bag', completed: false },
    { id: 3, task: 'Finalize your birth plan', completed: false },
    { id: 4, task: 'Attend antenatal class', completed: true },
  ],
};

// --- UI Components ---

// A reusable card component for displaying information sections
const InfoCard = ({ title, children, icon }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardIcon}>{icon}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

// A component for the circular progress display
const ProgressCircle = ({ week, totalWeeks }) => {
  const progress = (week / totalWeeks) * 100;
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressCircle}>
        <Text style={styles.progressWeekText}>{week}</Text>
        <Text style={styles.progressSubText}>weeks</Text>
      </View>
      <Text style={styles.progressFooter}>
        You are {progress.toFixed(0)}% through your pregnancy!
      </Text>
    </View>
  );
};

// The main screen component
const AntenatalTrackerScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF7FA" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Antenatal Tracker</Text>
          <Text style={styles.headerSubtitle}>
            Welcome, let's see how you and baby are doing!
          </Text>
        </View>

        {/* --- Pregnancy Progress Section --- */}
        <ProgressCircle
          week={pregnancyData.currentWeek}
          totalWeeks={pregnancyData.totalWeeks}
        />
        <View style={styles.dateInfo}>
          <Text style={styles.trimesterText}>
            Trimester {pregnancyData.trimester}
          </Text>
          <Text style={styles.dueDateText}>
            Estimated Due Date: {pregnancyData.dueDate}
          </Text>
        </View>

        {/* --- Baby Size Card --- */}
        <InfoCard title="Baby's Size This Week" icon="👶">
          <Text style={styles.babySizeText}>{pregnancyData.babySize}</Text>
          <View style={styles.babyStatsContainer}>
            <Text style={styles.babyStat}>{pregnancyData.babyWeight}</Text>
            <Text style={styles.babyStat}>{pregnancyData.babyLength}</Text>
          </View>
        </InfoCard>

        {/* --- Your Symptoms Card --- */}
        <InfoCard title="Common Symptoms" icon="📝">
          {pregnancyData.commonSymptoms.map((symptom, index) => (
            <Text key={index} style={styles.listItem}>
              • {symptom}
            </Text>
          ))}
        </InfoCard>

        {/* --- Upcoming Appointment Card --- */}
        <InfoCard title="Upcoming Appointment" icon="🏥">
          <Text style={styles.appointmentDate}>
            {pregnancyData.nextAppointment.date}
          </Text>
          <Text style={styles.appointmentTime}>
            {pregnancyData.nextAppointment.time}
          </Text>
          <Text style={styles.appointmentDoctor}>
            with {pregnancyData.nextAppointment.doctor}
          </Text>
        </InfoCard>

        {/* --- To-Do List Card --- */}
        <InfoCard title="Your Weekly Checklist" icon="✅">
          {pregnancyData.weeklyTodos.map(item => (
            <View key={item.id} style={styles.todoItem}>
              <Text style={styles.todoCheckbox}>
                {item.completed ? '☑' : '☐'}
              </Text>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.todoTextCompleted,
                ]}
              >
                {item.task}
              </Text>
            </View>
          ))}
        </InfoCard>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Styles ---
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FDF7FA', // A very light pink background
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  progressCircle: {
    width: width * 0.45,
    height: width * 0.45,
    borderRadius: (width * 0.45) / 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#E6A4B4', // A soft magenta
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  progressWeekText: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#944E63', // A darker magenta
  },
  progressSubText: {
    fontSize: 16,
    color: '#B47B84',
    marginTop: -8,
  },
  progressFooter: {
    marginTop: 16,
    fontSize: 16,
    color: '#944E63',
    fontWeight: '500',
  },
  dateInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  trimesterText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  dueDateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContent: {
    // Add specific styles if needed
  },
  babySizeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#944E63',
    textAlign: 'center',
  },
  babyStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  babyStat: {
    fontSize: 16,
    color: '#666',
  },
  listItem: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  appointmentDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#944E63',
  },
  appointmentTime: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  appointmentDoctor: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  todoCheckbox: {
    fontSize: 20,
    marginRight: 12,
    color: '#944E63',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default AntenatalTrackerScreen;
