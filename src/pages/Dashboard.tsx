import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wallet,
  Users,
  Banknote,
  Clock,
  TrendingUp,
  MoreHorizontal,
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SortByDropdown } from "@/components/SortByDropdown";
import { FilterDropdown } from "@/components/FilterDropdown";

const MetricCard = ({ title, value, change, changeType, icon, iconBgColor }) => (
  <Card className="p-4 border rounded-lg">
    <div className="flex items-start justify-between">
      <div className="flex items-center justify-center h-9 w-9 rounded-md" style={{ backgroundColor: 'transparent' }}>
        <div className={`p-2 rounded-md ${iconBgColor}`}>{icon}</div>
      </div>
      <div className="ml-3 flex-1">
        <p className="text-[13px] text-muted-foreground">{title}</p>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-xl font-semibold">{value}</p>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
              changeType === 'positive' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
            }`}
          >
            {change}
          </span>
        </div>
      </div>
    </div>
  </Card>
);

const depositData = [
  { month: "April", deposit: 50000, withdrawal: 30000 },
  { month: "May", deposit: 80000, withdrawal: 45000 },
  { month: "June", deposit: 60000, withdrawal: 70000 },
  { month: "July", deposit: 95000, withdrawal: 50000 },
  { month: "August", deposit: 70000, withdrawal: 65000 },
  { month: "September", deposit: 85000, withdrawal: 55000 },
];

const contributionData = [
  { month: "April", amount: 100000 },
  { month: "May", amount: 120000 },
  { month: "June", amount: 95000 },
  { month: "July", amount: 140000 },
  { month: "August", amount: 125000 },
  { month: "September", amount: 150000 },
];

const allTransactions = [
  {
    id: "SG3345672",
    name: "Grace Molero",
    amount: "₦200,000.00",
    date: "25 Jan, 10:40 PM",
    type: "Membership ID",
  },
  {
    id: "SG3345672",
    name: "Grace Molero",
    amount: "₦200,000.00",
    date: "25 Jan, 10:40 PM",
    type: "Membership ID",
  },
  {
    id: "SG3345672",
    name: "Grace Molero",
    amount: "₦200,000.00",
    date: "25 Jan, 10:40 PM",
    type: "Membership ID",
  },
  {
    id: "SG3345672",
    name: "Grace Molero",
    amount: "₦200,000.00",
    date: "25 Jan, 10:40 PM",
    type: "Membership ID",
  },
  ...Array.from({ length: 28 }).map((_, i) => ({
    id: `ID${i + 1000}`,
    name: i % 2 === 0 ? "Ronald Richards" : "Chelsie Johnson",
    amount: `₦${(100000 + i * 1234).toLocaleString()}.00`,
    date: "12 Oct, 10:40 PM",
    type: i % 3 === 0 ? "Contribution" : "Membership ID",
  })),
];

const recentActivity = [
  {
    name: "Ronald Richards",
    action: "Contribution",
    time: "14 mins ago",
    avatar: "/1.png",
  },
  {
    name: "Chelsie Jhonson",
    action: "Contribution",
    time: "2 hours ago",
    avatar: "/2.png",
  },
  {
    name: "Darrell Steward",
    action: "Contribution",
    time: "3 hours ago",
    avatar: "/3.png",
  },
  {
    name: "Albert Flores",
    action: "Contribution",
    time: "5 hours ago",
    avatar: "/4.png",
  },
  {
    name: "Wade Warren",
    action: "Contribution",
    time: "6 hours ago",
    avatar: "/5.png",
  },
  {
    name: "Mary Peter",
    action: "Contribution",
    time: "8 hours ago",
    avatar: "/6.png",
  },
  {
    name: "Cameron Williamson",
    action: "Contribution",
    time: "10 hours ago",
    avatar: "/7.png",
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Contributions");
  const [activityTab, setActivityTab] = useState("Contributions");
  const [activitySearch, setActivitySearch] = useState("");
  const [now, setNow] = useState<Date>(new Date());
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filters, setFilters] = useState<Record<string, boolean>>({});
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | null>(null);

  const tabs = [
    "Contributions",
    "Charitable donation",
    "Due Loan Payments",
    "Membership",
    "Loans"
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formatNaira = (value: number) => {
    if (!Number.isFinite(value)) return "";
    const rounded = Math.round(value / 1000) * 1000; // keep nice steps
    return `₦${rounded.toLocaleString()}`;
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const toggleRowSelection = (index) => {
    setSelectedRows(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleAllRows = (visibleCount: number) => {
    if (selectedRows.length === visibleCount) {
      setSelectedRows([]);
    } else {
      setSelectedRows(Array.from({ length: visibleCount }).map((_, index) => index));
    }
  };

  const normalized = (s: string) => s.toLowerCase();
  
  // Filter transactions based on search query and filters
  const filtered = allTransactions.filter((t) => {
    const matchesSearch =
      !searchQuery ||
      normalized(t.name).includes(normalized(searchQuery)) ||
      normalized(t.id).includes(normalized(searchQuery));
    
    // Apply type filters if any are active
    const typeFilterActive = Object.values(filters).some(Boolean);
    const matchesFilter = !typeFilterActive || filters[t.type] || false;
    
    return matchesSearch && matchesFilter;
  });

  // Sort transactions based on selected sort option
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "id") return a.id.localeCompare(b.id);
    if (sortBy === "date") return a.date.localeCompare(b.date);
    if (sortBy === "amount") {
      const amountA = parseFloat(a.amount.replace(/[^\d.]/g, ''));
      const amountB = parseFloat(b.amount.replace(/[^\d.]/g, ''));
      return amountA - amountB;
    }
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = Math.min(currentPage, totalPages);
  const start = (current - 1) * pageSize;
  const pageItems = sorted.slice(start, start + pageSize);
  const visibleCount = pageItems.length;

  const filtersKey = JSON.stringify(filters);
  const dateRangeKey = JSON.stringify(dateRange);

  useEffect(() => {
    // Reset to first page when any controlling filter changes
    setCurrentPage(1);
    setSelectedRows([]);
  }, [searchQuery, sortBy, filtersKey, dateRangeKey, pageSize]);

  // Reset selected rows when page changes
  useEffect(() => {
    setSelectedRows([]);
  }, [currentPage]);

  // keep the header date/time live (update every minute)
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const formatHeaderDate = (d: Date) => {
    const day = d.getDate().toString().padStart(2, '0');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const mon = months[d.getMonth()];
    const year = (d.getFullYear() % 100).toString().padStart(2, '0');
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return `${day} ${mon}., ${year} | ${hours}:${minutes}${ampm}`;
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome Jay Hargudson 👌🏽</h1>
            <p className="text-[12px] text-muted-foreground">Last login 15th Sep 2025 • 09:47am</p>
            <p className="mt-2 text-[12px] text-muted-foreground">Send , Save, Visit our marketplace, anytime.</p>
          </div>
          <Button variant="outline" className="h-9 px-4 hover:bg-[#1DD3B0] hover:text-white" onClick={() => window.location.assign('/data-import')}>
            Data Import
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Contribution Balance"
            value="₦100,204,500"
            change="+8%"
            changeType="positive"
            icon={<Wallet className="h-4 w-4 text-[#3C1642]" />}
            iconBgColor="bg-[#3C1642]/10"
          />
          <MetricCard
            title="Total Member"
            value="24000"
            change="+8%"
            changeType="positive"
            icon={<Users className="h-4 w-4 text-[#10b981]" />}
            iconBgColor="bg-emerald-100"
          />
          <MetricCard
            title="Total Loan"
            value="₦243,400,500"
            change="+8%"
            changeType="negative"
            icon={<Banknote className="h-4 w-4 text-[#3b82f6]" />}
            iconBgColor="bg-blue-100"
          />
          <MetricCard
            title="Pending Loans"
            value="₦200,000.00"
            change="+8%"
            changeType="positive"
            icon={<Clock className="h-4 w-4 text-[#ef4444]" />}
            iconBgColor="bg-rose-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-transparent p-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">
                Total Deposit & Withdrawal
              </h3>
              <div className="relative group">
                <Button variant="outline" size="sm" className="hover:bg-transparent group/month">
                  {selectedMonth} <ChevronDown className="ml-2 h-4 w-4 group-hover/month:text-foreground" />
                </Button>
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-100">
                  {months.map((month) => (
                    <button
                      key={month}
                      onClick={() => setSelectedMonth(month)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={depositData} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={formatNaira} tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} width={64} />
                  <Tooltip formatter={(v: any) => formatNaira(Number(v))} labelStyle={{ color: '#6B7280' }} contentStyle={{ borderRadius: 8 }} />
                  {/* Reference vertical line at September */}
                  <ReferenceLine x="September" stroke="#CBD5E1" strokeDasharray="4 4" />
                  {/* Lines */}
                  <Line type="monotone" dataKey="deposit" stroke="#3C1642" strokeWidth={2.2} dot={{ r: 3, stroke: '#3C1642', fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="withdrawal" stroke="#10b981" strokeWidth={2} dot={{ r: 3, stroke: '#10b981', fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 5 }} />
                  {/* Peak label near July for withdrawal */}
                  <ReferenceDot x="July" y={95000} r={0} isFront label={{ value: formatNaira(400000), position: 'top', fill: '#059669', fontSize: 11, offset: 15 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-transparent p-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Monthly Contribution</h3>
              <div className="relative group">
                <Button variant="outline" size="sm" className="hover:bg-transparent group/month">
                  {selectedMonth} <ChevronDown className="ml-2 h-4 w-4 group-hover/month:text-foreground" />
                </Button>
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-100">
                  {months.map((month) => (
                    <button
                      key={month}
                      onClick={() => setSelectedMonth(month)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={contributionData} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={formatNaira} tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} width={64} />
                  <Tooltip formatter={(v: any) => formatNaira(Number(v))} labelStyle={{ color: '#6B7280' }} contentStyle={{ borderRadius: 8 }} />
                  <Line type="monotone" dataKey="amount" stroke="#F59E0B" strokeWidth={2.2} dot={{ r: 3, stroke: '#F59E0B', fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Recent Transactions - Left Side (2/3 width) */}
          <div className="w-full lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <Button variant="link" className="text-[#3C1642] p-0 h-auto">
                View All
              </Button>
            </div>
            <div className="flex gap-6 text-sm mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pb-1 ${
                    activeTab === tab
                      ? 'text-[#3C1642] font-medium border-b-2 border-[#3C1642]'
                      : 'text-muted-foreground hover:text-[#3C1642] transition-colors'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Recent {activeTab}</h4>
                  <p className="text-sm text-muted-foreground">Manage your reports</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <FilterDropdown value={filters} onChange={setFilters} />
                  <SortByDropdown value={sortBy} onChange={setSortBy} onDateRangeChange={setDateRange} />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-[#3C1642] hover:bg-[#3C1642]">
                    <TableHead className="text-white w-12">
                      <Checkbox
                        checked={selectedRows.length === visibleCount && visibleCount > 0}
                        onCheckedChange={() => toggleAllRows(visibleCount)}
                        className="border-white data-[state=checked]:bg-white data-[state=checked]:text-[#3C1642]"
                      />
                    </TableHead>
                    <TableHead className="text-white">Membership ID</TableHead>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Amount</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageItems.length > 0 ? (
                    pageItems.map((transaction, index) => (
                      <TableRow 
                        key={`${transaction.id}-${index}`}
                        className="transition-colors cursor-pointer hover:bg-transparent"
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(index)}
                            onCheckedChange={() => toggleRowSelection(index)}
                            className="data-[state=checked]:bg-[#1DD3B0] data-[state=checked]:border-[#1DD3B0]"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.name}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {transaction.date}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" sideOffset={6} className="w-40">
                              <DropdownMenuItem className="text-[13px] font-medium text-blue-700">
                                <Eye className="mr-2 h-4 w-4" />
                                View All
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-[13px] font-medium text-emerald-600">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-[13px] font-medium text-rose-600 focus:text-rose-700">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No transactions found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show rows:</span>
                  <select
                    className="h-8 border rounded-md px-2"
                    value={pageSize}
                    onChange={(e) => {
                      const newPageSize = parseInt(e.target.value, 10);
                      setPageSize(newPageSize);
                      setCurrentPage(1);
                    }}
                  >
                    {[5, 10, 20, 50].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <span className="text-sm text-muted-foreground ml-2">
                    Showing {start + 1}-{Math.min(start + pageSize, sorted.length)} of {sorted.length} results
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                    disabled={current === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                    disabled={current === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <span className="text-xs text-muted-foreground ml-2">Page {current} of {totalPages}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity - Right Side (1/3 width) */}
          <div className="w-full lg:w-1/3">
            <Card className="h-full p-0">
              {/* Header */}
              <div className="px-4 sm:px-6 pt-4 pb-3 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium sm:text-base">Recent Activity</h3>
                  <button className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-foreground">
                    {formatHeaderDate(now)}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={activitySearch}
                    onChange={(e) => setActivitySearch(e.target.value)}
                    placeholder="Search"
                    className="pl-9 h-9"
                  />
                </div>
              </div>


              {/* Pills actual */}
              <div className="px-4 sm:px-6 py-2 flex items-center gap-2">
                {["Contributions","Charitable","Loans"].map((tab) => (
                  <Button
                    key={tab}
                    size="sm"
                    variant={activityTab === tab ? "default" : "outline"}
                    className={`rounded-full px-4 ${activityTab === tab ? "bg-[#3C1642] text-white" : ""}`}
                    onClick={() => setActivityTab(tab)}
                  >
                    {tab}
                  </Button>
                ))}
              </div>

              {/* List */}
              <ScrollArea className="h-[420px]">
                <div className="px-4 sm:px-6 py-2">
                  {recentActivity
                    .filter((a) =>
                      !activitySearch || a.name.toLowerCase().includes(activitySearch.toLowerCase())
                    )
                    .map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 py-3 border-b last:border-b-0">
                        <Avatar className="h-9 w-9 mt-0.5">
                          <AvatarImage src={activity.avatar} alt={activity.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                            {activity.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="truncate text-sm">
                              <button className="text-[#3C1642] hover:underline font-medium mr-1">{activity.name}</button>
                              <span className="text-muted-foreground">| {activity.action}</span>
                            </p>
                          </div>
                          <div className="mt-1 flex items-center gap-3 text-xs">
                            <span className="text-emerald-600 font-semibold">₦150,000.00</span>
                            <span className="text-muted-foreground">25 Sep, 25 | 6:20am</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}