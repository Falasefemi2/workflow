import { useState } from "react";
import { mockHMOSetups, type HMOSetup } from "@/components/mockData";

export interface HMOSetupFormData {
  employeeName: string;
  hmoServiceProvider: string;
  registrationDate: string;
}

export function useHMOSetupManagement() {
  const [hmoSetups, setHMOSetups] = useState<HMOSetup[]>(mockHMOSetups);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSetupId, setEditingSetupId] = useState<string | null>(null);
  const [setupToDelete, setSetupToDelete] = useState<HMOSetup | null>(null);
  const [formData, setFormData] = useState<HMOSetupFormData>({
    employeeName: "",
    hmoServiceProvider: "",
    registrationDate: "",
  });

  const isEditMode = editingSetupId !== null;
  const modalText = isEditMode ? "Edit" : "Add HMO Setup";

  const handleAddSetup = () => {
    setEditingSetupId(null);
    setFormData({
      employeeName: "",
      hmoServiceProvider: "",
      registrationDate: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditSetup = (setup: HMOSetup) => {
    setEditingSetupId(setup.id);
    setFormData({
      employeeName: setup.employeeName,
      hmoServiceProvider: setup.hmoServiceProvider,
      registrationDate: setup.registrationDate,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteSetup = (setup: HMOSetup) => {
    setSetupToDelete(setup);
  };

  const handleConfirmDelete = () => {
    if (!setupToDelete) {
      return;
    }

    setHMOSetups((prevSetups) =>
      prevSetups.filter((s) => s.id !== setupToDelete.id),
    );
    setSetupToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.employeeName ||
      !formData.hmoServiceProvider ||
      !formData.registrationDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (isEditMode) {
      setHMOSetups((prevSetups) =>
        prevSetups.map((setup) =>
          setup.id === editingSetupId
            ? {
                ...setup,
                employeeName: formData.employeeName,
                hmoServiceProvider: formData.hmoServiceProvider,
                registrationDate: formData.registrationDate,
              }
            : setup,
        ),
      );
    } else {
      const newSetup: HMOSetup = {
        id: String(Date.now()),
        employeeName: formData.employeeName,
        hmoServiceProvider: formData.hmoServiceProvider,
        registrationDate: formData.registrationDate,
      };

      setHMOSetups((prevSetups) => [newSetup, ...prevSetups]);
    }

    setIsDialogOpen(false);
    setEditingSetupId(null);
    setFormData({
      employeeName: "",
      hmoServiceProvider: "",
      registrationDate: "",
    });
  };

  return {
    // State
    hmoSetups,
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
