import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/MetricCard";
import {
  Users,
  UserCheck,
  UserX,
  Plus,
  Upload,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  X,
  MessageSquare,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const members = [
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

  return (
    <div className="space-y-6">
      {showBanner && (
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => setShowBanner(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold mb-2">
            Let's Start your Journey with Tently Members Page
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Add and manage members to get started your cooperative community
          </p>
          <ul className="space-y-2 text-sm mb-4">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Manage Members Document</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                Add a member using the form, Excel upload, or camera (if
                available)
              </span>
            </li>
          </ul>
          <Button className="bg-primary text-primary-foreground">
            Watch the video
          </Button>
        </Card>
      )}

      <div>
        <h1 className="text-2xl font-bold mb-1">Today's Member</h1>
        <div className="flex gap-4 text-sm">
          <button className="text-primary font-medium">
            Matthiew Summary
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

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">List of Members</h3>
          <div className="flex gap-2">
            <Button className="bg-secondary text-secondary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add New Member
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Add New Member</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Address
                </label>
                <Input placeholder="Address" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Upload/Account
                </label>
                <Input placeholder="Upload/Account" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Send Invite
                </label>
                <Input placeholder="Send Invite" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  First Name
                </label>
                <Input placeholder="First Name" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Last Name
                </label>
                <Input placeholder="Last Name" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Email Address
                </label>
                <Input placeholder="Email Address" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Role
                </label>
                <Input placeholder="Role" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm">
                Fill all Form
              </Button>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground"
              >
                Save
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search anything" className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              Sort By <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              Bulk Action <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              <TableHead className="text-primary-foreground">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead className="text-primary-foreground">Membership ID</TableHead>
              <TableHead className="text-primary-foreground">Full name</TableHead>
              <TableHead className="text-primary-foreground">Roles</TableHead>
              <TableHead className="text-primary-foreground">Email</TableHead>
              <TableHead className="text-primary-foreground">Status</TableHead>
              <TableHead className="text-primary-foreground"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={index}>
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
                <TableCell className="font-medium">{member.id}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell className="text-muted-foreground">
                  {member.email}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      member.status === "active"
                        ? "default"
                        : member.status === "pending"
                        ? "secondary"
                        : member.status === "new"
                        ? "outline"
                        : "destructive"
                    }
                    className={
                      member.status === "active"
                        ? "bg-success/10 text-success border-success/20"
                        : member.status === "pending"
                        ? "bg-warning/10 text-warning border-warning/20"
                        : member.status === "new"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : ""
                    }
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show rows:</span>
            <Button variant="outline" size="sm">
              10 rows <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8">
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
    </div>
  );
}
