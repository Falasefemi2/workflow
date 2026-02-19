import { useState } from "react";
import type {
  LeaveApprovalRecord,
  LeaveApprovalReviewData,
} from "@/components/mockData";

// Mock data
const mockLeaveApprovals: LeaveApprovalRecord[] = [
  {
    id: "leave-1",
    leaveType: "Study Leave",
    employeeName: "Adeola Johnson",
    commencementDate: "2024-02-12",
    resumptionDate: "2024-03-02",
    status: "Pending",
    leaveDays: 15,
    handoverNote:
      "https://vatebra-my.sharepoint.com/:x:/p/ooduntan/EadVjl8s2aNBpWtxvG2xMk4BpLGNBzyQSjd8HGGa_U7cQ?e=kcAfxn",
    reliefOfficer: "Treasure Wellington",
  },
  {
    id: "leave-2",
    leaveType: "Study Leave",
    employeeName: "Adeola Johnson",
    commencementDate: "2024-02-12",
    resumptionDate: "2024-03-02",
    status: "Pending",
    leaveDays: 10,
  },
  {
    id: "leave-3",
    leaveType: "Sick Leave",
    employeeName: "Adeola Johnson",
    commencementDate: "2024-02-12",
    resumptionDate: "2024-03-02",
    status: "Pending",
    leaveDays: 5,
  },
  {
    id: "leave-4",
    leaveType: "Maternity Leave",
    employeeName: "Adeola Johnson",
    commencementDate: "2024-02-12",
    resumptionDate: "2024-03-02",
    status: "Pending",
    leaveDays: 15,
  },
  {
    id: "leave-5",
    leaveType: "Study Leave",
    employeeName: "Adeola Johnson",
    commencementDate: "2024-02-12",
    resumptionDate: "2024-03-02",
    status: "Approved",
    leaveDays: 10,
  },
  {
    id: "leave-6",
    leaveType: "Sick Leave",
    employeeName: "Adeola Johnson",
    commencementDate: "2024-02-12",
    resumptionDate: "2024-03-02",
    status: "Approved",
    leaveDays: 5,
  },
  {
    id: "leave-7",
    leaveType: "Maternity Leave",
    employeeName: "Adeola Johnson",
    commencementDate: "2024-02-12",
    resumptionDate: "2024-03-02",
    status: "Rejected",
    leaveDays: 15,
  },
  {
    id: "leave-8",
    leaveType: "Study Leave",
    employeeName: "Adeola Johnson",
    commencementDate: "2024-02-12",
    resumptionDate: "2024-03-02",
    status: "Rejected",
    leaveDays: 10,
  },
];

export function useLeaveApprovalReviewManagement() {
  const [leaves] = useState<LeaveApprovalRecord[]>(mockLeaveApprovals);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedLeaveForReview, setSelectedLeaveForReview] =
    useState<LeaveApprovalRecord | null>(null);
  const [reviewFormData, setReviewFormData] = useState<LeaveApprovalReviewData>(
    {
      leaveType: "",
      leaveDays: "",
      commencementDate: "",
      handoverNote: "",
      reliefOfficer: "",
      action: "",
    },
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReview = (leave: LeaveApprovalRecord) => {
    setSelectedLeaveForReview(leave);
    setReviewFormData({
      leaveType: leave.leaveType,
      leaveDays: leave.leaveDays?.toString() || "",
      commencementDate: leave.commencementDate,
      handoverNote: leave.handoverNote || "",
      reliefOfficer: leave.reliefOfficer || "",
      action: "",
    });
    setIsReviewModalOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewModalOpen(false);
    setSelectedLeaveForReview(null);
    setReviewFormData({
      leaveType: "",
      leaveDays: "",
      commencementDate: "",
      handoverNote: "",
      reliefOfficer: "",
      action: "",
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
      console.log("Leave approval review saved:", reviewFormData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(
        `Leave ${reviewFormData.action === "approve" ? "Approved" : "Rejected"} successfully`,
      );
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
    leaves,
    isReviewModalOpen,
    selectedLeaveForReview,
    reviewFormData,
    isSubmitting,
    // Handlers
    handleReview,
    handleCloseReview,
    handleSaveReview,
    setReviewFormData,
  };
}
