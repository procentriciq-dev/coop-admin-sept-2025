import { MetricCard } from "@/components/MetricCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Wallet,
  Users,
  Banknote,
  Clock,
  TrendingUp,
  MoreHorizontal,
  ArrowUpRight,
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
    name: "Bryan Edwards",
    action: "Contribution",
    time: "14 mins ago",
    avatar: "BE",
  },
  {
    name: "Charles Johnson",
    action: "Contribution",
    time: "2 hours ago",
    avatar: "CJ",
  },
  {
    name: "Daniel Maxwell",
    action: "Contribution",
    time: "3 hours ago",
    avatar: "DM",
  },
  {
    name: "Albert Flores",
    action: "Contribution",
    time: "5 hours ago",
    avatar: "AF",
  },
  {
    name: "Wade Warren",
    action: "Contribution",
    time: "6 hours ago",
    avatar: "WW",
  },
  {
    name: "Mary Potter",
    action: "Contribution",
    time: "8 hours ago",
    avatar: "MP",
  },
  {
    name: "Cameron Williamson",
    action: "Contribution",
    time: "10 hours ago",
    avatar: "CW",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
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
          icon={<Banknote className="h-6 w-6 text-warning" />}
          iconBgColor="bg-warning/10"
        />
        <MetricCard
          title="Pending Loans"
          value="₦200,000.00"
          change="+8%"
          changeType="positive"
          icon={<Clock className="h-6 w-6 text-destructive" />}
          iconBgColor="bg-destructive/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">
              Total Deposit & Withdrawal
            </h3>
            <Button variant="outline" size="sm">
              Month <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={depositData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="deposit"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
              <Line
                type="monotone"
                dataKey="withdrawal"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--secondary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Monthly Contribution</h3>
            <Button variant="outline" size="sm">
              Month <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={contributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--warning))"
                fill="hsl(var(--warning) / 0.2)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                <button className="text-primary font-medium">
                  Contributions
                </button>
                <button>Loan Payments</button>
                <button>Withdrawals</button>
                <button>Loan Payments</button>
                <button>Membership</button>
              </div>
            </div>
            <Button variant="link" className="text-primary">
              View All
            </Button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-medium">Recent Contributions</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                Sort By <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Membership ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
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

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <span className="text-xs text-muted-foreground">Last 24hrs</span>
          </div>

          <div className="flex gap-2 mb-4">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground rounded-full"
            >
              Contributions
            </Button>
            <Button size="sm" variant="outline" className="rounded-full">
              Loans
            </Button>
            <Button size="sm" variant="ghost">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {activity.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{activity.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.action}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
