import { useState } from "react";
import {
  mockMemoApprovals,
  type MemoApprovalSetup,
} from "@/components/mockData";

export interface MemoApprovalFormData {
  level: string;
  memoType: string;
  approvingOfficers: string[];
  committeeOfficers: string[];
}

export function useMemoApprovalManagement() {
  const [approvals, setApprovals] =
    useState<MemoApprovalSetup[]>(mockMemoApprovals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingApprovalId, setEditingApprovalId] = useState<string | null>(
    null,
  );
  const [approvalToDelete, setApprovalToDelete] =
    useState<MemoApprovalSetup | null>(null);
  const [formData, setFormData] = useState<MemoApprovalFormData>({
    level: "",
    memoType: "",
    approvingOfficers: [],
    committeeOfficers: [],
  });

  const isEditMode = editingApprovalId !== null;
  const modalText = isEditMode ? "Edit Memo Approval" : "Add New";

  const handleAddApproval = () => {
    setEditingApprovalId(null);
    setFormData({
      level: "",
      memoType: "",
      approvingOfficers: [],
      committeeOfficers: [],
    });
    setIsDialogOpen(true);
  };

  const handleEditApproval = (approval: MemoApprovalSetup) => {
    setEditingApprovalId(approval.id);
    setFormData({
      level: String(approval.level),
      memoType: approval.memoType,
      approvingOfficers: approval.approvingOfficers || [],
      committeeOfficers: approval.committeeOfficers || [],
    });
    setIsDialogOpen(true);
  };

  const handleDeleteApproval = (approval: MemoApprovalSetup) => {
    setApprovalToDelete(approval);
  };

  const handleConfirmDelete = () => {
    if (!approvalToDelete) {
      return;
    }

    setApprovals((prevApprovals) =>
      prevApprovals.filter((a) => a.id !== approvalToDelete.id),
    );
    setApprovalToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      setApprovals((prevApprovals) =>
        prevApprovals.map((approval) =>
          approval.id === editingApprovalId
            ? {
                ...approval,
                level: Number(formData.level),
                memoType: formData.memoType,
                approvingOfficers:
                  formData.memoType === "General"
                    ? formData.approvingOfficers
                    : undefined,
                committeeOfficers:
                  formData.memoType === "Asset"
                    ? formData.committeeOfficers
                    : undefined,
              }
            : approval,
        ),
      );
    } else {
      const newApproval: MemoApprovalSetup = {
        id: String(Date.now()),
        level: Number(formData.level),
        memoType: formData.memoType,
        approvingOfficers:
          formData.memoType === "General"
            ? formData.approvingOfficers
            : undefined,
        committeeOfficers:
          formData.memoType === "Asset"
            ? formData.committeeOfficers
            : undefined,
      };

      setApprovals((prevApprovals) => [newApproval, ...prevApprovals]);
    }

    setIsDialogOpen(false);
    setEditingApprovalId(null);
    setFormData({
      level: "",
      memoType: "",
      approvingOfficers: [],
      committeeOfficers: [],
    });
  };

  return {
    // State
    approvals,
    isDialogOpen,
    editingApprovalId,
    approvalToDelete,
    formData,
    isEditMode,
    modalText,
    // Handlers
    handleAddApproval,
    handleEditApproval,
    handleDeleteApproval,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setApprovalToDelete,
  };
}
