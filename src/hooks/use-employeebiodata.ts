import { useState } from "react";
import {
  mockEmployeeBioData,
  mockGuarantors,
  type EmployeeBioData,
  type GuarantorInfo,
  type ChangeNameRequest,
} from "@/components/mockData";

export function useEmployeeBioDataManagement() {
  const [bioData, setBioData] = useState<EmployeeBioData>(mockEmployeeBioData);
  const [guarantors] = useState<GuarantorInfo[]>(mockGuarantors);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangeNameDialogOpen, setIsChangeNameDialogOpen] = useState(false);
  const [changeNameFormData, setChangeNameFormData] =
    useState<ChangeNameRequest>({
      nameToChange: "",
      newName: "",
      reasonForChange: "",
      supportingDocument: null,
    });
  const [isSubmittingChangeRequest, setIsSubmittingChangeRequest] =
    useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleBioDataChange = (field: keyof EmployeeBioData, value: string) => {
    setBioData({ ...bioData, [field]: value });
  };

  const handleSaveChanges = async () => {
    setIsEditing(false);
    console.log("Bio-Data saved:", bioData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleChangeNameYes = () => {
    setIsChangeNameDialogOpen(true);
  };

  const handleChangeNameNo = () => {
    console.log("Change name request declined");
  };

  const handleSubmitChangeNameRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !changeNameFormData.nameToChange ||
      !changeNameFormData.newName ||
      !changeNameFormData.reasonForChange ||
      !changeNameFormData.supportingDocument
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmittingChangeRequest(true);
    try {
      console.log("Change name request submitted:", changeNameFormData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Change name request submitted successfully");
      setIsChangeNameDialogOpen(false);
      setChangeNameFormData({
        nameToChange: "",
        newName: "",
        reasonForChange: "",
        supportingDocument: null,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to submit change name request");
    } finally {
      setIsSubmittingChangeRequest(false);
    }
  };

  const handleCloseChangeNameDialog = () => {
    setIsChangeNameDialogOpen(false);
  };

  return {
    // State
    bioData,
    guarantors,
    isEditing,
    isChangeNameDialogOpen,
    changeNameFormData,
    isSubmittingChangeRequest,
    // Handlers
    handleEditToggle,
    handleBioDataChange,
    handleSaveChanges,
    handleChangeNameYes,
    handleChangeNameNo,
    handleSubmitChangeNameRequest,
    handleCloseChangeNameDialog,
    setChangeNameFormData,
  };
}
