import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface MemoData {
  department: string;
  dateCreated: string;
  memoCode: string;
  memoTitle: string;
  memoNotes: string;
  amount: string;
  amountInWords: string;
  beneficiary: string;
  signerName?: string;
  signerEmail?: string;
  documents: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

interface MemoPreviewProps {
  data: MemoData;
  onEdit: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  onPrint?: () => void;
}

export function MemoPreview({
  data,
  onEdit,
  onSubmit,
  isSubmitting = false,
  onPrint,
}: MemoPreviewProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="space-y-2">
      <div className="pb-6 border-b border-border/30">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
        >
          <span>←</span>
          <span>Return home</span>
        </button>
      </div>

      <div className="text-center py-6 border-b border-border/30">
        <h1 className="text-3xl font-bold text-foreground">
          INTERNAL MEMORANDUM
        </h1>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-foreground/70">
              Dated : {formatDate(data.dateCreated)}
            </p>
          </div>
          <div>
            <p className="text-sm text-foreground/70">
              Department: <strong>{data.department}</strong>
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-foreground/70">
            Subject: <strong>{data.memoTitle}</strong>
          </p>
        </div>

        <div>
          <p className="text-sm text-foreground/70 whitespace-pre-wrap">
            {data.memoNotes}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-border/30">
        <div>
          <p className="text-sm font-medium text-foreground">Memo Code</p>
          <p className="text-foreground/70">{data.memoCode}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Amount</p>
          <p className="text-foreground/70">{data.amount}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Amount in Words</p>
          <p className="text-foreground/70">{data.amountInWords}</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground">Beneficiary</p>
        <p className="text-foreground/70">{data.beneficiary}</p>
      </div>

      {data.signerName && (
        <div className="py-8">
          <div className="w-32 h-12 border-b border-foreground/30 mb-2"></div>
          <p className="text-sm font-medium text-foreground">
            {data.signerName}
          </p>
        </div>
      )}

      {data.documents.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-primary font-bold text-lg">DOCUMENT(S)</h3>
          <div className="border border-border/30 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="text-primary font-bold">
                    Documentation Name
                  </TableHead>
                  <TableHead className="text-primary font-bold">
                    Document Description
                  </TableHead>
                  <TableHead className="text-primary font-bold text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.documents.map((doc) => (
                  <TableRow key={doc.id} className="border-b border-border/30">
                    <TableCell className="text-foreground/70">
                      {doc.name}
                    </TableCell>
                    <TableCell className="text-foreground/70">
                      {doc.description}
                    </TableCell>
                    <TableCell className="text-center">
                      <button className="text-primary hover:text-primary/80 font-medium text-sm">
                        VIEW DOCUMENT
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <div className="flex gap-4 pt-6 border-t border-border/30">
        {onPrint && (
          <Button
            onClick={onPrint}
            className="bg-yellow-400 hover:bg-yellow-500 text-foreground font-medium w-48"
          >
            Print Memo
          </Button>
        )}
        <Button
          onClick={onEdit}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium w-48"
        >
          Edit memo
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-white font-medium w-48"
        >
          {isSubmitting ? "Submitting..." : "Submit For Approval"}
        </Button>
      </div>
    </div>
  );
}
