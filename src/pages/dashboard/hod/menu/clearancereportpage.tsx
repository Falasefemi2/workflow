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
import { useClearanceReportManagement } from "@/hooks/use-clearancereport";
import { ClearanceReportModal } from "./clearancereportmodal";

export default function ClearanceReportPage() {
  const menuBasePath = useMenuBasePath();
  const {
    reports,
    isReviewModalOpen,
    selectedReportForReview,
    handleReview,
    handleCloseReview,
  } = useClearanceReportManagement();

  return (
    <div className="pb-12">
      <PageHeader title="Clearance Report" backTo={menuBasePath} />

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
                  Staff Name
                </TableHead>
                <TableHead className="text-primary font-bold">
                  Exit/Retirement Type
                </TableHead>
                <TableHead className="text-primary font-bold">
                  Department
                </TableHead>
                <TableHead className="text-primary font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report, index) => (
                <TableRow
                  key={report.id}
                  className="border-b border-border/30 hover:bg-secondary/10 transition-colors"
                >
                  <TableCell className="text-foreground">{index + 1}</TableCell>
                  <TableCell className="text-foreground">
                    {report.staffName}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {report.exitRetirementType}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {report.department}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleReview(report)}
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

          {reports.length === 0 && (
            <div className="text-center py-8 text-foreground/70">
              <p>No clearance reports found</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-sm text-foreground/70 border-t border-border/30 pt-6">
        <p>
          Showing 1 - {Math.min(10, reports.length)} of {reports.length} entries
        </p>
      </div>

      <ClearanceReportModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReview}
        report={selectedReportForReview}
      />
    </div>
  );
}


