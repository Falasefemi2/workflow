import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useExitInterviewManagement } from "@/hooks/use-exit-interview";
import { ExitInterviewPreviewModal } from "./exit-interview-modal";
import { useNavigate } from "react-router";

export default function ExitInterviewPage() {
  const {
    interviews,
    isPreviewModalOpen,
    selectedInterviewForPreview,
    handlePreview,
    handleClosePreview,
  } = useExitInterviewManagement();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const navigate = useNavigate();
  return (
    <div className="pb-12">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8 pb-6 border-b border-border/30">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="flex items-center gap-2 text-primary hover:text-primary/80"
        >
          <span>←</span>
          <span>Return home</span>
        </button>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-foreground">
          Exit Interview
        </h2>
      </div>

      {/* Divider */}
      <div className="border-b-2 border-primary mb-8"></div>

      {/* Table */}
      <div className="rounded-lg border border-border/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/30">
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
                    onClick={() => handlePreview(interview)}
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
      </div>

      {/* Pagination Info */}
      <div className="mt-6 text-sm text-foreground/70 border-t border-border/30 pt-6">
        <p>
          Showing 1 - {Math.min(10, interviews.length)} of {interviews.length}{" "}
          entries
        </p>
      </div>

      {/* Preview Modal */}
      <ExitInterviewPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleClosePreview}
        interview={selectedInterviewForPreview}
      />
    </div>
  );
}
