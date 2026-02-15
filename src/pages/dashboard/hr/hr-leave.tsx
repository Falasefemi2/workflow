import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Calendar,
  FileText,
  CheckCircle,
  MoreVertical,
  Plus,
  Trash2,
} from "lucide-react";
import { FormDialog } from "@/components/shared/form-dialog";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { LeavePreviewModal } from "./hr-leave-preview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLeaveTypeManagement } from "@/hooks/use-leave";
import { useAnnualLeavePlanManagement } from "@/hooks/use-annual-leave-plan";
import {
  mockLeaveReports,
  mockApprovedLeaves,
  mockDepartmentOptions,
  mockEmployeeOptions,
  mockLeaveTypeOptions,
  mockApprovalStatusOptions,
  type ApprovedLeave,
} from "@/components/mockData";

type LeaveManagementTab =
  | "leave-type"
  | "leave-plan"
  | "leave-report"
  | "approved-leave";

interface MenuItem {
  id: LeaveManagementTab;
  icon: React.ReactNode;
  label: string;
}

interface PreviewLeave {
  employeeName: string;
  leaveType: string;
  days?: number;
  startDate: string;
  endDate: string;
  department?: string;
  staffNumber?: string;
  status?: string;
}

export default function LeaveManagementCompleteFullPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<LeaveManagementTab>("leave-type");
  const [previewLeave, setPreviewLeave] = useState<PreviewLeave | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Leave Type Management
  const {
    leaveTypes,
    isDialogOpen: isLeaveTypeDialogOpen,
    formData: leaveTypeFormData,
    isEditMode: isLeaveTypeEditMode,
    modalText: leaveTypeModalText,
    handleAddLeaveType,
    handleEditLeaveType,
    handleDeleteLeaveType,
    handleSubmit: handleLeaveTypeSubmit,
    setFormData: setLeaveTypeFormData,
    setIsDialogOpen: setIsLeaveTypeDialogOpen,
  } = useLeaveTypeManagement();

  // Annual Leave Plan Management
  const {
    annualLeavePlans,
    isDialogOpen: isLeavePlanDialogOpen,
    formData: leavePlanFormData,
    isEditMode: isLeavePlanEditMode,
    modalText: leavePlanModalText,
    handleAddPlan,
    handleEditPlan,
    handleDeletePlan,
    handleSubmit: handleLeavePlanSubmit,
    setFormData: setLeavePlanFormData,
    setIsDialogOpen: setIsLeavePlanDialogOpen,
  } = useAnnualLeavePlanManagement();

  const menuItems: MenuItem[] = [
    {
      id: "leave-type",
      icon: <Calendar className="w-5 h-5" />,
      label: "Leave Type",
    },
    {
      id: "leave-plan",
      icon: <Calendar className="w-5 h-5" />,
      label: "Annual leave Plan",
    },
    {
      id: "leave-report",
      icon: <FileText className="w-5 h-5" />,
      label: "Leave report",
    },
    {
      id: "approved-leave",
      icon: <CheckCircle className="w-5 h-5" />,
      label: "Approved Leave",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleApprovedLeavePreview = (leave: ApprovedLeave) => {
    setPreviewLeave({
      employeeName: leave.employeeName,
      leaveType: leave.leaveType,
      days: leave.days,
      startDate: leave.startDate,
      endDate: leave.endDate,
      status: leave.status,
    });
    setIsPreviewOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/30">
        <button
          onClick={() => navigate("/dashboard/hr/system")}
          className="flex items-center gap-2 text-primary hover:text-primary/80"
        >
          <span>{"<"}</span>
          <span>Return home</span>
        </button>
        {activeTab === "leave-type" && (
          <Button
            onClick={handleAddLeaveType}
            className="bg-primary text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Leave Type
          </Button>
        )}
        {activeTab === "leave-plan" && (
          <Button
            onClick={handleAddPlan}
            className="bg-primary text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Annual Leave Planning
          </Button>
        )}
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-48 shrink-0">
          <div className="bg-primary-foreground rounded-lg p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-white text-primary font-semibold border-l-4 border-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Leave Type Tab */}
          {activeTab === "leave-type" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leaveTypes.map((leaveType) => (
                  <div
                    key={leaveType.id}
                    className="border-l-4 border-primary bg-card border border-border/30 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          {leaveType.name}
                        </h3>
                        <p className="text-sm text-foreground/70">
                          {leaveType.days} Days
                        </p>
                      </div>
                      <div className="relative group">
                        <button className="p-1 hover:bg-secondary/20 rounded">
                          <MoreVertical className="w-5 h-5 text-foreground/50" />
                        </button>
                        <div className="hidden group-hover:block absolute right-0 mt-1 w-40 bg-card border border-border/30 rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => handleEditLeaveType(leaveType)}
                            className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary/10 border-b border-border/30"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteLeaveType(leaveType)}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {leaveType.description}
                    </p>
                  </div>
                ))}
                <div
                  onClick={handleAddLeaveType}
                  className="border-2 border-dashed border-border/30 rounded-lg p-6 flex items-center justify-center hover:bg-secondary/10 cursor-pointer transition-colors"
                >
                  <div className="text-center">
                    <Plus className="w-8 h-8 text-foreground/50 mx-auto mb-2" />
                    <p className="text-foreground/70">Create New Leave</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Annual Leave Plan Tab */}
          {activeTab === "leave-plan" && (
            <div>
              <DataTable
                columns={[
                  { key: "periodTitle", label: "Period Title" },
                  {
                    key: "startDate",
                    label: "Start Date",
                    render: (value) => formatDate(value),
                  },
                  {
                    key: "endDate",
                    label: "End Date",
                    render: (value) => formatDate(value),
                  },
                ]}
                data={annualLeavePlans}
                onEdit={handleEditPlan}
                onDelete={handleDeletePlan}
                totalEntries={annualLeavePlans.length}
              />
            </div>
          )}

          {/* Leave Report Tab */}
          {activeTab === "leave-report" && (
            <div className="space-y-6">
              {/* Filter Section */}
              <div className="bg-primary-foreground border border-r-primary-foreground rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Select defaultValue="">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--Select department--" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDepartmentOptions.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select defaultValue="">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--Select employee--" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockEmployeeOptions.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select defaultValue="">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--Select leave type--" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockLeaveTypeOptions.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input type="date" placeholder="--Select date--" />
                  <Input type="date" placeholder="--Select date--" />
                  <Select defaultValue="">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--Select status--" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockApprovalStatusOptions.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4 justify-end mt-4">
                  <Button variant="outline">Download Leave Report</Button>
                  <Button className="bg-primary text-white">
                    Fetch Leave Report
                  </Button>
                </div>
              </div>

              {/* Leave Report Table */}
              <DataTable
                columns={[
                  { key: "leaveType", label: "Leave Type" },
                  { key: "staffName", label: "Staff Name" },
                  { key: "staffNumber", label: "Staff Number" },
                  { key: "department", label: "Department" },
                  {
                    key: "commencementDate",
                    label: "Commencement Date",
                    render: (value) => formatDate(value),
                  },
                  {
                    key: "resumptionDate",
                    label: "Resumption Date",
                    render: (value) => formatDate(value),
                  },
                ]}
                data={mockLeaveReports}
                showActions={false}
                totalEntries={mockLeaveReports.length}
              />
            </div>
          )}

          {/* Approved Leave Tab */}
          {activeTab === "approved-leave" && (
            <div>
              <div className="overflow-x-auto border border-border/30 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-border/30">
                      <th className="px-6 py-3 text-left text-sm font-bold text-primary">
                        S/N
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-primary">
                        Employee's Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-primary">
                        Leave Type
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-primary">
                        Days
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-primary">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-primary">
                        End Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-primary">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-primary">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockApprovedLeaves.map((leave, index) => (
                      <tr
                        key={leave.id}
                        className="border-b border-border/30 hover:bg-secondary/10 transition-colors"
                      >
                        <td className="px-6 py-3 text-sm text-foreground">
                          {index + 1}
                        </td>
                        <td className="px-6 py-3 text-sm text-foreground">
                          {leave.employeeName}
                        </td>
                        <td className="px-6 py-3 text-sm text-foreground">
                          {leave.leaveType}
                        </td>
                        <td className="px-6 py-3 text-sm text-foreground">
                          {leave.days}
                        </td>
                        <td className="px-6 py-3 text-sm text-foreground">
                          {formatDate(leave.startDate)}
                        </td>
                        <td className="px-6 py-3 text-sm text-foreground">
                          {formatDate(leave.endDate)}
                        </td>
                        <td
                          className={`px-6 py-3 text-sm font-semibold ${getStatusColor(leave.status)}`}
                        >
                          {leave.status}
                        </td>
                        <td className="px-6 py-3 text-sm">
                          <button
                            onClick={() => handleApprovedLeavePreview(leave)}
                            className="text-primary hover:text-primary/80 font-medium"
                          >
                            Preview
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Leave Type Form Dialog */}
      <FormDialog
        isOpen={isLeaveTypeDialogOpen}
        onClose={() => {
          setIsLeaveTypeDialogOpen(false);
        }}
        title={leaveTypeModalText}
      >
        <form onSubmit={handleLeaveTypeSubmit} className="space-y-6">
          <FormField label="Leave Type Name" required>
            <Input
              placeholder="Give the leave a title"
              value={leaveTypeFormData.name}
              onChange={(e) =>
                setLeaveTypeFormData({
                  ...leaveTypeFormData,
                  name: e.target.value,
                })
              }
            />
          </FormField>

          <FormField label="Description" required>
            <textarea
              placeholder="--Enter description--"
              value={leaveTypeFormData.description}
              onChange={(e) =>
                setLeaveTypeFormData({
                  ...leaveTypeFormData,
                  description: e.target.value,
                })
              }
              className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
            />
          </FormField>

          <FormField label="Max Leave Days" required>
            <Input
              type="number"
              placeholder="--Enter leave days--"
              value={leaveTypeFormData.days}
              onChange={(e) =>
                setLeaveTypeFormData({
                  ...leaveTypeFormData,
                  days: e.target.value,
                })
              }
            />
          </FormField>

          <div className="flex gap-4 justify-end pt-6 border-t border-border/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsLeaveTypeDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary">
              {isLeaveTypeEditMode ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </FormDialog>

      {/* Annual Leave Plan Form Dialog */}
      <FormDialog
        isOpen={isLeavePlanDialogOpen}
        onClose={() => {
          setIsLeavePlanDialogOpen(false);
        }}
        title={leavePlanModalText}
      >
        <form onSubmit={handleLeavePlanSubmit} className="space-y-6">
          <FormField label="Period Title" required>
            <Input
              placeholder="Give the leave a title"
              value={leavePlanFormData.periodTitle}
              onChange={(e) =>
                setLeavePlanFormData({
                  ...leavePlanFormData,
                  periodTitle: e.target.value,
                })
              }
            />
          </FormField>

          <FormField label="Start Date" required>
            <Input
              type="date"
              value={leavePlanFormData.startDate}
              onChange={(e) =>
                setLeavePlanFormData({
                  ...leavePlanFormData,
                  startDate: e.target.value,
                })
              }
            />
          </FormField>

          <FormField label="End Date" required>
            <Input
              type="date"
              value={leavePlanFormData.endDate}
              onChange={(e) =>
                setLeavePlanFormData({
                  ...leavePlanFormData,
                  endDate: e.target.value,
                })
              }
            />
          </FormField>

          <div className="flex gap-4 justify-end pt-6 border-t border-border/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsLeavePlanDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary">
              {isLeavePlanEditMode ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </FormDialog>

      {/* Leave Preview Modal */}
      <LeavePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        leave={previewLeave}
      />
    </div>
  );
}
