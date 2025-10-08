import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 20,
    textAlign: "center",
  },
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  answerContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  answerText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});
