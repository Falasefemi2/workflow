import { PageHeader } from "@/components/shared/page-header";
import { useEmployeeClearanceFormManagement } from "@/hooks/use-employeecleranceform";
import { EmployeeClearanceFormTable } from "./employeecleranceformtable";
import { EmployeeClearanceFormReviewModal } from "./employeecleranceformmodal";

export default function EmployeeClearanceFormPage() {
  const {
    forms,
    isReviewModalOpen,
    selectedFormForReview,
    handleReview,
    handleCloseReview,
  } = useEmployeeClearanceFormManagement();

  return (
    <div className="pb-12">
      <PageHeader title="Clearance Form" backTo="/dashboard/employee/menu" />

      {/* Title and Divider */}
      <div className="text-center mt-8 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Clearance Approval
        </h2>
        <div className="border-b-2 border-primary"></div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <EmployeeClearanceFormTable forms={forms} onReview={handleReview} />
      </div>

      {/* Pagination Info */}
      <div className="mt-6 text-sm text-foreground/70 border-t border-border/30 pt-6">
        <p>
          Showing 1 - {Math.min(10, forms.length)} of {forms.length} entries
        </p>
      </div>

      {/* Review Modal */}
      <EmployeeClearanceFormReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReview}
        form={selectedFormForReview}
      />
    </div>
  );
}
