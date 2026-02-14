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
import { useJobRoleManagement } from "@/hooks/use-jobrole";
import {
  mockDepartmentOptions,
  mockUnitOptions,
  type JobRole,
} from "@/components/mockData";

export default function JobRolePage() {
  const {
    jobRoles,
    isDialogOpen,
    jobRoleToDelete,
    formData,
    isEditMode,
    modalText,
    handleAddJobRole,
    handleEditJobRole,
    handleDeleteJobRole,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setJobRoleToDelete,
  } = useJobRoleManagement();

  return (
    <div className="pb-12">
      <PageHeader
        title="Job Role"
        backTo="/dashboard/hr/system"
        actionLabel="Add New Job Role"
        onActionClick={handleAddJobRole}
      />

      {/* Table */}
      <div className="mt-8">
        <DataTable<JobRole>
          columns={[
            { key: "jobRole", label: "Job Role" },
            { key: "department", label: "Department" },
            { key: "unit", label: "Unit" },
          ]}
          data={jobRoles}
          onEdit={handleEditJobRole}
          onDelete={handleDeleteJobRole}
          totalEntries={jobRoles.length}
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Role */}
          <FormField label="Job Role" required>
            <Input
              placeholder="--Enter job role--"
              value={formData.jobRole}
              onChange={(e) =>
                setFormData({ ...formData, jobRole: e.target.value })
              }
            />
          </FormField>

          {/* Department */}
          <FormField label="Department" required>
            <Select
              value={formData.department}
              onValueChange={(value) =>
                setFormData({ ...formData, department: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select department--" />
              </SelectTrigger>
              <SelectContent>
                {mockDepartmentOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Unit */}
          <FormField label="Unit" required>
            <Select
              value={formData.unit}
              onValueChange={(value) =>
                setFormData({ ...formData, unit: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select unit--" />
              </SelectTrigger>
              <SelectContent>
                {mockUnitOptions.map((option) => (
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
              {isEditMode ? "Update Job Role" : "Create Job Role"}
            </Button>
          </div>
        </form>
      </FormDialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={jobRoleToDelete !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setJobRoleToDelete(null);
          }
        }}
        title="Delete Job Role"
        description={`Are you sure you want to delete "${jobRoleToDelete?.jobRole ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

