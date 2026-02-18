import { PageHeader } from "@/components/shared/page-header";
import { EmployeeHandoverDocumentsTable } from "./employeehandoverdocumnenttable";
import { EmployeeHandoverDocumentsReviewModal } from "./employee-handoverdocument-modal";
import { useEmployeeHandoverDocumentsManagement } from "@/hooks/use-employee-handoverdocument";

export default function EmployeeHandoverDocumentsFormPage() {
  const {
    documents,
    isReviewModalOpen,
    selectedDocumentForReview,
    handleReview,
    handleCloseReview,
    handleViewFile,
  } = useEmployeeHandoverDocumentsManagement();

  return (
    <div className="pb-12">
      <PageHeader
        title="Handover Documents Form"
        backTo="/dashboard/employee/menu"
      />

      {/* Title and Divider */}
      <div className="text-center mt-8 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Handover Document
        </h2>
        <div className="border-b-2 border-primary"></div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <EmployeeHandoverDocumentsTable
          documents={documents}
          onReview={handleReview}
        />
      </div>

      {/* Pagination Info */}
      <div className="mt-6 text-sm text-foreground/70 border-t border-border/30 pt-6">
        <p>
          Showing 1 - {Math.min(10, documents.length)} of {documents.length}{" "}
          entries
        </p>
      </div>

      {/* Review Modal */}
      <EmployeeHandoverDocumentsReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReview}
        document={selectedDocumentForReview}
        onViewFile={handleViewFile}
      />
    </div>
  );
}
