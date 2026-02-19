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
import type { ClearanceReport } from "@/components/mockData";

interface ClearanceReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ClearanceReport | null;
}

export function ClearanceReportModal({
  isOpen,
  onClose,
  report,
}: ClearanceReportModalProps) {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-primary">
            Review Clearance Report
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-8">
            <div className="border-b-2 border-primary"></div>

            <div>
              <h3 className="font-bold text-foreground mb-6">Staff Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <FormField label="Candidate Name">
                  <Input
                    value={report.staffName}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
                <FormField label="Designation">
                  <Input
                    value={report.designation || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
                <FormField label="Department">
                  <Input
                    value={report.department}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
                <FormField label="Date Employed">
                  <Input
                    value={report.dateEmployed || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
                <FormField label="Date of Leaving Service">
                  <Input
                    value={report.dateOfLeavingService || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
                <FormField label="Signature">
                  <Input
                    value={report.signature || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-2">
                Team Lead Section
              </h3>
              <p className="text-sm text-foreground/70 mb-6">
                Review handover completion details.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <FormField label="Date">
                  <Input
                    value={report.teamLeadDate || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
                <FormField label="Signature">
                  <Input
                    value={report.teamLeadSignature || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </FormField>
              </div>
            </div>
          </div>
        </ScrollArea>

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
