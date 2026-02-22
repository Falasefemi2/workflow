import { PageHeader } from "@/components/shared/page-header";
import { useMenuBasePath } from "../../shared/use-menu-base-path";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ResignationFormApprovalReviewModal } from "./resignationformapprovalmodal";
import { useResignationFormApprovalManagement } from "@/hooks/use-resignationformapproval";

export default function ResignationFormApprovalPage() {
  const menuBasePath = useMenuBasePath();
  const {
    approvals,
    isReviewModalOpen,
    reviewFormData,
    isSubmitting,
    handleReview,
    handleCloseReview,
    handleSaveReview,
    setReviewFormData,
  } = useResignationFormApprovalManagement();

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
      <PageHeader
        title="Resignation Form Approval"
        backTo={menuBasePath}
      />

      {/* Title and Divider */}
      <div className="text-center mt-8 mb-8">
        <div className="border-b-2 border-primary"></div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <div className="rounded-lg border border-border/30 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-card border-b border-border/30">
                <TableHead className="text-primary font-bold">S/N</TableHead>
                <TableHead className="text-primary font-bold">
                  Staff Name
                </TableHead>
                <TableHead className="text-primary font-bold">
                  Disengagement date
                </TableHead>
                <TableHead className="text-primary font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvals.map((approval, index) => (
                <TableRow
                  key={approval.id}
                  className="border-b border-border/30 hover:bg-secondary/10 transition-colors"
                >
                  <TableCell className="text-foreground">{index + 1}</TableCell>
                  <TableCell className="text-foreground">
                    {approval.staffName}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {formatDate(approval.disengagementDate)}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleReview(approval)}
                      variant="ghost"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 font-medium"
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {approvals.length === 0 && (
            <div className="text-center py-8 text-foreground/70">
              <p>No resignations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Info */}
      <div className="mt-6 text-sm text-foreground/70 border-t border-border/30 pt-6">
        <p>
          Showing 1 - {Math.min(10, approvals.length)} of {approvals.length}{" "}
          entries
        </p>
      </div>

      {/* Review Modal */}
      <ResignationFormApprovalReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReview}
        formData={reviewFormData}
        setFormData={setReviewFormData}
        onSubmit={handleSaveReview}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}


