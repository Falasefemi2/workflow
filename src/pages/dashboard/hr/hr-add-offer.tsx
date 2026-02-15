import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  mockCandidateOptions,
  mockDepartmentOptions,
  mockUnitOptions,
  mockLevelOptions,
} from "@/components/mockData";
import type { AddOfferFormData } from "@/hooks/use-candidate-offer";

interface AddOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: AddOfferFormData;
  setFormData: (data: AddOfferFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddOfferModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
}: AddOfferModalProps) {
  return (
    <FormDialog isOpen={isOpen} onClose={onClose} title="Add New Offer">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Employee Name */}
        <FormField label="Candidate" required>
          <Select
            value={formData.employeeName}
            onValueChange={(value) =>
              setFormData({ ...formData, employeeName: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="--Select candidate--" />
            </SelectTrigger>
            <SelectContent>
              {mockCandidateOptions.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        {/* Department */}
        <FormField label="Department" required>
          <Select
            value={formData.department}
            onValueChange={(value) =>
              setFormData({ ...formData, department: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="--Select department--" />
            </SelectTrigger>
            <SelectContent>
              {mockDepartmentOptions.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        {/* Unit */}
        <FormField label="Unit" required>
          <Select
            value={formData.unit}
            onValueChange={(value) => setFormData({ ...formData, unit: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="--Select unit--" />
            </SelectTrigger>
            <SelectContent>
              {mockUnitOptions.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        {/* Level */}
        <FormField label="Level" required>
          <Select
            value={formData.level}
            onValueChange={(value) =>
              setFormData({ ...formData, level: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="--Select level--" />
            </SelectTrigger>
            <SelectContent>
              {mockLevelOptions.map((option) => (
                <SelectItem key={option.id} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        {/* Proposed Start Date */}
        <FormField label="Proposed Start Date" required>
          <Input
            type="date"
            value={formData.proposedStartDate}
            onChange={(e) =>
              setFormData({ ...formData, proposedStartDate: e.target.value })
            }
          />
        </FormField>

        {/* Submit Buttons */}
        <div className="flex gap-4 justify-end pt-6 border-t border-border/30">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary">
            Add Offer
          </Button>
        </div>
      </form>
    </FormDialog>
  );
}
