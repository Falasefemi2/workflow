import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { User } from "@/components/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface EmployeeProfileEditModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

interface FormFieldItem {
  key: keyof EditProfileFormData;
  label: string;
}

interface EditProfileFormData {
  title: string;
  surname: string;
  middleName: string;
  firstName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  maritalStatus: string;
  religion: string;
  nationality: string;
  stateOfOrigin: string;
  town: string;
  localGovernmentArea: string;
  permanentAddress: string;
  guarantorOneTitle: string;
  guarantorOneSurname: string;
  guarantorOneMiddleName: string;
  guarantorOneFirstName: string;
  guarantorOnePhoneNumber: string;
  guarantorTwoTitle: string;
  guarantorTwoSurname: string;
  guarantorTwoMiddleName: string;
  guarantorTwoFirstName: string;
  guarantorTwoPhoneNumber: string;
  department: string;
  designation: string;
  level: string;
  employeeId: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  bvn: string;
  nin: string;
  sortCode: string;
  pension: string;
  taxNumber: string;
  nhfNumber: string;
}

const createFormDataFromUser = (user: User): EditProfileFormData => ({
  title: "Mr",
  surname: user.lastName,
  middleName: user.firstName,
  firstName: user.firstName,
  email: user.email,
  dateOfBirth: "21/04/2023",
  phoneNumber: "080832334042",
  gender: user.gender,
  maritalStatus: "Married",
  religion: "Islamic",
  nationality: "Nigerian",
  stateOfOrigin: "Lagos",
  town: "Surulere",
  localGovernmentArea: "Kosofe LGA",
  permanentAddress: "Lagos",
  guarantorOneTitle: "Mr",
  guarantorOneSurname: "Ajibade",
  guarantorOneMiddleName: "Tobiloba",
  guarantorOneFirstName: "Ishola",
  guarantorOnePhoneNumber: "080832334042",
  guarantorTwoTitle: "Mr",
  guarantorTwoSurname: "Ajibade",
  guarantorTwoMiddleName: "Tobiloba",
  guarantorTwoFirstName: "Ishola",
  guarantorTwoPhoneNumber: "080832334042",
  department: user.subsidiary,
  designation: user.designation,
  level: "4",
  employeeId: user.id,
  accountHolderName: `${user.firstName} ${user.lastName}`.trim(),
  bankName: "Stanbic IBTC",
  accountNumber: "1234567890",
  bvn: "0123456789",
  nin: "2233445566",
  sortCode: "01456773",
  pension: "234567890987",
  taxNumber: "233245457",
  nhfNumber: "1112345356",
});

function EditableField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-muted/20"
      />
    </div>
  );
}

function EditableSection({
  title,
  fields,
  formData,
  onUpdate,
}: {
  title: string;
  fields: FormFieldItem[];
  formData: EditProfileFormData;
  onUpdate: (key: keyof EditProfileFormData, value: string) => void;
}) {
  return (
    <section className="space-y-4 border-t border-border/30 pt-6">
      <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {fields.map((field) => (
          <EditableField
            key={`${title}-${field.key}`}
            label={field.label}
            value={formData[field.key]}
            onChange={(value) => onUpdate(field.key, value)}
          />
        ))}
      </div>
    </section>
  );
}

