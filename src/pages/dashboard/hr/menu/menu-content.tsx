import {
  CategorySelectionModal,
  type CategoryBase,
} from "@/components/shared/category-selection-modal";
import { Calendar, Heart, LogOut, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardCard } from "@/components/shared/dashboard-card";
import {
  ememoCategories,
  exitRetirementCategories,
} from "@/components/mockData";

export interface HRMenuCard {
  id: number;
  title: string;
  icon: LucideIcon;
  href: string;
  modelType?: "ememo" | "exitretirement";
}

const hrMenuSetup: HRMenuCard[] = [
  {
    id: 1,
    title: "LEAVE PLANNING",
    icon: Calendar,
    href: "/dashboard/hr/menu/leave-planning",
  },
  {
    id: 2,
    title: "HMO",
    icon: Heart,
    href: "/dashboard/hr/menu/hmo",
  },
  {
    id: 3,
    title: "EXIT/RETIREMENT",
    icon: LogOut,
    href: "",
    modelType: "exitretirement",
  },
  {
    id: 4,
    title: "E-MEMO",
    icon: Mail,
    href: "",
    modelType: "ememo",
  },
];

export default function HRMenuContent() {
  const navigate = useNavigate();
  const [isEmemoModalOpen, setIsEmemoModalOpen] = useState(false);
  const [isExitRetirementModalOpen, setIsExitRetirementModalOpen] =
    useState(false);

  const handleEmemoCategorySelect = (category: CategoryBase) => {
    const routeMap: Record<string, string> = {
      "ememo-registration": "/dashboard/hr/menu/ememo-registration",
      "ememo-tracker": "/dashboard/hr/menu/ememo-tracker",
    };
    const targetPath = routeMap[String(category.id)];
    if (targetPath) {
      navigate(targetPath);
      setIsEmemoModalOpen(false);
    }
  };

  const handleExitRetirementCategorySelect = (category: CategoryBase) => {
    const routeMap: Record<string, string> = {
      "exit-retirement": "/dashboard/hr/menu/exit-retirement",
      "handover-documents": "/dashboard/hr/menu/handover-documents",
      "exit-interviews-forms": "/dashboard/hr/menu/exit-interviews-forms",
      "clearance-form-approval": "/dashboard/hr/menu/clearance-form-approval",
      "clearance-report": "/dashboard/hr/menu/clearance-report",
    };
    const targetPath = routeMap[String(category.id)];
    if (targetPath) {
      navigate(targetPath);
      setIsExitRetirementModalOpen(false);
    }
  };

  return (
    <div className="pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hrMenuSetup.map((card) => {
          const Icon = card.icon;
          const isEmemoCard = card.modelType === "ememo";
          const isExitRetirementCard = card.modelType === "exitretirement";

          return (
            <DashboardCard
              icon={<Icon className="w-6 h-6" />}
              title={card.title}
              href={isEmemoCard || isExitRetirementCard ? "" : card.href}
              onClick={
                isEmemoCard
                  ? () => setIsEmemoModalOpen(true)
                  : isExitRetirementCard
                    ? () => setIsExitRetirementModalOpen(true)
                    : undefined
              }
            />
          );
        })}
      </div>

      <CategorySelectionModal<CategoryBase>
        isOpen={isEmemoModalOpen}
        onClose={() => setIsEmemoModalOpen(false)}
        title="Select from the category below"
        description="Choose the EMEMO set-up"
        categories={ememoCategories}
        onSelectCategory={handleEmemoCategorySelect}
      />

      <CategorySelectionModal<CategoryBase>
        isOpen={isExitRetirementModalOpen}
        onClose={() => setIsExitRetirementModalOpen(false)}
        title="Select from the category below"
        description="Choose the exit approval"
        categories={exitRetirementCategories}
        onSelectCategory={handleExitRetirementCategorySelect}
      />
    </div>
  );
}
