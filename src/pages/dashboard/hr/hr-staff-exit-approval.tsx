import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import { useStaffExitApprovalSetupManagement } from "@/hooks/use-staff-exit-approval";
import {
  mockStaffDesignationOptions,
  mockNumberOfApprovalsOptions,
  mockApprovingDepartmentHODOptions,
  type StaffExitApprovalSetup,
} from "@/components/mockData";

export default function StaffExitApprovalSetupPage() {
  const {
    staffExitApprovalSetups,
    isDialogOpen,
    setupToDelete,
    formData,
    isEditMode,
    modalText,
    handleAddSetup,
    handleEditSetup,
    handleDeleteSetup,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setSetupToDelete,
  } = useStaffExitApprovalSetupManagement();

  return (
    <div className="pb-12">
      <PageHeader
        title="Staff Exit Approval"
        backTo="/dashboard/hr/system"
        actionLabel="Add New"
        onActionClick={handleAddSetup}
      />

      {/* Table */}
      <div className="mt-8">
        <DataTable<StaffExitApprovalSetup>
          columns={[
            { key: "designation", label: "Designation" },
            { key: "numberOfApprovals", label: "Approval Level" },
          ]}
          data={staffExitApprovalSetups}
          onEdit={handleEditSetup}
          onDelete={handleDeleteSetup}
          totalEntries={staffExitApprovalSetups.length}
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
          {/* Designation */}
          <FormField label="Designation" required>
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
                {mockStaffDesignationOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Number of Approvals */}
          <FormField label="Number of Approvals" required>
            <Select
              value={formData.numberOfApprovals}
              onValueChange={(value) =>
                setFormData({ ...formData, numberOfApprovals: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select number--" />
              </SelectTrigger>
              <SelectContent>
                {mockNumberOfApprovalsOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Approving Department/HOD */}
          <FormField label="Approving Department/HOD" required>
            <Select
              value={formData.approvingDepartmentHOD}
              onValueChange={(value) =>
                setFormData({ ...formData, approvingDepartmentHOD: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select department/HOD--" />
              </SelectTrigger>
              <SelectContent>
                {mockApprovingDepartmentHODOptions.map((option) => (
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
              {isEditMode ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </FormDialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={setupToDelete !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSetupToDelete(null);
          }
        }}
        title="Delete Staff Exit Approval Setup"
        description={`Are you sure you want to delete the staff exit approval setup for "${setupToDelete?.designation ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
