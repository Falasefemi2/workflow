import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDocumentsAndReadmeManagement } from "@/hooks/use-document-readmelist";

const variantStyles: Record<
  string,
  {
    container: string;
    title: string;
  }
> = {
  blue: {
    container:
      "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800",
    title: "text-blue-800 dark:text-blue-300",
  },
  red: {
    container:
      "bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800",
    title: "text-red-800 dark:text-red-300",
  },
  amber: {
    container:
      "bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800",
    title: "text-amber-800 dark:text-amber-300",
  },
  green: {
    container:
      "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800",
    title: "text-green-800 dark:text-green-300",
  },
};

export default function EmployeeProfileDocumentsPage() {
  const { documents, handleMarkAsRead, handleDownload } =
    useDocumentsAndReadmeManagement();

  return (
    <div className="pb-12">
      <div className="border rounded-lg p-6 bg-background">
        <h2 className="text-lg font-bold text-foreground mb-8">DOCUMENTS</h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => {
            const styles = variantStyles[doc.variant] ?? variantStyles.blue;

            return (
              <div
                key={doc.id}
                className={cn(
                  "rounded-lg p-6 min-h-50 flex flex-col justify-between transition-all hover:shadow-md",
                  styles.container,
                )}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`doc-${doc.id}`}
                      checked={doc.marked}
                      onCheckedChange={() => handleMarkAsRead(doc.id, true)}
                    />
                    <label
                      htmlFor={`doc-${doc.id}`}
                      className="text-sm font-medium cursor-pointer text-foreground"
                    >
                      Mark as read
                    </label>
                  </div>
                </div>

                {/* Title */}
                <div className="flex-1 flex items-center justify-center mb-4">
                  <h3
                    className={cn(
                      "text-xl font-bold text-center",
                      styles.title,
                    )}
                  >
                    {doc.title}
                  </h3>
                </div>

                {/* Download */}
                {doc.downloadable && (
                  <Button
                    onClick={() => handleDownload(doc)}
                    className="flex items-center gap-2 w-full justify-center"
                  >
                    <span>Download</span>
                    <Download size={16} />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
