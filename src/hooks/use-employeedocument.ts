import { useState } from "react";
import {
  mockAcademicDocuments,
  mockOtherDocuments,
  type AcademicDocuments,
  type OtherDocuments,
  type EmployeeDocument,
} from "@/components/mockData";

export interface AddDocumentFormData {
  documentName: string;
  documentFile: File | null;
}

export function useEmployeeDocumentsManagement() {
  const [academicDocuments, setAcademicDocuments] = useState<AcademicDocuments>(
    mockAcademicDocuments,
  );
  const [otherDocuments, setOtherDocuments] =
    useState<OtherDocuments>(mockOtherDocuments);
  const [isAddDocumentDialogOpen, setIsAddDocumentDialogOpen] = useState(false);
  const [addDocumentFormData, setAddDocumentFormData] =
    useState<AddDocumentFormData>({
      documentName: "",
      documentFile: null,
    });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAcademicDocumentUpload = (
    field: keyof AcademicDocuments,
    file: File,
  ) => {
    setAcademicDocuments({
      ...academicDocuments,
      [field]: {
        ...academicDocuments[field],
        file: file,
        filePath: `/documents/${file.name}`,
      },
    });
  };

  const handleChangeOfNameUpload = (file: File) => {
    setOtherDocuments({
      ...otherDocuments,
      changeOfName: {
        ...otherDocuments.changeOfName,
        file: file,
        filePath: `/documents/${file.name}`,
      },
    });
  };

  const handleOpenAddDocumentDialog = () => {
    setAddDocumentFormData({
      documentName: "",
      documentFile: null,
    });
    setIsAddDocumentDialogOpen(true);
  };

  const handleCloseAddDocumentDialog = () => {
    setIsAddDocumentDialogOpen(false);
    setAddDocumentFormData({
      documentName: "",
      documentFile: null,
    });
  };

  const handleSubmitAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !addDocumentFormData.documentName ||
      !addDocumentFormData.documentFile
    ) {
      alert("Please select document type and upload a file");
      return;
    }

    setIsSubmitting(true);
    try {
      const newDocument: EmployeeDocument = {
        id: `ad-${Date.now()}`,
        name: addDocumentFormData.documentName,
        file: addDocumentFormData.documentFile,
        filePath: `/documents/${addDocumentFormData.documentFile.name}`,
      };

      setOtherDocuments({
        ...otherDocuments,
        additionalDocuments: [
          ...otherDocuments.additionalDocuments,
          newDocument,
        ],
      });

      console.log("Document added:", newDocument);
      handleCloseAddDocumentDialog();
      alert("Document added successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to add document");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAdditionalDocument = (id: string) => {
    setOtherDocuments({
      ...otherDocuments,
      additionalDocuments: otherDocuments.additionalDocuments.filter(
        (doc) => doc.id !== id,
      ),
    });
  };

  return {
    // State
    academicDocuments,
    otherDocuments,
    isAddDocumentDialogOpen,
    addDocumentFormData,
    isSubmitting,
    // Handlers
    handleAcademicDocumentUpload,
    handleChangeOfNameUpload,
    handleOpenAddDocumentDialog,
    handleCloseAddDocumentDialog,
    handleSubmitAddDocument,
    handleDeleteAdditionalDocument,
    setAddDocumentFormData,
  };
}
