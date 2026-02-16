                 import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  usePlanAnnualLeaveManagement,
  type AnnualLeavePlanRecord,
} from "@/hooks/use-plan-annual-leave";
import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ApplyForLeaveRecord {
  id: number;
  leaveType: string;
  daysApplied: string;
  startDate: string;
  resumptionDate: string;
  approvalStatus: "Approved" | "In-Progress" | "Progress";
}

interface ApplyForLeaveFormData {
  leaveType: string;
  daysRemaining: string;
  leaveDays: string;
  contactPhone: string;
}

const leaveDaysRemainingByType: Record<string, string> = {
  "Maternity Leave": "10",
  "Study Leave": "10",
  "Sick Leave": "10",
  "Annual Leave": "10",
};

const defaultApplyForLeaveFormData: ApplyForLeaveFormData = {
  leaveType: "",
  daysRemaining: "10",
  leaveDays: "",
  contactPhone: "",
};

const initialApplyForLeaveRecords: ApplyForLeaveRecord[] = [
  {
    id: 1,
    leaveType: "Maternity Leave",
    daysApplied: "20 Days",
    startDate: "12/02/2024",
    resumptionDate: "02/03/2024",
    approvalStatus: "Approved",
  },
  {
    id: 2,
    leaveType: "Study Leave",
    daysApplied: "20 Days",
    startDate: "12/02/2024",
    resumptionDate: "02/03/2024",
    approvalStatus: "In-Progress",
  },
  {
    id: 3,
    leaveType: "Sick Leave",
    daysApplied: "20 Days",
    startDate: "12/02/2024",
    resumptionDate: "02/03/2024",
    approvalStatus: "Progress",
  },
  {
    id: 4,
    leaveType: "Maternity Leave",
    daysApplied: "20 Days",
    startDate: "12/02/2024",
    resumptionDate: "02/03/2024",
    approvalStatus: "Approved",
  },
  {
    id: 5,
    leaveType: "Study Leave",
    daysApplied: "20 Days",
    startDate: "12/02/2024",
    resumptionDate: "02/03/2024",
    approvalStatus: "In-Progress",
  },
  {
    id: 6,
    leaveType: "Sick Leave",
    daysApplied: "20 Days",
    startDate: "12/02/2024",
    resumptionDate: "02/03/2024",
    approvalStatus: "Approved",
  },
  {
    id: 7,
    leaveType: "Maternity Leave",
    daysApplied: "20 Days",
    startDate: "12/02/2024",
    resumptionDate: "02/03/2024",
    approvalStatus: "Progress",
  },
  {
    id: 8,
    leaveType: "Study Leave",
    daysApplied: "20 Days",
    startDate: "12/02/2024",
    resumptionDate: "02/03/2024",
    approvalStatus: "Progress",
  },
];

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const addDays = (base: Date, days: number) => {
  const next = new Date(base);
  next.setDate(next.getDate() + days);
  return next;
};

