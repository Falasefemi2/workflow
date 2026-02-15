import { useState } from "react";
import { mockEmployeeHMOs, type EmployeeHMO } from "@/components/mockData";

export interface ApplyForHMOFormData {
  selectedHMO: string;
  formFile: File | null;
}

export function useHMOManagement() {
  const [employeeHMOs, setEmployeeHMOs] =
    useState<EmployeeHMO[]>(mockEmployeeHMOs);
  const [isApplyHMODialogOpen, setIsApplyHMODialogOpen] = useState(false);
  const [formData, setFormData] = useState<ApplyForHMOFormData>({
    selectedHMO: "",
    formFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyHMO = () => {
    setFormData({
      selectedHMO: "",
      formFile: null,
    });
    setIsApplyHMODialogOpen(true);
  };

  const handleSubmitHMO = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.selectedHMO || !formData.formFile) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate file upload
      const newHMO: EmployeeHMO = {
        id: String(Date.now()),
        hmoServiceProvider: formData.selectedHMO,
        formFilePath: `/forms/${formData.formFile.name}`,
      };

      setEmployeeHMOs((prev) => [newHMO, ...prev]);

      setIsApplyHMODialogOpen(false);
      setFormData({
        selectedHMO: "",
        formFile: null,
      });
    } catch (error) {
      console.error("Error submitting HMO application:", error);
      alert("Failed to submit HMO application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadForm = (hmo: EmployeeHMO) => {
    // In a real app, this would trigger a download from the backend
    const link = document.createElement("a");
    link.href = hmo.formFilePath;
    link.download = `${hmo.hmoServiceProvider}-form.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    // State
    employeeHMOs,
    isApplyHMODialogOpen,
    formData,
    isSubmitting,
    // Handlers
    handleApplyHMO,
    handleSubmitHMO,
    handleDownloadForm,
    setFormData,
    setIsApplyHMODialogOpen,
  };
}
