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
import { useHMOSetupManagement } from "@/hooks/use-hmo-setup";
import {
  mockEmployees,
  mockHMOProviders,
  type HMOSetup,
} from "@/components/mockData";

export default function HMOSetupPage() {
  const {
    hmoSetups,
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
  } = useHMOSetupManagement();

  return (
    <div className="pb-12">
      <PageHeader
        title="HMO Setup"
        backTo="/dashboard/hr/system"
        actionLabel="Add HMO Setup"
        onActionClick={handleAddSetup}
      />

      {/* Table */}
      <div className="mt-8">
        <DataTable<HMOSetup>
          columns={[
            { key: "employeeName", label: "Employee Name" },
            { key: "hmoServiceProvider", label: "HMO Service Provider" },
            {
              key: "registrationDate",
              label: "Registration Date",
              render: (value) => {
                const date = new Date(value);
                return date.toLocaleDateString();
              },
            },
          ]}
          data={hmoSetups}
          onEdit={handleEditSetup}
          onDelete={handleDeleteSetup}
          totalEntries={hmoSetups.length}
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
          {/* Employee Name */}
          <FormField label="Employee's Name" required>
            <Select
              value={formData.employeeName}
              onValueChange={(value) =>
                setFormData({ ...formData, employeeName: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select employee--" />
              </SelectTrigger>
              <SelectContent>
                {mockEmployees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.name}>
                    <div className="flex flex-col">
                      <span className="font-medium">{employee.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {employee.email}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* HMO Service Provider */}
          <FormField label="HMO Service Provider" required>
            <Select
              value={formData.hmoServiceProvider}
              onValueChange={(value) =>
                setFormData({ ...formData, hmoServiceProvider: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select HMO provider--" />
              </SelectTrigger>
              <SelectContent>
                {mockHMOProviders.map((provider) => (
                  <SelectItem key={provider.id} value={provider.value}>
                    {provider.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Registration Date */}
          <FormField label="Registration Datee" required>
            <Input
              type="date"
              value={formData.registrationDate}
              onChange={(e) =>
                setFormData({ ...formData, registrationDate: e.target.value })
              }
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
        title="Delete HMO Setup"
        description={`Are you sure you want to delete HMO setup for "${setupToDelete?.employeeName ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