export default function LeavePlanningPage() {
  const [activeTab, setActiveTab] = useState<
    "plan-annual-leave" | "apply-for-leave"
  >("plan-annual-leave");
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [applyFormData, setApplyFormData] = useState<ApplyForLeaveFormData>(
    defaultApplyForLeaveFormData,
  );
  const [applyRecords, setApplyRecords] = useState<ApplyForLeaveRecord[]>(
    initialApplyForLeaveRecords,
  );

  const {
    leaveRecords,
    isDialogOpen,
    dialogTitle,
    formData,
    handleAddLeave,
    handleEditLeave,
    handleDeleteLeave,
    handleConfirmDelete,
    handleCloseDialog,
    handleSubmitLeave,
    leaveToDelete,
    setLeaveToDelete,
    setFormData,
  } = usePlanAnnualLeaveManagement();

  const currentActionLabel =
    activeTab === "apply-for-leave"
      ? "Apply For Leave"
      : "Add Annual Leave Plan";

  const onHeaderActionClick = () => {
    if (activeTab === "apply-for-leave") {
      setIsApplyDialogOpen(true);
      return;
    }

    handleAddLeave();
  };

  const applyEntriesLabel = useMemo(() => {
    if (applyRecords.length === 0) {
      return "Showing 0 - 0 of 0 entries";
    }

    return `Showing 1 - ${applyRecords.length} of ${applyRecords.length} entries`;
  }, [applyRecords.length]);

  const handleApplyLeaveSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !applyFormData.leaveType ||
      !applyFormData.daysRemaining ||
      !applyFormData.leaveDays ||
      !applyFormData.contactPhone
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (Number(applyFormData.leaveDays) <= 0) {
      alert("Leave Days must be greater than 0");
      return;
    }

    const now = new Date();
    const resumptionDate = addDays(now, Number(applyFormData.leaveDays));

    const newRecord: ApplyForLeaveRecord = {
      id: applyRecords.length ? applyRecords[0].id + 1 : 1,
      leaveType: applyFormData.leaveType,
      daysApplied: `${applyFormData.leaveDays} Days`,
      startDate: formatDate(now),
      resumptionDate: formatDate(resumptionDate),
      approvalStatus: "In-Progress",
    };

    setApplyRecords((previous) => [newRecord, ...previous]);
    setIsApplyDialogOpen(false);
    setApplyFormData(defaultApplyForLeaveFormData);
  };

  const handleApplyDialogClose = () => {
    setIsApplyDialogOpen(false);
    setApplyFormData(defaultApplyForLeaveFormData);
  };

  const getStatusClassName = (
    status: ApplyForLeaveRecord["approvalStatus"],
  ) => {
    if (status === "Approved") {
      return "text-indigo-500";
    }

    if (status === "In-Progress") {
      return "text-amber-500";
    }

    return "text-primary";
  };

  return (
    <div className="pb-12">
      <PageHeader
        title="Leave Planning"
        backTo="/dashboard/hr/menu"
        actionLabel={currentActionLabel}
        onActionClick={onHeaderActionClick}
      />

      <div className="mt-8">
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "plan-annual-leave" | "apply-for-leave")
          }
          className="w-full"
        >
          <TabsList
            variant="line"
            className="w-full justify-center bg-transparent"
          >
            <TabsTrigger value="plan-annual-leave" className="w-48">
              Plan Annual Leave
            </TabsTrigger>
            <TabsTrigger value="apply-for-leave" className="w-48">
              Apply for Leave
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plan-annual-leave" className="space-y-6 mt-8">
            <DataTable<AnnualLeavePlanRecord>
              columns={[
                { key: "leaveType", label: "Leave Type" },
                { key: "numberOfDays", label: "No of Days" },
                { key: "comments", label: "Comments" },
                { key: "commencementDate", label: "Date" },
                {
                  key: "contactAddressOnLeave",
                  label: "Contact Address on Leave",
                },
                {
                  key: "collectLeaveAllowance",
                  label: "Collect Leave Allowance",
                },
              ]}
              data={leaveRecords}
              onEdit={handleEditLeave}
              onDelete={handleDeleteLeave}
              totalEntries={leaveRecords.length}
            />
          </TabsContent>

          <TabsContent value="apply-for-leave" className="mt-8">
            <div className="border border-border/30 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/20 border-b border-border/30">
                    <th className="px-6 py-4 text-left text-primary font-semibold">
                      S/N
                    </th>
                    <th className="px-6 py-4 text-left text-primary font-semibold">
                      Leave Type
                    </th>
                    <th className="px-6 py-4 text-left text-primary font-semibold">
                      No of Days Applied
                    </th>
                    <th className="px-6 py-4 text-left text-primary font-semibold">
                      Start Date
                    </th>
                    <th className="px-6 py-4 text-left text-primary font-semibold">
                      Resumption Date
                    </th>
                    <th className="px-6 py-4 text-left text-primary font-semibold">
                      Approval status
                    </th>
                    <th className="px-6 py-4 text-left text-primary font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applyRecords.map((record, index) => (
                    <tr
                      key={record.id}
                      className="border-b border-border/20 odd:bg-muted/10"
                    >
                      <td className="px-6 py-4 text-foreground/80">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-foreground/80">
                        {record.leaveType}
                      </td>
                      <td className="px-6 py-4 text-foreground/80">
                        {record.daysApplied}
                      </td>
                      <td className="px-6 py-4 text-foreground/80">
                        {record.startDate}
                      </td>
                      <td className="px-6 py-4 text-foreground/80">
                        {record.resumptionDate}
                      </td>
                      <td
                        className={`px-6 py-4 font-medium ${getStatusClassName(record.approvalStatus)}`}
                      >
                        {record.approvalStatus}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-primary underline hover:text-primary/90">
                          View documents
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-sm text-foreground/60 mt-6">
              {applyEntriesLabel}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <FormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title={dialogTitle}
      >
        <form onSubmit={handleSubmitLeave} className="space-y-6">
          <FormField label="Leave Type" required>
            <Select
              value={formData.leaveType}
              onValueChange={(value) =>
                setFormData({ ...formData, leaveType: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select leave type--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="No of Days" required>
            <Input
              type="number"
              min="1"
              value={formData.numberOfDays}
              onChange={(e) =>
                setFormData({ ...formData, numberOfDays: e.target.value })
              }
            />
          </FormField>

          <FormField label="Comments" required>
            <Textarea
              value={formData.comments}
              onChange={(e) =>
                setFormData({ ...formData, comments: e.target.value })
              }
              placeholder="Enter comments"
            />
          </FormField>

          <FormField label="Date" required>
            <Input
              type="date"
              value={formData.commencementDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  commencementDate: e.target.value,
                })
              }
            />
          </FormField>

          <FormField label="Contact Address on Leave" required>
            <Textarea
              value={formData.contactAddressOnLeave}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contactAddressOnLeave: e.target.value,
                })
              }
              placeholder="Enter contact address while on leave"
            />
          </FormField>

          <FormField label="Collect Leave Allowance" required>
            <Select
              value={formData.collectLeaveAllowance}
              onValueChange={(value: "Yes" | "No") =>
                setFormData({ ...formData, collectLeaveAllowance: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select option--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <div className="flex gap-4 justify-end pt-6 border-t border-border/30">
            <Button type="button" variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary">
              Save
            </Button>
          </div>
        </form>
      </FormDialog>

      <FormDialog
        isOpen={isApplyDialogOpen}
        onClose={handleApplyDialogClose}
        title="Apply For Leave"
      >
        <form onSubmit={handleApplyLeaveSubmit} className="space-y-6">
          <FormField label="Leave Type" required>
            <Select
              value={applyFormData.leaveType}
              onValueChange={(value) =>
                setApplyFormData({
                  ...applyFormData,
                  leaveType: value,
                  daysRemaining: leaveDaysRemainingByType[value] ?? "10",
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select leave type--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Maternity Leave">Maternity Leave</SelectItem>
                <SelectItem value="Study Leave">Study Leave</SelectItem>
                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                <SelectItem value="Annual Leave">Annual Leave</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="No of days Remaining" required>
            <Input
              type="number"
              value={applyFormData.daysRemaining}
              onChange={(event) =>
                setApplyFormData({
                  ...applyFormData,
                  daysRemaining: event.target.value,
                })
              }
            />
          </FormField>

          <FormField label="Leave Days" required>
            <Input
              type="number"
              min="1"
              value={applyFormData.leaveDays}
              onChange={(event) =>
                setApplyFormData({
                  ...applyFormData,
                  leaveDays: event.target.value,
                })
              }
            />
          </FormField>

          <FormField label="Contact Phone on Leave" required>
            <Input
              type="text"
              value={applyFormData.contactPhone}
              onChange={(event) =>
                setApplyFormData({
                  ...applyFormData,
                  contactPhone: event.target.value,
                })
              }
              placeholder="--Enter phone number--"
            />
          </FormField>

          <div className="pt-2">
            <Button type="submit" className="w-full bg-primary">
              Submit
            </Button>
          </div>
        </form>
      </FormDialog>

      <DeleteConfirmDialog
        isOpen={leaveToDelete !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setLeaveToDelete(null);
          }
        }}
        title="Delete Leave Plan"
        description={`Are you sure you want to delete "${leaveToDelete?.leaveType ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
