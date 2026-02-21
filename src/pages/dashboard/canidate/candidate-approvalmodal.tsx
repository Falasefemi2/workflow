import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/form-field";
import type { CandidateOfferReviewData } from "@/components/mockData";

interface CandidateLeaveApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: CandidateOfferReviewData;
  onApprove: () => void;
  onRejectClick: () => void;
  isSubmitting: boolean;
}

export function CandidateLeaveApprovalModal({
  isOpen,
  onClose,
  formData,
  onApprove,
  onRejectClick,
  isSubmitting,
}: CandidateLeaveApprovalModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-foreground">
              Candidate Offer Request
            </DialogTitle>
          </div>
        </DialogHeader>

        <form className="space-y-6">
          {/* Employee Name */}
          <FormField label="Employee Name">
            <Input
              value={formData.employeeName}
              readOnly
              className="bg-gray-50"
            />
          </FormField>

          {/* Department */}
          <FormField label="Department">
            <Input
              value={formData.department}
              readOnly
              className="bg-gray-50"
            />
          </FormField>

          {/* Proposed Start Date */}
          <FormField label="Proposed start date">
            <Input
              value={formatDate(formData.proposedStartDate)}
              readOnly
              className="bg-gray-50"
            />
          </FormField>

          {/* Approve/Reject Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/30">
            <Button
              type="button"
              onClick={onApprove}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              {isSubmitting ? "Processing..." : "Approve"}
            </Button>
            <Button
              type="button"
              onClick={onRejectClick}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white font-medium"
            >
              Reject
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
