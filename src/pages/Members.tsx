import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/MetricCard";
import { CreateMemberDialog } from "@/components/CreateMemberDialog";
import { MemberFormDialog } from "@/components/MemberFormDialog";
import { UploadDocumentDialog } from "@/components/UploadDocumentDialog";
import { SendInviteDialog } from "@/components/SendInviteDialog";
import { RolesDropdown } from "@/components/RolesDropdown";
import { FilterDropdown } from "@/components/FilterDropdown";
import { SortByDropdown } from "@/components/SortByDropdown";
import { BulkActionDropdown } from "@/components/BulkActionDropdown";
import {
  Users,
  UserCheck,
  UserX,
  Plus,
  Upload,
  Search,
  MoreHorizontal,
  X,
  MessageSquare,
  Check,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const initialMembers = [
  {
    id: "SG2345672",
    name: "Beliver Joseph",
    role: "Executive Coordinator",
    email: "beliveraboseh3@gmail.com",
    status: "active",
  },
  {
    id: "SG2345672",
    name: "Beliver Joseph",
    role: "Executive Coordinator",
    email: "beliveraboseh3@gmail.com",
    status: "deactivated",
  },
  {
    id: "SG2345672",
    name: "Beliver Joseph",
    role: "Executive Coordinator",
    email: "beliveraboseh3@gmail.com",
    status: "pending",
  },
  {
    id: "SG2345672",
    name: "Beliver Joseph",
    role: "Executive Coordinator",
    email: "beliveraboseh3@gmail.com",
    status: "active",
  },
  {
    id: "SG2345672",
    name: "Beliver Joseph",
    role: "Executive Coordinator",
    email: "beliveraboseh3@gmail.com",
    status: "new",
  },
];

export default function Members() {
  const [showBanner, setShowBanner] = useState(true);
  const [members, setMembers] = useState(initialMembers);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(members.map(member => member.id)));
    }
    setSelectAll(!selectAll);
  };

  const toggleMemberSelection = (memberId: string) => {
    const newSelection = new Set(selectedMembers);
    if (newSelection.has(memberId)) {
      newSelection.delete(memberId);
    } else {
      newSelection.add(memberId);
    }
    setSelectedMembers(newSelection);
    setSelectAll(newSelection.size === members.length);
  };

  const navigate = useNavigate();

  const handleQuickAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    navigate(`/members/${crypto.randomUUID().slice(0,8)}`, { state: data });
  };

  // Controls: search, filters, sort, pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filters, setFilters] = useState<Record<string, boolean>>({});
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const normalized = (s: string) => s.toLowerCase();

  // Map FilterDropdown keys to status values in members list
  const statusForFilter: Record<string, string> = {
    active: "active",
    suspended: "deactivated",
    inactive: "pending",
    "new-added": "new",
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      !searchQuery ||
      normalized(m.name).includes(normalized(searchQuery)) ||
      normalized(m.id).includes(normalized(searchQuery));

    const anyFilter = Object.values(filters).some(Boolean);
    const matchesFilter = !anyFilter || Object.entries(filters).some(([key, val]) => val && m.status === statusForFilter[key]);

    return matchesSearch && matchesFilter;
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "id") return a.id.localeCompare(b.id);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    if (sortBy === "role") return a.role.localeCompare(b.role);
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedMembers.length / pageSize));
  const current = Math.min(currentPage, totalPages);
  const start = (current - 1) * pageSize;
  const pageItems = sortedMembers.slice(start, start + pageSize);

  const handleSelectOption = (option: "form" | "upload" | "invite") => {
    setCreateDialogOpen(false);
    if (option === "form") {
      setFormDialogOpen(true);
    } else if (option === "upload") {
      setUploadDialogOpen(true);
    } else {
      setInviteDialogOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top bar actions */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">Core Management &gt; <span className="text-foreground">Members</span></div>
        <div className="flex items-center gap-2">
          <Button className="h-12 w-[226px] bg-[#1DD3B0] hover:bg-[#13b99b] text-[#3C1642] rounded-lg flex items-center justify-center gap-[10px]" onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 text-[#3C1642]" />
            Add New Member
          </Button>
          <Button
            className="h-[47px] w-[112px] rounded-[10px] bg-transparent border border-[#525252] text-[#525252] hover:bg-transparent hover:border-[#525252]"
          >
            <Upload className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      {showBanner && (
        <Card className="p-6 bg-[#E2E8F045] border border-border relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 hover:bg-transparent"
            onClick={() => setShowBanner(false)}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
          <h2 className="text-[16px] font-semibold mb-1">
            Let's Start your journey with Tently Members Page
          </h2>
          <p className="text-[12px] text-muted-foreground mb-4">
            Add and manage members to start building your cooperative community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* Left checklist */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#3C1642] bg-white">
                  <Check className="h-3 w-3 text-[#3C1642]" />
                </span>
                <span className="text-[12px] font-medium text-foreground">Add Your First Member</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-muted bg-white">
                  <Check className="h-3 w-3 text-muted-foreground" />
                </span>
                <span className="text-[12px] text-muted-foreground">Review Member Requests</span>
              </div>
            </div>

            {/* Right instructions */}
            <div>
              <p className="text-[12px] font-medium mb-1">Add Your First Member</p>
              <ul className="list-disc pl-4 text-[12px] text-foreground mb-3">
                <li>Add a member using the form, Excel upload, or invite option.</li>
              </ul>
              <Button className="h-8 px-3 rounded-md bg-[#1DD3B0] hover:bg-[#13b99b] text-white text-[12px]" onClick={() => setCreateDialogOpen(true)}>
                Create New Member
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div>
        <h1 className="text-2xl font-bold mb-1">Today's Member</h1>
        <div className="flex gap-4 text-sm">
          <button className="text-primary font-medium">
            Member Summary
          </button>
          <button className="text-muted-foreground">5 Days</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Member"
          value="24000"
          change="+8%"
          changeType="positive"
          icon={<Users className="h-6 w-6 text-primary" />}
          iconBgColor="bg-primary/10"
        />
        <MetricCard
          title="Total Active Member"
          value="23000"
          change="+8%"
          changeType="positive"
          icon={<UserCheck className="h-6 w-6 text-success" />}
          iconBgColor="bg-success/10"
        />
        <MetricCard
          title="Total Inactive Member"
          value="10"
          change="+8%"
          changeType="negative"
          icon={<UserX className="h-6 w-6 text-destructive" />}
          iconBgColor="bg-destructive/10"
        />
      </div>

      <Card className="p-4 md:p-6">
        {/* Top row: title + search + actions */}
        <div className="mb-4 flex items-center gap-4 flex-wrap">
          <div className="min-w-[160px]">
            <h3 className="text-sm font-semibold leading-tight">List of Members</h3>
            <p className="text-[11px] text-muted-foreground leading-tight">Manage your Member</p>
          </div>
          <div className="relative flex-1 min-w-[240px] max-w-xl">
            <Input placeholder="Search" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value); setCurrentPage(1);}} className="pl-3 pr-8 h-[40px] rounded-[10px] bg-white" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex gap-3 ml-auto">
            <FilterDropdown value={filters} onChange={(v)=>{setFilters(v); setCurrentPage(1);}} />
            <SortByDropdown value={sortBy} onChange={(v)=>{setSortBy(v); setCurrentPage(1);}} onDateRangeChange={setDateRange} />
            <BulkActionDropdown />
          </div>
        </div>

        {/* Main content grid: left mini form, right table */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
          {/* Left panel mini form */}
          <form className="border rounded-2xl p-3 h-max bg-white shadow-sm" onSubmit={handleQuickAddSubmit}>
            <div className="pb-2 mb-2 border-b">
              <h4 className="text-sm font-medium">Add New Member</h4>
            </div>
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-foreground">Add Form</span>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border text-muted-foreground">+</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-foreground">Upload Document</span>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border text-muted-foreground">+</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-foreground">Send Invite</span>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border text-muted-foreground">+</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[11px] text-muted-foreground mb-1">First Name <span className="text-rose-500">*</span></p>
                <Input name="firstName" placeholder="Enter your name" className="h-9 rounded-md" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground mb-1">Last Name <span className="text-rose-500">*</span></p>
                <Input name="lastName" placeholder="Enter Phone Number" className="h-9 rounded-md" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground mb-1">Email Address <span className="text-rose-500">*</span></p>
                <Input name="email" placeholder="Enter email address" className="h-9 rounded-md" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground mb-1">Role <span className="text-rose-500">*</span></p>
                <Select name="role">
                  <SelectTrigger className="h-9 rounded-md">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Assembly">General Assembly</SelectItem>
                    <SelectItem value="Board of Directors (BOD)">Board of Directors (BOD)</SelectItem>
                    <SelectItem value="President">President</SelectItem>
                    <SelectItem value="Vice-President">Vice-President</SelectItem>
                    <SelectItem value="Secretary">Secretary</SelectItem>
                    <SelectItem value="Assistant Secretary">Assistant Secretary</SelectItem>
                    <SelectItem value="Treasurer">Treasurer</SelectItem>
                    <SelectItem value="Assistant Treasurer">Assistant Treasurer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 mt-3">
              <Button variant="outline" size="sm" className="rounded-full px-4">Fill Full Form</Button>
              <Button type="submit" size="sm" className="rounded-full px-6 bg-[#3C1642] hover:bg-[#2b1131] text-white">Save</Button>
            </div>
          </form>

          {/* Right: controls + table */}
          <div>
            

            <Table className="rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-[#3C1642] hover:bg-[#3C1642] h-16">
              <TableHead className="text-white w-12">
                <div className="flex items-center h-full">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 ml-4"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </div>
              </TableHead>
              <TableHead className="text-white whitespace-nowrap">Membership ID</TableHead>
              <TableHead className="text-white">Full name</TableHead>
              <TableHead className="text-white">Roles</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
            {pageItems.map((member, index) => (
                <TableRow key={index} className="bg-white">
                <TableCell>
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 ml-4"
                    checked={selectedMembers.has(member.id)}
                    onChange={() => toggleMemberSelection(member.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{member.id}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell className="text-muted-foreground">
                  {member.email}
                </TableCell>
                <TableCell>
                  {member.status === "active" && (
                    <span className="px-3 py-1 rounded-[8px] text-[12px] bg-emerald-100 text-emerald-700">Active</span>
                  )}
                  {member.status === "deactivated" && (
                    <span className="px-3 py-1 rounded-[8px] text-[12px] bg-gray-100 text-gray-600">Suspended</span>
                  )}
                  {member.status === "pending" && (
                    <span className="px-3 py-1 rounded-[8px] text-[12px] bg-orange-100 text-orange-700">Inactive</span>
                  )}
                  {member.status === "new" && (
                    <span className="px-3 py-1 rounded-[8px] text-[12px] bg-violet-100 text-violet-700">New</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 justify-end pr-2">
                    <div className="flex items-center text-muted-foreground text-[12px] gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{index === 1 ? 2 : 0}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-transparent">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" sideOffset={6} className="w-40 p-2 rounded-lg">
                        <div className="text-[12px] text-muted-foreground px-2 pb-1">Menu actions</div>
                        <DropdownMenuItem className="text-[13px] font-medium text-blue-700 hover:bg-transparent focus:bg-transparent">
                          View All
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-[13px] font-medium text-emerald-600 hover:bg-transparent focus:bg-transparent">
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-[13px] font-medium text-rose-600 hover:bg-transparent focus:bg-transparent">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Show rows:</span>
                <select className="h-8 px-2 rounded-lg border text-[12px]" value={pageSize} onChange={(e)=>{setPageSize(parseInt(e.target.value,10)); setCurrentPage(1);}}>
                  {[5,10,20,50].map(n=> (<option key={n} value={n}>{n} data</option>))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" disabled={current===1} onClick={()=>setCurrentPage(p=>Math.max(1,p-1))}>◀</Button>
                <span className="text-xs text-muted-foreground">Page {current} of {totalPages}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" disabled={current===totalPages} onClick={()=>setCurrentPage(p=>Math.min(totalPages,p+1))}>▶</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <CreateMemberDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSelectOption={handleSelectOption}
      />
      <MemberFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
      />
      <UploadDocumentDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
      />
      <SendInviteDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
      />
    </div>
  );
}
