import { useState } from "react";
import {
  mockHandoverDocuments,
  type HandoverDocument,
} from "@/components/mockData";

export interface ReviewFormData {
  employeeName: string;
  date: string;
  handoverNotes: File | null;
}

export function useHandoverDocumentManagement() {
  const [documents] = useState<HandoverDocument[]>(mockHandoverDocuments);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedDocumentForReview, setSelectedDocumentForReview] =
    useState<HandoverDocument | null>(null);
  const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({
    employeeName: "",
    date: "",
    handoverNotes: null,
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const handleReview = (document: HandoverDocument) => {
    setSelectedDocumentForReview(document);
    setReviewFormData({
      employeeName: document.employeeName,
      date: document.submissionDate,
      handoverNotes: null,
    });
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !reviewFormData.employeeName ||
      !reviewFormData.date ||
      !reviewFormData.handoverNotes
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmittingReview(true);
    try {
      // Simulate review submission
      console.log("Review submitted for:", reviewFormData);

      // In a real app, you would send this to your backend
      setIsReviewModalOpen(false);
      setReviewFormData({
        employeeName: "",
        date: "",
        handoverNotes: null,
      });
      setSelectedDocumentForReview(null);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleViewFile = (doc: HandoverDocument) => {
    const link = window.document.createElement("a");
    link.href = doc.filePath;
    link.download = doc.documentFile;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  return {
    // State
    documents,
    isReviewModalOpen,
    selectedDocumentForReview,
    reviewFormData,
    isSubmittingReview,
    // Handlers
    handleReview,
    handleSubmitReview,
    handleViewFile,
    setReviewFormData,
    setIsReviewModalOpen,
  };
}
