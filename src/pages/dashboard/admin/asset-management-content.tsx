import { useMemoWorkflow } from "./pages/use-memo";
import { MemoCreationForm } from "@/components/shared/memo-creation";
import { mockDepartmentOptions } from "@/components/mockData";
import { MemoPreview } from "@/components/shared/memo-preview";

export default function EmployeeMemoPage() {
  const {
    currentStep,
    formData,
    isSubmitting,
    setFormData,
    handleAddDocument,
    handleRemoveDocument,
    handleProceed,
    handleEditMemo,
    handleSubmitMemo,
    handlePrintMemo,
  } = useMemoWorkflow();

  return (
    <div className="min-h-screen bg-background">
      {currentStep === "create" ? (
        // Step 1: Form
        <MemoCreationForm
          formData={formData}
          setFormData={setFormData}
          departmentOptions={mockDepartmentOptions}
          onAddDocument={handleAddDocument}
          onRemoveDocument={handleRemoveDocument}
          onProceed={handleProceed}
        />
      ) : (
        // Step 2: Preview
        <MemoPreview
          data={{
            ...formData,
            signerName: "Current User Name", // You'd get this from auth context
            signerEmail: "user@example.com",
          }}
          onEdit={handleEditMemo}
          onSubmit={handleSubmitMemo}
          onPrint={handlePrintMemo}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
