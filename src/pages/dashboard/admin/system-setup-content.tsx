import {
  Briefcase,
  PersonStanding,
  Calendar,
  Clock,
  Building2,
  Shield,
} from "lucide-react";
import { DashboardCard } from "@/components/shared/dashboard-card";

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
    title: "LEAVE MANAGEMENT",
    icon: Calendar,
    href: "/dashboard/admin/leaves",
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
    href: "/dashboard/admin/approvals",
  },
  {
    id: 6,
    title: "ROLES",
    icon: Shield,
    href: "/dashboard/admin/roles",
  },
];

export default function SystemSetupContent() {
  return (
    <div className="pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {setupCards.map((card) => {
          const Icon = card.icon;
          return (
            <DashboardCard
              key={card.id}
              icon={<Icon className="w-6 h-6" />}
              title={card.title}
              href={card.href}
            />
          );
        })}
      </div>
    </div>
  );
}
