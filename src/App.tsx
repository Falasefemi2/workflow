import { Route, Routes } from "react-router";
import LoginPage from "./pages/auth/login-page";
import ForgotPasswordPage from "./pages/auth/forgot-password-page";
import ResetPasswordPage from "./pages/auth/reset-password-page";
import AdminDashboard from "./pages/dashboard/admin";
import RoleManagementPage from "./pages/dashboard/admin/pages/role";
import DashboardContent from "./pages/dashboard/admin/dashboard-content";
import SystemSetupContent from "./pages/dashboard/admin/system-setup-content";
import UserManagementContent from "./pages/dashboard/admin/user-management-content";
import AssetManagementContent from "./pages/dashboard/admin/asset-management-content";
import DepartmentManagementPage from "./pages/dashboard/admin/pages/department";
import DesignationManagementPage from "./pages/dashboard/admin/pages/designation";
import LevelManagementPage from "./pages/dashboard/admin/pages/level";
import LeaveApprovalPage from "./pages/dashboard/admin/pages/approval-leave";
import MemoApprovalPage from "./pages/dashboard/admin/pages/approval-memo";
import VoucherApprovalPage from "./pages/dashboard/admin/pages/approval-voucher";
import HrDashboard from "./pages/dashboard/hr";
import HRDashboardContent from "./pages/dashboard/hr/hr-dashboard-content";
import HRSystemSetupContent from "./pages/dashboard/hr/hr-system-setup-content";
import ReadingListPage from "./pages/dashboard/hr/hr-reading-list";
import HMOSetupPage from "./pages/dashboard/hr/hr-hmo-setup";
import ManageHMOPage from "./pages/dashboard/hr/hr-manage-hmo";
import JobRolePage from "./pages/dashboard/hr/job-role";
import HolidayManagementPage from "./pages/dashboard/hr/hr-holiday";
import LeaveManagementContentPage from "./pages/dashboard/hr/hr-leave";
import UnitManagementPage from "./pages/dashboard/hr/unit";
import OnboardingDocumentPage from "./pages/dashboard/hr/hr-onboarding-docs";
import ExitApprovalPage from "./pages/dashboard/hr/hr-exit-approval";
import StaffExitApprovalPage from "./pages/dashboard/hr/hr-staff-exit-approval";
import CandidateOfferPage from "./pages/dashboard/hr/hr-candidate-offer";
import { ThemeProvider } from "./components/theme-provider";
import HRMenuContent from "./pages/dashboard/hr/menu/menu-content";
import MenuPlaceholderPage from "./pages/dashboard/hr/menu/menu-placeholder-page";
import LeavePlanningPage from "./pages/dashboard/hr/menu/leave-planning";
import HMOPage from "./pages/dashboard/hr/menu/hmo";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Admin routes */}
        <Route path="/dashboard/admin" element={<AdminDashboard />}>
          <Route index element={<DashboardContent />} />
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="system" element={<SystemSetupContent />} />
          <Route path="users" element={<UserManagementContent />} />
          <Route path="assets" element={<AssetManagementContent />} />
          <Route path="roles" element={<RoleManagementPage />} />
          <Route path="departments" element={<DepartmentManagementPage />} />
          <Route path="designations" element={<DesignationManagementPage />} />
          <Route path="levels" element={<LevelManagementPage />} />
          <Route path="approvals/leave" element={<LeaveApprovalPage />} />
          <Route path="approvals/memo" element={<MemoApprovalPage />} />
          <Route path="approvals/voucher" element={<VoucherApprovalPage />} />
        </Route>

        {/* HR routes */}
        <Route path="/dashboard/hr" element={<HrDashboard />}>
          <Route index element={<HRDashboardContent />} />
          <Route path="system" element={<HRSystemSetupContent />} />
          <Route
            path="departments"
            element={<DepartmentManagementPage backTo="/dashboard/hr/system" />}
          />
          <Route
            path="designations"
            element={
              <DesignationManagementPage backTo="/dashboard/hr/system" />
            }
          />
          <Route
            path="levels"
            element={<LevelManagementPage backTo="/dashboard/hr/system" />}
          />
          <Route path="readinglist" element={<ReadingListPage />} />
          <Route path="hmo-setup" element={<HMOSetupPage />} />
          <Route path="manage-hmo-setup" element={<ManageHMOPage />} />
          <Route path="exit-approval" element={<ExitApprovalPage />} />
          <Route
            path="staff-exit-approval"
            element={<StaffExitApprovalPage />}
          />
          <Route path="jobrole" element={<JobRolePage />} />
          <Route path="holidays" element={<HolidayManagementPage />} />
          <Route path="leaves" element={<LeaveManagementContentPage />} />
          <Route path="units" element={<UnitManagementPage />} />
          <Route path="onboarding" element={<OnboardingDocumentPage />} />
          <Route path="candidate" element={<CandidateOfferPage />} />
          <Route path="menu" element={<HRMenuContent />} />
          <Route path="menu/leave-planning" element={<LeavePlanningPage />} />
          <Route path="menu/hmo" element={<HMOPage />} />
          <Route
            path="menu/ememo-registration"
            element={<MenuPlaceholderPage title="E-Memo Registration" />}
          />
          <Route
            path="menu/ememo-tracker"
            element={<MenuPlaceholderPage title="E-Memo Tracker" />}
          />
          <Route
            path="menu/exit-retirement"
            element={<MenuPlaceholderPage title="Exit/Retirement" />}
          />
          <Route
            path="menu/handover-documents"
            element={<MenuPlaceholderPage title="Handover Documents" />}
          />
          <Route
            path="menu/exit-interviews-forms"
            element={<MenuPlaceholderPage title="Exit Interviews & Forms" />}
          />
          <Route
            path="menu/clearance-form-approval"
            element={<MenuPlaceholderPage title="Clearance Form Approval" />}
          />
          <Route
            path="menu/clearance-report"
            element={<MenuPlaceholderPage title="Clearance Report" />}
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
