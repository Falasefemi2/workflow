import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/shared/form-field";
import {
  mockApprovalStatusOptions,
  type ResignationFormReviewData,
} from "@/components/mockData";

interface ResignationFormApprovalReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ResignationFormReviewData;
  setFormData: (data: ResignationFormReviewData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function ResignationFormApprovalReviewModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: ResignationFormApprovalReviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-primary">
              Review resignation Form
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Staff Name */}
          <FormField label="Staff Name">
            <Input value={formData.staffName} readOnly className="bg-gray-50" />
          </FormField>

          {/* Disengagement Date */}
          <FormField label="Disengagement date">
            <Input
              value={formData.disengagementDate}
              readOnly
              className="bg-gray-50"
            />
          </FormField>

          {/* Review Date */}
          <FormField label="Date">
            <Input
              type="date"
              placeholder="--Select date--"
              value={formData.reviewDate}
              onChange={(e) =>
                setFormData({ ...formData, reviewDate: e.target.value })
              }
            />
          </FormField>

          {/* Approve/Reject */}
          <FormField label="Approve/Reject">
            <Select
              value={formData.approvalStatus}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  approvalStatus: value,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select option--" />
              </SelectTrigger>
              <SelectContent>
                {mockApprovalStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Comment */}
          <FormField label="Comment">
            <textarea
              placeholder="Write a comment..."
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-30"
            />
          </FormField>

          {/* Save Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
