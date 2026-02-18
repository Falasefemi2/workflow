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
import type { EmployeeClearanceForm } from "@/components/mockData";

interface EmployeeClearanceFormReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: EmployeeClearanceForm | null;
}

export function EmployeeClearanceFormReviewModal({
  isOpen,
  onClose,
  form,
}: EmployeeClearanceFormReviewModalProps) {
  if (!form) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Clearance Approval</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-8">
            {/* Header Divider */}
            <div className="border-b border-primary"></div>

            {/* Staff Details Section */}
            <div>
              <h3 className="font-bold text-foreground mb-6">Staff Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <FormField label="Candidate Name">
                  <Input
                    value={form.staffName}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
                <FormField label="Designation">
                  <Input
                    value={form.designation}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
                <FormField label="Department">
                  <Input
                    value={form.department}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
                <FormField label="Date Employed">
                  <Input
                    value={form.dateEmployed}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
                <FormField label="Date of Leaving Service">
                  <Input
                    value={form.dateOfLeavingService}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
                <FormField label="Signature">
                  <Input
                    value={form.signature}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
              </div>
            </div>

            {/* Team Lead Section */}
            <div>
              <h3 className="font-bold text-foreground mb-2">
                To be completed by the Team Lead
              </h3>
              <p className="text-sm text-foreground/70 mb-6">
                The staff has documented his hand-over of all projects assigned
                to him and submitted same to me
              </p>
              <div className="grid grid-cols-2 gap-6">
                <FormField label="Date Employed">
                  <Input
                    value={form.teamLeadDate || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
                <FormField label="Signature">
                  <Input
                    value={form.teamLeadSignature || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
              </div>
            </div>
          </div>
        </ScrollArea>

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
