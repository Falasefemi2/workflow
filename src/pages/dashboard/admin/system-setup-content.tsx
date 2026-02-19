import {
  Briefcase,
  PersonStanding,
  Calendar,
  Clock,
  Building2,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardCard } from "@/components/shared/dashboard-card";
import { CategorySelectionModal } from "@/components/shared/category-selection-modal";
import { approvalCategories } from "@/components/mockData";

const setupCards = [
  {
    id: 1,
    title: "DEPARTMENT",
    icon: Briefcase,
    href: "/dashboard/admin/departments",
  },
  {
    id: 2,
    title: "DESIGNATION",
    icon: PersonStanding,
    href: "/dashboard/admin/designations",
  },
  {
    id: 3,
    title: "LEVEL MANAGEMENT",
    icon: Calendar,
    href: "/dashboard/admin/levels",
  },
  {
    id: 4,
    title: "PERMISSION SET UP",
    icon: Clock,
    href: "/dashboard/admin/permissions",
  },
  {
    id: 5,
    title: "APPROVAL SET-UP",
    icon: Building2,
    href: "",
  },
  {
    id: 6,
    title: "ROLES",
    icon: Shield,
    href: "/dashboard/admin/roles",
  },
];

export default function SystemSetupContent() {
  const navigate = useNavigate();
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);

  const handleApprovalCategorySelect = (category: { id: string | number }) => {
    const routeMap: Record<string, string> = {
      "leave-approval": "/dashboard/admin/approvals/leave",
      "memo-approval": "/dashboard/admin/approvals/memo",
      "voucher-approval": "/dashboard/admin/approvals/voucher",
    };

    const targetPath = routeMap[String(category.id)];
    if (targetPath) {
      navigate(targetPath);
    }
  };

  return (
    <div className="pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {setupCards.map((card) => {
          const Icon = card.icon;
          const isApprovalCard = card.id === 5;

          return (
            <DashboardCard
              key={card.id}
              icon={<Icon className="w-6 h-6" />}
              title={card.title}
              href={isApprovalCard ? "" : card.href}
              onClick={
                isApprovalCard ? () => setIsApprovalModalOpen(true) : undefined
              }
            />
          );
        })}
      </div>

      <CategorySelectionModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        title="Select from the category below"
        description="Choose the approval type you want to set up"
        categories={approvalCategories}
        onSelectCategory={handleApprovalCategorySelect}
      />
    </div>
  );
}
