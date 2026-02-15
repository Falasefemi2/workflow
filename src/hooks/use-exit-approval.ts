import { useState } from "react";
import {
  mockExitApprovalSetups,
  type ExitApprovalSetup,
} from "@/components/mockData";

export interface ExitApprovalSetupFormData {
  designation: string;
  approvalLevel: string;
  approvingDesignation: string;
}

export function useExitApprovalSetupManagement() {
  const [exitApprovalSetups, setExitApprovalSetups] = useState<
    ExitApprovalSetup[]
  >(mockExitApprovalSetups);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSetupId, setEditingSetupId] = useState<string | null>(null);
  const [setupToDelete, setSetupToDelete] = useState<ExitApprovalSetup | null>(
    null,
  );
  const [formData, setFormData] = useState<ExitApprovalSetupFormData>({
    designation: "",
    approvalLevel: "",
    approvingDesignation: "",
  });

  const isEditMode = editingSetupId !== null;
  const modalText = isEditMode ? "Edit Exit Approval" : "Add New";

  const handleAddSetup = () => {
    setEditingSetupId(null);
    setFormData({
      designation: "",
      approvalLevel: "",
      approvingDesignation: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditSetup = (setup: ExitApprovalSetup) => {
    setEditingSetupId(setup.id);
    setFormData({
      designation: setup.designation,
      approvalLevel: setup.approvalLevel,
      approvingDesignation: setup.approvingDesignation,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteSetup = (setup: ExitApprovalSetup) => {
    setSetupToDelete(setup);
  };

  const handleConfirmDelete = () => {
    if (!setupToDelete) {
      return;
    }

    setExitApprovalSetups((prevSetups) =>
      prevSetups.filter((s) => s.id !== setupToDelete.id),
    );
    setSetupToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.designation ||
      !formData.approvalLevel ||
      !formData.approvingDesignation
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (isEditMode) {
      setExitApprovalSetups((prevSetups) =>
        prevSetups.map((setup) =>
          setup.id === editingSetupId
            ? {
                ...setup,
                designation: formData.designation,
                approvalLevel: formData.approvalLevel,
                approvingDesignation: formData.approvingDesignation,
              }
            : setup,
        ),
      );
    } else {
      const newSetup: ExitApprovalSetup = {
        id: String(Date.now()),
        designation: formData.designation,
        approvalLevel: formData.approvalLevel,
        approvingDesignation: formData.approvingDesignation,
      };

      setExitApprovalSetups((prevSetups) => [newSetup, ...prevSetups]);
    }

    setIsDialogOpen(false);
    setEditingSetupId(null);
    setFormData({
      designation: "",
      approvalLevel: "",
      approvingDesignation: "",
    });
  };

  return {
    // State
    exitApprovalSetups,
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
