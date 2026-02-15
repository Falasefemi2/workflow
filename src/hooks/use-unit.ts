import { useState } from "react";
import { mockUnits, type Unit } from "@/components/mockData";

export interface UnitFormData {
  name: string;
  department: string;
}

export interface AssignLevelFormData {
  selectedLevels: string[];
}

export function useUnitManagement() {
  const [units, setUnits] = useState<Unit[]>(mockUnits);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignLevelDialogOpen, setIsAssignLevelDialogOpen] = useState(false);
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
  const [assigningUnitId, setAssigningUnitId] = useState<string | null>(null);
  const [unitToDelete, setUnitToDelete] = useState<Unit | null>(null);
  const [formData, setFormData] = useState<UnitFormData>({
    name: "",
    department: "",
  });
  const [assignLevelFormData, setAssignLevelFormData] =
    useState<AssignLevelFormData>({
      selectedLevels: [],
    });

  const isEditMode = editingUnitId !== null;
  const modalText = isEditMode ? "Edit Unit" : "Add New Unit";

  const handleAddUnit = () => {
    setEditingUnitId(null);
    setFormData({
      name: "",
      department: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditUnit = (unit: Unit) => {
    setEditingUnitId(unit.id);
    setFormData({
      name: unit.name,
      department: unit.department,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteUnit = (unit: Unit) => {
    setUnitToDelete(unit);
  };

  const handleConfirmDelete = () => {
    if (!unitToDelete) {
      return;
    }

    setUnits((prevUnits) => prevUnits.filter((u) => u.id !== unitToDelete.id));
    setUnitToDelete(null);
  };

  const handleAssignLevel = (unit: Unit) => {
    setAssigningUnitId(unit.id);
    setAssignLevelFormData({
      selectedLevels: unit.assignedLevels || [],
    });
    setIsAssignLevelDialogOpen(true);
  };

  const handleConfirmAssignLevel = () => {
    if (!assigningUnitId) {
      return;
    }

    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === assigningUnitId
          ? {
              ...unit,
              assignedLevels: assignLevelFormData.selectedLevels,
            }
          : unit,
      ),
    );

    setIsAssignLevelDialogOpen(false);
    setAssigningUnitId(null);
    setAssignLevelFormData({
      selectedLevels: [],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.department) {
      alert("Please fill in all required fields");
      return;
    }

    if (isEditMode) {
      setUnits((prevUnits) =>
        prevUnits.map((unit) =>
          unit.id === editingUnitId
            ? {
                ...unit,
                name: formData.name,
                department: formData.department,
              }
            : unit,
        ),
      );
    } else {
      const newUnit: Unit = {
        id: String(Date.now()),
        name: formData.name,
        department: formData.department,
        assignedLevels: [],
      };

      setUnits((prevUnits) => [newUnit, ...prevUnits]);
    }

    setIsDialogOpen(false);
    setEditingUnitId(null);
    setFormData({
      name: "",
      department: "",
    });
  };

  return {
    // State
    units,
    isDialogOpen,
    isAssignLevelDialogOpen,
    editingUnitId,
    assigningUnitId,
    unitToDelete,
    formData,
    assignLevelFormData,
    isEditMode,
    modalText,
    // Handlers
    handleAddUnit,
    handleEditUnit,
    handleDeleteUnit,
    handleConfirmDelete,
    handleAssignLevel,
    handleConfirmAssignLevel,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setIsAssignLevelDialogOpen,
    setUnitToDelete,
    setAssignLevelFormData,
  };
}
