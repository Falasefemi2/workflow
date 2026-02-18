import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { EmployeeClearanceReport } from "@/components/mockData";

interface EmployeeClearanceReportTableProps {
  reports: EmployeeClearanceReport[];
  onReview: (report: EmployeeClearanceReport) => void;
}

export function EmployeeClearanceReportTable({
  reports,
  onReview,
}: EmployeeClearanceReportTableProps) {
  return (
    <div className="rounded-lg border border-border/30 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-card border-b border-border/30">
            <TableHead className="text-primary font-bold">S/N</TableHead>
            <TableHead className="text-primary font-bold">Staff Name</TableHead>
            <TableHead className="text-primary font-bold">
              Exit/Retirement Type
            </TableHead>
            <TableHead className="text-primary font-bold">Department</TableHead>
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
                  onClick={() => onReview(report)}
                  variant="ghost"
                  className="text-primary font-medium"
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
          <p>No reports found</p>
        </div>
      )}
    </div>
  );
}
