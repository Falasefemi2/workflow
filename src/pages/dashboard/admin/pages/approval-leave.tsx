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
import { useLeaveApprovalManagement } from "./use-leave-approval";
import {
  mockApprovalLevelOptions,
  mockDepartmentOptions,
  mockRoleOptions,
  type LeaveApprovalSetup,
} from "@/components/mockData";

export default function LeaveApprovalPage() {
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
  } = useLeaveApprovalManagement();

  return (
    <div className="pb-12">
      <PageHeader
        title="Leave Approval"
        backTo="/dashboard/admin/system"
        actionLabel="Add Approval"
        onActionClick={handleAddApproval}
      />

      {/* Table */}
      <div className="mt-8">
        <DataTable<LeaveApprovalSetup>
          columns={[
            { key: "role", label: "Role" },
            { key: "approvalLevel", label: "Approval level" },
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
          {/* Role */}
          <FormField label="Role" required>
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

          {/* Level Name */}
          <FormField label="Level name" required>
            <Input
              placeholder="Enter level name"
              value={formData.levelName}
              onChange={(e) =>
                setFormData({ ...formData, levelName: e.target.value })
              }
            />
          </FormField>

          {/* Level Order */}
          <FormField label="Level order" required>
            <Input
              type="number"
              placeholder="Enter level order"
              value={formData.levelOrder}
              onChange={(e) =>
                setFormData({ ...formData, levelOrder: e.target.value })
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

          {/* Approval Level */}
          <FormField label="Approval level" required>
            <Select
              value={formData.approvalLevel}
              onValueChange={(value) =>
                setFormData({ ...formData, approvalLevel: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select Approval level--" />
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

          {/* Description */}
          <FormField label="Description">
            <textarea
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-30"
            />
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
              {modalText}
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
        title="Delete Approval Setup"
        description={`Are you sure you want to delete this approval setup? This action cannot be undone.`}
        confirmLabel="Delete Approval"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
