import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockUsers, type User } from "@/components/mockData";
import {
  Search,
  Upload,
  Plus,
  MoreHorizontal,
  Eye,
  PencilLine,
  RotateCcw,
  UserX,
} from "lucide-react";
import { EmployeeProfileViewModal } from "./employee-profile-view-modal";
import { EmployeeProfileEditModal } from "./employee-profile-edit-modal";

type ProfileTab = "employee-profile" | "approved-profile" | "rejected-profile";
type ActionType = "Reset password" | "Deactivate user";

interface NewStaffFormData {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

const defaultFormData: NewStaffFormData = {
  title: "",
  firstName: "",
  middleName: "",
  lastName: "",
};

export default function EmployeeProfileManagementPage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("employee-profile");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>(mockUsers);

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isAddStaffDialogOpen, setIsAddStaffDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<NewStaffFormData>(defaultFormData);

  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [selectedProfileUser, setSelectedProfileUser] = useState<User | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [selectedEditUser, setSelectedEditUser] = useState<User | null>(null);

  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [selectedActionUser, setSelectedActionUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const byTab = users.filter((user) => {
      if (activeTab === "approved-profile") {
        return user.status.toLowerCase() === "active";
      }

      if (activeTab === "rejected-profile") {
        return user.status.toLowerCase() !== "active";
      }

      return true;
    });

    if (!normalizedSearch) {
      return byTab;
    }

    return byTab.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

      return (
        fullName.includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [activeTab, searchQuery, users]);

  const openActionModal = (action: ActionType, user: User) => {
    setSelectedAction(action);
    setSelectedActionUser(user);
    setIsActionDialogOpen(true);
  };

  const openViewUserModal = (user: User) => {
    setSelectedProfileUser(user);
    setIsViewProfileOpen(true);
  };

  const openEditUserModal = (user: User) => {
    setSelectedEditUser(user);
    setIsEditProfileOpen(true);
  };

  const handleSaveNewStaff = () => {
    if (
      !formData.title ||
      !formData.firstName.trim() ||
      !formData.middleName.trim() ||
      !formData.lastName.trim()
    ) {
      return;
    }

    const emailHandle = `${formData.firstName}.${formData.lastName}`
      .toLowerCase()
      .replace(/\s+/g, "");

    const newUser: User = {
      id: `user-${Date.now()}`,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: `${emailHandle}@vatebra.com`,
      gender: "N/A",
      subsidiary: "N/A",
      designation: "N/A",
      employmentType: "N/A",
      status: "Active",
    };

    setUsers((prev) => [newUser, ...prev]);
    setFormData(defaultFormData);
    setIsAddStaffDialogOpen(false);
  };

  const handleUploadExistingStaff = () => {
    if (!selectedFile) {
      return;
    }

    setIsUploadDialogOpen(false);
    setSelectedFile(null);
  };

  return (
    <div className="pb-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-border/30">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50" />
          <Input
            type="text"
            placeholder="Search for employee"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsUploadDialogOpen(true)}
            className="bg-yellow-400 text-black hover:bg-yellow-300"
          >
            Upload Existing Staff
            <Upload className="w-4 h-4" />
          </Button>

          <Button
            onClick={() => setIsAddStaffDialogOpen(true)}
            className="bg-primary text-white"
          >
            <Plus className="w-4 h-4" />
            Add new Staff
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ProfileTab)}
        className="w-full mb-8"
      >
        <TabsList
          variant="line"
          className="w-full grid grid-cols-1 md:grid-cols-3 p-0 border-b border-border/40"
        >
          <TabsTrigger value="employee-profile" className="rounded-none pb-4 pt-2">
            Employee Profile
          </TabsTrigger>
          <TabsTrigger value="approved-profile" className="rounded-none pb-4 pt-2">
            Approved Profile
          </TabsTrigger>
          <TabsTrigger value="rejected-profile" className="rounded-none pb-4 pt-2">
            Rejected Profile
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="rounded-lg border border-border/30 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-12">
                <input type="checkbox" className="cursor-pointer" />
              </TableHead>
              <TableHead className="text-primary">S/N</TableHead>
              <TableHead className="text-primary">Full name</TableHead>
              <TableHead className="text-primary">Email</TableHead>
              <TableHead className="text-primary">Gender</TableHead>
              <TableHead className="text-primary">Subsidiary</TableHead>
              <TableHead className="text-primary">Designation</TableHead>
              <TableHead className="text-primary">Employment type</TableHead>
              <TableHead className="text-primary text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user.id} className="hover:bg-muted/20">
                <TableCell>
                  <input type="checkbox" className="cursor-pointer" />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.subsidiary}</TableCell>
                <TableCell>{user.designation}</TableCell>
                <TableCell>{user.employmentType}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" className="rounded-full">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => openViewUserModal(user)}
                      >
                        <Eye className="h-4 w-4 text-primary" />
                        View user
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => openEditUserModal(user)}
                      >
                        <PencilLine className="h-4 w-4 text-primary" />
                        Edit user
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => openActionModal("Reset password", user)}
                      >
                        <RotateCcw className="h-4 w-4 text-primary" />
                        Reset password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => openActionModal("Deactivate user", user)}
                      >
                        <UserX className="h-4 w-4 text-primary" />
                        Deactivate user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-foreground/60">
                  No employee profile found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="mt-4 text-sm text-foreground/60">
        Showing 1 - {filteredUsers.length} of {filteredUsers.length} entries
      </p>

      <Dialog
        open={isUploadDialogOpen}
        onOpenChange={(isOpen) => {
          setIsUploadDialogOpen(isOpen);
          if (!isOpen) {
            setSelectedFile(null);
          }
        }}
      >
        <DialogContent showCloseButton={false} className="max-w-xl">
          <DialogHeader className="flex-row items-center justify-between space-y-0 pb-4 border-b border-border/40">
            <DialogTitle className="text-primary text-2xl">Upload Existing Staff</DialogTitle>
            <button
              type="button"
              onClick={() => setIsUploadDialogOpen(false)}
              className="text-foreground/70 hover:text-foreground"
            >
              Cancel
            </button>
          </DialogHeader>

          <div className="space-y-6 mt-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Upload file</p>
              <Input
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={(event) =>
                  setSelectedFile(event.target.files?.[0] ?? null)
                }
              />
              <p className="text-xs text-foreground/60">
                Accepted formats: .csv, .xls, .xlsx
              </p>
            </div>

            <Button
              type="button"
              onClick={handleUploadExistingStaff}
              disabled={!selectedFile}
              className="w-full bg-primary text-white"
            >
              Upload
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isAddStaffDialogOpen}
        onOpenChange={(isOpen) => {
          setIsAddStaffDialogOpen(isOpen);
          if (!isOpen) {
            setFormData(defaultFormData);
          }
        }}
      >
        <DialogContent showCloseButton={false} className="max-w-3xl">
          <DialogHeader className="flex-row items-center justify-between space-y-0 pb-4 border-b border-border/40">
            <DialogTitle className="text-primary text-3xl">Add New Staff</DialogTitle>
            <button
              type="button"
              onClick={() => setIsAddStaffDialogOpen(false)}
              className="text-foreground/70 hover:text-foreground"
            >
              Cancel
            </button>
          </DialogHeader>

          <div className="space-y-6 mt-2">
            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">
                Title<span className="text-primary ml-1">*</span>
              </label>
              <Select
                value={formData.title}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, title: value }))
                }
              >
                <SelectTrigger className="h-full w-full">
                  <SelectValue placeholder="--Select title--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr">Mr</SelectItem>
                  <SelectItem value="Mrs">Mrs</SelectItem>
                  <SelectItem value="Miss">Miss</SelectItem>
                  <SelectItem value="Dr">Dr</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">
                First Name<span className="text-primary ml-1">*</span>
              </label>
              <Input
                placeholder="Enter first name"
                className="h-12"
                value={formData.firstName}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, firstName: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">
                Middle Name<span className="text-primary ml-1">*</span>
              </label>
              <Input
                placeholder="Enter middle name"
                className="h-12"
                value={formData.middleName}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, middleName: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">
                Last name<span className="text-primary ml-1">*</span>
              </label>
              <Input
                placeholder="Enter last name"
                className="h-12"
                value={formData.lastName}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, lastName: event.target.value }))
                }
              />
            </div>

            <Button
              type="button"
              onClick={handleSaveNewStaff}
              className="w-full bg-primary text-white h-12 text-lg"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isActionDialogOpen}
        onOpenChange={(isOpen) => {
          setIsActionDialogOpen(isOpen);
          if (!isOpen) {
            setSelectedAction(null);
            setSelectedActionUser(null);
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedAction ?? "Action"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <p className="text-sm text-foreground/70">
              {selectedActionUser
                ? `${selectedAction} for ${selectedActionUser.firstName} ${selectedActionUser.lastName}.`
                : "Select an action."}
            </p>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsActionDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={() => setIsActionDialogOpen(false)}>
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EmployeeProfileViewModal
        isOpen={isViewProfileOpen}
        user={selectedProfileUser}
        onClose={() => {
          setIsViewProfileOpen(false);
          setSelectedProfileUser(null);
        }}
      />

      <EmployeeProfileEditModal
        isOpen={isEditProfileOpen}
        user={selectedEditUser}
        onClose={() => {
          setIsEditProfileOpen(false);
          setSelectedEditUser(null);
        }}
        onSave={(updatedUser) => {
          setUsers((previousUsers) =>
            previousUsers.map((user) =>
              user.id === updatedUser.id ? updatedUser : user,
            ),
          );
          setIsEditProfileOpen(false);
          setSelectedEditUser(null);
        }}
      />
    </div>
  );
}
