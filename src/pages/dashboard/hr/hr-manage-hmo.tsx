import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import { useManageHMOManagement } from "@/hooks/use-manage-hmo";
import type { ManageHMO } from "@/components/mockData";

export default function ManageHMOPage() {
  const {
    manageHMOs,
    isDialogOpen,
    hmoToDelete,
    formData,
    isSubmitting,
    modalText,
    handleAddHMO,
    handleEditHMO,
    handleDeleteHMO,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setHMOToDelete,
  } = useManageHMOManagement();

  return (
    <div className="pb-12">
      <PageHeader
        title="Manage HMO"
        backTo="/dashboard/hr/system"
        actionLabel="Add New HMO"
        onActionClick={handleAddHMO}
      />

      {/* Table */}
      <div className="mt-8">
        <DataTable<ManageHMO>
          columns={[
            { key: "hmoName", label: "HMO Service Provider" },
            { key: "newEntrantFormPath", label: "New Entrant Form Path" },
            {
              key: "existingEmployeeFormPath",
              label: "Existing Employee Form Path",
            },
          ]}
          data={manageHMOs}
          onEdit={handleEditHMO}
          onDelete={handleDeleteHMO}
          totalEntries={manageHMOs.length}
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
          {/* HMO Name */}
          <FormField label="HMO's Name" required>
            <Input
              placeholder="Enter HMO name"
              value={formData.hmoName}
              onChange={(e) =>
                setFormData({ ...formData, hmoName: e.target.value })
              }
            />
          </FormField>

          {/* Upload New Entrant's Form */}
          <FormField label="Upload New Entrant's Form" required>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/10 transition-colors">
              <input
                type="file"
                id="new-entrant-file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({
                      ...formData,
                      newEntrantForm: e.target.files[0],
                    });
                  }
                }}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
              <label htmlFor="new-entrant-file" className="cursor-pointer">
                <div className="text-foreground/70 mb-2">
                  {formData.newEntrantForm
                    ? `✓ Selected: ${formData.newEntrantForm.name}`
                    : "Choose file to upload"}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("new-entrant-file")?.click()
                  }
                  className="text-primary hover:text-primary/80 font-medium text-sm"
                >
                  Browse file
                </button>
              </label>
            </div>
          </FormField>

          {/* Upload Existing Employee's Form */}
          <FormField label="Upload Existing Employee's Form" required>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/10 transition-colors">
              <input
                type="file"
                id="existing-employee-file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({
                      ...formData,
                      existingEmployeeForm: e.target.files[0],
                    });
                  }
                }}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
              <label
                htmlFor="existing-employee-file"
                className="cursor-pointer"
              >
                <div className="text-foreground/70 mb-2">
                  {formData.existingEmployeeForm
                    ? `✓ Selected: ${formData.existingEmployeeForm.name}`
                    : "Choose file to upload"}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("existing-employee-file")?.click()
                  }
                  className="text-primary hover:text-primary/80 font-medium text-sm"
                >
                  Browse file
                </button>
              </label>
            </div>
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
            <Button
              type="submit"
              className="bg-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </FormDialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={hmoToDelete !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setHMOToDelete(null);
          }
        }}
        title="Delete HMO"
        description={`Are you sure you want to delete "${hmoToDelete?.hmoName ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
