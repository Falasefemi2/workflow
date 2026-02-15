import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUnitManagement } from "@/hooks/use-unit";
import { mockDepartmentOptions, mockLevelOptions } from "@/components/mockData";
import { Trash2, Edit2, Award } from "lucide-react";
import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";

export default function UnitManagementPage() {
  const {
    units,
    isDialogOpen,
    isAssignLevelDialogOpen,
    unitToDelete,
    formData,
    assignLevelFormData,
    isEditMode,
    modalText,
    handleAddUnit,
    handleEditUnit,
    handleDeleteUnit,
    handleConfirmDelete,
    handleAssignLevel,
    handleConfirmAssignLevel,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setIsAssignLevelDialogOpen,
    setUnitToDelete,
    setAssignLevelFormData,
  } = useUnitManagement();

  return (
    <div className="pb-12">
      <PageHeader
        title="Units"
        backTo="/dashboard/hr/system"
        actionLabel="Add New Unit"
        onActionClick={handleAddUnit}
      />

      {/* Table */}
      <div className="mt-8 border border-border/30 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-primary">Unit</TableHead>
              <TableHead className="text-primary">Department</TableHead>
              <TableHead className="text-primary">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>{unit.name}</TableCell>
                <TableCell>{unit.department}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEditUnit(unit)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteUnit(unit)}
                      className="p-2 text-primary rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Assign Level Button */}
                    <button
                      onClick={() => handleAssignLevel(unit)}
                      className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                      title="Assign Level"
                    >
                      <Award className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Unit Form Dialog */}
      <FormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        title={modalText}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Unit Name */}
          <FormField label="Unit Name" required>
            <Input
              placeholder="Enter title"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormField>

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
              {isEditMode ? "Update Unit" : "Create Unit"}
            </Button>
          </div>
        </form>
      </FormDialog>

      {/* Assign Level Dialog */}
      <FormDialog
        isOpen={isAssignLevelDialogOpen}
        onClose={() => {
          setIsAssignLevelDialogOpen(false);
        }}
        title="Assign Levels to Unit"
      >
        <div className="space-y-6">
          <FormField label="Select Levels" required>
            <div className="space-y-3">
              {mockLevelOptions.map((level) => (
                <label
                  key={level.id}
                  className="flex items-center gap-3 p-3 border border-border/30 rounded-lg hover:bg-secondary/10 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={assignLevelFormData.selectedLevels.includes(
                      level.value,
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAssignLevelFormData({
                          selectedLevels: [
                            ...assignLevelFormData.selectedLevels,
                            level.value,
                          ],
                        });
                      } else {
                        setAssignLevelFormData({
                          selectedLevels:
                            assignLevelFormData.selectedLevels.filter(
                              (l) => l !== level.value,
                            ),
                        });
                      }
                    }}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {level.label}
                  </span>
                </label>
              ))}
            </div>
          </FormField>

          {/* Selected Levels Display */}
          {assignLevelFormData.selectedLevels.length > 0 && (
            <div className="bg-secondary/20 border border-border/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">
                Selected Levels:
              </p>
              <div className="flex flex-wrap gap-2">
                {assignLevelFormData.selectedLevels.map((level) => (
                  <span
                    key={level}
                    className="bg-primary text-white text-xs px-3 py-1 rounded-full"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end pt-6 border-t border-border/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAssignLevelDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmAssignLevel}
              className="bg-primary"
            >
              Assign Levels
            </Button>
          </div>
        </div>
      </FormDialog>

      <DeleteConfirmDialog
        isOpen={unitToDelete !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setUnitToDelete(null);
          }
        }}
        title="Delete Unit"
        description={`Are you sure you want to delete "${unitToDelete?.name ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
