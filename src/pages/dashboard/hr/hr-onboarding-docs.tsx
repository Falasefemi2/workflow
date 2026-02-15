import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import { useOnboardingDocumentManagement } from "@/hooks/use-onboarding-docs";
import { Cloud } from "lucide-react";
import type { OnboardingDocument } from "@/components/mockData";

export default function OnboardingDocumentPage() {
  const {
    documents,
    isDialogOpen,
    documentToDelete,
    formData,
    isSubmitting,
    handleAddDocument,
    handleDeleteDocument,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setDocumentToDelete,
  } = useOnboardingDocumentManagement();

  // const handleDownload = (document: OnboardingDocument) => {
  //   // In a real app, this would trigger a download from the backend
  //   const link = document.createElement("a");
  //   link.href = document.filePath;
  //   link.download = document.fileName;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <div className="pb-12">
      <PageHeader
        title="Onboarding Documents"
        backTo="/dashboard/hr/system"
        actionLabel="Add Document"
        onActionClick={handleAddDocument}
      />

      {/* Table */}
      <div className="mt-8">
        <DataTable<OnboardingDocument>
          columns={[
            { key: "title", label: "Document" },
            { key: "fileName", label: "File" },
          ]}
          data={documents}
          onDelete={handleDeleteDocument}
          onEdit={undefined}
          totalEntries={documents.length}
        />
      </div>

      {/* Form Dialog */}
      <FormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        title="Add Document"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <FormField label="Title" required>
            <Input
              placeholder="Enter document name"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </FormField>

          {/* File Upload */}
          <FormField label="Add document" required>
            <div
              className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:bg-secondary/10 transition-colors"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = e.dataTransfer.files;
                if (files?.[0]) {
                  setFormData({ ...formData, file: files[0] });
                }
              }}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({ ...formData, file: e.target.files[0] });
                  }
                }}
                accept=".pdf,.doc,.docx,.txt,.xlsx,.pptx,.png,.jpg,.jpeg"
              />
              <div className="flex flex-col items-center gap-2">
                <Cloud className="w-12 h-12 text-foreground/30" />
                <h3 className="text-lg font-semibold text-foreground">
                  Select file(s) to upload
                </h3>
                <p className="text-sm text-foreground/60">
                  Minimum of 800px by 800px recommended for images
                </p>
              </div>
              <label htmlFor="file-upload">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  className="mt-6 px-6 py-2 text-primary hover:text-primary/80 font-medium text-sm"
                >
                  Browse Files
                </button>
              </label>
              {formData.file && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-700">
                    ✓ Selected: {formData.file.name}
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
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Document"}
            </Button>
          </div>
        </form>
      </FormDialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={documentToDelete !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDocumentToDelete(null);
          }
        }}
        title="Delete Document"
        description={`Are you sure you want to delete "${documentToDelete?.title ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
