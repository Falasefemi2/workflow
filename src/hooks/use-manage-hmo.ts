import { useState } from "react";
import { mockManageHMOs, type ManageHMO } from "@/components/mockData";

export interface ManageHMOFormData {
  hmoName: string;
  newEntrantForm: File | null;
  existingEmployeeForm: File | null;
}

export function useManageHMOManagement() {
  const [manageHMOs, setManageHMOs] = useState<ManageHMO[]>(mockManageHMOs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHMOId, setEditingHMOId] = useState<string | null>(null);
  const [hmoToDelete, setHMOToDelete] = useState<ManageHMO | null>(null);
  const [formData, setFormData] = useState<ManageHMOFormData>({
    hmoName: "",
    newEntrantForm: null,
    existingEmployeeForm: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = editingHMOId !== null;
  const modalText = isEditMode ? "Edit HMO" : "Add New HMO";

  const handleAddHMO = () => {
    setEditingHMOId(null);
    setFormData({
      hmoName: "",
      newEntrantForm: null,
      existingEmployeeForm: null,
    });
    setIsDialogOpen(true);
  };

  const handleEditHMO = (hmo: ManageHMO) => {
    setEditingHMOId(hmo.id);
    setFormData({
      hmoName: hmo.hmoName,
      newEntrantForm: null,
      existingEmployeeForm: null,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteHMO = (hmo: ManageHMO) => {
    setHMOToDelete(hmo);
  };

  const handleConfirmDelete = () => {
    if (!hmoToDelete) {
      return;
    }

    setManageHMOs((prevHMOs) =>
      prevHMOs.filter((h) => h.id !== hmoToDelete.id),
    );
    setHMOToDelete(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.hmoName ||
      !formData.newEntrantForm ||
      !formData.existingEmployeeForm
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const { hmoName, newEntrantForm, existingEmployeeForm } = formData;

    setIsSubmitting(true);

    try {
      if (isEditMode && editingHMOId) {
        setManageHMOs((prevHMOs) =>
          prevHMOs.map((hmo) =>
            hmo.id === editingHMOId
              ? {
                  ...hmo,
                  hmoName,
                  newEntrantFormPath: `/documents/${newEntrantForm.name}`,
                  newEntrantFileName: newEntrantForm.name,
                  existingEmployeeFormPath: `/documents/${existingEmployeeForm.name}`,
                  existingEmployeeFileName: existingEmployeeForm.name,
                }
              : hmo,
          ),
        );
      } else {
        const newHMO: ManageHMO = {
          id: String(Date.now()),
          hmoName,
          newEntrantFormPath: `/documents/${newEntrantForm.name}`,
          newEntrantFileName: newEntrantForm.name,
          existingEmployeeFormPath: `/documents/${existingEmployeeForm.name}`,
          existingEmployeeFileName: existingEmployeeForm.name,
        };

        setManageHMOs((prevHMOs) => [newHMO, ...prevHMOs]);
      }

      setIsDialogOpen(false);
      setEditingHMOId(null);
      setFormData({
        hmoName: "",
        newEntrantForm: null,
        existingEmployeeForm: null,
      });
    } catch (error) {
      console.error("Error saving HMO:", error);
      alert("Failed to save HMO");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    manageHMOs,
    isDialogOpen,
    editingHMOId,
    hmoToDelete,
    formData,
    isEditMode,
    isSubmitting,
    modalText,
    // Handlers
    handleAddHMO,
    handleEditHMO,
    handleDeleteHMO,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setHMOToDelete,
  };
}
