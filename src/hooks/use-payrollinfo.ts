import { useState } from "react";
import {
  mockPayrollInformation,
  type PayrollInformation,
} from "@/components/mockData";

export function usePayrollInformationManagement() {
  const [payrollInfo, setPayrollInfo] = useState<PayrollInformation>(
    mockPayrollInformation,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handlePayrollInfoChange = (
    field: keyof PayrollInformation,
    value: string,
  ) => {
    setPayrollInfo({ ...payrollInfo, [field]: value });
  };

  const handleSaveChanges = async () => {
    if (!validatePayrollInfo()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Payroll information saved:", payrollInfo);
      setIsEditing(false);
      alert("Payroll information saved successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to save payroll information");
    } finally {
      setIsSaving(false);
    }
  };

  const validatePayrollInfo = (): boolean => {
    // Validate required fields
    if (
      !payrollInfo.accountHolderName ||
      !payrollInfo.bankName ||
      !payrollInfo.accountNumber ||
      !payrollInfo.bvn
    ) {
      return false;
    }
    return true;
  };

  return {
    // State
    payrollInfo,
    isEditing,
    isSaving,
    // Handlers
    handleEditToggle,
    handlePayrollInfoChange,
    handleSaveChanges,
  };
}
