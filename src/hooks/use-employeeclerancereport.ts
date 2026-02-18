import { useState } from "react";
import {
  mockEmployeeClearanceReports,
  type EmployeeClearanceReport,
} from "@/components/mockData";

export function useEmployeeClearanceReportManagement() {
  const [reports] = useState<EmployeeClearanceReport[]>(
    mockEmployeeClearanceReports,
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReportForReview, setSelectedReportForReview] =
    useState<EmployeeClearanceReport | null>(null);

  const handleReview = (report: EmployeeClearanceReport) => {
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
