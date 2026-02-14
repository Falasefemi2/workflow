import { PageHeader } from "@/components/shared/page-header";
import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHolidayManagement } from "@/hooks/use-holiday";
import { mockSameDateOptions } from "@/components/mockData";
import { Trash2 } from "lucide-react";

export default function HolidayManagementPage() {
  const {
    holidays,
    isDialogOpen,
    formData,
    isEditMode,
    modalText,
    handleAddHoliday,
    handleEditHoliday,
    handleDeleteHoliday,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
  } = useHolidayManagement();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="pb-12">
      <PageHeader
        title="Holiday Management"
        backTo="/dashboard/hr/system"
        actionLabel="Add New Holiday"
        onActionClick={handleAddHoliday}
      />

      {/* Holiday Cards Grid */}
      <div className="mt-8">
        {holidays.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/70">No holidays added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {holidays.map((holiday) => (
              <div
                key={holiday.id}
                className="border border-border/30 bg-secondary/20 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Header with delete button */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground flex-1 pr-2">
                    {holiday.title}
                  </h3>
                  <button
                    onClick={() => handleDeleteHoliday(holiday)}
                    className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                    title="Delete holiday"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3 mb-4">
                  <div>
                    <p className="text-sm text-foreground/70">Start Date</p>
                    <p className="text-foreground font-medium">
                      {formatDate(holiday.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">End Date</p>
                    <p className="text-foreground font-medium">
                      {formatDate(holiday.endDate)}
                    </p>
                  </div>
                </div>

                {/* Footer with recurring status and edit button */}
                <div className="border-t border-border/30 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground/70">Recurring</p>
                    <p className="text-foreground font-medium">
                      {holiday.sameDateEveryYear ? "Yes" : "No"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEditHoliday(holiday)}
                    className="px-4 py-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
          {/* Holiday Title */}
          <FormField label="Holiday Title" required>
            <Input
              placeholder="Give the leave a title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </FormField>

          {/* Start Date */}
          <FormField label="Start Date" required>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
          </FormField>

          {/* End Date */}
          <FormField label="End Date" required>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />
          </FormField>

          {/* Same Date Every Year */}
          <FormField label="Same Date Every Year?" required>
            <Select
              value={String(formData.sameDateEveryYear)}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  sameDateEveryYear: value === "true",
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select--" />
              </SelectTrigger>
              <SelectContent>
                {mockSameDateOptions.map((option) => (
                  <SelectItem key={option.id} value={String(option.value)}>
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
              {isEditMode ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </FormDialog>
    </div>
  );
}

