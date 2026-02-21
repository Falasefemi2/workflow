import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { CandidateOfferRequest } from "@/components/mockData";

interface CandidateOfferTableProps {
  leaves: CandidateOfferRequest[];
  onViewDetails: (leave: CandidateOfferRequest) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Approved":
      return "text-green-600";
    case "Rejected":
      return "text-red-600";
    default:
      return "text-foreground";
  }
};

export function CandidateOfferTable({
  leaves,
  onViewDetails,
}: CandidateOfferTableProps) {
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
              Employee Name
            </TableHead>
            <TableHead className="text-primary font-bold">Department</TableHead>
            <TableHead className="text-primary font-bold">
              Proposed start date
            </TableHead>
            <TableHead className="text-primary font-bold">Status</TableHead>
            <TableHead className="text-primary font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave, index) => (
            <TableRow
              key={leave.id}
              className="border-b border-border/30 hover:bg-secondary/10 transition-colors"
            >
              <TableCell className="text-foreground">{index + 1}</TableCell>
              <TableCell className="text-foreground">
                {leave.employeeName}
              </TableCell>
              <TableCell className="text-foreground">
                {leave.department}
              </TableCell>
              <TableCell className="text-foreground">
                {formatDate(leave.proposedStartDate)}
              </TableCell>
              <TableCell
                className={`font-medium ${getStatusColor(leave.status)}`}
              >
                {leave.status}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => onViewDetails(leave)}
                  variant="ghost"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 font-medium underline"
                >
                  View details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {leaves.length === 0 && (
        <div className="text-center py-8 text-foreground/70">
          <p>No leave offer found</p>
        </div>
      )}
    </div>
  );
}
