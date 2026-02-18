import Header from "@/components/shared/header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabTriggerClassName =
    "!h-12 !py-0 !leading-none inline-flex items-center justify-center rounded-lg px-6 text-center font-semibold text-foreground/70 transition-all duration-300 hover:text-foreground hover:bg-secondary/30 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/30";

  const resolveActiveTab = () => {
    const { pathname } = location;
    if (
      pathname === "/dashboard/employee" ||
      pathname === "/dashboard/employee/menu" ||
      pathname === "/dashboard/employee/dashboard"
    ) {
      return "menu";
    }
    if (pathname.startsWith("/dashboard/employee/profile")) {
      return "profile";
    }
    return "menu";
  };

  const handleTabChange = (tab: string) => {
    if (tab === "menu") {
      navigate("/dashboard/employee");
      return;
    }
    navigate(`/dashboard/employee/${tab}`);
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

      <div className="relative -mt-24 px-6 md:px-12 lg:px-20">
        <Tabs
          value={resolveActiveTab()}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid h-auto! w-full grid-cols-2 gap-0 bg-card shadow-lg rounded-xl p-1 border border-border/30">
            <TabsTrigger value="menu" className={tabTriggerClassName}>
              My Menu
            </TabsTrigger>
            <TabsTrigger value="profile" className={tabTriggerClassName}>
              My Profile
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
