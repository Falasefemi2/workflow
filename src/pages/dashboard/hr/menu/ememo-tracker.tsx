import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMenuBasePath } from "../../shared/use-menu-base-path";

type MemoStatus = "Pending" | "Rejected" | "Approved";

interface EMemoTrackerItem {
  id: number;
  createdBy: string;
  dateCreated: string;
  memoCode: string;
  title: string;
  amount: string;
  amountInWords: string;
  status: MemoStatus;
}

const trackerRows: EMemoTrackerItem[] = [
  {
    id: 1,
    createdBy: "John Doe",
    dateCreated: "10/05/2025",
    memoCode: "Vat10123",
    title: "Asset Acquisition",
    amount: "₦ 50,000.00",
    amountInWords: "Fifty thousand naira",
    status: "Pending",
  },
  {
    id: 2,
    createdBy: "John Doe",
    dateCreated: "10/05/2025",
    memoCode: "Vat10123",
    title: "Asset Acquisition",
    amount: "₦ 50,000.00",
    amountInWords: "Fifty thousand naira",
    status: "Pending",
  },
  {
    id: 3,
    createdBy: "John Doe",
    dateCreated: "10/05/2025",
    memoCode: "Vat10123",
    title: "Asset Acquisition",
    amount: "₦ 50,000.00",
    amountInWords: "Fifty thousand naira",
    status: "Rejected",
  },
  {
    id: 4,
    createdBy: "John Doe",
    dateCreated: "10/05/2025",
    memoCode: "Vat10123",
    title: "Asset Acquisition",
    amount: "₦ 50,000.00",
    amountInWords: "Fifty thousand naira",
    status: "Rejected",
  },
  {
    id: 5,
    createdBy: "John Doe",
    dateCreated: "10/05/2025",
    memoCode: "Vat10123",
    title: "Asset Acquisition",
    amount: "₦ 50,000.00",
    amountInWords: "Fifty thousand naira",
    status: "Approved",
  },
  {
    id: 6,
    createdBy: "John Doe",
    dateCreated: "10/05/2025",
    memoCode: "Vat10123",
    title: "Asset Acquisition",
    amount: "₦ 50,000.00",
    amountInWords: "Fifty thousand naira",
    status: "Rejected",
  },
  {
    id: 7,
    createdBy: "John Doe",
    dateCreated: "10/05/2025",
    memoCode: "Vat10123",
    title: "Asset Acquisition",
    amount: "₦ 50,000.00",
    amountInWords: "Fifty thousand naira",
    status: "Approved",
  },
  {
    id: 8,
    createdBy: "John Doe",
    dateCreated: "10/05/2025",
    memoCode: "Vat10123",
    title: "Asset Acquisition",
    amount: "₦ 50,000.00",
    amountInWords: "Fifty thousand naira",
    status: "Approved",
  },
];

const getStatusClassName = (status: MemoStatus) => {
  if (status === "Pending") return "text-amber-500";
  if (status === "Rejected") return "text-primary";
  return "text-indigo-500";
};

export default function EMemoTrackerPage() {
  const navigate = useNavigate();
  const menuBasePath = useMenuBasePath();
  const [selectedMemo, setSelectedMemo] = useState<EMemoTrackerItem | null>(
    null,
  );

  return (
    <div className="pb-12">
      <div className="border-b border-border/30">
        <div className="max-w-300 px-6 py-4 flex items-center gap-8">
          <button
            type="button"
            onClick={() => navigate(menuBasePath)}
            className="inline-flex items-center gap-2 text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
            <span className="font-medium">Return home</span>
          </button>
        </div>
      </div>

      <div className="px-6 pt-14">
        <div className="max-w-300 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-primary">S/N</TableHead>
                <TableHead className="text-primary">Created by</TableHead>
                <TableHead className="text-primary">Date Created</TableHead>
                <TableHead className="text-primary">Memo code</TableHead>
                <TableHead className="text-primary">Title</TableHead>
                <TableHead className="text-primary">Amount</TableHead>
                <TableHead className="text-primary">Amount(in words)</TableHead>
                <TableHead className="text-primary">Status</TableHead>
                <TableHead className="text-primary">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trackerRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.createdBy}</TableCell>
                  <TableCell>{row.dateCreated}</TableCell>
                  <TableCell>{row.memoCode}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.amountInWords}</TableCell>
                  <TableCell className={getStatusClassName(row.status)}>
                    {row.status}
                  </TableCell>
                  <TableCell>
                    {row.status === "Rejected" ? (
                      <button
                        type="button"
                        onClick={() => navigate(`${menuBasePath}/ememo-registration`)}
                        className="inline-flex items-center gap-1 text-primary text-sm"
                      >
                        Edit
                        <Pencil className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedMemo(row)}
                        className="text-primary text-sm"
                      >
                        View
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog
        open={selectedMemo !== null}
        onOpenChange={(open) => !open && setSelectedMemo(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-3xl w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden flex flex-col"
        >
          <DialogTitle className="sr-only">E-memo Tracker Details</DialogTitle>
          <DialogDescription className="sr-only">
            Detailed tracker information for selected e-memo.
          </DialogDescription>

          <div className="px-6 py-5 border-b border-border/30 flex items-center justify-between">
            <h2 className="text-primary text-2xl font-bold">
              E-memo Tracker Details
            </h2>
            <button
              type="button"
              onClick={() => setSelectedMemo(null)}
              className="text-foreground/70 hover:text-foreground text-2xl font-semibold"
            >
              ×
            </button>
          </div>

          {selectedMemo && (
            <ScrollArea className="flex-1">
              <div className="p-6">
                <div className="grid grid-cols-[180px_1fr] gap-y-6 text-sm">
                  <p className="text-foreground/75 font-medium">Created By:</p>
                  <p className="font-semibold">{selectedMemo.createdBy}</p>

                  <p className="text-foreground/75 font-medium">
                    Date Created:
                  </p>
                  <p className="font-semibold">23/07/2024</p>

                  <p className="text-foreground/75 font-medium">Memo Code:</p>
                  <p className="font-semibold">MC2023-749</p>

                  <p className="text-foreground/75 font-medium">Title:</p>
                  <p className="font-semibold">{selectedMemo.title}</p>

                  <p className="text-foreground/75 font-medium">Amount:</p>
                  <p className="font-semibold">{selectedMemo.amount}</p>

                  <p className="text-foreground/75 font-medium">
                    Amount In Words:
                  </p>
                  <p className="font-semibold">{selectedMemo.amountInWords}</p>

                  <p className="text-foreground/75 font-medium">Status:</p>
                  <div>
                    <span className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-xs font-medium text-amber-500">
                      Pending Internal Auditor Approval
                    </span>
                  </div>
                </div>

                <div className="mt-8 space-y-5">
                  <div className="bg-muted/20 border border-border/30 rounded-md p-5">
                    <p className="text-sm font-semibold">HOD&apos;s Comment</p>
                    <p className="mt-3 text-sm text-foreground/70">
                      Noted. Please proceed with the necessary actions and keep
                      my office informed of progress.
                    </p>
                  </div>

                  <div className="bg-muted/20 border border-border/30 rounded-md p-5">
                    <p className="text-sm font-semibold">
                      Auditor&apos;s Comment
                    </p>
                    <p className="mt-3 text-sm text-foreground/70">
                      Noted. Please proceed with the necessary actions and keep
                      my office informed of progress.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
