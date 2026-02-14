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
import {
  mockAnnualLeaveDaysOptions,
  mockLeaveExpirationIntervalOptions,
  mockMinimumLeaveDaysOptions,
  type Level,
} from "@/components/mockData";
import { useLevelManagement } from "./use-level-management";

export default function LevelManagementPage() {
  const {
    levels,
    isDialogOpen,
    levelToDelete,
    formData,
    levelModalText,
    handleAddLevel,
    handleEditLevel,
    handleDeleteLevel,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setLevelToDelete,
  } = useLevelManagement();

  return (
    <div className="pb-12">
      <PageHeader
        title="Level Management"
        backTo="/dashboard/admin/system"
        actionLabel="Add New Level"
        onActionClick={handleAddLevel}
      />

      <div className="mt-8">
        <DataTable<Level>
          columns={[
            { key: "name", label: "Name" },
            { key: "code", label: "Code" },
            { key: "basicSalary", label: "Basic Salary" },
            { key: "totalAnnualLeaveDays", label: "Total Annual Leave Days" },
          ]}
          data={levels}
          onEdit={handleEditLevel}
          onDelete={handleDeleteLevel}
          totalEntries={levels.length}
        />
      </div>

      {/* Form Dialog */}
      <FormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        title={levelModalText}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-h-[70vh] overflow-y-auto pr-4"
        >
          {/* Level Name */}
          <FormField label="Level Name" required>
            <Input
              placeholder="Enter level name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormField>

          {/* Code */}
          <FormField label="Code" required>
            <Input
              placeholder="Enter code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
          </FormField>

          {/* Basic Salary */}
          <FormField label="Basic Salary" required>
            <Input
              type="number"
              placeholder="Enter basic salary"
              value={formData.basicSalary}
              onChange={(e) =>
                setFormData({ ...formData, basicSalary: e.target.value })
              }
            />
          </FormField>

          {/* Annual Leave Days */}
          <FormField label="Annual Leave Days" required>
            <Select
              value={formData.annualLeaveDays}
              onValueChange={(value) =>
                setFormData({ ...formData, annualLeaveDays: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select annual leave days--" />
              </SelectTrigger>
              <SelectContent>
                {mockAnnualLeaveDaysOptions.map((option) => (
                  <SelectItem key={option.id} value={String(option.value)}>
                    {option.value} days
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Transport Allowance */}
          <FormField label="Transport Allowance" required>
            <Input
              placeholder="Enter transport allowance"
              type="number"
              value={formData.transportAllowance}
              onChange={(e) =>
                setFormData({ ...formData, transportAllowance: e.target.value })
              }
            />
          </FormField>

          {/* Minimum Leave Days */}
          <FormField label="Minimum Leave Days" required>
            <Select
              value={formData.minimumLeaveDays}
              onValueChange={(value) =>
                setFormData({ ...formData, minimumLeaveDays: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select minimum leave days--" />
              </SelectTrigger>
              <SelectContent>
                {mockMinimumLeaveDaysOptions.map((option) => (
                  <SelectItem key={option.id} value={String(option.value)}>
                    {option.value} days
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Domestic Allowance */}
          <FormField label="Domestic Allowance" required>
            <Input
              placeholder="Enter domestic allowance"
              type="number"
              value={formData.domesticAllowance}
              onChange={(e) =>
                setFormData({ ...formData, domesticAllowance: e.target.value })
              }
            />
          </FormField>

          {/* Utility Allowance */}
          <FormField label="Utility Allowance" required>
            <Input
              placeholder="Enter utility allowance"
              type="number"
              value={formData.utilityAllowance}
              onChange={(e) =>
                setFormData({ ...formData, utilityAllowance: e.target.value })
              }
            />
          </FormField>

          {/* Total Annual Leave Days */}
          <FormField label="Total Annual Leave Days" required>
            <Select
              value={formData.totalAnnualLeaveDays}
              onValueChange={(value) =>
                setFormData({ ...formData, totalAnnualLeaveDays: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select annual leave days--" />
              </SelectTrigger>
              <SelectContent>
                {mockAnnualLeaveDaysOptions.map((option) => (
                  <SelectItem key={option.id} value={String(option.value)}>
                    {option.value} days
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Leave Expiration Interval */}
          <FormField label="Leave Expiration Interval" required>
            <Select
              value={formData.leaveExpirationInterval}
              onValueChange={(value) =>
                setFormData({ ...formData, leaveExpirationInterval: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select expiration interval--" />
              </SelectTrigger>
              <SelectContent>
                {mockLeaveExpirationIntervalOptions.map((option) => (
                  <SelectItem key={option.id} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Lunch Subsidy */}
          <FormField label="Lunch Subsidy" required>
            <Select
              value={formData.lunchSubsidy}
              onValueChange={(value) =>
                setFormData({ ...formData, lunchSubsidy: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select lunch subsidy--" />
              </SelectTrigger>
              <SelectContent>
                {mockAnnualLeaveDaysOptions.map((option) => (
                  <SelectItem key={option.id} value={String(option.value)}>
                    {option.value}
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
              {levelModalText}
            </Button>
          </div>
        </form>
      </FormDialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={levelToDelete !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setLevelToDelete(null);
          }
        }}
        title="Delete Level"
        description={`Are you sure you want to delete "${levelToDelete?.name ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete Level"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
