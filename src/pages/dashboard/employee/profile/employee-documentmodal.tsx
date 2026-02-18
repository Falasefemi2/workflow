import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/shared/form-field";
import type { AddDocumentFormData } from "@/hooks/use-employeedocument";
import { documentTypeOptions } from "@/components/mockData";

interface AddDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: AddDocumentFormData;
  setFormData: (data: AddDocumentFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function AddDocumentDialog({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: AddDocumentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Document</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Document Name Dropdown */}
          <FormField label="Document Name" required>
            <Select
              value={formData.documentName}
              onValueChange={(value) =>
                setFormData({ ...formData, documentName: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Input document name--" />
              </SelectTrigger>
              <SelectContent>
                {documentTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Upload Document */}
          <FormField label="Upload Document" required>
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
                  setFormData({ ...formData, documentFile: files[0] });
                }
              }}
            >
              <input
                type="file"
                id="add-document"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({
                      ...formData,
                      documentFile: e.target.files[0],
                    });
                  }
                }}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="add-document" className="cursor-pointer">
                <div className="space-y-2">
                  <p className="text-foreground/70">Choose file to upload</p>
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("add-document")?.click()
                    }
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Browse file
                  </button>
                </div>
              </label>
              {formData.documentFile && (
                <div className="mt-4 p-3 bg-primary/80 border rounded">
                  <p className="text-sm text-green-700">
                    ✓ Selected: {formData.documentFile.name}
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
              {isSubmitting ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
