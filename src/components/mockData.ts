import { Calendar, FileText, ReceiptText, type LucideIcon } from "lucide-react";

export interface Level {
  id: string;
  name: string;
  code: string;
  basicSalary: number;
  totalAnnualLeaveDays: number;
  annualLeaveDays?: number;
  transportAllowance?: number;
  minimumLeaveDays?: number;
  domesticAllowance?: number;
  utilityAllowance?: number;
  leaveExpirationInterval?: number;
  lunchSubsidy?: number;
}

export const mockLeaves: Level[] = [
  {
    id: "leave-1",
    name: "Annual Leave",
    code: "AL001",
    basicSalary: 50000,
    totalAnnualLeaveDays: 21,
    annualLeaveDays: 21,
    transportAllowance: 5000,
    minimumLeaveDays: 1,
    domesticAllowance: 2000,
    utilityAllowance: 1500,
    leaveExpirationInterval: 365,
    lunchSubsidy: 3000,
  },
  {
    id: "leave-2",
    name: "Sick Leave",
    code: "SL001",
    basicSalary: 50000,
    totalAnnualLeaveDays: 10,
    annualLeaveDays: 10,
    transportAllowance: 5000,
    minimumLeaveDays: 0,
    domesticAllowance: 2000,
    utilityAllowance: 1500,
    leaveExpirationInterval: 365,
    lunchSubsidy: 3000,
  },
  {
    id: "leave-3",
    name: "Maternity Leave",
    code: "ML001",
    basicSalary: 50000,
    totalAnnualLeaveDays: 84,
    annualLeaveDays: 84,
    transportAllowance: 5000,
    minimumLeaveDays: 1,
    domesticAllowance: 2000,
    utilityAllowance: 1500,
    leaveExpirationInterval: 730,
    lunchSubsidy: 3000,
  },
  {
    id: "leave-4",
    name: "Study Leave",
    code: "STL001",
    basicSalary: 50000,
    totalAnnualLeaveDays: 5,
    annualLeaveDays: 5,
    transportAllowance: 5000,
    minimumLeaveDays: 1,
    domesticAllowance: 2000,
    utilityAllowance: 1500,
    leaveExpirationInterval: 365,
    lunchSubsidy: 3000,
  },
  {
    id: "leave-5",
    name: "Compassionate Leave",
    code: "CL001",
    basicSalary: 50000,
    totalAnnualLeaveDays: 3,
    annualLeaveDays: 3,
    transportAllowance: 5000,
    minimumLeaveDays: 1,
    domesticAllowance: 2000,
    utilityAllowance: 1500,
    leaveExpirationInterval: 365,
    lunchSubsidy: 3000,
  },
];

// Mock options for dropdowns
export const mockAnnualLeaveDaysOptions = [
  { id: "1", value: 1 },
  { id: "5", value: 5 },
  { id: "10", value: 10 },
  { id: "15", value: 15 },
  { id: "21", value: 21 },
  { id: "30", value: 30 },
  { id: "84", value: 84 },
];

export const mockMinimumLeaveDaysOptions = [
  { id: "0", value: 0 },
  { id: "1", value: 1 },
  { id: "2", value: 2 },
  { id: "3", value: 3 },
  { id: "5", value: 5 },
];

export const mockLeaveExpirationIntervalOptions = [
  { id: "30", value: 30, label: "30 days" },
  { id: "90", value: 90, label: "90 days" },
  { id: "180", value: 180, label: "180 days" },
  { id: "365", value: 365, label: "365 days" },
  { id: "730", value: 730, label: "730 days" },
];

export interface ApprovalCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  bgColor: string;
  iconBgColor: string;
  iconColor?: string;
}

