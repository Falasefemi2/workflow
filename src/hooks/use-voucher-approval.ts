import { useState } from "react";
import {
  mockVoucherApprovals,
  type VoucherApprovalSetup,
} from "@/components/mockData";

export interface VoucherApprovalFormData {
  department: string;
  level: string;
  approvingOfficers: string[];
}

export function useVoucherApprovalManagement() {
  const [approvals, setApprovals] =
    useState<VoucherApprovalSetup[]>(mockVoucherApprovals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingApprovalId, setEditingApprovalId] = useState<string | null>(
    null,
  );
  const [approvalToDelete, setApprovalToDelete] =
    useState<VoucherApprovalSetup | null>(null);
  const [formData, setFormData] = useState<VoucherApprovalFormData>({
    department: "",
    level: "",
    approvingOfficers: [],
  });

  const isEditMode = editingApprovalId !== null;
  const modalText = isEditMode
    ? "Edit E-voucher Approval"
    : "Add E-voucher Approval";

  const handleAddApproval = () => {
    setEditingApprovalId(null);
    setFormData({
      department: "",
      level: "",
      approvingOfficers: [],
    });
    setIsDialogOpen(true);
  };

  const handleEditApproval = (approval: VoucherApprovalSetup) => {
    setEditingApprovalId(approval.id);
    setFormData({
      department: approval.department,
      level: String(approval.level),
      approvingOfficers: approval.approvingOfficers || [],
    });
    setIsDialogOpen(true);
  };

  const handleDeleteApproval = (approval: VoucherApprovalSetup) => {
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
                department: formData.department,
                level: Number(formData.level),
                approvingOfficers: formData.approvingOfficers,
              }
            : approval,
        ),
      );
    } else {
      const newApproval: VoucherApprovalSetup = {
        id: String(Date.now()),
        department: formData.department,
        level: Number(formData.level),
        approvingOfficers: formData.approvingOfficers,
      };

      setApprovals((prevApprovals) => [newApproval, ...prevApprovals]);
    }

    setIsDialogOpen(false);
    setEditingApprovalId(null);
    setFormData({
      department: "",
      level: "",
      approvingOfficers: [],
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
