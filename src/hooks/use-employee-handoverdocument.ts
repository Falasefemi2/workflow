import { useState } from "react";
import {
  mockEmployeeHandoverDocuments,
  type EmployeeHandoverDocument,
} from "@/components/mockData";

export interface ReviewDocumentFormData {
  employeeName: string;
  submissionDate: string;
  documentFile: string;
}

export function useEmployeeHandoverDocumentsManagement() {
  const [documents] = useState<EmployeeHandoverDocument[]>(
    mockEmployeeHandoverDocuments,
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedDocumentForReview, setSelectedDocumentForReview] =
    useState<EmployeeHandoverDocument | null>(null);
  const [reviewFormData, setReviewFormData] = useState<ReviewDocumentFormData>({
    employeeName: "",
    submissionDate: "",
    documentFile: "",
  });

  const handleReview = (document: EmployeeHandoverDocument) => {
    setSelectedDocumentForReview(document);
    setReviewFormData({
      employeeName: document.employeeName,
      submissionDate: document.submissionDate,
      documentFile: document.documentFile,
    });
    setIsReviewModalOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewModalOpen(false);
    setSelectedDocumentForReview(null);
  };

  const handleViewFile = (doc: EmployeeHandoverDocument) => {
    const link = document.createElement("a");
    link.href = doc.filePath;
    link.download = doc.documentFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    // State
    documents,
    isReviewModalOpen,
    selectedDocumentForReview,
    reviewFormData,
    // Handlers
    handleReview,
    handleCloseReview,
    handleViewFile,
    setReviewFormData,
    setIsReviewModalOpen,
  };
}
