import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/shared/header";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function HrDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabTriggerClassName =
    "!h-12 !py-0 !leading-none inline-flex items-center justify-center rounded-lg px-6 text-center font-semibold text-foreground/70 transition-all duration-300 hover:text-foreground hover:bg-secondary/30 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/30";

  const resolveActiveTab = () => {
    const { pathname } = location;
    if (
      pathname === "/dashboard/hr" ||
      pathname === "/dashboard/hr/dashboard"
    ) {
      return "dashboard";
    }
    if (
      pathname.startsWith("/dashboard/hr/system") ||
      pathname.startsWith("/dashboard/hr/departments") ||
      pathname.startsWith("/dashboard/hr/units") ||
      pathname.startsWith("/dashboard/hr/designations") ||
      pathname.startsWith("/dashboard/hr/jobrole") ||
      pathname.startsWith("/dashboard/hr/levels") ||
      pathname.startsWith("/dashboard/hr/onboarding") ||
      pathname.startsWith("/dashboard/hr/readinglist") ||
      pathname.startsWith("/dashboard/hr/leaves") ||
      pathname.startsWith("/dashboard/hr/holidays") ||
      pathname.startsWith("/dashboard/hr/hmo") ||
      pathname.startsWith("/dashboard/hr/manage-hmo") ||
      pathname.startsWith("/dashboard/exitretirement") ||
      pathname.startsWith("/dashboard/voucher") ||
      pathname.startsWith("/dashboard/memo")
    ) {
      return "system";
    }
    if (pathname.startsWith("/dashboard/hr/candidates")) {
      return "candidate";
    }
    if (pathname.startsWith("/dashboard/hr/employeeprofile")) {
      return "employee";
    }
    if (pathname.startsWith("/dashboard/hr/menu")) {
      return "menu";
    }
    return "dashboard";
  };

  const handleTabChange = (tab: string) => {
    if (tab === "dashboard") {
      navigate("/dashboard/hr");
      return;
    }
    navigate(`/dashboard/hr/${tab}`);
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
          <TabsList className="grid h-auto! w-full grid-cols-5 gap-0 bg-white shadow-lg rounded-xl p-1 border border-border/30">
            <TabsTrigger value="dashboard" className={tabTriggerClassName}>
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="candidate" className={tabTriggerClassName}>
              Candidate Offer
            </TabsTrigger>
            <TabsTrigger value="system" className={tabTriggerClassName}>
              System Setup
            </TabsTrigger>
            <TabsTrigger value="employee" className={tabTriggerClassName}>
              Employee Profile
            </TabsTrigger>
            <TabsTrigger value="menu" className={tabTriggerClassName}>
              My Menu
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
