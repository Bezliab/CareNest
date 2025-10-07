import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

const BookingScreen = ({ navigation }) => {
  const [selectedSpecialist, setSelectedSpecialist] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('');

  const specialists = ['Leslie Alexander', 'Ronald Richards', 'Annette Black'];
  
  const dates = [
    { day: 'SUN', date: 25 },
    { day: 'MON', date: 26 },
    { day: 'TUE', date: 27 },
    { day: 'WEN', date: 28 },
    { day: 'THU', date: 29 },
    { day: 'FRI', date: 30 },
    { day: 'SAT', date: 31 },
  ];

  const timeSlots = {
    Morning: ['08:00', '09:00', '10:00'],
    Afternoon: ['12:00', '13:00'],
    Evening: ['18:00'],
  };

  const calendarDays = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31],
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Choose Specialist */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose specialist</Text>
        <View style={styles.dropdown}>
          <Text style={selectedSpecialist ? styles.dropdownText : styles.dropdownPlaceholder}>
            {selectedSpecialist || 'Choose specialist'}
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.specialistScroll}>
          {specialists.map((specialist, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.specialistOption,
                selectedSpecialist === specialist && styles.specialistOptionSelected,
              ]}
              onPress={() => setSelectedSpecialist(specialist)}
            >
              <Text
                style={[
                  styles.specialistOptionText,
                  selectedSpecialist === specialist && styles.specialistOptionTextSelected,
                ]}
              >
                {specialist}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Choose Date */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose a date</Text>
        <Text style={styles.monthYear}>August 2024</Text>
        
        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <Text key={day} style={styles.calendarDayHeader}>{day}</Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {calendarDays.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.calendarRow}>
              {week.map((day, dayIndex) => (
                <TouchableOpacity
                  key={dayIndex}
                  style={[
                    styles.calendarCell,
                    selectedDate === day && styles.calendarCellSelected,
                  ]}
                  onPress={() => setSelectedDate(day)}
                >
                  <Text
                    style={[
                      styles.calendarDate,
                      selectedDate === day && styles.calendarDateSelected,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Quick Date Selection */}
        <Text style={styles.subSectionTitle}>CHOOSE DAY</Text>
        <View style={styles.quickDateContainer}>
          <TouchableOpacity style={styles.todayButton}>
            <Text style={styles.todayButtonText}>TODAY</Text>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quickDate,
                  selectedDate === date.date && styles.quickDateSelected,
                ]}
                onPress={() => setSelectedDate(date.date)}
              >
                <Text style={styles.quickDateDay}>{date.day}</Text>
                <Text
                  style={[
                    styles.quickDateNumber,
                    selectedDate === date.date && styles.quickDateNumberSelected,
                  ]}
                >
                  {date.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Choose Time */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose time</Text>
        
        {/* Time of Day Selection */}
        <View style={styles.timeOfDayContainer}>
          {Object.keys(timeSlots).map(timeOfDay => (
            <TouchableOpacity
              key={timeOfDay}
              style={[
                styles.timeOfDayButton,
                selectedTimeOfDay === timeOfDay && styles.timeOfDayButtonSelected,
              ]}
              onPress={() => setSelectedTimeOfDay(timeOfDay)}
            >
              <Text
                style={[
                  styles.timeOfDayText,
                  selectedTimeOfDay === timeOfDay && styles.timeOfDayTextSelected,
                ]}
              >
                {timeOfDay}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Slots */}
        <Text style={styles.subSectionTitle}>CHOOSE TIME</Text>
        <View style={styles.timeSlotsContainer}>
          {selectedTimeOfDay && timeSlots[selectedTimeOfDay].map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                selectedTime === time && styles.timeSlotSelected,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeSlotText,
                  selectedTime === time && styles.timeSlotTextSelected,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.findButton}
          onPress={() => navigation.navigate('SpecialistList')}
        >
          <Text style={styles.findButtonText}>Find a specialist</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  specialistScroll: {
    flexDirection: 'row',
  },
  specialistOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  specialistOptionSelected: {
    backgroundColor: '#007AFF',
  },
  specialistOptionText: {
    fontSize: 14,
    color: '#666',
  },
  specialistOptionTextSelected: {
    color: '#fff',
  },
  monthYear: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  calendarDayHeader: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    marginBottom: 16,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  calendarCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  calendarCellSelected: {
    backgroundColor: '#007AFF',
  },
  calendarDate: {
    fontSize: 14,
    color: '#000',
  },
  calendarDateSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  quickDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  todayButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  quickDate: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  quickDateSelected: {
    backgroundColor: '#007AFF',
  },
  quickDateDay: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  quickDateNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  quickDateNumberSelected: {
    color: '#fff',
  },
  timeOfDayContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeOfDayButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    borderRadius: 8,
  },
  timeOfDayButtonSelected: {
    backgroundColor: '#007AFF',
  },
  timeOfDayText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  timeOfDayTextSelected: {
    color: '#fff',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    marginBottom: 8,
  },
  timeSlotSelected: {
    backgroundColor: '#007AFF',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#000',
  },
  timeSlotTextSelected: {
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginRight: 12,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  findButton: {
    flex: 2,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 12,
  },
  findButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default BookingScreen;