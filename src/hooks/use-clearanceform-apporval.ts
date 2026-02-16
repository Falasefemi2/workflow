import { useState } from "react";
import {
  mockClearanceFormApprovals,
  type ClearanceFormApproval,
} from "@/components/mockData";

export function useClearanceFormApprovalManagement() {
  const [approvals] = useState<ClearanceFormApproval[]>(
    mockClearanceFormApprovals,
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedApprovalForReview, setSelectedApprovalForReview] =
    useState<ClearanceFormApproval | null>(null);

  const handleReview = (approval: ClearanceFormApproval) => {
    setSelectedApprovalForReview(approval);
    setIsReviewModalOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewModalOpen(false);
    setSelectedApprovalForReview(null);
  };

  const handleSaveApproval = (formData: Partial<ClearanceFormApproval>) => {
    console.log("Saving approval:", formData);
    setIsReviewModalOpen(false);
  };

  return {
    // State
    approvals,
    isReviewModalOpen,
    selectedApprovalForReview,
    // Handlers
    handleReview,
    handleCloseReview,
    handleSaveApproval,
    setIsReviewModalOpen,
  };
}
