import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LucideIcon } from "lucide-react";

interface CategoryOption {
  id: string | number;
  title: string;
  icon: LucideIcon;
  bgColor: string;
  iconBgColor: string;
  iconColor?: string;
}

interface CategorySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  categories: CategoryOption[];
  onSelectCategory: (category: CategoryOption) => void;
}

export function CategorySelectionModal({
  isOpen,
  onClose,
  title,
  description,
  categories,
  onSelectCategory,
}: CategorySelectionModalProps) {
  const handleSelectCategory = (category: CategoryOption) => {
    onSelectCategory(category);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-primary text-lg">
                {title}
              </DialogTitle>
              <p className="text-sm text-foreground/60 mt-1">{description}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleSelectCategory(category)}
                  className={`${category.bgColor} rounded-lg p-6 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer group`}
                >
                  <div
                    className={`${category.iconBgColor} rounded-full p-4 shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <Icon
                      className={`w-8 h-8 ${category.iconColor ?? "text-white"}`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
