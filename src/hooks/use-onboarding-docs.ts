import { useState } from "react";
import {
  mockOnboardingDocuments,
  type OnboardingDocument,
} from "@/components/mockData";

export interface OnboardingDocumentFormData {
  title: string;
  file: File | null;
}

export function useOnboardingDocumentManagement() {
  const [documents, setDocuments] = useState<OnboardingDocument[]>(
    mockOnboardingDocuments,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] =
    useState<OnboardingDocument | null>(null);
  const [formData, setFormData] = useState<OnboardingDocumentFormData>({
    title: "",
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddDocument = () => {
    setFormData({
      title: "",
      file: null,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteDocument = (document: OnboardingDocument) => {
    setDocumentToDelete(document);
  };

  const handleConfirmDelete = () => {
    if (!documentToDelete) {
      return;
    }

    setDocuments((prevDocuments) =>
      prevDocuments.filter((d) => d.id !== documentToDelete.id),
    );
    setDocumentToDelete(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.file) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create form data for file upload
      const uploadFormData = new FormData();
      uploadFormData.append("title", formData.title);
      uploadFormData.append("file", formData.file);

      // Simulate file upload - in real app, this goes to your Golang backend
      const newDocument: OnboardingDocument = {
        id: String(Date.now()),
        title: formData.title,
        filePath: `/documents/${formData.file.name}`,
        fileName: formData.file.name,
        uploadedAt: new Date().toISOString().split("T")[0],
      };

      setDocuments((prevDocuments) => [newDocument, ...prevDocuments]);

      setIsDialogOpen(false);
      setFormData({
        title: "",
        file: null,
      });
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("Failed to upload document");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    documents,
    isDialogOpen,
    documentToDelete,
    formData,
    isSubmitting,
    // Handlers
    handleAddDocument,
    handleDeleteDocument,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setDocumentToDelete,
  };
}
