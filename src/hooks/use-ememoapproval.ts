import { useState } from "react";
import type {
  MemoApprovalRecord,
  MemoApprovalReviewData,
} from "@/components/mockData";

// Mock data
const mockMemoApprovals: MemoApprovalRecord[] = [
  {
    id: "memo-1",
    dateApproved: "2025-10-05",
    dateRaised: "2025-10-05",
    department: "Finance",
    subject: "Asset Acquisition",
    generator: "John Doe",
    status: "Approved",
    toEmail: "ljanyawuu@vatebra.com",
    fromEmail: "Dagbalagba@vatebra.com",
    memoDate: "12/12/2025",
    memoTime: "14:18:58pm",
    content: "BUSINESS REGISTRATION & DEVELOPMENT LEVY 2026 - VATEBRA LIMITED",
    documents: [
      {
        id: "doc-1",
        name: "007 - o9iuolj - oo8iuo98j8r - 9o98jhymb - ikoljhn .jpg",
        description: "Vehicle",
        filePath: "/documents/vehicle1.jpg",
      },
      {
        id: "doc-2",
        name: "007 - o9iuolj - oo8iuo98j8r - 9o98jhymb - ikoljhn .jpg",
        description: "Vehicle",
        filePath: "/documents/vehicle2.jpg",
      },
    ],
    hodComment:
      "Reviewed and approved. Kindly proceed as requested and ensure compliance with all relevant guidelines.",
  },
  {
    id: "memo-2",
    dateApproved: "2025-10-05",
    dateRaised: "2025-10-05",
    department: "Finance",
    subject: "Asset Acquisition",
    generator: "John Doe",
    status: "Approved",
  },
  {
    id: "memo-3",
    dateApproved: "2025-10-05",
    dateRaised: "2025-10-05",
    department: "Finance",
    subject: "Asset Acquisition",
    generator: "John Doe",
    status: "Approved",
  },
  {
    id: "memo-4",
    dateApproved: "2025-10-05",
    dateRaised: "2025-10-05",
    department: "Finance",
    subject: "Asset Acquisition",
    generator: "John Doe",
    status: "Approved",
  },
  {
    id: "memo-5",
    dateApproved: "2025-10-05",
    dateRaised: "2025-10-05",
    department: "Finance",
    subject: "Asset Acquisition",
    generator: "John Doe",
    status: "Approved",
  },
  {
    id: "memo-6",
    dateApproved: "2025-10-05",
    dateRaised: "2025-10-05",
    department: "Finance",
    subject: "Asset Acquisition",
    generator: "John Doe",
    status: "Approved",
  },
  {
    id: "memo-7",
    dateApproved: "2025-10-05",
    dateRaised: "2025-10-05",
    department: "Finance",
    subject: "Asset Acquisition",
    generator: "John Doe",
    status: "Approved",
  },
  {
    id: "memo-8",
    dateApproved: "2025-10-05",
    dateRaised: "2025-10-05",
    department: "Finance",
    subject: "Asset Acquisition",
    generator: "John Doe",
    status: "Approved",
  },
];

export function useMemoApprovalReviewManagement() {
  const [allMemos] = useState<MemoApprovalRecord[]>(mockMemoApprovals);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedMemoForReview, setSelectedMemoForReview] =
    useState<MemoApprovalRecord | null>(null);
  const [reviewFormData, setReviewFormData] = useState<MemoApprovalReviewData>({
    dateApproved: "",
    dateRaised: "",
    subject: "",
    generator: "",
    department: "",
    action: "",
    hodComment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReview = (memo: MemoApprovalRecord) => {
    setSelectedMemoForReview(memo);
    setReviewFormData({
      dateApproved: memo.dateApproved,
      dateRaised: memo.dateRaised,
      subject: memo.subject,
      generator: memo.generator,
      department: memo.department,
      action: "",
      hodComment: memo.hodComment || "",
    });
    setIsReviewModalOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewModalOpen(false);
    setSelectedMemoForReview(null);
    setReviewFormData({
      dateApproved: "",
      dateRaised: "",
      subject: "",
      generator: "",
      department: "",
      action: "",
      hodComment: "",
    });
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewFormData.action) {
      alert("Please select Approve or Reject");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Memo approval review saved:", reviewFormData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(
        `Memo ${reviewFormData.action === "approve" ? "Approved" : "Rejected"} successfully`,
      );
      handleCloseReview();
    } catch (error) {
      console.log(error);
      alert("Failed to save review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMemosByStatus = (status: "Pending" | "Approved" | "Rejected") => {
    return allMemos.filter((memo) => memo.status === status);
  };

  return {
    // State
    allMemos,
    isReviewModalOpen,
    selectedMemoForReview,
    reviewFormData,
    isSubmitting,
    // Handlers
    handleReview,
    handleCloseReview,
    handleSaveReview,
    setReviewFormData,
    // Helpers
    getMemosByStatus,
  };
}
