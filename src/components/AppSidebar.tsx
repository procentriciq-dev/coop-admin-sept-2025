import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  HandCoins,
  Banknote,
  Calculator,
  FolderOpen,
  Heart,
  User as UserIcon,
  Key,
  Settings,
  HelpCircle,
  ChevronDown,
  LogOut,
  Database,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const dashboardItem = { title: "Dashboard", url: "/", icon: LayoutDashboard };

const coreItems = [
  { title: "Members", url: "/members", icon: Users },
  { title: "Contributions", url: "/contributions", icon: HandCoins },
  { title: "Loans", url: "/loans", icon: Banknote },
  { title: "Finance & Accounting", url: "/finance", icon: Calculator },
];

const growthItems = [
  { title: "Projects & Investment", url: "/projects", icon: FolderOpen },
  { title: "Community & Engagement", url: "/community", icon: Heart },
];

const adminItems = [
  { title: "Users", url: "/settings/users", icon: UserIcon },
  { title: "Access Management", url: "/access", icon: Key },
  { title: "Data Import", url: "/data-import", icon: Database },
  { title: "System Settings", url: "/system-settings", icon: Settings },
  { title: "Support", url: "/support", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="pt-2">
        <SidebarHeader>
          <div className="px-2 flex items-center gap-2">
            <img src="/favicon.ico" alt="Tently" className="w-8 h-8 rounded-lg" />
            {!isCollapsed && (
              <span className="font-bold text-xl text-foreground sidebar-text">tently</span>
            )}
          </div>
          {!isCollapsed && (
            <button className="mx-2 mt-2 inline-flex w-[calc(100%-1rem)] items-center justify-between rounded-md border border-sidebar-border bg-card px-2 py-2 text-left">
              <div className="flex flex-col">
                <span className="text-sm font-medium sidebar-text">OmniCorp</span>
                <span className="text-[10px] text-muted-foreground sidebar-text">Grow Business Plan</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={dashboardItem.title}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={dashboardItem.url}
                    className={`${pathname === dashboardItem.url ? "sidebar-item sidebar-item-active font-medium" : "sidebar-item text-sidebar-foreground"}`}
                  >
                    <dashboardItem.icon className="sidebar-icon" />
                    {!isCollapsed && <span className="sidebar-text">{dashboardItem.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase sidebar-text">
            {!isCollapsed && "Core Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {coreItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`${pathname === item.url ? "sidebar-item sidebar-item-active font-medium" : "sidebar-item text-sidebar-foreground"}`}
                    >
                      <item.icon className="sidebar-icon" />
                      {!isCollapsed && <span className="sidebar-text">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase sidebar-text">
            {!isCollapsed && "Growth & Initiative"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {growthItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`${pathname === item.url ? "sidebar-item sidebar-item-active font-medium" : "sidebar-item text-sidebar-foreground"}`}
                    >
                      <item.icon className="sidebar-icon" />
                      {!isCollapsed && <span className="sidebar-text">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase sidebar-text">
            {!isCollapsed && "Admin"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`${pathname === item.url ? "sidebar-item sidebar-item-active font-medium" : "sidebar-item text-sidebar-foreground"}`}
                    >
                      <item.icon className="sidebar-icon" />
                      {!isCollapsed && <span className="sidebar-text">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter>
          {!isCollapsed && (
            <div className="mx-2 mt-2 rounded-lg bg-[#3a2468] p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <img src="/favicon.ico" alt="tently" className="w-5 h-5" />
                <span className="font-semibold sidebar-text">tently</span>
              </div>
              <p className="text-xs opacity-90 leading-snug sidebar-text" style={{ color: "#ffffff" }}>
                Refer a friend and earn up to ₦1000 for first 3 people you invite
              </p>
              <button className="mt-3 w-full rounded-md bg-white px-3 py-2 text-xs font-medium text-[#3a2468] sidebar-text">
                Copy Referral Link
              </button>
            </div>
          )}
          <div className="mt-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/logout">
                    <LogOut className="sidebar-icon" />
                    {!isCollapsed && <span>Logout</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/setting">
                    <Settings className="sidebar-icon" />
                    {!isCollapsed && <span>Setting</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
