import { ArrowLeft } from "lucide-react";
import type { User } from "@/components/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmployeeProfileViewModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
}

interface FieldItem {
  label: string;
  value: string;
}

function ReadonlyField({ label, value }: FieldItem) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="min-h-10 rounded-md border border-border/30 bg-muted/20 px-3 py-2 text-sm text-foreground/80">
        {value}
      </div>
    </div>
  );
}

function Section({ title, fields }: { title: string; fields: FieldItem[] }) {
  return (
    <section className="space-y-4 border-t border-border/30 pt-6">
      <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {fields.map((field) => (
          <ReadonlyField
            key={`${title}-${field.label}`}
            label={field.label}
            value={field.value}
          />
        ))}
      </div>
    </section>
  );
}

export function EmployeeProfileViewModal({
  isOpen,
  user,
  onClose,
}: EmployeeProfileViewModalProps) {
  if (!user) {
    return null;
  }

  const displayName = `${user.firstName} ${user.lastName}`.trim();

  const bioFields: FieldItem[] = [
    { label: "Title", value: "Mr" },
    { label: "Surname", value: user.lastName },
    { label: "Middle Name", value: user.firstName },
    { label: "First Name", value: user.firstName },
    { label: "Email", value: user.email },
    { label: "Date Of Birth", value: "21/04/2023" },
    { label: "Phone Number", value: "080832334042" },
    { label: "Gender", value: user.gender },
    { label: "Marital Status", value: "Married" },
    { label: "Religion", value: "Islamic" },
    { label: "Nationality", value: "Nigerian" },
  ];

  const locationFields: FieldItem[] = [
    { label: "State Of Origin", value: "Lagos" },
    { label: "Town", value: "Surulere" },
    { label: "Local Government Area", value: "Kosofe LGA" },
    { label: "Permanent Address", value: "Lagos" },
  ];

  const guarantorOneFields: FieldItem[] = [
    { label: "Title", value: "Mr" },
    { label: "Surname", value: "Ajibade" },
    { label: "Middle Name", value: "Tobiloba" },
    { label: "First Name", value: "Ishola" },
    { label: "Phone Number", value: "080832334042" },
  ];

  const guarantorTwoFields: FieldItem[] = [
    { label: "Title", value: "Mr" },
    { label: "Surname", value: "Ajibade" },
    { label: "Middle Name", value: "Tobiloba" },
    { label: "First Name", value: "Ishola" },
    { label: "Phone Number", value: "080832334042" },
  ];

  const employmentFields: FieldItem[] = [
    { label: "Department", value: user.subsidiary },
    { label: "Designation", value: user.designation },
    { label: "Level", value: "4" },
    { label: "Employee ID", value: user.id },
  ];

  const payrollFields: FieldItem[] = [
    { label: "Account Holder Name", value: displayName },
    { label: "Bank Name", value: "Stanbic IBTC" },
    { label: "Account Number", value: "1234567890" },
    { label: "BVN", value: "0123456789" },
    { label: "NIN", value: "2233445566" },
    { label: "Sort Code", value: "01456773" },
    { label: "Pension", value: "234567890987" },
    { label: "Tax Number", value: "233245457" },
    { label: "NHF Number", value: "1112345356" },
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
          {/* Header - Fixed */}
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

          {/* Scrollable Content */}
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="p-6 pr-4">
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[220px_1fr]">
                {/* Avatar Section */}
                <div>
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

                {/* Content Section */}
                <div className="space-y-8">
                  {/* Bio Section */}
                  <section className="space-y-4">
                    <div className="rounded-sm bg-primary/80 px-4 py-3">
                      <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                        BIO - DATA
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {bioFields.map((field) => (
                        <ReadonlyField
                          key={`bio-${field.label}`}
                          label={field.label}
                          value={field.value}
                        />
                      ))}
                    </div>
                  </section>

                  <Section title="Location" fields={locationFields} />

                  {/* Guarantor's Information */}
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
                          <ReadonlyField
                            key={`guarantor-one-${field.label}`}
                            label={field.label}
                            value={field.value}
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
                          <ReadonlyField
                            key={`guarantor-two-${field.label}`}
                            label={field.label}
                            value={field.value}
                          />
                        ))}
                      </div>
                    </div>
                  </section>

                  <Section
                    title="Employment Details"
                    fields={employmentFields}
                  />
                  <Section title="Payroll Details" fields={payrollFields} />

                  {/* Documents Section */}
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

                  {/* Comments Section */}
                  <section className="space-y-4 border-t border-border/30 pt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
                      Comment
                    </h3>
                    <Textarea
                      placeholder="Write comment"
                      className="min-h-28 bg-muted/20"
                    />
                  </section>

                  {/* Action Buttons - Fixed at Bottom */}
                  <div className="flex flex-col gap-4 border-t border-border/30 pt-6 pb-6 sm:flex-row">
                    <Button
                      type="button"
                      className="sm:w-64 bg-primary text-white"
                    >
                      Approve
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="sm:w-64 border-primary text-primary hover:bg-primary/10"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