export const approvalCategories: ApprovalCategory[] = [
  {
    id: "leave-approval",
    title: "Leave approval",
    icon: Calendar,
    bgColor:
      "border border-border/30 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 hover:border-primary/50",
    iconBgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "memo-approval",
    title: "E - memo approval",
    icon: FileText,
    bgColor:
      "border border-border/30 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 hover:border-primary/50",
    iconBgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "voucher-approval",
    title: "E - voucher approval",
    icon: ReceiptText,
    bgColor:
      "border border-border/30 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 hover:border-primary/50",
    iconBgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
];

export interface LeaveApprovalSetup {
  id: string;
  role: string;
  levelName: string;
  levelOrder: number;
  department: string;
  approvalLevel: string;
  description?: string;
}

export const mockLeaveApprovals: LeaveApprovalSetup[] = [
  {
    id: "la-1",
    role: "Employee",
    levelName: "Direct Manager",
    levelOrder: 1,
    department: "Technology",
    approvalLevel: "Level 1",
  },
  {
    id: "la-2",
    role: "Employee",
    levelName: "Department Head",
    levelOrder: 2,
    department: "Technology",
    approvalLevel: "Level 2",
  },
  {
    id: "la-3",
    role: "Manager",
    levelName: "HR Manager",
    levelOrder: 1,
    department: "Human Capital",
    approvalLevel: "Level 1",
  },
  {
    id: "la-4",
    role: "Employee",
    levelName: "Executive",
    levelOrder: 3,
    department: "Admin",
    approvalLevel: "Level 3",
  },
];

// Mock options for dropdowns
export const mockRoleOptions = [
  { id: "emp", value: "Employee", label: "Employee" },
  { id: "mgr", value: "Manager", label: "Manager" },
  { id: "head", value: "Head of Department", label: "Head of Department" },
  { id: "exec", value: "Executive", label: "Executive" },
];

export const mockDepartmentOptions = [
  { id: "tech", value: "Technology", label: "Technology" },
  { id: "hc", value: "Human Capital", label: "Human Capital" },
  { id: "product", value: "Product", label: "Product" },
  { id: "admin", value: "Admin", label: "Admin" },
];

export const mockApprovalLevelOptions = [
  { id: "l1", value: "Level 1", label: "Level 1" },
  { id: "l2", value: "Level 2", label: "Level 2" },
  { id: "l3", value: "Level 3", label: "Level 3" },
  { id: "l4", value: "Level 4", label: "Level 4" },
];

export interface MemoApprovalSetup {
  id: string;
  level: number;
  memoType: string;
  approvingOfficers?: string[];
  committeeOfficers?: string[];
}

export const mockMemoApprovals: MemoApprovalSetup[] = [
  {
    id: "memo-1",
    level: 1,
    memoType: "General",
    approvingOfficers: ["John Doe", "Jane Smith"],
  },
  {
    id: "memo-2",
    level: 2,
    memoType: "General",
    approvingOfficers: ["John Doe", "Jane Smith", "Mike Johnson"],
  },
  {
    id: "memo-3",
    level: 1,
    memoType: "Asset",
    committeeOfficers: ["Sarah Williams", "Robert Brown"],
  },
  {
    id: "memo-4",
    level: 3,
    memoType: "Asset",
    committeeOfficers: ["Sarah Williams", "Robert Brown", "Lisa Anderson"],
  },
];

// Mock options
export const mockLevelOptions = [
  { id: "1", value: 1, label: "1" },
  { id: "2", value: 2, label: "2" },
  { id: "3", value: 3, label: "3" },
  { id: "4", value: 4, label: "4" },
  { id: "5", value: 5, label: "5" },
];

export const mockMemoTypeOptions = [
  { id: "general", value: "General", label: "General" },
  { id: "asset", value: "Asset", label: "Asset" },
];

export const mockApprovingOfficers = [
  { id: "ao-1", name: "John Doe", email: "john@example.com" },
  { id: "ao-2", name: "Jane Smith", email: "jane@example.com" },
  { id: "ao-3", name: "Mike Johnson", email: "mike@example.com" },
  { id: "ao-4", name: "Sarah Williams", email: "sarah@example.com" },
  { id: "ao-5", name: "Robert Brown", email: "robert@example.com" },
  { id: "ao-6", name: "Lisa Anderson", email: "lisa@example.com" },
];

export const mockCommitteeOfficers = [
  { id: "co-1", name: "Sarah Williams", email: "sarah@example.com" },
  { id: "co-2", name: "Robert Brown", email: "robert@example.com" },
  { id: "co-3", name: "Lisa Anderson", email: "lisa@example.com" },
  { id: "co-4", name: "David Miller", email: "david@example.com" },
  { id: "co-5", name: "Emma Davis", email: "emma@example.com" },
  { id: "co-6", name: "Tom Wilson", email: "tom@example.com" },
];

export interface VoucherApprovalSetup {
  id: string;
  department: string;
  level: number;
  approvingOfficers?: string[];
}

export const mockVoucherApprovals: VoucherApprovalSetup[] = [
  {
    id: "voucher-1",
    department: "Admin",
    level: 1,
    approvingOfficers: ["John Doe"],
  },
  {
    id: "voucher-2",
    department: "Admin",
    level: 3,
    approvingOfficers: ["John Doe", "Jane Smith", "Mike Johnson"],
  },
  {
    id: "voucher-3",
    department: "Technology",
    level: 2,
    approvingOfficers: ["Sarah Williams", "Robert Brown"],
  },
  {
    id: "voucher-4",
    department: "Human Capital",
    level: 3,
    approvingOfficers: ["Lisa Anderson", "David Miller", "Emma Davis"],
  },
];
