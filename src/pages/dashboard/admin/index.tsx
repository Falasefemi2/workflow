import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/shared/header";
import DashboardContent from "./dashboard-content";
import SystemSetupContent from "./system-setup-content";
import UserManagementContent from "./user-management-content";
import AssetManagementContent from "./asset-management-content";

export default function AdminDashboard() {
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
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 gap-0 bg-white shadow-lg rounded-xl p-1 h-auto border border-border/30 bg-secondary/20">
            <TabsTrigger
              value="dashboard"
              className="rounded-lg px-6 py-3 text-center font-semibold text-foreground/70 transition-all duration-300 hover:text-foreground hover:bg-secondary/30 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/30"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="rounded-lg px-6 py-3 text-center font-semibold text-foreground/70 transition-all duration-300 hover:text-foreground hover:bg-secondary/30 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/30"
            >
              System Setup
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="rounded-lg px-6 py-3 text-center font-semibold text-foreground/70 transition-all duration-300 hover:text-foreground hover:bg-secondary/30 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/30"
            >
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="assets"
              className="rounded-lg px-6 py-3 text-center font-semibold text-foreground/70 transition-all duration-300 hover:text-foreground hover:bg-secondary/30 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/30"
            >
              E-memo Asset
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="dashboard"
            className="mt-8 animate-in fade-in slide-in-from-top-4"
          >
            <DashboardContent />
          </TabsContent>
          <TabsContent
            value="system"
            className="mt-8 animate-in fade-in slide-in-from-top-4"
          >
            <SystemSetupContent />
          </TabsContent>
          <TabsContent
            value="users"
            className="mt-8 animate-in fade-in slide-in-from-top-4"
          >
            <UserManagementContent />
          </TabsContent>
          <TabsContent
            value="assets"
            className="mt-8 animate-in fade-in slide-in-from-top-4"
          >
            <AssetManagementContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
