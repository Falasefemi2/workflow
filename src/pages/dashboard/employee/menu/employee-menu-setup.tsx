import { employeeExitRetirementCategories } from "@/components/mockData";
import { RoleMenuContent } from "../../hr/menu/menu-content";

export default function EmployeeMenuContent() {
  return (
    <RoleMenuContent
      menuBasePath="/dashboard/employee/menu"
      exitRetirementMenuCategories={employeeExitRetirementCategories}
      exitRetirementRouteMap={{
        "clearance-report-form": "/dashboard/employee/menu/clerance-report",
        "handover-documents-form":
          "/dashboard/employee/menu/handover-documents-form",
        "exit-interview-form": "/dashboard/employee/menu/exit-interview-form",
        "clearance-form": "/dashboard/employee/menu/clearance-form",
      }}
    />
  );
}
