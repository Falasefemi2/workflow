import { PageHeader } from "@/components/shared/page-header";
import { useEmployeeExitInterviewManagement } from "@/hooks/use-employee-exitinterview";
import { EmployeeExitInterviewTable } from "./employeeinterviewtable";
import { EmployeeExitInterviewPreviewModal } from "./employeeinterviewpreviewmodal";

export default function EmployeeExitInterviewFormPage() {
  const {
    interviews,
    isPreviewModalOpen,
    selectedInterviewForPreview,
    handlePreview,
    handleClosePreview,
  } = useEmployeeExitInterviewManagement();

  return (
    <div className="pb-12">
      <PageHeader
        title="Exit Interview Form"
        backTo="/dashboard/employee/menu"
      />

      {/* Title and Divider */}
      <div className="text-center mt-8 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Exit Interview
        </h2>
        <div className="border-b-2 border-primary"></div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <EmployeeExitInterviewTable
          interviews={interviews}
          onPreview={handlePreview}
        />
      </div>

      {/* Pagination Info */}
      <div className="mt-6 text-sm text-foreground/70 border-t border-border/30 pt-6">
        <p>
          Showing 1 - {Math.min(10, interviews.length)} of {interviews.length}{" "}
          entries
        </p>
      </div>

      {/* Preview Modal */}
      <EmployeeExitInterviewPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleClosePreview}
        interview={selectedInterviewForPreview}
      />
    </div>
  );
}
