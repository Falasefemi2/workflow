import { PageHeader } from "@/components/shared/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useLeaveApprovalReviewManagement } from "@/hooks/use-leaveapproval";
import { LeaveApprovalReviewModal } from "./leaveapprovalmodal";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Approved":
      return "text-blue-600";
    case "Rejected":
      return "text-red-600";
    default:
      return "text-foreground";
  }
};

const getActionLabel = (status: string) => {
  switch (status) {
    case "Pending":
      return "Review Leave";
    default:
      return "View documents";
  }
};

export default function LeaveApprovalReviewPage() {
  const {
    leaves,
    isReviewModalOpen,
    selectedLeaveForReview,
    reviewFormData,
    isSubmitting,
    handleReview,
    handleCloseReview,
    handleSaveReview,
    setReviewFormData,
  } = useLeaveApprovalReviewManagement();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="pb-12">
      <PageHeader title="Leave Approval" backTo="/dashboard/hod/menu" />

      {/* Table */}
      <div className="mt-8">
        <div className="rounded-lg border border-border/30 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-card border-b border-border/30">
                <TableHead className="text-primary font-bold">S/N</TableHead>
                <TableHead className="text-primary font-bold">
                  Leave Type
                </TableHead>
                <TableHead className="text-primary font-bold">
                  Employee Name
                </TableHead>
                <TableHead className="text-primary font-bold">
                  Commencement Date
                </TableHead>
                <TableHead className="text-primary font-bold">
                  Resumption Date
                </TableHead>
                <TableHead className="text-primary font-bold">Status</TableHead>
                <TableHead className="text-primary font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((leave, index) => (
                <TableRow
                  key={leave.id}
                  className="border-b border-border/30 hover:bg-secondary/10 transition-colors"
                >
                  <TableCell className="text-foreground">{index + 1}</TableCell>
                  <TableCell className="text-foreground">
                    {leave.leaveType}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {leave.employeeName}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {formatDate(leave.commencementDate)}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {formatDate(leave.resumptionDate)}
                  </TableCell>
                  <TableCell
                    className={`font-medium ${getStatusColor(leave.status)}`}
                  >
                    {leave.status}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleReview(leave)}
                      variant="ghost"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 font-medium underline"
                    >
                      {getActionLabel(leave.status)}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {leaves.length === 0 && (
            <div className="text-center py-8 text-foreground/70">
              <p>No leave requests found</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Info */}
      <div className="mt-6 text-sm text-foreground/70 border-t border-border/30 pt-6">
        <p>
          Showing 1 - {Math.min(10, leaves.length)} of {leaves.length} entries
        </p>
      </div>

      {/* Review Modal */}
      <LeaveApprovalReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReview}
        formData={reviewFormData}
        setFormData={setReviewFormData}
        onSubmit={handleSaveReview}
        isSubmitting={isSubmitting}
        leaveType={selectedLeaveForReview?.leaveType}
      />
    </div>
  );
}
