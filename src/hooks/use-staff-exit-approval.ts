import { useState } from "react";
import {
  mockStaffExitApprovalSetups,
  type StaffExitApprovalSetup,
} from "@/components/mockData";

export interface StaffExitApprovalSetupFormData {
  designation: string;
  numberOfApprovals: string;
  approvingDepartmentHOD: string;
}

export function useStaffExitApprovalSetupManagement() {
  const [staffExitApprovalSetups, setStaffExitApprovalSetups] = useState<
    StaffExitApprovalSetup[]
  >(mockStaffExitApprovalSetups);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSetupId, setEditingSetupId] = useState<string | null>(null);
  const [setupToDelete, setSetupToDelete] =
    useState<StaffExitApprovalSetup | null>(null);
  const [formData, setFormData] = useState<StaffExitApprovalSetupFormData>({
    designation: "",
    numberOfApprovals: "",
    approvingDepartmentHOD: "",
  });

  const isEditMode = editingSetupId !== null;
  const modalText = isEditMode ? "Edit Staff Exit Approval" : "Add New";

  const handleAddSetup = () => {
    setEditingSetupId(null);
    setFormData({
      designation: "",
      numberOfApprovals: "",
      approvingDepartmentHOD: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditSetup = (setup: StaffExitApprovalSetup) => {
    setEditingSetupId(setup.id);
    setFormData({
      designation: setup.designation,
      numberOfApprovals: setup.numberOfApprovals,
      approvingDepartmentHOD: setup.approvingDepartmentHOD,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteSetup = (setup: StaffExitApprovalSetup) => {
    setSetupToDelete(setup);
  };

  const handleConfirmDelete = () => {
    if (!setupToDelete) {
      return;
    }

    setStaffExitApprovalSetups((prevSetups) =>
      prevSetups.filter((s) => s.id !== setupToDelete.id),
    );
    setSetupToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.designation ||
      !formData.numberOfApprovals ||
      !formData.approvingDepartmentHOD
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (isEditMode) {
      setStaffExitApprovalSetups((prevSetups) =>
        prevSetups.map((setup) =>
          setup.id === editingSetupId
            ? {
                ...setup,
                designation: formData.designation,
                numberOfApprovals: formData.numberOfApprovals,
                approvingDepartmentHOD: formData.approvingDepartmentHOD,
              }
            : setup,
        ),
      );
    } else {
      const newSetup: StaffExitApprovalSetup = {
        id: String(Date.now()),
        designation: formData.designation,
        numberOfApprovals: formData.numberOfApprovals,
        approvingDepartmentHOD: formData.approvingDepartmentHOD,
      };

      setStaffExitApprovalSetups((prevSetups) => [newSetup, ...prevSetups]);
    }

    setIsDialogOpen(false);
    setEditingSetupId(null);
    setFormData({
      designation: "",
      numberOfApprovals: "",
      approvingDepartmentHOD: "",
    });
  };

  return {
    // State
    staffExitApprovalSetups,
    isDialogOpen,
    editingSetupId,
    setupToDelete,
    formData,
    isEditMode,
    modalText,
    // Handlers
    handleAddSetup,
    handleEditSetup,
    handleDeleteSetup,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setSetupToDelete,
  };
}
