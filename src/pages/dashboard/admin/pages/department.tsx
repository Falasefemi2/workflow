import { useState } from "react";
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

interface Department {
  id: string;
  name: string;
  code: string;
  hodId?: string;
}

interface HODOption {
  id: string;
  name: string;
  email: string;
}

const mockHODs: HODOption[] = [
  { id: "hod-1", name: "John Doe", email: "john@example.com" },
  { id: "hod-2", name: "Jane Smith", email: "jane@example.com" },
  { id: "hod-3", name: "Mike Johnson", email: "mike@example.com" },
  { id: "hod-4", name: "Sarah Williams", email: "sarah@example.com" },
  { id: "hod-5", name: "Robert Brown", email: "robert@example.com" },
];

const mockDepartmens: Department[] = [
  {
    id: "1",
    name: "Business process & product decelopment",
    code: "021",
    hodId: "hod-1",
  },
  { id: "2", name: "Human Capital", code: "021", hodId: "hod-2" },
  { id: "3", name: "Product", code: "021", hodId: "hod-3" },
  { id: "4", name: "Customer Support", code: "021", hodId: "hod-4" },
  { id: "5", name: "Technology", code: "021", hodId: "hod-5" },
  { id: "6", name: "Admin", code: "021" },
];

export default function DepartmentManagementPage() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartmens);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDepartmentId, setEditingDepartmentId] = useState<string | null>(
    null,
  );
  const [departmentToDelete, setDepartmentToDelete] =
    useState<Department | null>(null);
  const [formData, setFormData] = useState({ name: "", code: "", hodId: "" });
  const isEditMode = editingDepartmentId !== null;
  const departmentModalText = isEditMode ? "Edit Department" : "Add Department";

  const handleAddDepartment = () => {
    setEditingDepartmentId(null);
    setFormData({ name: "", code: "", hodId: "" });
    setIsDialogOpen(true);
  };

  const handleEditDepartment = (department: Department) => {
    setEditingDepartmentId(department.id);
    setFormData({
      name: department.name,
      code: department.code,
      hodId: department.hodId || "",
    });
    setIsDialogOpen(true);
  };

  const handleDeleteDepartment = (department: Department) => {
    setDepartmentToDelete(department);
  };

  const handleConfirmDelete = () => {
    if (!departmentToDelete) {
      return;
    }

    setDepartments((prevDepartments) =>
      prevDepartments.filter((d) => d.id !== departmentToDelete.id),
    );
    setDepartmentToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      setDepartments((prevDepartments) =>
        prevDepartments.map((department) =>
          department.id === editingDepartmentId
            ? {
                ...department,
                name: formData.name,
                code: formData.code,
                hodId: formData.hodId,
              }
            : department,
        ),
      );
    } else {
      const newDepartment: Department = {
        id: String(Date.now()),
        name: formData.name,
        code: formData.code,
        hodId: formData.hodId,
      };

      setDepartments((prevDepartments) => [newDepartment, ...prevDepartments]);
    }

    setIsDialogOpen(false);
    setEditingDepartmentId(null);
    setFormData({ name: "", code: "", hodId: "" });
  };

  const getHODName = (hodId?: string) => {
    if (!hodId) return "N/A";
    return mockHODs.find((hod) => hod.id === hodId)?.name || "N/A";
  };

  return (
    <div className="pb-12">
      <PageHeader
        title="Department Management"
        backTo="/dashboard/admin/system"
        actionLabel="Add New Department"
        onActionClick={handleAddDepartment}
      />

      <div className="mt-8">
        <DataTable<Department>
          columns={[
            { key: "name", label: "Department name" },
            { key: "code", label: "code" },
            {
              key: "hodId",
              label: "Head of Department",
              render: (value) => getHODName(value),
            },
          ]}
          data={departments}
          onEdit={handleEditDepartment}
          onDelete={handleDeleteDepartment}
          totalEntries={departments.length}
        />
      </div>

      <FormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingDepartmentId(null);
        }}
        title={departmentModalText}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Department Name" required>
            <Input
              placeholder="Enter department name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormField>

          <FormField label="Department Code" required>
            <Input
              placeholder="Enter department code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
          </FormField>

          <FormField label="Assign HOD">
            <Select
              value={formData.hodId}
              onValueChange={(value) =>
                setFormData({ ...formData, hodId: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Head of Department" />
              </SelectTrigger>
              <SelectContent>
                {mockHODs.map((hod) => (
                  <SelectItem key={hod.id} value={hod.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{hod.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {hod.email}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              {departmentModalText}
            </Button>
          </div>
        </form>
      </FormDialog>

      <DeleteConfirmDialog
        isOpen={departmentToDelete !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDepartmentToDelete(null);
          }
        }}
        title="Delete Department"
        description={`Are you sure you want to delete "${departmentToDelete?.name ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete Department"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
