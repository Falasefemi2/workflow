import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/shared/header";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabTriggerClassName =
    "!h-12 !py-0 !leading-none inline-flex items-center justify-center rounded-lg px-6 text-center font-semibold text-foreground/70 transition-all duration-300 hover:text-foreground hover:bg-secondary/30 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/30";

  const resolveActiveTab = () => {
    const { pathname } = location;

    if (
      pathname === "/dashboard/admin" ||
      pathname === "/dashboard/admin/dashboard"
    ) {
      return "dashboard";
    }

    if (
      pathname.startsWith("/dashboard/admin/system") ||
      pathname.startsWith("/dashboard/admin/roles") ||
      pathname.startsWith("/dashboard/admin/departments") ||
      pathname.startsWith("/dashboard/admin/designations") ||
      pathname.startsWith("/dashboard/admin/leaves") ||
      pathname.startsWith("/dashboard/admin/permissions") ||
      pathname.startsWith("/dashboard/admin/approvals")
    ) {
      return "system";
    }

    if (pathname.startsWith("/dashboard/admin/users")) {
      return "users";
    }

    if (pathname.startsWith("/dashboard/admin/assets")) {
      return "assets";
    }

    return "dashboard";
  };

  const handleTabChange = (tab: string) => {
    if (tab === "dashboard") {
      navigate("/dashboard/admin");
      return;
    }

    navigate(`/dashboard/admin/${tab}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full mix-blend-screen filter blur-3xl opacity-70"></div>
          <div className="absolute top-10 right-1/4 w-72 h-72 rounded-full mix-blend-screen filter blur-3xl opacity-60"></div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="relative -mt-24 px-6 md:px-12 lg:px-20">
        <Tabs
          value={resolveActiveTab()}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid h-auto! w-full grid-cols-4 gap-0 bg-white shadow-lg rounded-xl p-1 border border-border/30 bg-white">
            <TabsTrigger value="dashboard" className={tabTriggerClassName}>
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="system" className={tabTriggerClassName}>
              System Setup
            </TabsTrigger>
            <TabsTrigger value="users" className={tabTriggerClassName}>
              User Management
            </TabsTrigger>
            <TabsTrigger value="assets" className={tabTriggerClassName}>
              E-memo Asset
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-8 animate-in fade-in slide-in-from-top-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
