import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Role {
  id: string;
  name: string;
  description: string;
}

const mockRoles: Role[] = [
  { id: "1", name: "Admin", description: "Admin" },
  { id: "2", name: "HR", description: "Human capital manager" },
  { id: "3", name: "UI/UX Designer", description: "User Experience Designers" },
  { id: "4", name: "Front-end", description: "N/A" },
  { id: "5", name: "Back-end", description: "N/A" },
  { id: "6", name: "Quality Assurance", description: "N/A" },
];

export default function RoleManagementPage() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const isEditMode = editingRoleId !== null;
  const roleModalText = isEditMode ? "Edit Role" : "Add Role";

  // Handle Add/Edit
  const handleAddRole = () => {
    setEditingRoleId(null);
    setFormData({ name: "", description: "" });
    setIsDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRoleId(role.id);
    setFormData({ name: role.name, description: role.description });
    setIsDialogOpen(true);
  };

  const handleDeleteRole = (role: Role) => {
    setRoleToDelete(role);
  };

  const handleConfirmDelete = () => {
    if (!roleToDelete) {
      return;
    }

    setRoles((prevRoles) => prevRoles.filter((r) => r.id !== roleToDelete.id));
    setRoleToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role.id === editingRoleId
            ? {
                ...role,
                name: formData.name,
                description: formData.description,
              }
            : role,
        ),
      );
    } else {
      const newRole: Role = {
        id: String(Date.now()),
        name: formData.name,
        description: formData.description,
      };

      setRoles((prevRoles) => [newRole, ...prevRoles]);
    }

    setIsDialogOpen(false);
    setEditingRoleId(null);
    setFormData({ name: "", description: "" });
  };

  return (
    <div className="pb-12">
      {/* Header */}
      <PageHeader
        title="Role Management"
        backTo="/dashboard/admin/system"
        actionLabel="Add New role"
        onActionClick={handleAddRole}
      />

      {/* Table */}
      <div className="mt-8">
        <DataTable<Role>
          columns={[
            { key: "name", label: "Role name" },
            { key: "description", label: "Description" },
          ]}
          data={roles}
          onEdit={handleEditRole}
          onDelete={handleDeleteRole}
          totalEntries={roles.length}
        />
      </div>

      {/* Form Dialog */}
      <FormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingRoleId(null);
        }}
        title={roleModalText}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Role Name" required>
            <Input
              placeholder="Enter role name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormField>

          <FormField label="Description" required>
            <Textarea
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
            />
          </FormField>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary">
              {roleModalText}
            </Button>
          </div>
        </form>
      </FormDialog>

      <DeleteConfirmDialog
        isOpen={roleToDelete !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setRoleToDelete(null);
          }
        }}
        title="Delete Role"
        description={`Are you sure you want to delete "${roleToDelete?.name ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete Role"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
