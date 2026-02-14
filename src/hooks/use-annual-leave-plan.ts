import { useState } from "react";
import {
  mockAnnualLeavePlans,
  type AnnualLeavePlan,
} from "@/components/mockData";

export interface AnnualLeavePlanFormData {
  periodTitle: string;
  startDate: string;
  endDate: string;
}

export function useAnnualLeavePlanManagement() {
  const [annualLeavePlans, setAnnualLeavePlans] =
    useState<AnnualLeavePlan[]>(mockAnnualLeavePlans);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [planToDelete, setPlanToDelete] = useState<AnnualLeavePlan | null>(
    null,
  );
  const [formData, setFormData] = useState<AnnualLeavePlanFormData>({
    periodTitle: "",
    startDate: "",
    endDate: "",
  });

  const isEditMode = editingPlanId !== null;
  const modalText = isEditMode
    ? "Edit Annual Leave Planning"
    : "Add New Annual Leave Planning";

  const handleAddPlan = () => {
    setEditingPlanId(null);
    setFormData({
      periodTitle: "",
      startDate: "",
      endDate: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditPlan = (plan: AnnualLeavePlan) => {
    setEditingPlanId(plan.id);
    setFormData({
      periodTitle: plan.periodTitle,
      startDate: plan.startDate,
      endDate: plan.endDate,
    });
    setIsDialogOpen(true);
  };

  const handleDeletePlan = (plan: AnnualLeavePlan) => {
    setPlanToDelete(plan);
  };

  const handleConfirmDelete = () => {
    if (!planToDelete) {
      return;
    }

    setAnnualLeavePlans((prevPlans) =>
      prevPlans.filter((p) => p.id !== planToDelete.id),
    );
    setPlanToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.periodTitle || !formData.startDate || !formData.endDate) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate end date is after start date
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      alert("End date must be after start date");
      return;
    }

    if (isEditMode) {
      setAnnualLeavePlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === editingPlanId
            ? {
                ...plan,
                periodTitle: formData.periodTitle,
                startDate: formData.startDate,
                endDate: formData.endDate,
              }
            : plan,
        ),
      );
    } else {
      const newPlan: AnnualLeavePlan = {
        id: String(Date.now()),
        periodTitle: formData.periodTitle,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      setAnnualLeavePlans((prevPlans) => [newPlan, ...prevPlans]);
    }

    setIsDialogOpen(false);
    setEditingPlanId(null);
    setFormData({
      periodTitle: "",
      startDate: "",
      endDate: "",
    });
  };

  return {
    // State
    annualLeavePlans,
    isDialogOpen,
    editingPlanId,
    planToDelete,
    formData,
    isEditMode,
    modalText,
    // Handlers
    handleAddPlan,
    handleEditPlan,
    handleDeletePlan,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setPlanToDelete,
  };
}
