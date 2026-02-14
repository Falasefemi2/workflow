import {
  Building2,
  Layers,
  PersonStanding,
  Briefcase,
  TrendingUp,
  FileText,
  BookOpen,
  Calendar,
  Gift,
  Heart,
  LogOut,
  Receipt,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { DashboardCard } from "@/components/shared/dashboard-card";
import { useState } from "react";
import { useNavigate } from "react-router";
import { CategorySelectionModal } from "@/components/shared/category-selection-modal";
import type { CategoryBase } from "@/components/shared/category-selection-modal";
import { hmoCategories } from "@/components/mockData";

interface HRSetupCard {
  id: number;
  title: string;
  icon: LucideIcon;
  href: string;
  modalType?: "hmo" | "exitretirement";
}

const hrSetupCards: HRSetupCard[] = [
  {
    id: 1,
    title: "DEPARTMENTS",
    icon: Building2,
    href: "/dashboard/hr/departments",
  },
  {
    id: 2,
    title: "UNITS",
    icon: Layers,
    href: "/dashboard/hr/units",
  },
  {
    id: 3,
    title: "DESIGNATIONS",
    icon: PersonStanding,
    href: "/dashboard/hr/designations",
  },
  {
    id: 4,
    title: "JOB ROLE",
    icon: Briefcase,
    href: "/dashboard/hr/jobrole",
  },
  {
    id: 5,
    title: "LEVEL MANAGEMENT",
    icon: TrendingUp,
    href: "/dashboard/hr/levels",
  },
  {
    id: 6,
    title: "ONBOARDING DOCUMENTS",
    icon: FileText,
    href: "/dashboard/hr/onboarding",
  },
  {
    id: 7,
    title: "READING LIST",
    icon: BookOpen,
    href: "/dashboard/hr/readinglist",
  },
  {
    id: 8,
    title: "LEAVE MANAGEMENT",
    icon: Calendar,
    href: "/dashboard/hr/leaves",
  },
  {
    id: 9,
    title: "HOLIDAY MANAGEMENT",
    icon: Gift,
    href: "/dashboard/hr/holidays",
  },
  {
    id: 10,
    title: "HMO",
    icon: Heart,
    href: "",
    modalType: "hmo",
  },
  {
    id: 11,
    title: "EXIT/RETIREMENT SETUP",
    icon: LogOut,
    href: "",
    modalType: "exitretirement",
  },
  {
    id: 12,
    title: "E-VOUCHER",
    icon: Receipt,
    href: "/dashboard/hr/voucher",
  },
  {
    id: 13,
    title: "E-MEMO",
    icon: Mail,
    href: "/dashboard/hr/memo",
  },
];

export default function HRSystemSetupContent() {
  const navigate = useNavigate();
  const [isHMOModalOpen, setIsHMOModalOpen] = useState(false);

  const handleHMOCategorySelect = (category: CategoryBase) => {
    const routeMap: Record<string, string> = {
      "hmo-setup": "/dashboard/hr/hmo-setup",
      "manage-hmo-setup": "/dashboard/hr/manage-hmo-setup",
    };

    const targetPath = routeMap[String(category.id)];
    if (targetPath) {
      navigate(targetPath);
      setIsHMOModalOpen(false);
    }
  };

  return (
    <div className="pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hrSetupCards.map((card) => {
          const Icon = card.icon;
          const isHMOCard = card.modalType === "hmo";

          return (
            <DashboardCard
              key={card.id}
              icon={<Icon className="w-6 h-6" />}
              title={card.title}
              href={isHMOCard ? "" : card.href}
              onClick={isHMOCard ? () => setIsHMOModalOpen(true) : undefined}
            />
          );
        })}
      </div>

      <CategorySelectionModal<CategoryBase>
        isOpen={isHMOModalOpen}
        onClose={() => setIsHMOModalOpen(false)}
        title="Select from the category below"
        description="Choose the HMO set-up"
        categories={hmoCategories}
        onSelectCategory={handleHMOCategorySelect}
      />
    </div>
  );
}
