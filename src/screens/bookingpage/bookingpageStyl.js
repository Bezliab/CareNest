import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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