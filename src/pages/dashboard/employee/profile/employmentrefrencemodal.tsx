import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/form-field";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { EmploymentReference } from "@/components/mockData";

interface EmploymentReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: EmploymentReference | null;
  setFormData: (data: EmploymentReference) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isEditMode: boolean;
}

export function EmploymentReferenceModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  isEditMode,
}: EmploymentReferenceModalProps) {
  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode
              ? "Edit Employment Reference"
              : "Add New Employment Reference"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <form onSubmit={onSubmit} className="space-y-6 pb-6">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-6">
              <FormField label="Company Name" required>
                <Input
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Designation" required>
                <Input
                  placeholder="Enter designation"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                />
              </FormField>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-6">
              <FormField label="Period Of Work Start" required>
                <Input
                  type="date"
                  value={formData.periodOfWorkStart}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      periodOfWorkStart: e.target.value,
                    })
                  }
                />
              </FormField>
              <FormField label="Period Of Work End" required>
                <Input
                  type="date"
                  value={formData.periodOfWorkEnd}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      periodOfWorkEnd: e.target.value,
                    })
                  }
                />
              </FormField>
            </div>

            {/* Responsibilities */}
            <FormField label="Responsibilities">
              <textarea
                placeholder="Enter responsibilities"
                value={formData.responsibilities}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    responsibilities: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-6">
              <FormField label="Contact Of HOD">
                <Input
                  placeholder="Enter HOD contact"
                  value={formData.contactOfHOD}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactOfHOD: e.target.value,
                    })
                  }
                />
              </FormField>
              <FormField label="HOD's Email">
                <Input
                  type="email"
                  placeholder="Enter HOD email"
                  value={formData.hodEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, hodEmail: e.target.value })
                  }
                />
              </FormField>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-2 gap-6">
              <FormField label="Contact Of HR">
                <Input
                  placeholder="Enter HR contact"
                  value={formData.contactOfHR}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactOfHR: e.target.value,
                    })
                  }
                />
              </FormField>
              <FormField label="Contact Of HR (Email)">
                <Input
                  type="email"
                  placeholder="Enter HR email"
                  value={formData.hrEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, hrEmail: e.target.value })
                  }
                />
              </FormField>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-end pt-6 border-t border-border/30">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
