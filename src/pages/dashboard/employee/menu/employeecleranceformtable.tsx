import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { EmployeeClearanceForm } from "@/components/mockData";

interface EmployeeClearanceFormTableProps {
  forms: EmployeeClearanceForm[];
  onReview: (form: EmployeeClearanceForm) => void;
}

export function EmployeeClearanceFormTable({
  forms,
  onReview,
}: EmployeeClearanceFormTableProps) {
  return (
    <div className="rounded-lg border border-border/30 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-card border-b border-border/30">
            <TableHead className="text-primary font-bold">S/N</TableHead>
            <TableHead className="text-primary font-bold">Staff Name</TableHead>
            <TableHead className="text-primary font-bold">Department</TableHead>
            <TableHead className="text-primary font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form, index) => (
            <TableRow
              key={form.id}
              className="border-b border-border/30 hover:bg-secondary/10 transition-colors"
            >
              <TableCell className="text-foreground">{index + 1}</TableCell>
              <TableCell className="text-foreground">
                {form.staffName}
              </TableCell>
              <TableCell className="text-foreground">
                {form.department}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => onReview(form)}
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

      {forms.length === 0 && (
        <div className="text-center py-8 text-foreground/70">
          <p>No forms found</p>
        </div>
      )}
    </div>
  );
}
