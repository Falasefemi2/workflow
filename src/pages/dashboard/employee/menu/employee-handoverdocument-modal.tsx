import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/form-field";
import type { EmployeeHandoverDocument } from "@/components/mockData";

interface EmployeeHandoverDocumentsReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: EmployeeHandoverDocument | null;
  onViewFile: (document: EmployeeHandoverDocument) => void;
}

export function EmployeeHandoverDocumentsReviewModal({
  isOpen,
  onClose,
  document,
  onViewFile,
}: EmployeeHandoverDocumentsReviewModalProps) {
  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Handover Documents</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Divider */}
          <div className="border-b border-primary"></div>

          {/* Employee's Name */}
          <FormField label="Employee's Name">
            <Input
              value={document.employeeName}
              readOnly
              className="bg-gray-50"
            />
          </FormField>

          {/* Date */}
          <FormField label="Date">
            <Input
              type="date"
              value={document.submissionDate}
              readOnly
              className="bg-gray-50"
            />
          </FormField>

          {/* Handover Notes */}
          <FormField label="Handover Notes">
            <div className="border-2 border-dashed border-border/30 rounded-lg p-6 text-center">
              <div className="space-y-2">
                <p className="text-foreground font-medium">
                  {document.documentFile}
                </p>
                <button
                  type="button"
                  onClick={() => onViewFile(document)}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  View file
                </button>
              </div>
            </div>
          </FormField>
        </div>

        {/* Close Button */}
        <div className="flex justify-center pt-6 border-t border-border/30">
          <Button
            onClick={onClose}
            className="bg-gray-600 text-white hover:bg-gray-700"
          >
            Go Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
