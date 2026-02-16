import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/shared/form-field";
import type { HandoverNotesData } from "@/hooks/use-exitretirementform";

interface HandoverNotesTabProps {
  formData: HandoverNotesData;
  setFormData: (data: HandoverNotesData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function HandoverNotesTab({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: HandoverNotesTabProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Upload Handover Notes */}
      <FormField label="Upload Handover Notes">
        <div
          className="border-2 border-dashed border-border/30 rounded-lg p-8 text-center hover:bg-secondary/10 transition-colors"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const files = e.dataTransfer.files;
            if (files?.[0]) {
              setFormData({ ...formData, handoverNotesFile: files[0] });
            }
          }}
        >
          <input
            type="file"
            id="handover-notes"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFormData({
                  ...formData,
                  handoverNotesFile: e.target.files[0],
                });
              }
            }}
            accept=".pdf,.doc,.docx"
          />
          <label htmlFor="handover-notes" className="cursor-pointer">
            <div className="space-y-2">
              <p className="text-foreground/70">Choose file to upload</p>
              <button
                type="button"
                onClick={() =>
                  document.getElementById("handover-notes")?.click()
                }
                className="text-primary hover:text-primary/80 font-medium"
              >
                Browse file
              </button>
            </div>
          </label>
          {formData.handoverNotesFile && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-700">
                ✓ Selected: {formData.handoverNotesFile.name}
              </p>
            </div>
          )}
        </div>
      </FormField>

      {/* Employee's Name */}
      <FormField label="Employee's Name">
        <Input
          value={formData.employeeName}
          onChange={(e) =>
            setFormData({ ...formData, employeeName: e.target.value })
          }
          readOnly
          className="bg-gray-50"
        />
      </FormField>

      {/* Date */}
      <FormField label="Date">
        <Input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </FormField>

      {/* Append Signature Checkbox */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="append-sig"
          checked={formData.appendSignature}
          onCheckedChange={(checked) =>
            setFormData({
              ...formData,
              appendSignature: checked as boolean,
            })
          }
        />
        <label
          htmlFor="append-sig"
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
