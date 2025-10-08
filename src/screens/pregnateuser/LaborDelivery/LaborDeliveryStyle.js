import { StyleSheet } from 'react-native';
<<<<<<< HEAD

=======
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
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
  
  // Preparation Step Card Styles
  stepCard: {
    marginBottom: 25,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow property for Android
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

  // Labor Stages Styles
  stagesContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#e9ecef', 
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2, // Shadow property for Android
  },
  stageItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stageBullet: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5b77ee',
    marginRight: 10,
    lineHeight: 20,
  },
  stageText: {
    flex: 1,
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },

  footerSpace: {
    height: 50,
  },
});