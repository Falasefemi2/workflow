import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared/form-field";
import type { CandidateOfferReviewData } from "@/components/mockData";

interface CandidateLeaveRejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: CandidateOfferReviewData;
  setFormData: (data: CandidateOfferReviewData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function CandidateLeaveRejectionModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: CandidateLeaveRejectionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Rejection Reason
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Rejection Reason */}
          <FormField label="Reason for rejection" required>
            <textarea
              placeholder="-- Give reasons--"
              value={formData.rejectionReason}
              onChange={(e) =>
                setFormData({ ...formData, rejectionReason: e.target.value })
              }
              className="w-full p-4 border-2 border-dashed border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[150px]"
            />
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
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
