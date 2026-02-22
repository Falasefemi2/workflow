import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { useMenuBasePath } from "../../shared/use-menu-base-path";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemoApprovalReviewManagement } from "@/hooks/use-ememoapproval";
import { MemoApprovalReviewModal } from "./memoapprovalmodal";

type TabType = "Pending" | "Approved" | "Rejected";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Approved":
      return "text-blue-600";
    case "Rejected":
      return "text-red-600";
    default:
      return "text-foreground";
  }
};

export default function MemoApprovalPageUpdated() {
  const menuBasePath = useMenuBasePath();
  const [activeTab, setActiveTab] = useState<TabType>("Approved");
  const [searchFilters, setSearchFilters] = useState({
    dateApproved: "",
    dateRaised: "",
    subject: "",
    generator: "",
    department: "",
  });

  const {
    isReviewModalOpen,
    selectedMemoForReview,
    reviewFormData,
    isSubmitting,
    handleReview,
    handleCloseReview,
    handleSaveReview,
    setReviewFormData,
    getMemosByStatus,
  } = useMemoApprovalReviewManagement();

  const tabMemos = getMemosByStatus(activeTab);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const tabs: TabType[] = ["Pending", "Approved", "Rejected"];

  const departmentOptions = [
    { value: "Finance", label: "Finance" },
    { value: "HR", label: "HR" },
    { value: "Operations", label: "Operations" },
    { value: "IT", label: "IT" },
  ];

  const generatorOptions = [
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Smith", label: "Jane Smith" },
    { value: "Mike Johnson", label: "Mike Johnson" },
  ];

  return (
    <div className="pb-12">
      <PageHeader title="Memo Approval" backTo={menuBasePath} />

      {/* Tabs Navigation */}
      <div className="flex gap-12 border-b border-border/30 mt-8 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-1 font-medium transition-colors relative ${
              activeTab === tab
                ? "text-foreground"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Filter Section */}
      <div className="border rounded-lg p-6 mb-8">
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date Approved
              </label>
              <Input
                type="date"
                placeholder="--Select date--"
                value={searchFilters.dateApproved}
                onChange={(e) =>
                  setSearchFilters({
                    ...searchFilters,
                    dateApproved: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date Raised
              </label>
              <Input
                type="date"
                placeholder="--Select date--"
                value={searchFilters.dateRaised}
                onChange={(e) =>
                  setSearchFilters({
                    ...searchFilters,
                    dateRaised: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <Input
                placeholder="-- input subject--"
                value={searchFilters.subject}
                onChange={(e) =>
                  setSearchFilters({
                    ...searchFilters,
                    subject: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Generator
              </label>
              <Select
                value={searchFilters.generator}
                onValueChange={(value) =>
                  setSearchFilters({
                    ...searchFilters,
                    generator: value,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-- Select generator--" />
                </SelectTrigger>
                <SelectContent>
                  {generatorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Department
              </label>
              <Select
                value={searchFilters.department}
                onValueChange={(value) =>
                  setSearchFilters({
                    ...searchFilters,
                    department: value,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-- Select department--" />
                </SelectTrigger>
                <SelectContent>
                  {departmentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">Search</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-card border-b border-border/30">
              <TableHead className="text-primary font-bold">S/N</TableHead>
              <TableHead className="text-primary font-bold">
                Date Approved
              </TableHead>
              <TableHead className="text-primary font-bold">
                Date Raised
              </TableHead>
              <TableHead className="text-primary font-bold">
                Department
              </TableHead>
              <TableHead className="text-primary font-bold">Subject</TableHead>
              <TableHead className="text-primary font-bold">
                Generator
              </TableHead>
              <TableHead className="text-primary font-bold">Status</TableHead>
              <TableHead className="text-primary font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tabMemos.map((memo, index) => (
              <TableRow
                key={memo.id}
                className="border-b border-border/30 hover:bg-secondary/10 transition-colors"
              >
                <TableCell className="text-foreground">{index + 1}</TableCell>
                <TableCell className="text-foreground">
                  {formatDate(memo.dateApproved)}
                </TableCell>
                <TableCell className="text-foreground">
                  {formatDate(memo.dateRaised)}
                </TableCell>
                <TableCell className="text-foreground">
                  {memo.department}
                </TableCell>
                <TableCell className="text-foreground">
                  {memo.subject}
                </TableCell>
                <TableCell className="text-foreground">
                  {memo.generator}
                </TableCell>
                <TableCell
                  className={`font-medium ${getStatusColor(memo.status)}`}
                >
                  {memo.status}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleReview(memo)}
                    variant="ghost"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 font-medium underline"
                  >
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {tabMemos.length === 0 && (
          <div className="text-center py-8 text-foreground/70">
            <p>No memos found</p>
          </div>
        )}
      </div>

      {/* Pagination Info */}
      <div className="mt-6 text-sm text-foreground/70 border-t border-border/30 pt-6">
        <p>
          Showing 1 - {Math.min(10, tabMemos.length)} of {tabMemos.length}{" "}
          entries
        </p>
      </div>

      {/* Review Modal */}
      <MemoApprovalReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReview}
        formData={reviewFormData}
        memo={selectedMemoForReview}
        setFormData={setReviewFormData}
        onSubmit={handleSaveReview}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}


