import { Button } from "@/components/ui/button";
import { useEmployeeDocumentsManagement } from "@/hooks/use-employeedocument";
import { X } from "lucide-react";
import { documentTypeOptions } from "@/components/mockData";
import { AddDocumentDialog } from "./employee-documentmodal";

export default function EmployeeProfileEmploymentDocumentPage() {
  const {
    academicDocuments,
    otherDocuments,
    isAddDocumentDialogOpen,
    addDocumentFormData,
    isSubmitting,
    handleAcademicDocumentUpload,
    handleChangeOfNameUpload,
    handleOpenAddDocumentDialog,
    handleCloseAddDocumentDialog,
    handleSubmitAddDocument,
    handleDeleteAdditionalDocument,
    setAddDocumentFormData,
  } = useEmployeeDocumentsManagement();

  const handleAcademicFileChange = (
    field: keyof typeof academicDocuments,
    files: FileList | null,
  ) => {
    if (files?.[0]) {
      handleAcademicDocumentUpload(field, files[0]);
    }
  };

  const getDocumentTypeName = (value: string) => {
    const option = documentTypeOptions.find((opt) => opt.value === value);
    return option?.label || value;
  };

  return (
    <div className="pb-12">
      {/* Academics Section */}
      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-foreground mb-6">ACADEMICS</h2>

        {/* Row 1 - 3 columns */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* First School Leaving Certificate */}
          <div>
            <label className="block font-semibold text-foreground mb-3">
              First School leaving Certificate{" "}
              <span className="text-primary">*</span>
            </label>
            <div
              className="border-2 border-dashed border-border/30 rounded-lg p-4 text-center hover:bg-secondary/10 transition-colors"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = e.dataTransfer.files;
                if (files?.[0]) {
                  handleAcademicDocumentUpload(
                    "firstSchoolLeavingCertificate",
                    files[0],
                  );
                }
              }}
            >
              <input
                type="file"
                id="first-school"
                className="hidden"
                onChange={(e) =>
                  handleAcademicFileChange(
                    "firstSchoolLeavingCertificate",
                    e.target.files,
                  )
                }
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="first-school" className="cursor-pointer">
                <div className="space-y-2">
                  <p className="text-foreground/70 text-sm">
                    Choose file to upload
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("first-school")?.click()
                    }
                    className="text-primary hover:text-primary/80 font-medium text-sm"
                  >
                    Browse file
                  </button>
                </div>
              </label>
            </div>
          </div>

          {/* University Certificate */}
          <div>
            <label className="block font-semibold text-foreground mb-3">
              University certificate <span className="text-primary">*</span>
            </label>
            <div
              className="border-2 border-dashed border-border/30 rounded-lg p-4 text-center hover:bg-secondary/10 transition-colors"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = e.dataTransfer.files;
                if (files?.[0]) {
                  handleAcademicDocumentUpload(
                    "universityCertificate",
                    files[0],
                  );
                }
              }}
            >
              <input
                type="file"
                id="university"
                className="hidden"
                onChange={(e) =>
                  handleAcademicFileChange(
                    "universityCertificate",
                    e.target.files,
                  )
                }
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="university" className="cursor-pointer">
                <div className="space-y-2">
                  <p className="text-foreground/70 text-sm">
                    Choose file to upload
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("university")?.click()
                    }
                    className="text-primary hover:text-primary/80 font-medium text-sm"
                  >
                    Browse file
                  </button>
                </div>
              </label>
            </div>
          </div>

          {/* NYSC Certificate */}
          <div>
            <label className="block font-semibold text-foreground mb-3">
              NYSC certificate <span className="text-primary">*</span>
            </label>
            <div
              className="border-2 border-dashed border-border/30 rounded-lg p-4 text-center hover:bg-secondary/10 transition-colors"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = e.dataTransfer.files;
                if (files?.[0]) {
                  handleAcademicDocumentUpload("nyscCertificate", files[0]);
                }
              }}
            >
              <input
                type="file"
                id="nysc"
                className="hidden"
                onChange={(e) =>
                  handleAcademicFileChange("nyscCertificate", e.target.files)
                }
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="nysc" className="cursor-pointer">
                <div className="space-y-2">
                  <p className="text-foreground/70 text-sm">
                    Choose file to upload
                  </p>
                  <button
                    type="button"
                    onClick={() => document.getElementById("nysc")?.click()}
                    className="text-primary hover:text-primary/80 font-medium text-sm"
                  >
                    Browse file
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Birth Certificate */}
        <div className="grid grid-cols-1">
          <div>
            <label className="block font-semibold text-foreground mb-3">
              Birth Certificate <span className="text-primary">*</span>
            </label>
            <div
              className="border-2 border-dashed border-border/30 rounded-lg p-6 text-center hover:bg-secondary/10 transition-colors"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = e.dataTransfer.files;
                if (files?.[0]) {
                  handleAcademicDocumentUpload("birthCertificate", files[0]);
                }
              }}
            >
              <input
                type="file"
                id="birth"
                className="hidden"
                onChange={(e) =>
                  handleAcademicFileChange("birthCertificate", e.target.files)
                }
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="birth" className="cursor-pointer">
                <div className="space-y-2">
                  <p className="text-foreground/70">Choose file to upload</p>
                  <button
                    type="button"
                    onClick={() => document.getElementById("birth")?.click()}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Browse file
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Other Documents Section */}
      <div className="bg-card border border-border/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">OTHER DOCUMENT</h2>
          <Button onClick={handleOpenAddDocumentDialog}>Add Document</Button>
        </div>

        {/* Change of Name */}
        <div className="mb-8">
          <label className="block font-semibold text-foreground mb-3">
            Change of Name
          </label>
          <div
            className="border-2 border-dashed border-border/30 rounded-lg p-6 text-center hover:bg-secondary/10 transition-colors"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const files = e.dataTransfer.files;
              if (files?.[0]) {
                handleChangeOfNameUpload(files[0]);
              }
            }}
          >
            <input
              type="file"
              id="change-of-name"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleChangeOfNameUpload(e.target.files[0]);
                }
              }}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label htmlFor="change-of-name" className="cursor-pointer">
              <div className="space-y-2">
                <p className="text-foreground/70">Choose file to upload</p>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("change-of-name")?.click()
                  }
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Browse file
                </button>
              </div>
            </label>
          </div>
        </div>

        {/* Additional Documents */}
        {otherDocuments.additionalDocuments.length > 0 && (
          <div className="space-y-4 mb-8">
            {otherDocuments.additionalDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-card border border-border/30 rounded-lg"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {getDocumentTypeName(doc.name)}
                  </p>
                  {doc.file && (
                    <p className="text-sm text-foreground/70">
                      {doc.file.name}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteAdditionalDocument(doc.id)}
                  className="text-primary p-1"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Document Dialog */}
      <AddDocumentDialog
        isOpen={isAddDocumentDialogOpen}
        onClose={handleCloseAddDocumentDialog}
        formData={addDocumentFormData}
        setFormData={setAddDocumentFormData}
        onSubmit={handleSubmitAddDocument}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