export function EmployeeProfileEditModal({
  isOpen,
  user,
  onClose,
  onSave,
}: EmployeeProfileEditModalProps) {
  const [formData, setFormData] = useState<EditProfileFormData | null>(null);

  // useEffect(() => {
  //   if (user && isOpen) {
  //     setFormData(createFormDataFromUser(user));
  //   }
  // }, [isOpen, user]);

  useEffect(() => {
    if (!isOpen) return;

    const id = setTimeout(() => {
      setFormData(user ? createFormDataFromUser(user) : null);
    }, 0);

    return () => clearTimeout(id);
  }, [isOpen, user?.id]);

  if (!user || !formData) {
    return null;
  }

  const displayName = `${user.firstName} ${user.lastName}`.trim();
  const updateField = (key: keyof EditProfileFormData, value: string) => {
    setFormData((previous) => {
      if (!previous) {
        return previous;
      }

      return { ...previous, [key]: value };
    });
  };

  const bioFields: FormFieldItem[] = [
    { key: "title", label: "Title" },
    { key: "surname", label: "Surname" },
    { key: "middleName", label: "Middle Name" },
    { key: "firstName", label: "First Name" },
    { key: "email", label: "Email" },
    { key: "dateOfBirth", label: "Date Of Birth" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "gender", label: "Gender" },
    { key: "maritalStatus", label: "Marital Status" },
    { key: "religion", label: "Religion" },
    { key: "nationality", label: "Nationality" },
  ];

  const locationFields: FormFieldItem[] = [
    { key: "stateOfOrigin", label: "State Of Origin" },
    { key: "town", label: "Town" },
    { key: "localGovernmentArea", label: "Local Government Area" },
    { key: "permanentAddress", label: "Permanent Address" },
  ];

  const guarantorOneFields: FormFieldItem[] = [
    { key: "guarantorOneTitle", label: "Title" },
    { key: "guarantorOneSurname", label: "Surname" },
    { key: "guarantorOneMiddleName", label: "Middle Name" },
    { key: "guarantorOneFirstName", label: "First Name" },
    { key: "guarantorOnePhoneNumber", label: "Phone Number" },
  ];

  const guarantorTwoFields: FormFieldItem[] = [
    { key: "guarantorTwoTitle", label: "Title" },
    { key: "guarantorTwoSurname", label: "Surname" },
    { key: "guarantorTwoMiddleName", label: "Middle Name" },
    { key: "guarantorTwoFirstName", label: "First Name" },
    { key: "guarantorTwoPhoneNumber", label: "Phone Number" },
  ];

  const employmentFields: FormFieldItem[] = [
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "level", label: "Level" },
    { key: "employeeId", label: "Employee ID" },
  ];

  const payrollFields: FormFieldItem[] = [
    { key: "accountHolderName", label: "Account Holder Name" },
    { key: "bankName", label: "Bank Name" },
    { key: "accountNumber", label: "Account Number" },
    { key: "bvn", label: "BVN" },
    { key: "nin", label: "NIN" },
    { key: "sortCode", label: "Sort Code" },
    { key: "pension", label: "Pension" },
    { key: "taxNumber", label: "Tax Number" },
    { key: "nhfNumber", label: "NHF Number" },
  ];

  const documents = [
    "Change of Name",
    "First school leaving certificate",
    "University Certificate",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="h-[92vh] w-screen sm:w-screen sm:max-w-none max-w-none p-0 flex flex-col overflow-hidden"
        // style={{ maxHeight: "92vh" }}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-border/30 px-6 py-4 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Return home
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[220px_1fr]">
              <div className="xl:sticky xl:top-0">
                <Avatar className="h-72! w-full! rounded-md! border border-border/30">
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(displayName)}`}
                    alt={displayName}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-md! text-xl font-semibold">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-8">
                <section className="space-y-4">
                  <div className="rounded-sm bg-primary/80 px-4 py-3">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                      BIO - DATA
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {bioFields.map((field) => (
                      <EditableField
                        key={`bio-${field.key}`}
                        label={field.label}
                        value={formData[field.key]}
                        onChange={(value) => updateField(field.key, value)}
                      />
                    ))}
                  </div>
                </section>

                <EditableSection
                  title="Location"
                  fields={locationFields}
                  formData={formData}
                  onUpdate={updateField}
                />

                <section className="space-y-6 border-t border-border/30 pt-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
                    Guarantor's Information
                  </h3>
                  <div className="space-y-5">
                    <p className="text-sm font-semibold text-foreground/90">
                      Guarantor 1
                    </p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {guarantorOneFields.map((field) => (
                        <EditableField
                          key={`guarantor-one-${field.key}`}
                          label={field.label}
                          value={formData[field.key]}
                          onChange={(value) => updateField(field.key, value)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <p className="text-sm font-semibold text-foreground/90">
                      Guarantor 2
                    </p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {guarantorTwoFields.map((field) => (
                        <EditableField
                          key={`guarantor-two-${field.key}`}
                          label={field.label}
                          value={formData[field.key]}
                          onChange={(value) => updateField(field.key, value)}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                <EditableSection
                  title="Employment Details"
                  fields={employmentFields}
                  formData={formData}
                  onUpdate={updateField}
                />
                <EditableSection
                  title="Payroll Details"
                  fields={payrollFields}
                  formData={formData}
                  onUpdate={updateField}
                />

                <section className="space-y-4 border-t border-border/30 pt-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
                    Employee's Document
                  </h3>
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {documents.map((document) => (
                      <div
                        key={document}
                        className="flex items-center justify-between rounded-md border border-dashed border-border/60 px-4 py-3"
                      >
                        <span className="text-sm text-foreground/90">
                          {document}
                        </span>
                        <Button variant="ghost" size="sm" className="text-xs">
                          View document
                        </Button>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="flex flex-col gap-4 border-t border-border/30 pt-6 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    className="sm:w-64"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="sm:w-64 bg-primary text-white"
                    onClick={() =>
                      onSave({
                        ...user,
                        firstName: formData.firstName,
                        lastName: formData.surname,
                        email: formData.email,
                        gender: formData.gender,
                        subsidiary: formData.department,
                        designation: formData.designation,
                      })
                    }
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
