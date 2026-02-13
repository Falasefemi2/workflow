import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [formData, setFormData] = useState({ name: "", description: "" });

  // Handle Add/Edit
  const handleAddRole = () => {
    setFormData({ name: "", description: "" });
    setIsDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setFormData({ name: role.name, description: role.description });
    setIsDialogOpen(true);
  };

  const handleDeleteRole = (role: Role) => {
    setRoles(roles.filter((r) => r.id !== role.id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add new role or update existing
    console.log("Submitting:", formData);
    setIsDialogOpen(false);
    setFormData({ name: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 lg:p-20">
      {/* Header */}
      <PageHeader
        title="Role Management"
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
        onClose={() => setIsDialogOpen(false)}
        title="Add New Role"
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
            <textarea
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
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Save Role
            </Button>
          </div>
        </form>
      </FormDialog>
    </div>
  );
}
