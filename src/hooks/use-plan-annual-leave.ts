import { useState } from "react";
import {
  mockPlanAnnualLeaves,
  type PlanAnnualLeave,
} from "@/components/mockData";

export interface AnnualLeavePlanRecord {
  id: string;
  leaveType: string;
  numberOfDays: number;
  comments: string;
  commencementDate: string;
  contactAddressOnLeave: string;
  collectLeaveAllowance: "Yes" | "No";
}

export interface AnnualLeavePlanFormData {
  leaveType: string;
  numberOfDays: string;
  comments: string;
  commencementDate: string;
  contactAddressOnLeave: string;
  collectLeaveAllowance: "Yes" | "No";
}

const defaultFormData: AnnualLeavePlanFormData = {
  leaveType: "",
  numberOfDays: "",
  comments: "",
  commencementDate: "",
  contactAddressOnLeave: "",
  collectLeaveAllowance: "No",
};

const toAnnualLeavePlanRecord = (plan: PlanAnnualLeave): AnnualLeavePlanRecord => ({
  id: String(plan.id),
  leaveType: "Annual Leave",
  numberOfDays: plan.daysApplied,
  comments: "",
  commencementDate: plan.commencementDate,
  contactAddressOnLeave: "",
  collectLeaveAllowance: "No",
});

export function usePlanAnnualLeaveManagement() {
  const [leaveRecords, setLeaveRecords] = useState<AnnualLeavePlanRecord[]>(
    mockPlanAnnualLeaves.map(toAnnualLeavePlanRecord),
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [leaveToDelete, setLeaveToDelete] = useState<AnnualLeavePlanRecord | null>(
    null,
  );
  const [formData, setFormData] =
    useState<AnnualLeavePlanFormData>(defaultFormData);

  const resetDialog = () => {
    setFormData(defaultFormData);
    setEditingRecordId(null);
    setIsDialogOpen(false);
  };

  const handleAddLeave = () => {
    setFormData(defaultFormData);
    setEditingRecordId(null);
    setIsDialogOpen(true);
  };

  const handleEditLeave = (row: AnnualLeavePlanRecord) => {
    setEditingRecordId(row.id);
    setFormData({
      leaveType: row.leaveType,
      numberOfDays: String(row.numberOfDays),
      comments: row.comments,
      commencementDate: row.commencementDate,
      contactAddressOnLeave: row.contactAddressOnLeave,
      collectLeaveAllowance: row.collectLeaveAllowance,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteLeave = (row: AnnualLeavePlanRecord) => {
    setLeaveToDelete(row);
  };

  const handleConfirmDelete = () => {
    if (!leaveToDelete) {
      return;
    }

    setLeaveRecords((previousRecords) =>
      previousRecords.filter((record) => record.id !== leaveToDelete.id),
    );
    setLeaveToDelete(null);
  };

  const handleSubmitLeave = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !formData.leaveType ||
      !formData.numberOfDays ||
      !formData.comments ||
      !formData.commencementDate ||
      !formData.contactAddressOnLeave
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (Number(formData.numberOfDays) <= 0) {
      alert("Number of days must be greater than 0");
      return;
    }

    const record: AnnualLeavePlanRecord = {
      id: editingRecordId ?? String(Date.now()),
      leaveType: formData.leaveType,
      numberOfDays: Number(formData.numberOfDays),
      comments: formData.comments,
      commencementDate: formData.commencementDate,
      contactAddressOnLeave: formData.contactAddressOnLeave,
      collectLeaveAllowance: formData.collectLeaveAllowance,
    };

    setLeaveRecords((previousRecords) => {
      if (editingRecordId) {
        return previousRecords.map((item) =>
          item.id === editingRecordId ? record : item,
        );
      }

      return [record, ...previousRecords];
    });

    resetDialog();
  };

  const dialogTitle = editingRecordId
    ? "Edit Annual Leave Plan"
    : "Add Annual Leave Plan";

  return {
    leaveRecords,
    formData,
    isDialogOpen,
    editingRecordId,
    dialogTitle,
    handleAddLeave,
    handleEditLeave,
    handleDeleteLeave,
    handleConfirmDelete,
    handleSubmitLeave,
    handleCloseDialog: resetDialog,
    leaveToDelete,
    setLeaveToDelete,
    setFormData,
  };
}
