import { useState } from "react";
import {
  mockEmployeeClearanceForms,
  type EmployeeClearanceForm,
} from "@/components/mockData";

export function useEmployeeClearanceFormManagement() {
  const [forms] = useState<EmployeeClearanceForm[]>(mockEmployeeClearanceForms);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedFormForReview, setSelectedFormForReview] =
    useState<EmployeeClearanceForm | null>(null);

  const handleReview = (form: EmployeeClearanceForm) => {
    setSelectedFormForReview(form);
    setIsReviewModalOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewModalOpen(false);
    setSelectedFormForReview(null);
  };

  return {
    // State
    forms,
    isReviewModalOpen,
    selectedFormForReview,
    // Handlers
    handleReview,
    handleCloseReview,
    setIsReviewModalOpen,
  };
}
