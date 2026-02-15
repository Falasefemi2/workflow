import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UpdateStatusFormData } from "@/hooks/use-candidate-offer";

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: UpdateStatusFormData;
  setFormData: (data: UpdateStatusFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  action: "onboard" | "withdraw" | null;
}

export function UpdateStatusModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  action,
}: UpdateStatusModalProps) {
  const getActionButtonLabel = () => {
    return action === "onboard" ? "Onboard Candidate" : "Withdraw";
  };

  return (
    <FormDialog isOpen={isOpen} onClose={onClose} title="Update Status">
      <form onSubmit={onSubmit} className="space-y-6">
        {action && (
          <Button
            type="button"
            className="w-full py-3 font-semibold bg-primary text-white hover:bg-primary/90"
          >
            {getActionButtonLabel()}
          </Button>
        )}

        <FormField label="New Start Date" required>
          <Input
            type="date"
            value={formData.newStartDate}
            onChange={(e) =>
              setFormData({ ...formData, newStartDate: e.target.value })
            }
          />
        </FormField>

        <FormField label="Official E-mail" required>
          <Input
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </FormField>

        <FormField label="Comment" required>
          <textarea
            placeholder="Enter comment"
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            className="w-full p-3 border border-dashed border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[160px]"
          />
        </FormField>

        <div className="flex gap-4 justify-end pt-6 border-t border-border/30">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary">
            Confirm
          </Button>
        </div>
      </form>
    </FormDialog>
  );
}
