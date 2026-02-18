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
import { useEmployeeBioDataManagement } from "@/hooks/use-employeebiodata";
import { genderOptions, maritalStatusOptions } from "@/components/mockData";
import { ChangeNameRequestDialog } from "./changerequestnamedialog";

export default function EmployeeProfileBioDataPage() {
  const {
    bioData,
    guarantors,
    isEditing,
    isChangeNameDialogOpen,
    changeNameFormData,
    isSubmittingChangeRequest,
    handleEditToggle,
    handleBioDataChange,
    handleSaveChanges,
    handleChangeNameYes,
    handleChangeNameNo,
    handleSubmitChangeNameRequest,
    handleCloseChangeNameDialog,
    setChangeNameFormData,
  } = useEmployeeBioDataManagement();

  return (
    <div className="pb-12">
      {/* Basic Information Section */}
      <div className="border rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">
            BASIC INFORMATION
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
                className="bg-primary text-white"
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>

        {/* Basic Info Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <FormField label="Title">
            <Input
              value={bioData.title}
              onChange={(e) => handleBioDataChange("title", e.target.value)}
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="Surname">
            <Input
              value={bioData.surname}
              onChange={(e) => handleBioDataChange("surname", e.target.value)}
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="Middle Name">
            <Input
              value={bioData.middleName}
              onChange={(e) =>
                handleBioDataChange("middleName", e.target.value)
              }
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="First Name">
            <Input
              value={bioData.firstName}
              onChange={(e) => handleBioDataChange("firstName", e.target.value)}
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>

          <FormField label="Staff ID">
            <Input
              value={bioData.staffId}
              onChange={(e) => handleBioDataChange("staffId", e.target.value)}
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="Email Address">
            <Input
              value={bioData.emailAddress}
              onChange={(e) =>
                handleBioDataChange("emailAddress", e.target.value)
              }
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="Date Of Birth">
            <Input
              type="date"
              value={bioData.dateOfBirth}
              onChange={(e) =>
                handleBioDataChange("dateOfBirth", e.target.value)
              }
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="Marital Status">
            {isEditing ? (
              <Select
                value={bioData.maritalStatus}
                onValueChange={(value) =>
                  handleBioDataChange("maritalStatus", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {maritalStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={bioData.maritalStatus}
                readOnly
                className="bg-gray-50"
              />
            )}
          </FormField>

          <FormField label="Gender">
            {isEditing ? (
              <Select
                value={bioData.gender}
                onValueChange={(value) => handleBioDataChange("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input value={bioData.gender} readOnly className="bg-gray-50" />
            )}
          </FormField>
          <FormField label="Phone Number">
            <Input
              value={bioData.phoneNumber}
              onChange={(e) =>
                handleBioDataChange("phoneNumber", e.target.value)
              }
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="Nationality">
            <Input
              value={bioData.nationality}
              onChange={(e) =>
                handleBioDataChange("nationality", e.target.value)
              }
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
          <FormField label="State Of Origin">
            <Input
              value={bioData.stateOfOrigin}
              onChange={(e) =>
                handleBioDataChange("stateOfOrigin", e.target.value)
              }
              readOnly={!isEditing}
              className={isEditing ? "" : "bg-gray-50"}
            />
          </FormField>
        </div>
      </div>

      {/* Guarantor's Information Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-foreground mb-6">
          GUARANTOR'S INFORMATION
        </h2>

        {guarantors.map((guarantor, index) => (
          <div key={index} className="mb-8">
            <h3 className="font-semibold text-foreground mb-4">
              Guarantor {index + 1}
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <FormField label="Title">
                <Input
                  value={guarantor.title}
                  readOnly
                  className="bg-gray-50"
                />
              </FormField>
              <FormField label="Surname">
                <Input
                  value={guarantor.surname}
                  readOnly
                  className="bg-gray-50"
                />
              </FormField>
              <FormField label="Middle Name">
                <Input
                  value={guarantor.middleName}
                  readOnly
                  className="bg-gray-50"
                />
              </FormField>
              <FormField label="First Name">
                <Input
                  value={guarantor.firstName}
                  readOnly
                  className="bg-gray-50"
                />
              </FormField>
            </div>
          </div>
        ))}
      </div>

      {/* Change of Name Request Section */}
      <div className="border border-border/30 rounded-lg p-6">
        <h2 className="text-lg font-bold text-red-600 mb-4">
          Change of Name Request
        </h2>
        <div className="flex items-center gap-4">
          <p className="text-foreground">Do you want to change your name?</p>
          <button
            onClick={handleChangeNameYes}
            className="text-primary hover:text-primary/80 underline font-medium"
          >
            Yes
          </button>
          <button
            onClick={handleChangeNameNo}
            className="text-foreground hover:text-foreground/80 font-medium"
          >
            No
          </button>
        </div>
      </div>

      {/* Change Name Request Dialog */}
      <ChangeNameRequestDialog
        isOpen={isChangeNameDialogOpen}
        onClose={handleCloseChangeNameDialog}
        formData={changeNameFormData}
        setFormData={setChangeNameFormData}
        onSubmit={handleSubmitChangeNameRequest}
        isSubmitting={isSubmittingChangeRequest}
      />
    </div>
  );
}
