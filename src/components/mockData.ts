import {
  Calendar,
  FileText,
  Heart,
  HeartPlus,
  LogOut,
  ReceiptText,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import type { CategoryBase } from "./shared/category-selection-modal";

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
  bgColor?: string;
  iconBgColor?: string;
  iconColor?: string;
}

export const approvalCategories: CategoryBase[] = [
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

export const hmoCategories: CategoryBase[] = [
  {
    id: "hmo-setup",
    title: "HMO Setup",
    icon: HeartPlus,
    bgColor:
      "border border-border/30 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 hover:border-primary/50",
    iconBgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "manage-hmo-setup",
    title: "Manage HMO Setup",
    icon: Heart,
    bgColor:
      "border border-border/30 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 hover:border-primary/50",
    iconBgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
];

export const exitRetirementCombinedCategories: CategoryBase[] = [
  {
    id: "exit-approval",
    title: "Exit Approval",
    icon: LogOut,
    bgColor:
      "border border-border/30 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 hover:border-primary/50",
    iconBgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "staff-exit-approval",
    title: "Staff Exit Approval",
    icon: UserCheck,
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

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  subsidiary: string;
  designation: string;
  employmentType: string;
  status: string;
}

export const mockUsers: User[] = [
  {
    id: "user-1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    gender: "Male",
    subsidiary: "Admin",
    designation: "Manager",
    employmentType: "Full-time",
    status: "Active",
  },
  {
    id: "user-2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    gender: "Female",
    subsidiary: "Technology",
    designation: "Senior Developer",
    employmentType: "Full-time",
    status: "Active",
  },
  {
    id: "user-3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@example.com",
    gender: "Male",
    subsidiary: "Product",
    designation: "Product Manager",
    employmentType: "Full-time",
    status: "Active",
  },
  {
    id: "user-4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@example.com",
    gender: "Female",
    subsidiary: "Human Capital",
    designation: "HR Manager",
    employmentType: "Full-time",
    status: "Inactive",
  },
  {
    id: "user-5",
    firstName: "Robert",
    lastName: "Brown",
    email: "robert.brown@example.com",
    gender: "Male",
    subsidiary: "Technology",
    designation: "DevOps Engineer",
    employmentType: "Contract",
    status: "Active",
  },
];

// Mock options for dropdowns
export const mockGenderOptions = [
  { id: "male", value: "Male", label: "Male" },
  { id: "female", value: "Female", label: "Female" },
  { id: "other", value: "Other", label: "Other" },
];

export const mockSubsidiaryOptions = [
  { id: "admin", value: "Admin", label: "Admin" },
  { id: "tech", value: "Technology", label: "Technology" },
  { id: "product", value: "Product", label: "Product" },
  { id: "hc", value: "Human Capital", label: "Human Capital" },
  { id: "cs", value: "Customer Support", label: "Customer Support" },
];

export const mockDesignationOptions = [
  { id: "manager", value: "Manager", label: "Manager" },
  { id: "dev", value: "Senior Developer", label: "Senior Developer" },
  { id: "pm", value: "Product Manager", label: "Product Manager" },
  { id: "hr", value: "HR Manager", label: "HR Manager" },
  { id: "devops", value: "DevOps Engineer", label: "DevOps Engineer" },
  { id: "designer", value: "UI/UX Designer", label: "UI/UX Designer" },
  { id: "analyst", value: "Business Analyst", label: "Business Analyst" },
];

export const mockEmploymentTypeOptions = [
  { id: "fulltime", value: "Full-time", label: "Full-time" },
  { id: "parttime", value: "Part-time", label: "Part-time" },
  { id: "contract", value: "Contract", label: "Contract" },
  { id: "intern", value: "Intern", label: "Intern" },
];

export const mockStatusOptions = [
  { id: "active", value: "Active", label: "Active" },
  { id: "inactive", value: "Inactive", label: "Inactive" },
  { id: "pending", value: "Pending", label: "Pending" },
];

export interface ReadingList {
  id: string;
  title: string;
  filePath: string;
  fileName: string;
  uploadedAt: string;
}

export const mockReadingLists: ReadingList[] = [
  {
    id: "rl-1",
    title: "Company Culture Guide",
    filePath: "/documents/company-culture-guide.pdf",
    fileName: "company-culture-guide.pdf",
    uploadedAt: "2025-01-15",
  },
  {
    id: "rl-2",
    title: "Employee Handbook 2025",
    filePath: "/documents/employee-handbook-2025.pdf",
    fileName: "employee-handbook-2025.pdf",
    uploadedAt: "2025-01-10",
  },
  {
    id: "rl-3",
    title: "Code of Conduct",
    filePath: "/documents/code-of-conduct.pdf",
    fileName: "code-of-conduct.pdf",
    uploadedAt: "2025-01-05",
  },
  {
    id: "rl-4",
    title: "HR Policies and Procedures",
    filePath: "/documents/hr-policies.pdf",
    fileName: "hr-policies.pdf",
    uploadedAt: "2024-12-20",
  },
  {
    id: "rl-5",
    title: "Health and Safety Guidelines",
    filePath: "/documents/health-safety-guidelines.pdf",
    fileName: "health-safety-guidelines.pdf",
    uploadedAt: "2024-12-15",
  },
];

export interface HMOSetup {
  id: string;
  employeeName: string;
  hmoServiceProvider: string;
  registrationDate: string;
}

export const mockHMOSetups: HMOSetup[] = [
  {
    id: "hmo-1",
    employeeName: "Opeyemi Alabi",
    hmoServiceProvider: "Reliance HMO",
    registrationDate: "2025-11-17",
  },
  {
    id: "hmo-2",
    employeeName: "Chioma Okafor",
    hmoServiceProvider: "NHIA",
    registrationDate: "2025-10-22",
  },
  {
    id: "hmo-3",
    employeeName: "Kunle Adeyemi",
    hmoServiceProvider: "HealthPlus",
    registrationDate: "2025-09-15",
  },
  {
    id: "hmo-4",
    employeeName: "Adeola Okonkwo",
    hmoServiceProvider: "Axa Mansard",
    registrationDate: "2025-08-30",
  },
  {
    id: "hmo-5",
    employeeName: "Tunde Olugbami",
    hmoServiceProvider: "Reliance HMO",
    registrationDate: "2025-07-12",
  },
];

// Mock options for HMO providers
export const mockHMOProviders = [
  { id: "reliance", value: "Reliance HMO", label: "Reliance HMO" },
  { id: "nhia", value: "NHIA", label: "NHIA" },
  { id: "healthplus", value: "HealthPlus", label: "HealthPlus" },
  { id: "axa", value: "Axa Mansard", label: "Axa Mansard" },
  { id: "hygeia", value: "Hygeia HMO", label: "Hygeia HMO" },
  { id: "vanguard", value: "Vanguard HMO", label: "Vanguard HMO" },
];

// Mock employee options
export const mockEmployees = [
  { id: "emp-1", name: "Opeyemi Alabi", email: "opeyemi@example.com" },
  { id: "emp-2", name: "Chioma Okafor", email: "chioma@example.com" },
  { id: "emp-3", name: "Kunle Adeyemi", email: "kunle@example.com" },
  { id: "emp-4", name: "Adeola Okonkwo", email: "adeola@example.com" },
  { id: "emp-5", name: "Tunde Olugbami", email: "tunde@example.com" },
  { id: "emp-6", name: "Zainab Hassan", email: "zainab@example.com" },
  { id: "emp-7", name: "Chukwu Nwosu", email: "chukwu@example.com" },
];

export interface ManageHMO {
  id: string;
  hmoName: string;
  newEntrantFormPath: string;
  newEntrantFileName: string;
  existingEmployeeFormPath: string;
  existingEmployeeFileName: string;
}

export const mockManageHMOs: ManageHMO[] = [
  {
    id: "hmo-1",
    hmoName: "Reliance HMO",
    newEntrantFormPath: "/documents/reliance-new-entrant-form.pdf",
    newEntrantFileName: "reliance-new-entrant-form.pdf",
    existingEmployeeFormPath: "/documents/reliance-existing-employee-form.pdf",
    existingEmployeeFileName: "reliance-existing-employee-form.pdf",
  },
  {
    id: "hmo-2",
    hmoName: "NHIA",
    newEntrantFormPath: "/documents/nhia-new-entrant-form.pdf",
    newEntrantFileName: "nhia-new-entrant-form.pdf",
    existingEmployeeFormPath: "/documents/nhia-existing-employee-form.pdf",
    existingEmployeeFileName: "nhia-existing-employee-form.pdf",
  },
  {
    id: "hmo-3",
    hmoName: "HealthPlus",
    newEntrantFormPath: "/documents/healthplus-new-entrant-form.pdf",
    newEntrantFileName: "healthplus-new-entrant-form.pdf",
    existingEmployeeFormPath:
      "/documents/healthplus-existing-employee-form.pdf",
    existingEmployeeFileName: "healthplus-existing-employee-form.pdf",
  },
  {
    id: "hmo-4",
    hmoName: "Axa Mansard",
    newEntrantFormPath: "/documents/axa-new-entrant-form.pdf",
    newEntrantFileName: "axa-new-entrant-form.pdf",
    existingEmployeeFormPath: "/documents/axa-existing-employee-form.pdf",
    existingEmployeeFileName: "axa-existing-employee-form.pdf",
  },
  {
    id: "hmo-5",
    hmoName: "Hygeia HMO",
    newEntrantFormPath: "/documents/hygeia-new-entrant-form.pdf",
    newEntrantFileName: "hygeia-new-entrant-form.pdf",
    existingEmployeeFormPath: "/documents/hygeia-existing-employee-form.pdf",
    existingEmployeeFileName: "hygeia-existing-employee-form.pdf",
  },
];

export interface JobRole {
  id: string;
  jobRole: string;
  department: string;
  unit: string;
}

export const mockJobRoles: JobRole[] = [
  {
    id: "jr-1",
    jobRole: "Senior Software Engineer",
    department: "Technology",
    unit: "Engineering",
  },
  {
    id: "jr-2",
    jobRole: "Product Manager",
    department: "Product",
    unit: "Product Development",
  },
  {
    id: "jr-3",
    jobRole: "HR Manager",
    department: "Human Capital",
    unit: "Human Resources",
  },
  {
    id: "jr-4",
    jobRole: "Finance Officer",
    department: "Finance",
    unit: "Accounting",
  },
  {
    id: "jr-5",
    jobRole: "Business Analyst",
    department: "Admin",
    unit: "Operations",
  },
];

// Mock unit options
export const mockUnitOptions = [
  { id: "eng", value: "Engineering", label: "Engineering" },
  { id: "pd", value: "Product Development", label: "Product Development" },
  { id: "hr", value: "Human Resources", label: "Human Resources" },
  { id: "acc", value: "Accounting", label: "Accounting" },
  { id: "ops", value: "Operations", label: "Operations" },
  { id: "sales", value: "Sales", label: "Sales" },
  { id: "support", value: "Support", label: "Support" },
  { id: "legal", value: "Legal", label: "Legal" },
];

// Mock job role suggestions
export const mockJobRoleSuggestions = [
  "Senior Software Engineer",
  "Junior Developer",
  "Product Manager",
  "HR Manager",
  "Finance Officer",
  "Business Analyst",
  "UX/UI Designer",
  "DevOps Engineer",
  "Data Scientist",
  "Project Manager",
  "Sales Manager",
  "Customer Support Lead",
];

export interface Holiday {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  sameDateEveryYear: boolean;
}

export const mockHolidays: Holiday[] = [
  {
    id: "holiday-1",
    title: "New Year",
    startDate: "2025-01-01",
    endDate: "2025-01-01",
    sameDateEveryYear: true,
  },
  {
    id: "holiday-2",
    title: "Independence Day",
    startDate: "2025-06-12",
    endDate: "2025-06-12",
    sameDateEveryYear: true,
  },
  {
    id: "holiday-3",
    title: "Democracy Day",
    startDate: "2025-06-13",
    endDate: "2025-06-13",
    sameDateEveryYear: true,
  },
  {
    id: "holiday-4",
    title: "Christmas Holiday",
    startDate: "2025-12-25",
    endDate: "2025-12-26",
    sameDateEveryYear: true,
  },
  {
    id: "holiday-5",
    title: "Company Anniversary",
    startDate: "2025-03-15",
    endDate: "2025-03-15",
    sameDateEveryYear: false,
  },
];

// Mock options for "Same Date Every Year"
export const mockSameDateOptions = [
  { id: "yes", value: true, label: "Yes" },
  { id: "no", value: false, label: "No" },
];

export interface LeaveType {
  id: string;
  name: string;
  days: number;
  description: string;
}

export const mockLeaveTypes: LeaveType[] = [
  {
    id: "lt-1",
    name: "STUDY LEAVE",
    days: 20,
    description:
      "A period of absence from work granted to employees for the purpose of pursuing educational activities or further training.",
  },
  {
    id: "lt-2",
    name: "SICK LEAVE",
    days: 20,
    description:
      "Time off granted to employees when they are ill or injured and unable to work.",
  },
  {
    id: "lt-3",
    name: "COMPASSIONATE LEAVE",
    days: 20,
    description:
      "Leave taken by employees to deal with the death or serious illness of a close family member or loved one.",
  },
  {
    id: "lt-4",
    name: "MATERNITY LEAVE",
    days: 20,
    description:
      "Time off granted to female employees before and after the birth of their child to recover and care for their newborn.",
  },
];

export interface AnnualLeavePlan {
  id: string;
  periodTitle: string;
  startDate: string;
  endDate: string;
}

export const mockAnnualLeavePlans: AnnualLeavePlan[] = [
  {
    id: "alp-1",
    periodTitle: "Q1 Planning 2025",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
  },
  {
    id: "alp-2",
    periodTitle: "Q2 Planning 2025",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
  },
  {
    id: "alp-3",
    periodTitle: "Q3 Planning 2025",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
  },
  {
    id: "alp-4",
    periodTitle: "Q4 Planning 2025",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
  },
];

export interface LeaveReport {
  id: string;
  leaveType: string;
  staffName: string;
  staffNumber: string;
  department: string;
  commencementDate: string;
  resumptionDate: string;
}

export interface ApprovedLeave {
  id: string;
  employeeName: string;
  leaveType: string;
  days: number;
  startDate: string;
  endDate: string;
  status: "Approved" | "Pending" | "Rejected";
}

export const mockLeaveReports: LeaveReport[] = [
  {
    id: "lr-1",
    leaveType: "Exam Leave",
    staffName: "Akinlade Solomon",
    staffNumber: "40062",
    department: "Human Capital Management",
    commencementDate: "2025-12-01",
    resumptionDate: "2025-12-01",
  },
  {
    id: "lr-2",
    leaveType: "Maternity leave",
    staffName: "Akinlade Solomon",
    staffNumber: "40062",
    department: "Human Capital Management",
    commencementDate: "2025-12-01",
    resumptionDate: "2025-12-01",
  },
  {
    id: "lr-3",
    leaveType: "Casual Leave",
    staffName: "Akinlade Solomon",
    staffNumber: "40062",
    department: "Human Capital Management",
    commencementDate: "2025-12-01",
    resumptionDate: "2025-12-01",
  },
  {
    id: "lr-4",
    leaveType: "Sick Leave",
    staffName: "Akinlade Solomon",
    staffNumber: "40062",
    department: "Human Capital Management",
    commencementDate: "2025-12-01",
    resumptionDate: "2025-12-01",
  },
  {
    id: "lr-5",
    leaveType: "Maternity leave",
    staffName: "Akinlade Solomon",
    staffNumber: "40062",
    department: "Human Capital Management",
    commencementDate: "2025-12-01",
    resumptionDate: "2025-12-01",
  },
];

export const mockApprovedLeaves: ApprovedLeave[] = [
  {
    id: "al-1",
    employeeName: "Akinlade Solomon",
    leaveType: "Exam Leave",
    days: 5,
    startDate: "2025-11-17",
    endDate: "2025-11-19",
    status: "Pending",
  },
  {
    id: "al-2",
    employeeName: "Akinlade Solomon",
    leaveType: "Maternity leave",
    days: 5,
    startDate: "2025-11-17",
    endDate: "2025-11-19",
    status: "Rejected",
  },
  {
    id: "al-3",
    employeeName: "Akinlade Solomon",
    leaveType: "Casual Leave",
    days: 5,
    startDate: "2025-11-17",
    endDate: "2025-11-19",
    status: "Rejected",
  },
  {
    id: "al-4",
    employeeName: "Akinlade Solomon",
    leaveType: "Sick Leave",
    days: 5,
    startDate: "2025-11-17",
    endDate: "2025-11-19",
    status: "Approved",
  },
  {
    id: "al-5",
    employeeName: "Akinlade Solomon",
    leaveType: "Maternity leave",
    days: 5,
    startDate: "2025-11-17",
    endDate: "2025-11-19",
    status: "Approved",
  },
];

export const mockEmployeeOptions = [
  { id: "emp-1", value: "Akinlade Solomon", label: "Akinlade Solomon" },
  { id: "emp-2", value: "Chioma Okafor", label: "Chioma Okafor" },
  { id: "emp-3", value: "Kunle Adeyemi", label: "Kunle Adeyemi" },
];

export const mockLeaveTypeOptions = [
  { id: "exam", value: "Exam Leave", label: "Exam Leave" },
  { id: "maternity", value: "Maternity leave", label: "Maternity leave" },
  { id: "casual", value: "Casual Leave", label: "Casual Leave" },
  { id: "sick", value: "Sick Leave", label: "Sick Leave" },
];

export const mockApprovalStatusOptions = [
  { id: "approved", value: "Approved", label: "Approved" },
  { id: "pending", value: "Pending", label: "Pending" },
  { id: "rejected", value: "Rejected", label: "Rejected" },
];

export interface Unit {
  id: string;
  name: string;
  department: string;
  assignedLevels?: string[];
}

export const mockUnits: Unit[] = [
  {
    id: "unit-1",
    name: "Engineering Team",
    department: "Technology",
    assignedLevels: ["Level 1", "Level 2"],
  },
  {
    id: "unit-2",
    name: "Product Development",
    department: "Product",
    assignedLevels: ["Level 1", "Level 2", "Level 3"],
  },
  {
    id: "unit-3",
    name: "Human Resources",
    department: "Human Capital",
    assignedLevels: ["Level 1"],
  },
  {
    id: "unit-4",
    name: "Finance Operations",
    department: "Finance",
    assignedLevels: ["Level 1", "Level 2"],
  },
  {
    id: "unit-5",
    name: "Operations",
    department: "Admin",
    assignedLevels: ["Level 1"],
  },
];

export interface OnboardingDocument {
  id: string;
  title: string;
  filePath: string;
  fileName: string;
  uploadedAt: string;
}

export const mockOnboardingDocuments: OnboardingDocument[] = [
  {
    id: "od-1",
    title: "Company Handbook",
    filePath: "/documents/company-handbook.pdf",
    fileName: "company-handbook.pdf",
    uploadedAt: "2025-01-15",
  },
  {
    id: "od-2",
    title: "Employee Code of Conduct",
    filePath: "/documents/code-of-conduct.pdf",
    fileName: "code-of-conduct.pdf",
    uploadedAt: "2025-01-10",
  },
  {
    id: "od-3",
    title: "Benefits Overview",
    filePath: "/documents/benefits-overview.pdf",
    fileName: "benefits-overview.pdf",
    uploadedAt: "2025-01-05",
  },
  {
    id: "od-4",
    title: "IT Security Policy",
    filePath: "/documents/it-security-policy.pdf",
    fileName: "it-security-policy.pdf",
    uploadedAt: "2024-12-20",
  },
  {
    id: "od-5",
    title: "Health and Safety Guidelines",
    filePath: "/documents/health-safety.pdf",
    fileName: "health-safety.pdf",
    uploadedAt: "2024-12-15",
  },
];

export interface ExitApprovalSetup {
  id: string;
  designation: string;
  approvalLevel: string;
  approvingDesignation: string;
}

export const mockExitApprovalSetups: ExitApprovalSetup[] = [
  {
    id: "eas-1",
    designation: "Junior Staff",
    approvalLevel: "1",
    approvingDesignation: "Department Manager",
  },
  {
    id: "eas-2",
    designation: "Senior Staff",
    approvalLevel: "2",
    approvingDesignation: "Senior Manager",
  },
  {
    id: "eas-3",
    designation: "Manager",
    approvalLevel: "2",
    approvingDesignation: "Director",
  },
  {
    id: "eas-4",
    designation: "Director",
    approvalLevel: "3",
    approvingDesignation: "CEO",
  },
  {
    id: "eas-5",
    designation: "Executive",
    approvalLevel: "3",
    approvingDesignation: "Board Secretary",
  },
];

export interface StaffExitApprovalSetup {
  id: string;
  designation: string;
  numberOfApprovals: string;
  approvingDepartmentHOD: string;
}

export const mockStaffExitApprovalSetups: StaffExitApprovalSetup[] = [
  {
    id: "seas-1",
    designation: "Junior Staff",
    numberOfApprovals: "1",
    approvingDepartmentHOD: "Department Manager",
  },
  {
    id: "seas-2",
    designation: "Senior Staff",
    numberOfApprovals: "2",
    approvingDepartmentHOD: "Senior Manager",
  },
  {
    id: "seas-3",
    designation: "Manager",
    numberOfApprovals: "2",
    approvingDepartmentHOD: "Director",
  },
  {
    id: "seas-4",
    designation: "Director",
    numberOfApprovals: "3",
    approvingDepartmentHOD: "CEO",
  },
  {
    id: "seas-5",
    designation: "Executive",
    numberOfApprovals: "3",
    approvingDepartmentHOD: "Board Secretary",
  },
];

// Mock designation options
export const mockStaffDesignationOptions = [
  { id: "junior", value: "Junior Staff", label: "Junior Staff" },
  { id: "senior", value: "Senior Staff", label: "Senior Staff" },
  { id: "manager", value: "Manager", label: "Manager" },
  { id: "senior-manager", value: "Senior Manager", label: "Senior Manager" },
  { id: "director", value: "Director", label: "Director" },
  { id: "executive", value: "Executive", label: "Executive" },
  { id: "ceo", value: "CEO", label: "CEO" },
];

// Mock number of approvals options (1-5)
export const mockNumberOfApprovalsOptions = [
  { id: "num-1", value: "1", label: "1" },
  { id: "num-2", value: "2", label: "2" },
  { id: "num-3", value: "3", label: "3" },
  { id: "num-4", value: "4", label: "4" },
  { id: "num-5", value: "5", label: "5" },
];

// Mock approving department/HOD options
export const mockApprovingDepartmentHODOptions = [
  { id: "dept-mgr", value: "Department Manager", label: "Department Manager" },
  { id: "senior-mgr", value: "Senior Manager", label: "Senior Manager" },
  { id: "director", value: "Director", label: "Director" },
  { id: "ceo", value: "CEO", label: "CEO" },
  { id: "board-sec", value: "Board Secretary", label: "Board Secretary" },
  { id: "hr-manager", value: "HR Manager", label: "HR Manager" },
  { id: "finance-mgr", value: "Finance Manager", label: "Finance Manager" },
];
