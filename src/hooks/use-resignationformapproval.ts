import { useState } from "react";
import type { ResignationFormReviewData } from "@/components/mockData";

export interface ResignationFormApproval {
  id: string;
  staffName: string;
  disengagementDate: string;
}

// Mock data
const mockResignationFormApprovals: ResignationFormApproval[] = [
  {
    id: "rfa-1",
    staffName: "Adeolu Olabanji",
    disengagementDate: "2025-10-05",
  },
  {
    id: "rfa-2",
    staffName: "Adeolu Olabanji",
    disengagementDate: "2025-10-05",
  },
  {
    id: "rfa-3",
    staffName: "Adeolu Olabanji",
    disengagementDate: "2025-10-05",
  },
  {
    id: "rfa-4",
    staffName: "Adeolu Olabanji",
    disengagementDate: "2025-10-05",
  },
  {
    id: "rfa-5",
    staffName: "Adeolu Olabanji",
    disengagementDate: "2025-10-05",
  },
  {
    id: "rfa-6",
    staffName: "Adeolu Olabanji",
    disengagementDate: "2025-10-05",
  },
  {
    id: "rfa-7",
    staffName: "Adeolu Olabanji",
    disengagementDate: "2025-10-05",
  },
  {
    id: "rfa-8",
    staffName: "Adeolu Olabanji",
    disengagementDate: "2025-10-05",
  },
];

export function useResignationFormApprovalManagement() {
  const [approvals] = useState<ResignationFormApproval[]>(
    mockResignationFormApprovals,
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedApprovalForReview, setSelectedApprovalForReview] =
    useState<ResignationFormApproval | null>(null);
  const [reviewFormData, setReviewFormData] =
    useState<ResignationFormReviewData>({
      staffName: "",
      disengagementDate: "",
      reviewDate: "",
      approvalStatus: "",
      comment: "",
    });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReview = (approval: ResignationFormApproval) => {
    setSelectedApprovalForReview(approval);
    setReviewFormData({
      staffName: approval.staffName,
      disengagementDate: approval.disengagementDate,
      reviewDate: "",
      approvalStatus: "",
      comment: "",
    });
    setIsReviewModalOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewModalOpen(false);
    setSelectedApprovalForReview(null);
    setReviewFormData({
      staffName: "",
      disengagementDate: "",
      reviewDate: "",
      approvalStatus: "",
      comment: "",
    });
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewFormData.reviewDate || !reviewFormData.approvalStatus) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Resignation form approval review saved:", reviewFormData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Review saved successfully");
      handleCloseReview();
    } catch (error) {
      console.log(error);
      alert("Failed to save review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    approvals,
    isReviewModalOpen,
    selectedApprovalForReview,
    reviewFormData,
    isSubmitting,
    // Handlers
    handleReview,
    handleCloseReview,
    handleSaveReview,
    setReviewFormData,
  };
}
