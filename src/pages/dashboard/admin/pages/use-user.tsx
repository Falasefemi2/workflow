import { useState } from "react";
import { mockUsers, type User } from "@/components/mockData";

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  subsidiary: string;
  designation: string;
  employmentType: string;
  status: string;
  role: string;
}

export function useUserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    subsidiary: "",
    designation: "",
    employmentType: "",
    status: "",
    role: "",
  });

  const isEditMode = editingUserId !== null;
  const modalText = isEditMode ? "Edit User" : "Add New User";

  const handleAddUser = () => {
    setEditingUserId(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      subsidiary: "",
      designation: "",
      employmentType: "",
      status: "",
      role: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUserId(user.id);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      subsidiary: user.subsidiary,
      designation: user.designation,
      employmentType: user.employmentType,
      status: user.status,
      role: "", // Role is not in User interface but kept for form
    });
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) {
      return;
    }

    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userToDelete.id));
    setUserToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId
            ? {
                ...user,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                gender: formData.gender,
                subsidiary: formData.subsidiary,
                designation: formData.designation,
                employmentType: formData.employmentType,
                status: formData.status,
              }
            : user,
        ),
      );
    } else {
      const newUser: User = {
        id: String(Date.now()),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        gender: formData.gender,
        subsidiary: formData.subsidiary,
        designation: formData.designation,
        employmentType: formData.employmentType,
        status: formData.status,
      };

      setUsers((prevUsers) => [newUser, ...prevUsers]);
    }

    setIsDialogOpen(false);
    setEditingUserId(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      subsidiary: "",
      designation: "",
      employmentType: "",
      status: "",
      role: "",
    });
  };

  return {
    // State
    users,
    isDialogOpen,
    editingUserId,
    userToDelete,
    formData,
    isEditMode,
    modalText,
    // Handlers
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setUserToDelete,
  };
}
