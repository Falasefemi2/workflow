import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/shared/form-field";
import { Pencil } from "lucide-react";
import { usePayrollInformationManagement } from "@/hooks/use-payrollinfo";
import { bankOptions } from "@/components/mockData";

export default function EmployeeProfilePayrollInformationPage() {
  const {
    payrollInfo,
    isEditing,
    isSaving,
    handleEditToggle,
    handlePayrollInfoChange,
    handleSaveChanges,
  } = usePayrollInformationManagement();

  return (
    <div className="pb-12">
      {/* Payroll Information Section */}
      <div className="border  rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">
            PAYROLL INFORMATION
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 text-primary hover:text-primary/80"
            >
              <Pencil size={18} />
              <span className="font-medium">Edit info</span>
            </button>
            {isEditing && (
              <Button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="bg-primary text-white"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </div>
        </div>

        {/* Row 1 - 4 columns */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <FormField label="Account Holder Name">
            <Input
              value={payrollInfo.accountHolderName}
              onChange={(e) =>
                handlePayrollInfoChange("accountHolderName", e.target.value)
              }
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="Bank Name">
            {isEditing ? (
              <Select
                value={payrollInfo.bankName}
                onValueChange={(value) =>
                  handlePayrollInfoChange("bankName", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bankOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={
                  bankOptions.find((b) => b.value === payrollInfo.bankName)
                    ?.label || "Select bank"
                }
                readOnly
                className="bg-gray-50"
              />
            )}
          </FormField>
          <FormField label="Account Number">
            <Input
              placeholder="Enter account number"
              value={payrollInfo.accountNumber}
              onChange={(e) =>
                handlePayrollInfoChange("accountNumber", e.target.value)
              }
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="BVN">
            <Input
              placeholder="Enter your BVN"
              value={payrollInfo.bvn}
              onChange={(e) => handlePayrollInfoChange("bvn", e.target.value)}
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
        </div>

        {/* Row 2 - 4 columns */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <FormField label="Sort Code">
            <Input
              placeholder="Enter sort code"
              value={payrollInfo.sortCode}
              onChange={(e) =>
                handlePayrollInfoChange("sortCode", e.target.value)
              }
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="Pension (RSA)">
            <Input
              placeholder="Enter RSA number"
              value={payrollInfo.pensionRSA}
              onChange={(e) =>
                handlePayrollInfoChange("pensionRSA", e.target.value)
              }
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="Tax ID Number">
            <Input
              placeholder="Enter tax ID number"
              value={payrollInfo.taxIDNumber}
              onChange={(e) =>
                handlePayrollInfoChange("taxIDNumber", e.target.value)
              }
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="NHF Number">
            <Input
              placeholder="Enter NHF number"
              value={payrollInfo.nhfNumber}
              onChange={(e) =>
                handlePayrollInfoChange("nhfNumber", e.target.value)
              }
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
        </div>

        {/* Row 3 - NIN Number */}
        <div className="grid grid-cols-1">
          <FormField label="NIN Number">
            <Input
              value={payrollInfo.ninNumber}
              readOnly
              className="bg-gray-50"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
