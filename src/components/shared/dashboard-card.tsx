import type React from "react";
import { NavLink } from "react-router";

export function DashboardCard({
  icon,
  title,
  href,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  href?: string;
  onClick?: () => void;
}) {
  const content = (
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-base">{title}</h4>
      </div>
    </div>
  );

  const className =
    "group p-6 rounded-xl border border-border/30 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 hover:border-primary/50 cursor-pointer animate-in fade-in slide-in-from-bottom-3";

  if (href) {
    return (
      <NavLink to={href} className={className}>
        {content}
      </NavLink>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${className} w-full text-left`}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}
