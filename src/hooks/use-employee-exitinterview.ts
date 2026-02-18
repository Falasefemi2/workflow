import { useState } from "react";
import {
  mockEmployeeExitInterviews,
  type EmployeeExitInterview,
} from "@/components/mockData";

export function useEmployeeExitInterviewManagement() {
  const [interviews] = useState<EmployeeExitInterview[]>(
    mockEmployeeExitInterviews,
  );
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedInterviewForPreview, setSelectedInterviewForPreview] =
    useState<EmployeeExitInterview | null>(null);

  const handlePreview = (interview: EmployeeExitInterview) => {
    setSelectedInterviewForPreview(interview);
    setIsPreviewModalOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewModalOpen(false);
    setSelectedInterviewForPreview(null);
  };

  return {
    // State
    interviews,
    isPreviewModalOpen,
    selectedInterviewForPreview,
    // Handlers
    handlePreview,
    handleClosePreview,
    setIsPreviewModalOpen,
  };
}
