import { useState } from "react";
import type {
  CandidateOfferRequest,
  CandidateOfferReviewData,
} from "@/components/mockData";

// Mock data
const mockCandidateLeaves: CandidateOfferRequest[] = [
  {
    id: "cl-1",
    employeeName: "Adeolu Olabanji",
    department: "Business Processes & Product Development",
    proposedStartDate: "2025-04-05",
    status: "Pending",
  },
];

export function useCandidateOfferRequestManagement() {
  const [leaves] = useState<CandidateOfferRequest[]>(mockCandidateLeaves);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedLeaveForReview, setSelectedLeaveForReview] =
    useState<CandidateOfferRequest | null>(null);
  const [reviewFormData, setReviewFormData] =
    useState<CandidateOfferReviewData>({
      employeeName: "",
      department: "",
      proposedStartDate: "",
      action: "",
      rejectionReason: "",
    });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRejectionForm, setShowRejectionForm] = useState(false);

  const handleViewDetails = (leave: CandidateOfferRequest) => {
    setSelectedLeaveForReview(leave);
    setReviewFormData({
      employeeName: leave.employeeName,
      department: leave.department,
      proposedStartDate: leave.proposedStartDate,
      action: "",
      rejectionReason: "",
    });
    setShowRejectionForm(false);
    setIsReviewModalOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewModalOpen(false);
    setSelectedLeaveForReview(null);
    setReviewFormData({
      employeeName: "",
      department: "",
      proposedStartDate: "",
      action: "",
      rejectionReason: "",
    });
    setShowRejectionForm(false);
  };

  const handleApprove = async () => {
    setReviewFormData({ ...reviewFormData, action: "approve" });
    setIsSubmitting(true);
    try {
      console.log("Candidate leave approved:", reviewFormData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Candidate leave approved successfully");
      handleCloseReview();
    } catch (error) {
      console.log(error);
      alert("Failed to approve leave");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectClick = () => {
    setShowRejectionForm(true);
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewFormData.rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    setReviewFormData({ ...reviewFormData, action: "reject" });
    setIsSubmitting(true);
    try {
      console.log("Candidate leave rejected:", reviewFormData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Candidate leave rejected successfully");
      handleCloseReview();
    } catch (error) {
      console.log(error);
      alert("Failed to reject leave");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    leaves,
    isReviewModalOpen,
    selectedLeaveForReview,
    reviewFormData,
    isSubmitting,
    showRejectionForm,
    // Handlers
    handleViewDetails,
    handleCloseReview,
    handleApprove,
    handleRejectClick,
    handleReject,
    setReviewFormData,
  };
}
