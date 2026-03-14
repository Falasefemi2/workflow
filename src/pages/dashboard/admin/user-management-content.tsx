import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUserManagement } from "@/hooks/use-user";
import {
    mockDesignationOptions,
    mockEmploymentTypeOptions,
    mockGenderOptions,
    mockRoleOptions,
    mockStatusOptions,
    mockSubsidiaryOptions,
    type User,
} from "@/components/mockData";
import { useCreateUser, useGetUsers } from "../../../../api/user/user.queries";
import type { CreateUserPayload, User as ApiUser } from "../../../../api/user/user.types";

export default function UserManagementPage() {
    const { mutate } = useCreateUser();
    const { data: usersResponse = { data: [] } } = useGetUsers({ offset: 1, limit: 50 });
    const apiUsers: ApiUser[] = usersResponse.data || [];
    const users: User[] = apiUsers.map((user) => ({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        gender: "", // API doesn't have gender
        subsidiary: "", // API doesn't have subsidiary
        designation: "", // API doesn't have designation
        employmentType: "", // API doesn't have employmentType
        status: user.status || "Active", // Use status if available
    }));
    console.log({ users });
    const {
        isDialogOpen,
        userToDelete,
        formData,
        modalText,
        handleAddUser,
        handleEditUser,
        handleDeleteUser,
        handleConfirmDelete,
        setFormData,
        setIsDialogOpen,
        setUserToDelete,
    } = useUserManagement();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (modalText === "Add New User") {
            const payload: CreateUserPayload = {
                email: formData.email,
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone: formData.phone,
                user_type: formData.role as "admin" | "hr" | "employee" | "candidate",
            };
            mutate(payload, {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    // Optionally refetch users or show success message
                },
                onError: (error) => {
                    console.error("Error creating user:", error);
                    // Handle error, maybe show toast
                },
            });
        } else {
            // Handle edit if needed, but for now, just close
            setIsDialogOpen(false);
        }
    };

    return (
        <div className="pb-12">
            <PageHeader
                title="User Management"
                backTo="/dashboard/admin"
                actionLabel="Add New User"
                onActionClick={handleAddUser}
            />

            {/* Table */}
            <div className="mt-8">
                <DataTable<User>
                    columns={[
                        {
                            key: "firstName",
                            label: "First Name",
                        },
                        {
                            key: "lastName",
                            label: "Last Name",
                        },
                        {
                            key: "email",
                            label: "Email",
                        },
                        {
                            key: "gender",
                            label: "Gender",
                        },
                        {
                            key: "subsidiary",
                            label: "Subsidiary",
                        },
                        {
                            key: "designation",
                            label: "Designation",
                        },
                        {
                            key: "employmentType",
                            label: "Employment Type",
                        },
                        {
                            key: "status",
                            label: "Status",
                        },
                    ]}
                    data={users}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                    totalEntries={users.length}
                />
            </div>

            {/* Form Dialog */}
            <FormDialog
                isOpen={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false);
                }}
                title={modalText}
            >
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 max-h-[70vh] overflow-y-auto pr-4"
                >
                    {/* First Name */}
                    <FormField label="First Name" required>
                        <Input
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({ ...formData, firstName: e.target.value })
                            }
                        />
                    </FormField>

                    {/* Last Name */}
                    <FormField label="Last Name" required>
                        <Input
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({ ...formData, lastName: e.target.value })
                            }
                        />
                    </FormField>

                    {/* Email Address */}
                    <FormField label="Email Address" required>
                        <Input
                            type="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                    </FormField>

                    {/* Phone Number */}
                    <FormField label="Phone Number" required>
                        <Input
                            type="tel"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                        />
                    </FormField>

                    {/* User Role */}
                    <FormField label="User Role" required>
                        <Select
                            value={formData.role}
                            onValueChange={(value) =>
                                setFormData({ ...formData, role: value })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="--Select role--" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockRoleOptions.map((option) => (
                                    <SelectItem key={option.id} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>

                    {/* Gender */}
                    <FormField label="Gender">
                        <Select
                            value={formData.gender}
                            onValueChange={(value) =>
                                setFormData({ ...formData, gender: value })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="--Select gender--" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockGenderOptions.map((option) => (
                                    <SelectItem key={option.id} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>

                    {/* Subsidiary */}
                    <FormField label="Subsidiary">
                        <Select
                            value={formData.subsidiary}
                            onValueChange={(value) =>
                                setFormData({ ...formData, subsidiary: value })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="--Select subsidiary--" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockSubsidiaryOptions.map((option) => (
                                    <SelectItem key={option.id} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>

                    {/* Designation */}
                    <FormField label="Designation">
                        <Select
                            value={formData.designation}
                            onValueChange={(value) =>
                                setFormData({ ...formData, designation: value })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="--Select designation--" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockDesignationOptions.map((option) => (
                                    <SelectItem key={option.id} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>

                    {/* Employment Type */}
                    <FormField label="Employment Type">
                        <Select
                            value={formData.employmentType}
                            onValueChange={(value) =>
                                setFormData({ ...formData, employmentType: value })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="--Select employment type--" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockEmploymentTypeOptions.map((option) => (
                                    <SelectItem key={option.id} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>

                    {/* Status */}
                    <FormField label="Status">
                        <Select
                            value={formData.status}
                            onValueChange={(value) =>
                                setFormData({ ...formData, status: value })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="--Select status--" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockStatusOptions.map((option) => (
                                    <SelectItem key={option.id} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 justify-end pt-6 border-t border-border/30">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-primary">
                            {modalText.includes("Edit") ? "Update User" : "Add User"}
                        </Button>
                    </div>
                </form>
            </FormDialog>

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                isOpen={userToDelete !== null}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setUserToDelete(null);
                    }
                }}
                title="Delete User"
                description={`Are you sure you want to delete ${userToDelete?.firstName} ${userToDelete?.lastName}? This action cannot be undone.`}
                confirmLabel="Delete User"
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

