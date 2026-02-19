import { useState } from "react";
import { mockJobRoles, type JobRole } from "@/components/mockData";

export interface JobRoleFormData {
  jobRole: string;
  department: string;
  unit: string;
}

export function useJobRoleManagement() {
  const [jobRoles, setJobRoles] = useState<JobRole[]>(mockJobRoles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJobRoleId, setEditingJobRoleId] = useState<string | null>(null);
  const [jobRoleToDelete, setJobRoleToDelete] = useState<JobRole | null>(null);
  const [formData, setFormData] = useState<JobRoleFormData>({
    jobRole: "",
    department: "",
    unit: "",
  });

  const isEditMode = editingJobRoleId !== null;
  const modalText = isEditMode ? "Edit Job Role" : "Add New Job Role";

  const handleAddJobRole = () => {
    setEditingJobRoleId(null);
    setFormData({
      jobRole: "",
      department: "",
      unit: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditJobRole = (jobRole: JobRole) => {
    setEditingJobRoleId(jobRole.id);
    setFormData({
      jobRole: jobRole.jobRole,
      department: jobRole.department,
      unit: jobRole.unit,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteJobRole = (jobRole: JobRole) => {
    setJobRoleToDelete(jobRole);
  };

  const handleConfirmDelete = () => {
    if (!jobRoleToDelete) {
      return;
    }

    setJobRoles((prevJobRoles) =>
      prevJobRoles.filter((jr) => jr.id !== jobRoleToDelete.id),
    );
    setJobRoleToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.jobRole || !formData.department || !formData.unit) {
      alert("Please fill in all required fields");
      return;
    }

    if (isEditMode) {
      setJobRoles((prevJobRoles) =>
        prevJobRoles.map((jobRole) =>
          jobRole.id === editingJobRoleId
            ? {
                ...jobRole,
                jobRole: formData.jobRole,
                department: formData.department,
                unit: formData.unit,
              }
            : jobRole,
        ),
      );
    } else {
      const newJobRole: JobRole = {
        id: String(Date.now()),
        jobRole: formData.jobRole,
        department: formData.department,
        unit: formData.unit,
      };

      setJobRoles((prevJobRoles) => [newJobRole, ...prevJobRoles]);
    }

    setIsDialogOpen(false);
    setEditingJobRoleId(null);
    setFormData({
      jobRole: "",
      department: "",
      unit: "",
    });
  };

  return {
    // State
    jobRoles,
    isDialogOpen,
    editingJobRoleId,
    jobRoleToDelete,
    formData,
    isEditMode,
    modalText,
    // Handlers
    handleAddJobRole,
    handleEditJobRole,
    handleDeleteJobRole,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setJobRoleToDelete,
  };
}
