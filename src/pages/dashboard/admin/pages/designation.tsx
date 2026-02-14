import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";

interface Designation {
  id: string;
  name: string;
  code: string;
  departmentId?: string;
}

interface DepartmentOption {
  id: string;
  name: string;
  code: string;
}

const mockDepartmentOptions: DepartmentOption[] = [
  {
    id: "dept-1",
    name: "Business process & product development",
    code: "BP001",
  },
  { id: "dept-2", name: "Human Capital", code: "HC001" },
  { id: "dept-3", name: "Product", code: "PRD001" },
  { id: "dept-4", name: "Customer Support", code: "CS001" },
  { id: "dept-5", name: "Technology", code: "TECH001" },
  { id: "dept-6", name: "Admin", code: "ADM001" },
];

const mockDesignations: Designation[] = [
  {
    id: "des-1",
    name: "Product Manager",
    code: "PM001",
    departmentId: "dept-3",
  },
  {
    id: "des-2",
    name: "HR Manager",
    code: "HRM001",
    departmentId: "dept-2",
  },
  {
    id: "des-3",
    name: "Senior Developer",
    code: "SD001",
    departmentId: "dept-5",
  },
  {
    id: "des-4",
    name: "QA Engineer",
    code: "QA001",
    departmentId: "dept-5",
  },
  {
    id: "des-5",
    name: "Support Specialist",
    code: "SS001",
    departmentId: "dept-4",
  },
  {
    id: "des-6",
    name: "Business Analyst",
    code: "BA001",
    departmentId: "dept-1",
  },
  {
    id: "des-7",
    name: "UI/UX Designer",
    code: "UX001",
    departmentId: "dept-1",
  },
  {
    id: "des-8",
    name: "Admin Officer",
    code: "AO001",
    departmentId: "dept-6",
  },
];

export default function DesignationManagementPage() {
  const [designations, setDesignations] =
    useState<Designation[]>(mockDesignations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDesignationId, setEditingDesignationId] = useState<
    string | null
  >(null);
  const [designationToDelete, setDesignationToDelete] =
    useState<Designation | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    departmentId: "",
  });

  const isEditMode = editingDesignationId !== null;
  const designationModalText = isEditMode
    ? "Edit Designation"
    : "Add Designation";

  const handleAddDesignation = () => {
    setEditingDesignationId(null);
    setFormData({ name: "", code: "", departmentId: "" });
    setIsDialogOpen(true);
  };

  const handleEditDesignation = (designation: Designation) => {
    setEditingDesignationId(designation.id);
    setFormData({
      name: designation.name,
      code: designation.code,
      departmentId: designation.departmentId || "",
    });
    setIsDialogOpen(true);
  };

  const handleDeleteDesignation = (designation: Designation) => {
    setDesignationToDelete(designation);
  };

  const handleConfirmDelete = () => {
    if (!designationToDelete) {
      return;
    }

    setDesignations((prevDesignations) =>
      prevDesignations.filter((d) => d.id !== designationToDelete.id),
    );
    setDesignationToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      setDesignations((prevDesignations) =>
        prevDesignations.map((designation) =>
          designation.id === editingDesignationId
            ? {
                ...designation,
                name: formData.name,
                code: formData.code,
                departmentId: formData.departmentId,
              }
            : designation,
        ),
      );
    } else {
      const newDesignation: Designation = {
        id: String(Date.now()),
        name: formData.name,
        code: formData.code,
        departmentId: formData.departmentId,
      };

      setDesignations((prevDesignations) => [
        newDesignation,
        ...prevDesignations,
      ]);
    }

    setIsDialogOpen(false);
    setEditingDesignationId(null);
    setFormData({ name: "", code: "", departmentId: "" });
  };

  const getDepartmentName = (departmentId?: string) => {
    if (!departmentId) return "N/A";
    return (
      mockDepartmentOptions.find((dept) => dept.id === departmentId)?.name ||
      "N/A"
    );
  };
  return (
    <div className="pb-12">
      <PageHeader
        title="Designation Management"
        backTo="/dashboard/admin/system"
        actionLabel="Add New Designation"
        onActionClick={handleAddDesignation}
      />

      <div className="mt-8">
        <DataTable<Designation>
          columns={[
            { key: "name", label: "Designation name" },
            { key: "code", label: "code" },
            {
              key: "departmentId",
              label: "Department",
              render: (value) => getDepartmentName(value),
            },
          ]}
          data={designations}
          onEdit={handleEditDesignation}
          onDelete={handleDeleteDesignation}
          totalEntries={designations.length}
        />
      </div>

      <FormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingDesignationId(null);
        }}
        title={designationModalText}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Designation Name" required>
            <Input
              placeholder="Enter designation name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormField>

          <FormField label="Designation Code" required>
            <Input
              placeholder="Enter designation code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
          </FormField>

          <FormField label="Department Name">
            <Select
              value={formData.departmentId}
              onValueChange={(value) =>
                setFormData({ ...formData, departmentId: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="deparment" />
              </SelectTrigger>
              <SelectContent>
                {mockDepartmentOptions.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{dept.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {dept.code}
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
              {designationModalText}
            </Button>
          </div>
        </form>
      </FormDialog>

      <DeleteConfirmDialog
        isOpen={designationToDelete !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDesignationToDelete(null);
          }
        }}
        title="Delete Designation"
        description={`Are you sure you want to delete "${designationToDelete?.name ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete Designation"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
