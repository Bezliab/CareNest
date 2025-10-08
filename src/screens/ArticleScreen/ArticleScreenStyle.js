// screens/ArticleScreenStyle.js
import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    paddingHorizontal: 16,
  },
  coverImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    color: "#666",
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    textAlign: "justify",
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
    backgroundColor: "#fafafa",
  },
  footerBtn: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    marginTop: 4,
    color: "#1976d2",
  },
});
