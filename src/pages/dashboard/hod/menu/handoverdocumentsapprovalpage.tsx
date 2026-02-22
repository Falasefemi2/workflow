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
import { useHandoverDocumentManagement } from "@/hooks/use-handover-documents";
import { HandoverDocumentsApprovalModal } from "./handoverdocumentsapprovalmodal";

export default function HandoverDocumentsApprovalPage() {
  const menuBasePath = useMenuBasePath();
  const {
    documents,
    isReviewModalOpen,
    reviewFormData,
    isSubmittingReview,
    handleReview,
    handleSubmitReview,
    setReviewFormData,
    setIsReviewModalOpen,
  } = useHandoverDocumentManagement();

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
        title="Handover Documents Approval"
        backTo={menuBasePath}
      />

      <div className="text-center mt-8 mb-8">
        <div className="border-b-2 border-primary"></div>
      </div>

      <div className="mt-8">
        <div className="rounded-lg border border-border/30 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-card border-b border-border/30">
                <TableHead className="text-primary font-bold">S/N</TableHead>
                <TableHead className="text-primary font-bold">
                  Employee's Name
                </TableHead>
                <TableHead className="text-primary font-bold">
                  Submission Date
                </TableHead>
                <TableHead className="text-primary font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document, index) => (
                <TableRow
                  key={document.id}
                  className="border-b border-border/30 hover:bg-secondary/10 transition-colors"
                >
                  <TableCell className="text-foreground">{index + 1}</TableCell>
                  <TableCell className="text-foreground">
                    {document.employeeName}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {formatDate(document.submissionDate)}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleReview(document)}
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

          {documents.length === 0 && (
            <div className="text-center py-8 text-foreground/70">
              <p>No handover documents found</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-sm text-foreground/70 border-t border-border/30 pt-6">
        <p>
          Showing 1 - {Math.min(10, documents.length)} of {documents.length}{" "}
          entries
        </p>
      </div>

      <HandoverDocumentsApprovalModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        formData={reviewFormData}
        setFormData={setReviewFormData}
        onSubmit={handleSubmitReview}
        isSubmitting={isSubmittingReview}
      />
    </div>
  );
}


