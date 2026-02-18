import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router";

const profileTabs = [
  { value: "bio-data", label: "Bio-Data" },
  { value: "employment-reference", label: "Employment Reference" },
  { value: "employment-document", label: "Employment's Document" },
  { value: "payroll-information", label: "Payroll Information" },
  { value: "workflow-policy", label: "Workflow Policy" },
  { value: "documents", label: "Documents" },
  { value: "read-me-list", label: "Read-me List" },
];

export default function EmployeeProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab =
    profileTabs.find((tab) => location.pathname.endsWith(`/${tab.value}`))
      ?.value ?? "bio-data";

  return (
    <main className="max-w-6xl mx-auto grid grid-cols-[300px_1fr] gap-6">
      <div>image part</div>
      <div>
        <Tabs value={activeTab} onValueChange={(value) => navigate(value)}>
          <TabsList variant="line">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
