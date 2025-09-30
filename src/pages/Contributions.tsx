import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/MetricCard";
import {
  Wallet,
  Activity,
  Clock,
  Heart,
  ChevronDown,
  Filter,
  MoreHorizontal,
  Upload,
} from "lucide-react";
import {
  LineChart,
  Line,
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

const monthlyData = [
  { month: "2019", amount: 100000 },
  { month: "2020", amount: 150000 },
  { month: "2021", amount: 120000 },
  { month: "2022", amount: 180000 },
  { month: "2023", amount: 160000 },
  { month: "2024", amount: 200000 },
];

const recentContributions = [
  {
    id: "SG3345782",
    name: "Grace Peters (Jones)",
    purpose: "Monthly Contribution",
    amount: "₦200,000.00",
    date: "25 Jan, 10:40 PM",
  },
  {
    id: "SG3345782",
    name: "Grace Peters (Jones)",
    purpose: "Charitable contribution",
    amount: "₦200,000.00",
    date: "25 Jan, 10:40 PM",
  },
  {
    id: "SG3345782",
    name: "Grace Peters (Jones)",
    purpose: "Monthly Contribution",
    amount: "₦200,000.00",
    date: "25 Jan, 10:40 PM",
  },
  {
    id: "SG3345782",
    name: "Grace Peters (Jones)",
    purpose: "Monthly Contribution",
    amount: "₦200,000.00",
    date: "25 Jan, 10:40 PM",
  },
  {
    id: "SG3345782",
    name: "Grace Peters (Jones)",
    purpose: "Monthly Contribution",
    amount: "₦200,000.00",
    date: "25 Jan, 10:40 PM",
  },
  {
    id: "SG3345782",
    name: "Grace Peters (Jones)",
    purpose: "Monthly Contribution",
    amount: "₦200,000.00",
    date: "25 Jan, 10:40 PM",
  },
];

export default function Contributions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Today's Contribution</h1>
        <p className="text-muted-foreground">
          Contributions Summary - 2 Days
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Contributions"
          value="₦100,249,500"
          change="+8%"
          changeType="positive"
          icon={<Wallet className="h-6 w-6 text-primary" />}
          iconBgColor="bg-primary/10"
        />
        <MetricCard
          title="Active Contributions"
          value="₦100,249,500"
          change="+8%"
          changeType="positive"
          icon={<Activity className="h-6 w-6 text-secondary" />}
          iconBgColor="bg-secondary/10"
        />
        <MetricCard
          title="Pending Contributions"
          value="₦243,400,500"
          change="+8%"
          changeType="positive"
          icon={<Clock className="h-6 w-6 text-warning" />}
          iconBgColor="bg-warning/10"
        />
        <MetricCard
          title="Charitable Contributions"
          value="₦200,000.00"
          change="+8%"
          changeType="positive"
          icon={<Heart className="h-6 w-6 text-destructive" />}
          iconBgColor="bg-destructive/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Total Monthly Contribution</h3>
            <Button variant="outline" size="sm">
              Month <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--secondary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--secondary))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Monthly Summary</h3>
            <Button variant="outline" size="sm">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-success/20 via-secondary/20 to-primary/20 rounded-2xl transform rotate-6"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 via-warning/20 to-success/20 rounded-2xl transform -rotate-6"></div>
            
            <div className="relative bg-gradient-to-br from-success to-secondary p-8 rounded-2xl text-white shadow-xl">
              <div className="text-center space-y-4">
                <div>
                  <p className="text-sm opacity-90 mb-1">MARCH 2024</p>
                  <div className="h-px bg-white/30 w-full"></div>
                </div>
                
                <div className="py-4">
                  <p className="text-4xl font-bold tracking-tight">
                    ₦249,400,500
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="bg-white/20 px-3 py-1 rounded">
                    <span>Previous: ₦200,000.00</span>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded">
                    <span>Goal: ₦300M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              83% of monthly goal achieved
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
              <button className="text-primary font-medium">
                Contributions
              </button>
              <button>All Contributions</button>
              <button>Membership Contributions</button>
              <button>Charitable Contribution</button>
            </div>
          </div>
          <Button variant="link" className="text-primary">
            View All
          </Button>
        </div>

        <div className="mb-4">
          <h4 className="font-medium mb-4">Recent Contributions</h4>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              List of Recent contributions
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                Sort By <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-primary/5">
              <TableHead className="text-primary">Membership ID</TableHead>
              <TableHead className="text-primary">Name</TableHead>
              <TableHead className="text-primary">Purpose</TableHead>
              <TableHead className="text-primary">Amount</TableHead>
              <TableHead className="text-primary">Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentContributions.map((contribution, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{contribution.id}</TableCell>
                <TableCell>{contribution.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {contribution.purpose}
                </TableCell>
                <TableCell className="font-medium">
                  {contribution.amount}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {contribution.date}
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
          <div className="flex items-center gap-1 ml-4">
            <Button variant="outline" size="icon" className="h-8 w-8">
              ←
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-primary text-primary-foreground"
            >
              1
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              2
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              ...
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              →
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-secondary text-secondary-foreground">
          <Upload className="h-4 w-4 mr-2" />
          Data Import
        </Button>
      </div>
    </div>
  );
}
