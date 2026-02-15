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
import { useExitApprovalSetupManagement } from "@/hooks/use-exit-approval";
import {
  mockDesignationOptions,
  mockApprovalLevelOptions,
  type ExitApprovalSetup,
} from "@/components/mockData";

export default function ExitApprovalSetupPage() {
  const {
    exitApprovalSetups,
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
  } = useExitApprovalSetupManagement();

  return (
    <div className="pb-12">
      <PageHeader
        title="Exit Approval Setup"
        backTo="/dashboard/hr/system"
        actionLabel="Add New"
        onActionClick={handleAddSetup}
      />

      {/* Table */}
      <div className="mt-8">
        <DataTable<ExitApprovalSetup>
          columns={[
            { key: "designation", label: "Designation" },
            { key: "approvalLevel", label: "Approval Level" },
            { key: "approvingDesignation", label: "Approving Designation" },
          ]}
          data={exitApprovalSetups}
          onEdit={handleEditSetup}
          onDelete={handleDeleteSetup}
          totalEntries={exitApprovalSetups.length}
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
                {mockDesignationOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Approval Level */}
          <FormField label="Approving Level" required>
            <Select
              value={formData.approvalLevel}
              onValueChange={(value) =>
                setFormData({ ...formData, approvalLevel: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select number--" />
              </SelectTrigger>
              <SelectContent>
                {mockApprovalLevelOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Approving Designation */}
          <FormField label="Approving Designation" required>
            <Select
              value={formData.approvingDesignation}
              onValueChange={(value) =>
                setFormData({ ...formData, approvingDesignation: value })
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
        title="Delete Exit Approval Setup"
        description={`Are you sure you want to delete the exit approval setup for "${setupToDelete?.designation ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
