import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/shared/form-field";
import type { ClearanceFormData } from "@/hooks/use-exitretirementform";

interface ClearanceFormTabProps {
  formData: ClearanceFormData;
  setFormData: (data: ClearanceFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function ClearanceFormTab({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: ClearanceFormTabProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Candidate Name */}
      <FormField label="Candidate Name">
        <Input
          value={formData.candidateName}
          onChange={(e) =>
            setFormData({ ...formData, candidateName: e.target.value })
          }
          readOnly
          className="bg-gray-50"
        />
      </FormField>

      {/* Designation */}
      <FormField label="Designation">
        <Input
          value={formData.designation}
          onChange={(e) =>
            setFormData({ ...formData, designation: e.target.value })
          }
          readOnly
          className="bg-gray-50"
        />
      </FormField>

      {/* Department */}
      <FormField label="Department">
        <Input
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
          readOnly
          className="bg-gray-50"
        />
      </FormField>

      {/* Date Employed */}
      <FormField label="Date Employed">
        <Input
          value={formData.dateEmployed}
          onChange={(e) =>
            setFormData({ ...formData, dateEmployed: e.target.value })
          }
          readOnly
          className="bg-gray-50"
        />
      </FormField>

      {/* Date of Leaving Service */}
      <FormField label="Date of Leaving Service">
        <Input
          value={formData.dateOfLeavingService}
          onChange={(e) =>
            setFormData({ ...formData, dateOfLeavingService: e.target.value })
          }
          readOnly
          className="bg-gray-50"
        />
      </FormField>

      {/* Append Signature Checkbox */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="append-sig-clearance"
          checked={formData.appendSignature}
          onCheckedChange={(checked) =>
            setFormData({
              ...formData,
              appendSignature: checked as boolean,
            })
          }
        />
        <label
          htmlFor="append-sig-clearance"
          className="text-sm text-foreground cursor-pointer"
        >
          Append Signature
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button
          type="submit"
          className="w-full bg-primary text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
