import { useState } from "react";
import { mockLeaves, type Level } from "@/components/mockData";

export interface LevelFormData {
  name: string;
  code: string;
  basicSalary: string;
  totalAnnualLeaveDays: string;
  annualLeaveDays: string;
  transportAllowance: string;
  minimumLeaveDays: string;
  domesticAllowance: string;
  utilityAllowance: string;
  leaveExpirationInterval: string;
  lunchSubsidy: string;
}

export function useLevelManagement() {
  const [levels, setLevels] = useState<Level[]>(mockLeaves);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLevelId, setEditingLevelId] = useState<string | null>(null);
  const [levelToDelete, setLevelToDelete] = useState<Level | null>(null);
  const [formData, setFormData] = useState<LevelFormData>({
    name: "",
    code: "",
    basicSalary: "",
    totalAnnualLeaveDays: "",
    annualLeaveDays: "",
    transportAllowance: "",
    minimumLeaveDays: "",
    domesticAllowance: "",
    utilityAllowance: "",
    leaveExpirationInterval: "",
    lunchSubsidy: "",
  });

  const isEditMode = editingLevelId !== null;
  const levelModalText = isEditMode ? "Edit Level" : "Add new Level";

  const handleAddLevel = () => {
    setEditingLevelId(null);
    setFormData({
      name: "",
      code: "",
      basicSalary: "",
      totalAnnualLeaveDays: "",
      annualLeaveDays: "",
      transportAllowance: "",
      minimumLeaveDays: "",
      domesticAllowance: "",
      utilityAllowance: "",
      leaveExpirationInterval: "",
      lunchSubsidy: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditLevel = (level: Level) => {
    setEditingLevelId(level.id);
    setFormData({
      name: level.name,
      code: level.code,
      basicSalary: String(level.basicSalary),
      totalAnnualLeaveDays: String(level.totalAnnualLeaveDays),
      annualLeaveDays: String(level.annualLeaveDays || ""),
      transportAllowance: String(level.transportAllowance || ""),
      minimumLeaveDays: String(level.minimumLeaveDays || ""),
      domesticAllowance: String(level.domesticAllowance || ""),
      utilityAllowance: String(level.utilityAllowance || ""),
      leaveExpirationInterval: String(level.leaveExpirationInterval || ""),
      lunchSubsidy: String(level.lunchSubsidy || ""),
    });
    setIsDialogOpen(true);
  };

  const handleDeleteLevel = (level: Level) => {
    setLevelToDelete(level);
  };

  const handleConfirmDelete = () => {
    if (!levelToDelete) {
      return;
    }

    setLevels((prevLevels) =>
      prevLevels.filter((l) => l.id !== levelToDelete.id),
    );
    setLevelToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      setLevels((prevLevels) =>
        prevLevels.map((level) =>
          level.id === editingLevelId
            ? {
                ...level,
                name: formData.name,
                code: formData.code,
                basicSalary: Number(formData.basicSalary),
                totalAnnualLeaveDays: Number(formData.totalAnnualLeaveDays),
                annualLeaveDays: Number(formData.annualLeaveDays) || undefined,
                transportAllowance:
                  Number(formData.transportAllowance) || undefined,
                minimumLeaveDays:
                  Number(formData.minimumLeaveDays) || undefined,
                domesticAllowance:
                  Number(formData.domesticAllowance) || undefined,
                utilityAllowance:
                  Number(formData.utilityAllowance) || undefined,
                leaveExpirationInterval:
                  Number(formData.leaveExpirationInterval) || undefined,
                lunchSubsidy: Number(formData.lunchSubsidy) || undefined,
              }
            : level,
        ),
      );
    } else {
      const newLevel: Level = {
        id: String(Date.now()),
        name: formData.name,
        code: formData.code,
        basicSalary: Number(formData.basicSalary),
        totalAnnualLeaveDays: Number(formData.totalAnnualLeaveDays),
        annualLeaveDays: Number(formData.annualLeaveDays) || undefined,
        transportAllowance: Number(formData.transportAllowance) || undefined,
        minimumLeaveDays: Number(formData.minimumLeaveDays) || undefined,
        domesticAllowance: Number(formData.domesticAllowance) || undefined,
        utilityAllowance: Number(formData.utilityAllowance) || undefined,
        leaveExpirationInterval:
          Number(formData.leaveExpirationInterval) || undefined,
        lunchSubsidy: Number(formData.lunchSubsidy) || undefined,
      };

      setLevels((prevLevels) => [newLevel, ...prevLevels]);
    }

    setIsDialogOpen(false);
    setEditingLevelId(null);
    setFormData({
      name: "",
      code: "",
      basicSalary: "",
      totalAnnualLeaveDays: "",
      annualLeaveDays: "",
      transportAllowance: "",
      minimumLeaveDays: "",
      domesticAllowance: "",
      utilityAllowance: "",
      leaveExpirationInterval: "",
      lunchSubsidy: "",
    });
  };

  return {
    // State
    levels,
    isDialogOpen,
    editingLevelId,
    levelToDelete,
    formData,
    isEditMode,
    levelModalText,
    // Handlers
    handleAddLevel,
    handleEditLevel,
    handleDeleteLevel,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setLevelToDelete,
  };
}
