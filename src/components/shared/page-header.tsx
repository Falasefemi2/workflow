import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  backTo?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export function PageHeader({
  title,
  showBack = true,
  backTo,
  actionLabel = "Add New",
  onActionClick,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between pb-6 border-b border-border/30">
      <div className="flex items-center gap-4">
        {showBack && (
          <button
            onClick={() => {
              if (backTo) {
                navigate(backTo);
                return;
              }

              navigate(-1);
            }}
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
        )}
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </div>

      {onActionClick && (
        <Button onClick={onActionClick} className="bg-primary hover:bg-primary">
          + {actionLabel}
        </Button>
      )}
    </div>
  );
}
