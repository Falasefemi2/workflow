import { useState } from "react";
import { mockLeaveTypes, type LeaveType } from "@/components/mockData";

export interface LeaveTypeFormData {
  name: string;
  description: string;
  days: string;
}

export function useLeaveTypeManagement() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(mockLeaveTypes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLeaveTypeId, setEditingLeaveTypeId] = useState<string | null>(
    null,
  );
  const [leaveTypeToDelete, setLeaveTypeToDelete] = useState<LeaveType | null>(
    null,
  );
  const [formData, setFormData] = useState<LeaveTypeFormData>({
    name: "",
    description: "",
    days: "",
  });

  const isEditMode = editingLeaveTypeId !== null;
  const modalText = isEditMode ? "Edit Leave Type" : "Add New Leave Type";

  const handleAddLeaveType = () => {
    setEditingLeaveTypeId(null);
    setFormData({
      name: "",
      description: "",
      days: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditLeaveType = (leaveType: LeaveType) => {
    setEditingLeaveTypeId(leaveType.id);
    setFormData({
      name: leaveType.name,
      description: leaveType.description,
      days: String(leaveType.days),
    });
    setIsDialogOpen(true);
  };

  const handleDeleteLeaveType = (leaveType: LeaveType) => {
    setLeaveTypeToDelete(leaveType);
  };

  const handleConfirmDelete = () => {
    if (!leaveTypeToDelete) {
      return;
    }

    setLeaveTypes((prevLeaveTypes) =>
      prevLeaveTypes.filter((lt) => lt.id !== leaveTypeToDelete.id),
    );
    setLeaveTypeToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.days) {
      alert("Please fill in all required fields");
      return;
    }

    if (isEditMode) {
      setLeaveTypes((prevLeaveTypes) =>
        prevLeaveTypes.map((leaveType) =>
          leaveType.id === editingLeaveTypeId
            ? {
                ...leaveType,
                name: formData.name,
                description: formData.description,
                days: Number(formData.days),
              }
            : leaveType,
        ),
      );
    } else {
      const newLeaveType: LeaveType = {
        id: String(Date.now()),
        name: formData.name,
        description: formData.description,
        days: Number(formData.days),
      };

      setLeaveTypes((prevLeaveTypes) => [newLeaveType, ...prevLeaveTypes]);
    }

    setIsDialogOpen(false);
    setEditingLeaveTypeId(null);
    setFormData({
      name: "",
      description: "",
      days: "",
    });
  };

  return {
    // State
    leaveTypes,
    isDialogOpen,
    editingLeaveTypeId,
    leaveTypeToDelete,
    formData,
    isEditMode,
    modalText,
    // Handlers
    handleAddLeaveType,
    handleEditLeaveType,
    handleDeleteLeaveType,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setLeaveTypeToDelete,
  };
}
