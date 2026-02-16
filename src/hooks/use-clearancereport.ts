import { useState } from "react";
import {
  mockClearanceReports,
  type ClearanceReport,
} from "@/components/mockData";

export function useClearanceReportManagement() {
  const [reports] = useState<ClearanceReport[]>(mockClearanceReports);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReportForReview, setSelectedReportForReview] =
    useState<ClearanceReport | null>(null);

  const handleReview = (report: ClearanceReport) => {
    setSelectedReportForReview(report);
    setIsReviewModalOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewModalOpen(false);
    setSelectedReportForReview(null);
  };

  return {
    // State
    reports,
    isReviewModalOpen,
    selectedReportForReview,
    // Handlers
    handleReview,
    handleCloseReview,
    setIsReviewModalOpen,
  };
}
