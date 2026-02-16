import { useState } from "react";
import { mockExitInterviews, type ExitInterview } from "@/components/mockData";

export function useExitInterviewManagement() {
  const [interviews] = useState<ExitInterview[]>(mockExitInterviews);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedInterviewForPreview, setSelectedInterviewForPreview] =
    useState<ExitInterview | null>(null);

  const handlePreview = (interview: ExitInterview) => {
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
