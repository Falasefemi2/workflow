import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface MemoCreationFormProps {
  formData: MemoFormData;
  setFormData: (data: MemoFormData) => void;
  departmentOptions: Array<{ id: string; value: string; label: string }>;
  onAddDocument: () => void;
  onRemoveDocument: (index: number) => void;
  onProceed: () => void;
  isLoading?: boolean;
}

export function MemoCreationForm({
  formData,
  setFormData,
  departmentOptions,
  onAddDocument,
  onRemoveDocument,
  onProceed,
  isLoading = false,
}: MemoCreationFormProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="pb-6 border-b border-border/30">
        <h1 className="text-2xl font-bold text-foreground">Create Memo</h1>
      </div>

      {/* Memo Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Department */}
        <FormField label="Department">
          <Select
            value={formData.department}
            onValueChange={(value) =>
              setFormData({ ...formData, department: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="--Select department--" />
            </SelectTrigger>
            <SelectContent>
              {departmentOptions.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        {/* Date Created */}
        <FormField label="Date created">
          <Input
            type="date"
            value={formData.dateCreated}
            onChange={(e) =>
              setFormData({ ...formData, dateCreated: e.target.value })
            }
          />
        </FormField>

        {/* Memo Code */}
        <FormField label="Memo code">
          <Input
            placeholder="--input memo code--"
            value={formData.memoCode}
            onChange={(e) =>
              setFormData({ ...formData, memoCode: e.target.value })
            }
          />
        </FormField>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Memo Title */}
        <FormField label="Memo title">
          <Input
            placeholder="--input memo title--"
            value={formData.memoTitle}
            onChange={(e) =>
              setFormData({ ...formData, memoTitle: e.target.value })
            }
          />
        </FormField>

        {/* Memo Notes */}
        <FormField label="Memo notes">
          <textarea
            placeholder="--input memo note--"
            value={formData.memoNotes}
            onChange={(e) =>
              setFormData({ ...formData, memoNotes: e.target.value })
            }
            className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
          />
        </FormField>

        {/* Amount */}
        <FormField label="Amount">
          <Input
            type="number"
            placeholder="--input amount--"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </FormField>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Amount in Words */}
        <FormField label="Amount in words">
          <Input
            placeholder="--input amount in words--"
            value={formData.amountInWords}
            onChange={(e) =>
              setFormData({ ...formData, amountInWords: e.target.value })
            }
          />
        </FormField>

        {/* Beneficiary */}
        <FormField label="Beneficiary">
          <Input
            placeholder="--input beneficiary--"
            value={formData.beneficiary}
            onChange={(e) =>
              setFormData({ ...formData, beneficiary: e.target.value })
            }
          />
        </FormField>
      </div>

      {/* Documents Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-primary font-bold text-lg">DOCUMENT(S)</h3>
          <Button
            type="button"
            onClick={onAddDocument}
            className="bg-primary/80 hover:bg-primary text-white"
          >
            Add more document
          </Button>
        </div>

        {/* Document List */}
        {formData.documents.map((doc, index) => (
          <div
            key={doc.id}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border border-border/30 rounded-lg"
          >
            {/* Document Name */}
            <FormField label="Document name">
              <Input
                placeholder="--input document name--"
                value={doc.name}
                onChange={(e) => {
                  const newDocs = [...formData.documents];
                  newDocs[index].name = e.target.value;
                  setFormData({ ...formData, documents: newDocs });
                }}
              />
            </FormField>

            {/* Document Description */}
            <FormField label="Document description">
              <Input
                placeholder="--input document description--"
                value={doc.description}
                onChange={(e) => {
                  const newDocs = [...formData.documents];
                  newDocs[index].description = e.target.value;
                  setFormData({ ...formData, documents: newDocs });
                }}
              />
            </FormField>

            {/* Upload File */}
            <FormField label="Upload File">
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <input
                  type="file"
                  id={`file-${index}`}
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const newDocs = [...formData.documents];
                      newDocs[index].file = e.target.files[0];
                      setFormData({ ...formData, documents: newDocs });
                    }
                  }}
                />
                <label htmlFor={`file-${index}`} className="cursor-pointer">
                  <div className="text-sm text-foreground/70">
                    {doc.file ? doc.file.name : "Choose file to upload"}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById(`file-${index}`)?.click()
                    }
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Browse file
                  </button>
                </label>
              </div>
            </FormField>

            {/* Remove Document */}
            <Button
              type="button"
              variant="destructive"
              onClick={() => onRemoveDocument(index)}
              className="mt-6"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* Proceed Button */}
      <div className="flex gap-4 pt-6 border-t border-border/30">
        <Button
          onClick={onProceed}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-white w-full md:w-48"
        >
          {isLoading ? "Loading..." : "Proceed"}
        </Button>
      </div>
    </div>
  );
}
