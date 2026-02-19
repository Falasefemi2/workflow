import { RoleMenuContent } from "../../hr/menu/menu-content";
import { hodExitRetirementCategories } from "@/components/mockData";
import { Check, UserCheck } from "lucide-react";

export default function HODMenuContent() {
  return (
    <RoleMenuContent
      menuBasePath="/dashboard/hod/menu"
      exitRetirementMenuCategories={hodExitRetirementCategories}
      exitRetirementRouteMap={{
        "registration-form-apporval":
          "/dashboard/hod/menu/registration-form-approval",
        "resignation-form-approval":
          "/dashboard/hod/menu/registration-form-approval",
        "handover-documents-approval":
          "/dashboard/hod/menu/handover-documents-approval",
        "clearance-report": "/dashboard/hod/menu/clearance-report",
        "clerance-report": "/dashboard/hod/menu/clearance-report",
        "clearance-form-approval":
          "/dashboard/hod/menu/clearance-form-approval",
      }}
      additionalCards={[
        {
          id: 5,
          title: "EMPLOYEE LEAVE APPROVAL",
          icon: UserCheck,
          href: "/dashboard/hod/menu/employee-leave-approval",
        },
        {
          id: 6,
          title: "E-MEMO APPROVAL",
          icon: Check,
          href: "/dashboard/hod/menu/ememo-approval",
        },
      ]}
    />
  );
}
