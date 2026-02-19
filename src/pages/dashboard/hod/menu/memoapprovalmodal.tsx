import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type {
  MemoApprovalReviewData,
  MemoApprovalRecord,
} from "@/components/mockData";

interface MemoApprovalReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: MemoApprovalReviewData;
  memo: MemoApprovalRecord | null;
  setFormData: (data: MemoApprovalReviewData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function MemoApprovalReviewModal({
  isOpen,
  onClose,
  formData,
  memo,
  setFormData,
}: MemoApprovalReviewModalProps) {
  if (!memo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-scroll flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/30 pb-4">
          <button
            onClick={onClose}
            className="text-primary font-medium flex items-center gap-2"
          >
            ← Return home
          </button>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1">
          <div className="pr-4 space-y-6">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center">
              INTERNAL MEMORANDUM
            </h1>

            {/* Memo Header Info */}
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Dated :</span> {memo.memoDate}{" "}
                {memo.memoTime}
              </p>
              <p>
                <span className="font-medium">To:</span> {memo.toEmail}
              </p>
              <p>
                <span className="font-medium">From:</span> {memo.fromEmail}
              </p>
              <p>
                <span className="font-medium">Department:</span>{" "}
                {memo.department}
              </p>
              <p>
                <span className="font-medium">Subject:</span> {memo.subject}
              </p>
            </div>

            {/* Memo Content */}
            {memo.content && (
              <div className="border-t border-border/30 pt-6">
                <p className="font-medium mb-2">
                  BEING REQUEST OF # 50, 000. 00 APPROVAL OF BUSINESS
                  REGISTRATION & DEVELOPMENT LEVY 2026 - VATEBRA LIMITES
                </p>
                <p className="text-foreground/70">{memo.content}</p>
              </div>
            )}

            {/* Documents Table */}
            {memo.documents && memo.documents.length > 0 && (
              <div className="border-t border-border/30 pt-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left text-primary font-bold pb-3">
                        Documentation Name
                      </th>
                      <th className="text-left text-primary font-bold pb-3">
                        Document Description
                      </th>
                      <th className="text-left text-primary font-bold pb-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {memo.documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-border/30">
                        <td className="py-4 text-sm text-foreground">
                          {doc.name}
                        </td>
                        <td className="py-4 text-sm text-foreground">
                          {doc.description}
                        </td>
                        <td className="py-4">
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-yellow-600 hover:text-yellow-700 font-medium"
                          >
                            VIEW DOCUMENT
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* HOD Comment */}
            {memo.hodComment && (
              <div className="border-t border-border/30 pt-6 space-y-3">
                <p className="font-medium">HOD's comment</p>
                <textarea
                  value={memo.hodComment}
                  readOnly
                  className="w-full p-4 border border-border/30 rounded-lg resize-none text-sm bg-card min-h-30"
                />
              </div>
            )}

            {/* Approval Actions */}
            <div className="border-t border-border/30 pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, action: "approve" })
                  }
                  className={`${
                    formData.action === "approve" ? "bg-primary" : "bg-primary"
                  } text-white font-medium py-3`}
                >
                  Approve
                </Button>
                <Button
                  type="button"
                  onClick={() => setFormData({ ...formData, action: "reject" })}
                  className={`${
                    formData.action === "reject"
                      ? "bg-gray-700 hover:bg-gray-800"
                      : "bg-gray-600 hover:bg-gray-700"
                  } text-white font-medium py-3`}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
