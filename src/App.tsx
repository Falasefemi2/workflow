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

function App() {
  return (
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
    </Routes>
  );
}

export default App;
