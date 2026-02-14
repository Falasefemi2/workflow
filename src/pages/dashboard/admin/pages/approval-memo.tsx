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
import { useMemoApprovalManagement } from "@/hooks/use-memo-approval";
import {
  mockApprovingOfficers,
  mockCommitteeOfficers,
  mockLevelOptions,
  mockMemoTypeOptions,
  type MemoApprovalSetup,
} from "@/components/mockData";

export default function MemoApprovalPage() {
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
  } = useMemoApprovalManagement();

  // Determine which officers to show and how many fields based on level
  const levelValue = Number(formData.level);
  const isGeneral = formData.memoType === "General";
  const isAsset = formData.memoType === "Asset";
  const numOfficerFields = Math.min(levelValue, 3);
  const officers = isGeneral ? mockApprovingOfficers : mockCommitteeOfficers;
  const officerLabel = isGeneral ? "Approving Officer" : "Committee Officer";

  return (
    <div className="pb-12">
      <PageHeader
        title="E-memo Approval"
        backTo="/dashboard/admin/system"
        actionLabel="Add New"
        onActionClick={handleAddApproval}
      />

      {/* Table */}
      <div className="mt-8">
        <DataTable<MemoApprovalSetup>
          columns={[
            { key: "level", label: "Level" },
            { key: "memoType", label: "Memo type" },
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

          {/* Memo Type */}
          <FormField label="Memo type">
            <Select
              value={formData.memoType}
              onValueChange={(value) =>
                setFormData({ ...formData, memoType: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select memo type--" />
              </SelectTrigger>
              <SelectContent>
                {mockMemoTypeOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Dynamic Officer Fields - Only show if both level and memoType are selected */}
          {formData.level && formData.memoType && (
            <>
              {isGeneral && (
                <>
                  {Array.from({ length: numOfficerFields }).map((_, index) => (
                    <FormField
                      key={`ao-${index}`}
                      label={`${officerLabel} ${index + 1}`}
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
                          <SelectValue
                            placeholder={`--select ${officerLabel.toLowerCase()} ${index + 1}--`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {officers.map((officer) => (
                            <SelectItem key={officer.id} value={officer.name}>
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {officer.name}
                                </span>
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

              {isAsset && (
                <>
                  {Array.from({ length: numOfficerFields }).map((_, index) => (
                    <FormField
                      key={`co-${index}`}
                      label={`${officerLabel} ${index + 1}`}
                    >
                      <Select
                        value={formData.committeeOfficers[index] || ""}
                        onValueChange={(value) => {
                          const newOfficers = [...formData.committeeOfficers];
                          newOfficers[index] = value;
                          setFormData({
                            ...formData,
                            committeeOfficers: newOfficers,
                          });
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={`--select ${officerLabel.toLowerCase()} ${index + 1}--`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {officers.map((officer) => (
                            <SelectItem key={officer.id} value={officer.name}>
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {officer.name}
                                </span>
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
        title="Delete Memo Approval"
        description={`Are you sure you want to delete this memo approval setup? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

