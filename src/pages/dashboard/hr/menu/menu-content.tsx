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
import { useMenuBasePath } from "../../shared/use-menu-base-path";

export interface HRMenuCard {
  id: number;
  title: string;
  icon: LucideIcon;
  href: string;
  modelType?: "ememo" | "exitretirement";
}

const baseCards: Omit<HRMenuCard, "href">[] = [
  { id: 1, title: "LEAVE PLANNING", icon: Calendar },
  { id: 2, title: "HMO", icon: Heart },
  {
    id: 3,
    title: "EXIT/RETIREMENT",
    icon: LogOut,
    modelType: "exitretirement",
  },
  { id: 4, title: "E-MEMO", icon: Mail, modelType: "ememo" },
];

interface RoleMenuContentProps {
  menuBasePath?: string;
  exitRetirementMenuCategories?: CategoryBase[];
  exitRetirementRouteMap?: Record<string, string>;
  additionalCards?: HRMenuCard[];
}

export function RoleMenuContent({
  menuBasePath,
  exitRetirementMenuCategories,
  exitRetirementRouteMap,
  additionalCards = [],
}: RoleMenuContentProps) {
  const navigate = useNavigate();
  const resolvedMenuBasePath = useMenuBasePath();
  const basePath = menuBasePath || resolvedMenuBasePath;
  const [isEmemoModalOpen, setIsEmemoModalOpen] = useState(false);
  const [isExitRetirementModalOpen, setIsExitRetirementModalOpen] =
    useState(false);
  const menuCards = [
    ...baseCards.map((card) => ({
      ...card,
      href:
        card.id === 1
          ? `${basePath}/leave-planning`
          : card.id === 2
            ? `${basePath}/hmo`
            : "",
    })),
    ...additionalCards,
  ];

  const handleEmemoCategorySelect = (category: CategoryBase) => {
    const routeMap: Record<string, string> = {
      "ememo-registration": `${basePath}/ememo-registration`,
      "ememo-tracker": `${basePath}/ememo-tracker`,
    };
    const targetPath = routeMap[String(category.id)];
    if (targetPath) {
      navigate(targetPath);
      setIsEmemoModalOpen(false);
    }
  };

  const handleExitRetirementCategorySelect = (category: CategoryBase) => {
    const defaultRouteMap: Record<string, string> = {
      "exit-retirement": `${basePath}/exit-retirement`,
      "handover-documents": `${basePath}/handover-documents`,
      "exit-interviews-forms": `${basePath}/exit-interviews-forms`,
      "clearance-form-approval": `${basePath}/clearance-form-approval`,
      "clearance-report": `${basePath}/clearance-report`,
    };
    const routeMap = exitRetirementRouteMap ?? defaultRouteMap;
    const targetPath = routeMap[String(category.id)];
    if (targetPath) {
      navigate(targetPath);
      setIsExitRetirementModalOpen(false);
    }
  };

  return (
    <div className="pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuCards.map((card) => {
          const Icon = card.icon;
          const isEmemoCard = card.modelType === "ememo";
          const isExitRetirementCard = card.modelType === "exitretirement";

          return (
            <DashboardCard
              key={card.id}
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
        categories={exitRetirementMenuCategories ?? exitRetirementCategories}
        onSelectCategory={handleExitRetirementCategorySelect}
      />
    </div>
  );
}

export default function HRMenuContent() {
  return <RoleMenuContent menuBasePath="/dashboard/hr/menu" />;
}
