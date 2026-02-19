import { useState } from "react";
import {
  mockEmploymentReferences,
  type EmploymentReference,
} from "@/components/mockData";

export function useEmploymentReferenceManagement() {
  const [references, setReferences] = useState<EmploymentReference[]>(
    mockEmploymentReferences,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedReferenceForEdit, setSelectedReferenceForEdit] =
    useState<EmploymentReference | null>(null);
  const [editFormData, setEditFormData] = useState<EmploymentReference | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditRecord = (reference: EmploymentReference) => {
    setSelectedReferenceForEdit(reference);
    setEditFormData({ ...reference });
    setIsEditModalOpen(true);
  };

  const handleAddNewRecord = () => {
    setEditFormData({
      id: `er-${Date.now()}`,
      companyName: "",
      designation: "",
      periodOfWorkStart: "",
      periodOfWorkEnd: "",
      responsibilities: "",
      contactOfHOD: "",
      hodEmail: "",
      contactOfHR: "",
      hrEmail: "",
    });
    setIsAddModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedReferenceForEdit(null);
    setEditFormData(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setEditFormData(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editFormData) return;

    if (
      !editFormData.companyName ||
      !editFormData.designation ||
      !editFormData.periodOfWorkStart ||
      !editFormData.periodOfWorkEnd
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Update existing reference
      setReferences(
        references.map((ref) =>
          ref.id === editFormData.id ? editFormData : ref,
        ),
      );
      console.log("Employment reference updated:", editFormData);
      handleCloseEditModal();
      alert("Employment reference updated successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update employment reference");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveNew = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editFormData) return;

    if (
      !editFormData.companyName ||
      !editFormData.designation ||
      !editFormData.periodOfWorkStart ||
      !editFormData.periodOfWorkEnd
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Add new reference
      setReferences([...references, editFormData]);
      console.log("New employment reference added:", editFormData);
      handleCloseAddModal();
      alert("Employment reference added successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to add employment reference");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    references,
    isEditModalOpen,
    isAddModalOpen,
    selectedReferenceForEdit,
    editFormData,
    isSubmitting,
    // Handlers
    handleEditRecord,
    handleAddNewRecord,
    handleCloseEditModal,
    handleCloseAddModal,
    handleSaveEdit,
    handleSaveNew,
    setEditFormData,
  };
}
