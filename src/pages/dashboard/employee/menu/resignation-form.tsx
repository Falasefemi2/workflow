import { PageHeader } from "@/components/shared/page-header";
import { useEmployeeClearanceReportManagement } from "@/hooks/use-employeeclerancereport";
import { EmployeeClearanceReportTable } from "./employeeclerancetable";
import { EmployeeClearanceReportReviewModal } from "./employeeclearancereportreviewmodal";

export default function EmployeeClearanceReportPage() {
  const {
    reports,
    isReviewModalOpen,
    selectedReportForReview,
    handleReview,
    handleCloseReview,
  } = useEmployeeClearanceReportManagement();

  return (
    <div className="pb-12">
      <PageHeader title="Clearance Report" backTo="/dashboard/employee/menu" />

      {/* Title and Divider */}
      <div className="text-center mt-8 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Clearance Report
        </h2>
        <div className="border-b-2 border-primary"></div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <EmployeeClearanceReportTable
          reports={reports}
          onReview={handleReview}
        />
      </div>

      {/* Pagination Info */}
      <div className="mt-6 text-sm text-foreground/70 border-t border-border/30 pt-6">
        <p>
          Showing 1 - {Math.min(10, reports.length)} of {reports.length} entries
        </p>
      </div>

      {/* Review Modal */}
      <EmployeeClearanceReportReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReview}
        report={selectedReportForReview}
      />
    </div>
  );
}
