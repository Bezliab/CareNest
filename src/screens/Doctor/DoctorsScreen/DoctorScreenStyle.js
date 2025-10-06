import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  /* Header */
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  /* Search + Sort Row */
  searchSortRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#eaf4fc",
  },
  sortText: {
    marginLeft: 5,
    color: "#3498db",
    fontSize: 14,
    fontWeight: "500",
  },

  /* Specialty Filter */
  specialtyContainer: {
    paddingHorizontal: 10,
    marginTop: 12,
    maxHeight: 44,
  },
  specialtyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    marginRight: 8,
  },
  specialtyButtonActive: {
    backgroundColor: "#3498db",
  },
  specialtyText: {
    fontSize: 14,
    color: "#333",
  },
  specialtyTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  /* Results */
  resultsContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  resultsText: {
    fontSize: 14,
    color: "#666",
  },

  /* Doctor Card */
  listContainer: {
    padding: 16,
  },
  doctorCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  doctorHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: "center",
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  doctorSpecialty: {
    fontSize: 13,
    color: "#666",
    marginVertical: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  rating: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  reviews: {
    marginLeft: 6,
    fontSize: 12,
    color: "#888",
  },

  /* Details */
  detailsSection: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#555",
  },

  /* Treatments */
  treatmentSection: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  treatmentItem: {
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
    marginBottom: 2,
  },

  /* Card Footer */
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
  },
  availableText: {
    fontSize: 12,
    color: "#888",
  },
  availableDate: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    marginTop: 2,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3498db",
  },
  session: {
    fontSize: 12,
    color: "#888",
  },

  /* Book Button */
  bookButton: {
    marginTop: 14,
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 10,
  },
  bookButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalOptionActive: {
    backgroundColor: "#eaf4fc",
  },
  modalOptionText: {
    fontSize: 15,
    color: "#333",
  },
  modalOptionTextActive: {
    color: "#3498db",
    fontWeight: "600",
  },
});
