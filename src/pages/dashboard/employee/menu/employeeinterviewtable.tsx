import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { EmployeeExitInterview } from "@/components/mockData";

interface EmployeeExitInterviewTableProps {
  interviews: EmployeeExitInterview[];
  onPreview: (interview: EmployeeExitInterview) => void;
}

export function EmployeeExitInterviewTable({
  interviews,
  onPreview,
}: EmployeeExitInterviewTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="rounded-lg border border-border/30 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-card border-b border-border/30">
            <TableHead className="text-primary font-bold">S/N</TableHead>
            <TableHead className="text-primary font-bold">
              Employee's Name
            </TableHead>
            <TableHead className="text-primary font-bold">
              Disengagement Date
            </TableHead>
            <TableHead className="text-primary font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interviews.map((interview, index) => (
            <TableRow
              key={interview.id}
              className="border-b border-border/30 hover:bg-secondary/10 transition-colors"
            >
              <TableCell className="text-foreground">{index + 1}</TableCell>
              <TableCell className="text-foreground">
                {interview.employeeName}
              </TableCell>
              <TableCell className="text-foreground">
                {formatDate(interview.disengagementDate)}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => onPreview(interview)}
                  variant="ghost"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 font-medium"
                >
                  Preview
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {interviews.length === 0 && (
        <div className="text-center py-8 text-foreground/70">
          <p>No interviews found</p>
        </div>
      )}
    </div>
  );
}
