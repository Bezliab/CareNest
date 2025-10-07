const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  cardGrid: {
    // Layout for cards: flexWrap creates a grid effect
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    // Responsive width: 100% on small screens, ~48% on wider tablets/desktops
    width: windowWidth > 600 ? (windowWidth / 2) - 30 : '100%', 
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    // Native Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Elevation (Android)
    elevation: 5, 
    minHeight: 250, 
    flexGrow: 1, // Ensures all cards in a row try to take up space
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 24, // Size for the emoji icon
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#343a40',
    marginBottom: 8,
  },
  cardSummary: {
    color: '#6c757d',
    marginBottom: 20,
    flexGrow: 1, // Pushes the button to the bottom
    fontSize: 14,
    lineHeight: 18,
  },
  readMoreButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto', // Ensures button is always at the bottom of the card
  },
  readMoreText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});