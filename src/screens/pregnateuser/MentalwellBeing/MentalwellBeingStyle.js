import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: '#f8f9fa',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  backButton: {
    paddingVertical: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#5b77ee',
    fontWeight: '600',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40',
    marginTop: 15,
    marginBottom: 15,
  },
  
  // Tip Card Styles
  tipCard: {
    marginBottom: 25,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    overflow: 'hidden',
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#343a40', // Kept color dark for contrast
  },
  detailsBox: {
    padding: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },

  // Sleep Tips Styles
  sleepContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#e9ecef', 
    elevation: 2, // Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sleepItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  sleepBullet: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5b77ee',
    marginRight: 10,
    lineHeight: 20,
  },
  sleepText: {
    flex: 1,
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },

  footerSpace: {
    height: 50,
  },
});