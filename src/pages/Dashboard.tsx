import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome Jay Hargudson 👌🏽</h1>
            <p className="text-[12px] text-muted-foreground">Last login 15th Sep 2025 • 09:47am</p>
            <p className="mt-2 text-[12px] text-muted-foreground">Send , Save, Visit our marketplace, anytime.</p>
          </div>
          <Button variant="outline" className="h-9 px-4">
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
            <div className="bg-white/50 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={depositData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="deposit"
                    stroke="#3C1642"
                    strokeWidth={2}
                    dot={{ fill: "#3C1642" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="withdrawal"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ fill: "#8B5CF6" }}
                  />
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
            <div className="bg-white/50 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={contributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#EAB308"
                    fill="rgba(234, 179, 8, 0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
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
                          <Button variant="ghost" size="icon" className="hover:bg-transparent">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
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
            <Card className="h-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <Button variant="link" className="text-[#3C1642] p-0 h-auto">
                  View All
                </Button>
              </div>

              <div className="flex gap-2 mb-4 items-center">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </button>
                <Button
                  size="sm"
                  className="text-white rounded-full px-4"
                  style={{ backgroundColor: '#3C1642' }}
                >
                  Contributions
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="rounded-full px-4 hover:bg-[#1DD3B0] hover:text-white transition-colors"
                >
                  Charitable
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="rounded-full px-4 hover:bg-[#1DD3B0] hover:text-white transition-colors"
                >
                  Loans
                </Button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.avatar} alt={activity.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {activity.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.name}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-green-600 font-medium">₦150,000.00</span>
                        <span className="text-muted-foreground">25 Sep, 25 | 6:20am</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}