import { useState } from "react";
import { mockReadingLists, type ReadingList } from "@/components/mockData";

export interface ReadingListFormData {
  title: string;
  file: File | null;
}

export function useReadingListManagement() {
  const [readingLists, setReadingLists] =
    useState<ReadingList[]>(mockReadingLists);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState<ReadingList | null>(null);
  const [formData, setFormData] = useState<ReadingListFormData>({
    title: "",
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddReadingList = () => {
    setFormData({
      title: "",
      file: null,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteReadingList = (readingList: ReadingList) => {
    setListToDelete(readingList);
  };

  const handleConfirmDelete = () => {
    if (!listToDelete) {
      return;
    }

    setReadingLists((prevLists) =>
      prevLists.filter((l) => l.id !== listToDelete.id),
    );
    setListToDelete(null);
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
      const newReadingList: ReadingList = {
        id: String(Date.now()),
        title: formData.title,
        filePath: `/documents/${formData.file.name}`,
        fileName: formData.file.name,
        uploadedAt: new Date().toISOString().split("T")[0],
      };

      setReadingLists((prevLists) => [newReadingList, ...prevLists]);

      setIsDialogOpen(false);
      setFormData({
        title: "",
        file: null,
      });
    } catch (error) {
      console.error("Error uploading reading list:", error);
      alert("Failed to upload reading list");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    readingLists,
    isDialogOpen,
    listToDelete,
    formData,
    isSubmitting,
    // Handlers
    handleAddReadingList,
    handleDeleteReadingList,
    handleConfirmDelete,
    handleSubmit,
    setFormData,
    setIsDialogOpen,
    setListToDelete,
  };
}
