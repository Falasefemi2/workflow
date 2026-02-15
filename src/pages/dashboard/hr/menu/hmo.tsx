import { PageHeader } from "@/components/shared/page-header";
import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHMOManagement } from "@/hooks/use-hmo";
import { mockHMOOptions } from "@/components/mockData";
import { Download } from "lucide-react";

export default function HMOPage() {
  const {
    employeeHMOs,
    isApplyHMODialogOpen,
    formData,
    isSubmitting,
    handleApplyHMO,
    handleSubmitHMO,
    handleDownloadForm,
    setFormData,
    setIsApplyHMODialogOpen,
  } = useHMOManagement();

  return (
    <div className="pb-12">
      <PageHeader
        title="HMO"
        backTo="/dashboard/hr/menu"
        actionLabel="Apply for HMO"
        onActionClick={handleApplyHMO}
      />

      {/* Table */}
      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-primary">
                HMO Service Provider
              </TableHead>
              <TableHead className="text-primary">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeHMOs.length > 0 ? (
              employeeHMOs.map((hmo) => (
                <TableRow key={hmo.id}>
                  <TableCell>{hmo.hmoServiceProvider}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDownloadForm(hmo)}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center py-8 text-foreground/70"
                >
                  No HMO applications yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Apply for HMO Modal */}
      <FormDialog
        isOpen={isApplyHMODialogOpen}
        onClose={() => {
          setIsApplyHMODialogOpen(false);
        }}
        title="Apply for HMO"
      >
        <form onSubmit={handleSubmitHMO} className="space-y-6">
          {/* Select HMO */}
          <FormField label="Select HMO" required>
            <Select
              value={formData.selectedHMO}
              onValueChange={(value) =>
                setFormData({ ...formData, selectedHMO: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select HMO--" />
              </SelectTrigger>
              <SelectContent>
                {mockHMOOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Upload HMO Form */}
          <FormField label="Upload HMO Form" required>
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/10 transition-colors"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = e.dataTransfer.files;
                if (files?.[0]) {
                  setFormData({ ...formData, formFile: files[0] });
                }
              }}
            >
              <input
                type="file"
                id="hmo-file-upload"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({ ...formData, formFile: e.target.files[0] });
                  }
                }}
                accept=".pdf,.doc,.docx"
              />
              <label htmlFor="hmo-file-upload" className="cursor-pointer">
                <div className="space-y-2">
                  <p className="text-foreground/70">Choose file to upload</p>
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("hmo-file-upload")?.click()
                    }
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Browse file
                  </button>
                </div>
              </label>
              {formData.formFile && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-700">
                    ✓ Selected: {formData.formFile.name}
                  </p>
                </div>
              )}
            </div>
          </FormField>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end pt-6 border-t border-border/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsApplyHMODialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </FormDialog>
    </div>
  );
}
