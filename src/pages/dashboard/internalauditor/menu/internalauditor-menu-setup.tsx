import { RoleMenuContent } from "../../hr/menu/menu-content";
import { hodExitRetirementCategories } from "@/components/mockData";
import { Check, UserCheck } from "lucide-react";

export default function InternalAuditorMenuContent() {
  return (
    <RoleMenuContent
      menuBasePath="/dashboard/internalauditor/menu"
      exitRetirementMenuCategories={hodExitRetirementCategories}
      exitRetirementRouteMap={{
        "registration-form-apporval":
          "/dashboard/internalauditor/menu/registration-form-approval",
        "resignation-form-approval":
          "/dashboard/internalauditor/menu/registration-form-approval",
        "handover-documents-approval":
          "/dashboard/internalauditor/menu/handover-documents-approval",
        "clearance-report": "/dashboard/internalauditor/menu/clearance-report",
        "clerance-report": "/dashboard/internalauditor/menu/clearance-report",
        "clearance-form-approval":
          "/dashboard/internalauditor/menu/clearance-form-approval",
      }}
      additionalCards={[
        {
          id: 5,
          title: "E-VOUCHER APPROVAL",
          icon: UserCheck,
          href: "/dashboard/internalauditor/menu/evoucher-approval",
        },
        {
          id: 6,
          title: "E-MEMO APPROVAL",
          icon: Check,
          href: "/dashboard/internalauditor/menu/ememo-approval",
        },
      ]}
    />
  );
}

