import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { EmployeeHandoverDocument } from "@/components/mockData";

interface EmployeeHandoverDocumentsTableProps {
  documents: EmployeeHandoverDocument[];
  onReview: (document: EmployeeHandoverDocument) => void;
}

export function EmployeeHandoverDocumentsTable({
  documents,
  onReview,
}: EmployeeHandoverDocumentsTableProps) {
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
              Submission date
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
                  onClick={() => onReview(document)}
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
          <p>No documents found</p>
        </div>
      )}
    </div>
  );
}
