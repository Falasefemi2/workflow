import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/shared/form-field";
import {
  nameChangeOptions,
  type ChangeNameRequest,
} from "@/components/mockData";

interface ChangeNameRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ChangeNameRequest;
  setFormData: (data: ChangeNameRequest) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function ChangeNameRequestDialog({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: ChangeNameRequestDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Change Name Request</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name Dropdown */}
          <FormField label="Name" required>
            <Select
              value={formData.nameToChange}
              onValueChange={(value) =>
                setFormData({ ...formData, nameToChange: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select name for change--" />
              </SelectTrigger>
              <SelectContent>
                {nameChangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* New Name Input */}
          <FormField label="New Name" required>
            <Input
              placeholder="--Write new name--"
              value={formData.newName}
              onChange={(e) =>
                setFormData({ ...formData, newName: e.target.value })
              }
            />
          </FormField>

          {/* Reason for Change */}
          <FormField label="Reason for Change of name" required>
            <textarea
              placeholder="--Give message--"
              value={formData.reasonForChange}
              onChange={(e) =>
                setFormData({ ...formData, reasonForChange: e.target.value })
              }
              className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
            />
          </FormField>

          {/* Upload Supporting Document */}
          <FormField label="Upload Supporting Document" required>
            <div
              className="border-2 border-dashed border-border/30 rounded-lg p-8 text-center hover:bg-secondary/10 transition-colors"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = e.dataTransfer.files;
                if (files?.[0]) {
                  setFormData({ ...formData, supportingDocument: files[0] });
                }
              }}
            >
              <input
                type="file"
                id="change-name-doc"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({
                      ...formData,
                      supportingDocument: e.target.files[0],
                    });
                  }
                }}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="change-name-doc" className="cursor-pointer">
                <div className="space-y-2">
                  <p className="text-foreground/70">Choose file to upload</p>
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("change-name-doc")?.click()
                    }
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Browse file
                  </button>
                </div>
              </label>
              {formData.supportingDocument && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-700">
                    ✓ Selected: {formData.supportingDocument.name}
                  </p>
                </div>
              )}
            </div>
          </FormField>

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
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
