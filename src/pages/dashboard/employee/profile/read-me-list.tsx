import { Checkbox } from "@/components/ui/checkbox";
import { useDocumentsAndReadmeManagement } from "@/hooks/use-document-readmelist";
import { cn } from "@/lib/utils";
import type { DocumentType } from "@/components/mockData";

const typeStyles: Record<DocumentType, { container: string; title: string }> = {
  policy: {
    container:
      "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800",
    title: "text-blue-800 dark:text-blue-300",
  },
  other: {
    container:
      "bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800",
    title: "text-amber-800 dark:text-amber-300",
  },
  form: {
    container:
      "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800",
    title: "text-green-800 dark:text-green-300",
  },
};

export default function EmployeeProfileReadmeListPage() {
  const { readmeList, handleMarkAsRead } = useDocumentsAndReadmeManagement();

  return (
    <div className="pb-12">
      <div className="border rounded-lg p-6 bg-background">
        <h2 className="text-lg font-bold text-foreground mb-8">DOCUMENTS</h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {readmeList.map((item) => {
            const styles = typeStyles[item.type] ?? typeStyles.other;

            return (
              <div
                key={item.id}
                className={cn(
                  "rounded-lg p-6 min-h-50 flex flex-col justify-between transition-all hover:shadow-md",
                  styles.container,
                )}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`readme-${item.id}`}
                      checked={item.marked}
                      onCheckedChange={() => handleMarkAsRead(item.id, false)}
                    />
                    <label
                      htmlFor={`readme-${item.id}`}
                      className="text-sm font-medium cursor-pointer text-foreground"
                    >
                      Mark as read
                    </label>
                  </div>
                </div>

                {/* Title */}
                <div className="flex-1 flex items-center justify-center">
                  <h3
                    className={cn(
                      "text-xl font-bold text-center",
                      styles.title,
                    )}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
