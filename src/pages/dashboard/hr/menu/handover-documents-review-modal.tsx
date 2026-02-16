import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import type { ReviewFormData } from "@/hooks/use-handover-documents";

interface HandoverDocumentReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ReviewFormData;
  setFormData: (data: ReviewFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function HandoverDocumentReviewModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: HandoverDocumentReviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Handover Documents</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Employee's Name */}
          <FormField label="Employee's Name">
            <Input
              type="text"
              value={formData.employeeName}
              readOnly
              className="bg-gray-100"
            />
          </FormField>

          {/* Date */}
          <FormField label="Date">
            <Input
              type="date"
              value={formData.date}
              readOnly
              className="bg-gray-100"
            />
          </FormField>

          {/* Handover Notes */}
          <FormField label="Handover Notes">
            <div
              className="border-2 border-dashed border-border/30 rounded-lg p-6 text-center hover:bg-secondary/10 transition-colors cursor-pointer"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = e.dataTransfer.files;
                if (files?.[0]) {
                  setFormData({ ...formData, handoverNotes: files[0] });
                }
              }}
              onClick={() =>
                document.getElementById("handover-file-input")?.click()
              }
            >
              <input
                type="file"
                id="handover-file-input"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({
                      ...formData,
                      handoverNotes: e.target.files[0],
                    });
                  }
                }}
                accept=".pdf,.doc,.docx"
              />
              <div className="space-y-2">
                {formData.handoverNotes ? (
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-sm text-green-700">
                      ✓ {formData.handoverNotes.name}
                    </p>
                    <button
                      type="button"
                      className="text-sm text-primary hover:text-primary/80 mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({ ...formData, handoverNotes: null });
                      }}
                    >
                      Change file
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-foreground/70 font-medium">
                      {formData.handoverNotes || "No file selected"}
                    </p>
                    <button
                      type="button"
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      View file
                    </button>
                  </>
                )}
              </div>
            </div>
          </FormField>

          {/* Submit Buttons */}
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
      </DialogContent>
    </Dialog>
  );
}
