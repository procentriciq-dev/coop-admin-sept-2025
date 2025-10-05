import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Wallet,
  Users,
  Banknote,
  Clock,
  TrendingUp,
  MoreHorizontal,
  ChevronDown,
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

const MetricCard = ({ title, value, change, changeType, icon, iconBgColor }) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <div className="flex items-center gap-1">
          <span className={`text-sm ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${iconBgColor}`}>
        {icon}
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

const recentTransactions = [
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
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Contributions");

  const tabs = [
    "Contributions",
    "Charitable donation",
    "Due Loan Payments",
    "Membership",
    "Loans"
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Jay Hargudson</h1>
          <p className="text-muted-foreground">
            Sunday, 19 January 2024 8:14:32PM
          </p>
          <p className="text-muted-foreground">
            Good day, You can view your workspace, anytime
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Cooperative Balance"
            value="₦100,204,500"
            change="+8%"
            changeType="positive"
            icon={<Wallet className="h-6 w-6 text-primary" />}
            iconBgColor="bg-primary/10"
          />
          <MetricCard
            title="Total Member"
            value="24000"
            change="+8%"
            changeType="positive"
            icon={<Users className="h-6 w-6 text-secondary" />}
            iconBgColor="bg-secondary/10"
          />
          <MetricCard
            title="Total Loan"
            value="₦243,400,500"
            change="+8%"
            changeType="negative"
            icon={<Banknote className="h-6 w-6 text-yellow-600" />}
            iconBgColor="bg-yellow-100"
          />
          <MetricCard
            title="Pending Loans"
            value="₦200,000.00"
            change="+8%"
            changeType="positive"
            icon={<Clock className="h-6 w-6 text-red-600" />}
            iconBgColor="bg-red-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-transparent p-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">
                Total Deposit & Withdrawal
              </h3>
              <Button variant="outline" size="sm">
                Month <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
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
              <Button variant="outline" size="sm">
                Month <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
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
                <h4 className="font-medium">Recent {activeTab}</h4>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-[#1DD3B0] hover:text-white transition-colors"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-[#1DD3B0] hover:text-white transition-colors"
                  >
                    Sort By <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-[#3C1642] hover:bg-[#3C1642]">
                    <TableHead className="text-white">Membership ID</TableHead>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Amount</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.name}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {transaction.date}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-center gap-2 mt-4">
                <Button variant="outline" size="sm">
                  Show more
                </Button>
                <span className="text-sm text-muted-foreground">10 rows</span>
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