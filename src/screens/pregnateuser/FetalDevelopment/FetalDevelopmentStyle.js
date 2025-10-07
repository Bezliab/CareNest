const styles = StyleSheet.create({
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
  sectionContainer: {
    marginBottom: 25,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android Elevation
    elevation: 3,
    overflow: 'hidden', // Required for borderRadius to work with shadow/elevation
  },
  titleBar: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  milestoneBox: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  milestoneWeek: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 4,
  },
  milestoneDetail: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  footerSpace: {
    height: 50,
  },
});
