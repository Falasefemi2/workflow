import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LeavePreviewData {
  employeeName: string;
  leaveType: string;
  days?: number;
  startDate: string;
  endDate: string;
  department?: string;
  staffNumber?: string;
  status?: string;
}

interface LeavePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  leave: LeavePreviewData | null;
}

export function LeavePreviewModal({
  isOpen,
  onClose,
  leave,
}: LeavePreviewModalProps) {
  if (!leave) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-foreground";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Leave Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Employee Name */}
          <div>
            <p className="text-sm text-foreground/70 mb-1">Employee's Name</p>
            <p className="text-lg font-semibold text-foreground">
              {leave.employeeName}
            </p>
          </div>

          {/* Department - if available */}
          {leave.department && (
            <div>
              <p className="text-sm text-foreground/70 mb-1">Department</p>
              <p className="text-foreground">{leave.department}</p>
            </div>
          )}

          {/* Staff Number - if available */}
          {leave.staffNumber && (
            <div>
              <p className="text-sm text-foreground/70 mb-1">Staff Number</p>
              <p className="text-foreground">{leave.staffNumber}</p>
            </div>
          )}

          {/* Leave Type */}
          <div>
            <p className="text-sm text-foreground/70 mb-1">Leave Type</p>
            <p className="text-foreground">{leave.leaveType}</p>
          </div>

          {/* Days - if available */}
          {leave.days !== undefined && (
            <div>
              <p className="text-sm text-foreground/70 mb-1">Number of Days</p>
              <p className="text-foreground">{leave.days} days</p>
            </div>
          )}

          {/* Start Date */}
          <div>
            <p className="text-sm text-foreground/70 mb-1">Start Date</p>
            <p className="text-foreground">{formatDate(leave.startDate)}</p>
          </div>

          {/* End Date */}
          <div>
            <p className="text-sm text-foreground/70 mb-1">End Date</p>
            <p className="text-foreground">{formatDate(leave.endDate)}</p>
          </div>

          {/* Status - if available */}
          {leave.status && (
            <div>
              <p className="text-sm text-foreground/70 mb-1">Status</p>
              <p className={`font-semibold ${getStatusColor(leave.status)}`}>
                {leave.status}
              </p>
            </div>
          )}

          {/* Close Button */}
          <div className="flex gap-4 pt-6 border-t border-border/30">
            <Button onClick={onClose} className="w-full bg-primary text-white">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
