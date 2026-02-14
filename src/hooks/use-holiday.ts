import { useState } from "react";
import { mockHolidays, type Holiday } from "@/components/mockData";

export interface HolidayFormData {
  title: string;
  startDate: string;
  endDate: string;
  sameDateEveryYear: boolean | "";
}

export function useHolidayManagement() {
  const [holidays, setHolidays] = useState<Holiday[]>(mockHolidays);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHolidayId, setEditingHolidayId] = useState<string | null>(null);
  const [formData, setFormData] = useState<HolidayFormData>({
    title: "",
    startDate: "",
    endDate: "",
    sameDateEveryYear: "",
  });

  const isEditMode = editingHolidayId !== null;
  const modalText = isEditMode ? "Edit Holiday" : "Add New Holiday";

  const handleAddHoliday = () => {
    setEditingHolidayId(null);
    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      sameDateEveryYear: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditHoliday = (holiday: Holiday) => {
    setEditingHolidayId(holiday.id);
    setFormData({
      title: holiday.title,
      startDate: holiday.startDate,
      endDate: holiday.endDate,
      sameDateEveryYear: holiday.sameDateEveryYear,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteHoliday = (holiday: Holiday) => {
    setHolidays((prevHolidays) =>
      prevHolidays.filter((h) => h.id !== holiday.id),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.startDate ||
      !formData.endDate ||
      formData.sameDateEveryYear === ""
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (isEditMode) {
      setHolidays((prevHolidays) =>
        prevHolidays.map((holiday) =>
          holiday.id === editingHolidayId
            ? {
                ...holiday,
                title: formData.title,
                startDate: formData.startDate,
                endDate: formData.endDate,
                sameDateEveryYear: formData.sameDateEveryYear as boolean,
              }
            : holiday,
        ),
      );
    } else {
      const newHoliday: Holiday = {
        id: String(Date.now()),
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        sameDateEveryYear: formData.sameDateEveryYear as boolean,
      };

      setHolidays((prevHolidays) => [newHoliday, ...prevHolidays]);
    }

    setIsDialogOpen(false);
    setEditingHolidayId(null);
    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      sameDateEveryYear: "",
    });
  };

  return {
    // State
    holidays,
    isDialogOpen,
    editingHolidayId,
    formData,
    isEditMode,
    modalText,
    // Handlers
    handleAddHoliday,
    handleEditHoliday,
    handleDeleteHoliday,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
  };
}
