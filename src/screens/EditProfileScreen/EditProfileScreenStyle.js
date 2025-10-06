import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faff',
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1976d2',
    textAlign: 'center',
    marginBottom: 25,
  },

  // 🔹 PROFILE IMAGE
  imageWrapper: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#1976d2',
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f0ff',
  },
  placeholderText: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },

  // 🔹 INPUT FIELDS
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 15,
    color: '#333',
  },

  // 🔹 SAVE BUTTON
  saveButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
    shadowColor: '#1976d2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
