import { useState } from "react";
import {
  mockLeaveApprovals,
  type LeaveApprovalSetup,
} from "@/components/mockData";

export interface LeaveApprovalFormData {
  role: string;
  levelName: string;
  levelOrder: string;
  department: string;
  approvalLevel: string;
  description: string;
}

export function useLeaveApprovalManagement() {
  const [approvals, setApprovals] =
    useState<LeaveApprovalSetup[]>(mockLeaveApprovals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingApprovalId, setEditingApprovalId] = useState<string | null>(
    null,
  );
  const [approvalToDelete, setApprovalToDelete] =
    useState<LeaveApprovalSetup | null>(null);
  const [formData, setFormData] = useState<LeaveApprovalFormData>({
    role: "",
    levelName: "",
    levelOrder: "",
    department: "",
    approvalLevel: "",
    description: "",
  });

  const isEditMode = editingApprovalId !== null;
  const modalText = isEditMode ? "Edit Leave Approval" : "Add approval set- up";

  const handleAddApproval = () => {
    setEditingApprovalId(null);
    setFormData({
      role: "",
      levelName: "",
      levelOrder: "",
      department: "",
      approvalLevel: "",
      description: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditApproval = (approval: LeaveApprovalSetup) => {
    setEditingApprovalId(approval.id);
    setFormData({
      role: approval.role,
      levelName: approval.levelName,
      levelOrder: String(approval.levelOrder),
      department: approval.department,
      approvalLevel: approval.approvalLevel,
      description: approval.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleDeleteApproval = (approval: LeaveApprovalSetup) => {
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
                role: formData.role,
                levelName: formData.levelName,
                levelOrder: Number(formData.levelOrder),
                department: formData.department,
                approvalLevel: formData.approvalLevel,
                description: formData.description,
              }
            : approval,
        ),
      );
    } else {
      const newApproval: LeaveApprovalSetup = {
        id: String(Date.now()),
        role: formData.role,
        levelName: formData.levelName,
        levelOrder: Number(formData.levelOrder),
        department: formData.department,
        approvalLevel: formData.approvalLevel,
        description: formData.description,
      };

      setApprovals((prevApprovals) => [newApproval, ...prevApprovals]);
    }

    setIsDialogOpen(false);
    setEditingApprovalId(null);
    setFormData({
      role: "",
      levelName: "",
      levelOrder: "",
      department: "",
      approvalLevel: "",
      description: "",
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
