import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface MemoFormData {
  department: string;
  dateCreated: string;
  memoCode: string;
  memoTitle: string;
  memoNotes: string;
  amount: string;
  amountInWords: string;
  beneficiary: string;
  documents: Array<{
    id: string;
    name: string;
    description: string;
    file?: File;
  }>;
}

export type MemoStep = "create" | "preview";

export function useMemoWorkflow() {
  const [currentStep, setCurrentStep] = useState<MemoStep>("create");
  const [formData, setFormData] = useState<MemoFormData>({
    department: "",
    dateCreated: new Date().toISOString().split("T")[0],
    memoCode: "",
    memoTitle: "",
    memoNotes: "",
    amount: "",
    amountInWords: "",
    beneficiary: "",
    documents: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddDocument = () => {
    setFormData({
      ...formData,
      documents: [
        ...formData.documents,
        {
          id: uuidv4(),
          name: "",
          description: "",
        },
      ],
    });
  };

  const handleRemoveDocument = (index: number) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter((_, i) => i !== index),
    });
  };

  const handleProceed = () => {
    // Validation can be added here
    // if (!formData.department || !formData.memoTitle || !formData.memoCode) {
    //   alert("Please fill in all required fields");
    //   return;
    // }
    setCurrentStep("preview");
  };

  const handleEditMemo = () => {
    setCurrentStep("create");
  };

  const handleSubmitMemo = async () => {
    setIsSubmitting(true);
    try {
      // API call to submit memo to Golang backend
      const response = await fetch("/api/memos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit memo");
      }

      // Success - redirect or show success message
      console.log("Memo submitted successfully");
      // Reset form
      setFormData({
        department: "",
        dateCreated: new Date().toISOString().split("T")[0],
        memoCode: "",
        memoTitle: "",
        memoNotes: "",
        amount: "",
        amountInWords: "",
        beneficiary: "",
        documents: [],
      });
      setCurrentStep("create");
    } catch (error) {
      console.error("Error submitting memo:", error);
      alert("Failed to submit memo");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintMemo = () => {
    window.print();
  };

  return {
    // State
    currentStep,
    formData,
    isSubmitting,
    // Handlers
    setFormData,
    handleAddDocument,
    handleRemoveDocument,
    handleProceed,
    handleEditMemo,
    handleSubmitMemo,
    handlePrintMemo,
  };
}
