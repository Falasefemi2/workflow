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
import { ClearanceFormApprovalReviewModal } from "./clearanceformapprovalmodal";
import { useClearanceFormApprovalManagement } from "@/hooks/use-clearanceform-apporval";

export default function ClearanceFormApprovalPage() {
  const {
    approvals,
    isReviewModalOpen,
    selectedApprovalForReview,
    handleReview,
    handleCloseReview,
    handleSaveApproval,
  } = useClearanceFormApprovalManagement();

  return (
    <div className="pb-12">
      <PageHeader
        title="Clearance Form Approval"
        backTo="/dashboard/hod/menu"
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
                  Department
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
                    {approval.department}
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
              <p>No clearance forms found</p>
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
      <ClearanceFormApprovalReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReview}
        approval={selectedApprovalForReview}
        onSave={handleSaveApproval}
      />
    </div>
  );
}
