import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useVoucherApprovalManagement } from "./use-voucher-approval";
import {
  mockApprovingOfficers,
  mockDepartmentOptions,
  mockLevelOptions,
  type VoucherApprovalSetup,
} from "@/components/mockData";

export default function VoucherApprovalPage() {
  const {
    approvals,
    isDialogOpen,
    approvalToDelete,
    formData,
    modalText,
    handleAddApproval,
    handleEditApproval,
    handleDeleteApproval,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setApprovalToDelete,
  } = useVoucherApprovalManagement();

  // Determine number of officer fields based on level
  const levelValue = Number(formData.level);
  const numOfficerFields = Math.min(levelValue, 3);

  return (
    <div className="pb-12">
      <PageHeader
        title="E-voucher Approval"
        backTo="/dashboard/admin/system"
        actionLabel="Add New"
        onActionClick={handleAddApproval}
      />

      {/* Table */}
      <div className="mt-8">
        <DataTable<VoucherApprovalSetup>
          columns={[
            { key: "department", label: "Department" },
            { key: "level", label: "Level" },
          ]}
          data={approvals}
          onEdit={handleEditApproval}
          onDelete={handleDeleteApproval}
          totalEntries={approvals.length}
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
          {/* Department */}
          <FormField label="Department">
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

          {/* Level */}
          <FormField label="Level">
            <Select
              value={formData.level}
              onValueChange={(value) =>
                setFormData({ ...formData, level: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select level--" />
              </SelectTrigger>
              <SelectContent>
                {mockLevelOptions.map((option) => (
                  <SelectItem key={option.id} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Dynamic Officer Fields - Only show if level is selected */}
          {formData.level && (
            <>
              {Array.from({ length: numOfficerFields }).map((_, index) => (
                <FormField
                  key={`ao-${index}`}
                  label={`Approving Officer ${index + 1}`}
                >
                  <Select
                    value={formData.approvingOfficers[index] || ""}
                    onValueChange={(value) => {
                      const newOfficers = [...formData.approvingOfficers];
                      newOfficers[index] = value;
                      setFormData({
                        ...formData,
                        approvingOfficers: newOfficers,
                      });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--Select role--" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockApprovingOfficers.map((officer) => (
                        <SelectItem key={officer.id} value={officer.name}>
                          <div className="flex flex-col">
                            <span className="font-medium">{officer.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {officer.email}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              ))}
            </>
          )}

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
              Save
            </Button>
          </div>
        </form>
      </FormDialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={approvalToDelete !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setApprovalToDelete(null);
          }
        }}
        title="Delete E-voucher Approval"
        description={`Are you sure you want to delete this voucher approval setup? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
