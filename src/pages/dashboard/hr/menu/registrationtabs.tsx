import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/form-field";
import type { ResignationFormData } from "@/hooks/use-exitretirementform";

interface ResignationFormTabProps {
  formData: ResignationFormData;
  setFormData: (data: ResignationFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function ResignationFormTab({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: ResignationFormTabProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Alternative Email */}
      <FormField label="Alternative email address">
        <Input
          placeholder="Alternative email address"
          value={formData.alternativeEmail}
          onChange={(e) =>
            setFormData({ ...formData, alternativeEmail: e.target.value })
          }
        />
      </FormField>

      {/* Disengagement Date */}
      <FormField label="Disengagement date">
        <Input
          type="date"
          value={formData.disengagementDate}
          onChange={(e) =>
            setFormData({ ...formData, disengagementDate: e.target.value })
          }
        />
      </FormField>

      {/* Reason for Resignation */}
      <FormField label="Reason for Resignation">
        <textarea
          placeholder="I have decided to pursue a new opportunity that aligns with my long-term career goals and offers further avenues for professional growth."
          value={formData.reasonForResignation}
          onChange={(e) =>
            setFormData({ ...formData, reasonForResignation: e.target.value })
          }
          className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
        />
      </FormField>

      {/* Upload Resignation Letter */}
      <FormField label="Upload Resignation Letter" required>
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
              setFormData({ ...formData, resignationLetter: files[0] });
            }
          }}
        >
          <input
            type="file"
            id="resignation-letter"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFormData({
                  ...formData,
                  resignationLetter: e.target.files[0],
                });
              }
            }}
            accept=".pdf,.doc,.docx"
          />
          <label htmlFor="resignation-letter" className="cursor-pointer">
            <div className="space-y-2">
              <p className="text-foreground/70">Choose file to upload</p>
              <button
                type="button"
                onClick={() =>
                  document.getElementById("resignation-letter")?.click()
                }
                className="text-primary hover:text-primary/80 font-medium"
              >
                Browse file
              </button>
            </div>
          </label>
          {formData.resignationLetter && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-700">
                ✓ Selected: {formData.resignationLetter.name}
              </p>
            </div>
          )}
        </div>
      </FormField>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button
          type="submit"
          className="w-full bg-primary text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
