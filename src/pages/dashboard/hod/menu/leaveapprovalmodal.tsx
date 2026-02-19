import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { LeaveApprovalReviewData } from "@/components/mockData";

interface LeaveApprovalReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: LeaveApprovalReviewData;
  setFormData: (data: LeaveApprovalReviewData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  leaveType?: string;
}

export function LeaveApprovalReviewModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  leaveType = "",
}: LeaveApprovalReviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-primary text-lg">
              {leaveType || "Leave Request"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Leave Type */}
          <div className="space-y-2">
            <p className="text-sm text-foreground/70">Leave Type:</p>
            <p className="text-base text-foreground">{formData.leaveType}</p>
          </div>

          {/* Leave Days */}
          <div className="space-y-2">
            <p className="text-sm text-foreground/70">Leave Days:</p>
            <p className="text-base text-foreground">
              {formData.leaveDays} Days
            </p>
          </div>

          {/* Commencement Date */}
          <div className="space-y-2">
            <p className="text-sm text-foreground/70">Commencement Date:</p>
            <p className="text-base text-foreground">
              {formData.commencementDate}
            </p>
          </div>

          {/* Handover Note */}
          {formData.handoverNote && (
            <div className="space-y-2">
              <p className="text-sm text-foreground/70">Handover Note:</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between gap-4">
                <a
                  href={formData.handoverNote}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 hover:underline break-all flex-1 text-sm"
                >
                  {formData.handoverNote}
                </a>
                <Button
                  type="button"
                  onClick={() => window.open(formData.handoverNote, "_blank")}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black ml-4 whitespace-nowrap flex items-center gap-2"
                >
                  <span>Download</span>
                  <Download size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Relief Officer */}
          {formData.reliefOfficer && (
            <div className="space-y-2">
              <p className="text-sm text-foreground/70">Relief Officer:</p>
              <div className="border border-border/30 rounded-lg p-4 flex items-center justify-between">
                <p className="text-base text-foreground">
                  {formData.reliefOfficer}
                </p>
                <button
                  type="button"
                  className="text-foreground/70 hover:text-foreground"
                >
                  ✏️
                </button>
              </div>
            </div>
          )}

          {/* Approve/Reject Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/30">
            <Button
              type="button"
              onClick={() => setFormData({ ...formData, action: "approve" })}
              className="bg-primary font-medium"
            >
              Approve Leave
            </Button>
            <Button
              type="button"
              onClick={() => setFormData({ ...formData, action: "reject" })}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium"
            >
              Reject Leave
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
