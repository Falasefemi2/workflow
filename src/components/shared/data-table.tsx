import { Trash2, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  showActions?: boolean;
  totalEntries?: number;
  pageSize?: number;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
  showActions = true,
  totalEntries,
  pageSize = 10,
}: DataTableProps<T>) {
  return (
    <div className="space-y-4">
      <div className="border border-border/30 rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/30 bg-muted/40">
              <TableHead className="w-12">
                <input type="checkbox" className="cursor-pointer" />
              </TableHead>
              <TableHead className="text-primary font-semibold">S/N</TableHead>
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className="text-primary font-semibold"
                >
                  {column.label}
                </TableHead>
              ))}
              {showActions && (
                <TableHead className="text-primary font-semibold text-center">
                  Action
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.id || index}
                className="border-b border-border/30 hover:bg-muted/40"
              >
                <TableCell>
                  <input type="checkbox" className="cursor-pointer" />
                </TableCell>
                <TableCell className="text-foreground/70">
                  {index + 1}
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    className="text-foreground/70"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] || "N/A")}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell className="flex items-center justify-center gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5 text-blue-600" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="p-2 hover:bg-primary-foreground rounded-full transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-primary" />
                      </button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Info */}
      {totalEntries && (
        <div className="text-sm text-foreground/60">
          Showing 1 - {Math.min(pageSize, data.length)} of {totalEntries}{" "}
          entries
        </div>
      )}
    </div>
  );
}
