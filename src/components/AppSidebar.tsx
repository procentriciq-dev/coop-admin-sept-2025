import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
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

  const renderNavItem = (item: { title: string; url: string; icon: any }) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <NavLink
          to={item.url}
          className={cn(
            "flex items-center sidebar-item",
            pathname === item.url ? "sidebar-item-active font-medium" : "text-sidebar-foreground",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <item.icon className={cn(
            "sidebar-icon transition-all duration-200",
            isCollapsed ? "mx-auto h-5 w-5" : "h-4 w-4"
          )} />
          {!isCollapsed && <span className="sidebar-text ml-3">{item.title}</span>}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="pt-2">
        <SidebarHeader>
          <div className={cn("flex items-center justify-center w-full py-3 overflow-hidden", !isCollapsed ? "px-4" : "px-2")}>
            <div className="flex items-center">
              {isCollapsed ? (
                <img 
                  src="/favicon.ico" 
                  alt="Tently" 
                  className="w-6 h-6 transition-all duration-200 flex-shrink-0"
                />
              ) : (
                <img 
                  src="/thelogo.png" 
                  alt="Tently" 
                  className="w-32 h-auto transition-all duration-200 flex-shrink-0"
                />
              )}
            </div>
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
              {renderNavItem(dashboardItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase sidebar-text">
            {!isCollapsed && "Core Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {coreItems.map((item) => renderNavItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase sidebar-text">
            {!isCollapsed && "Growth & Community"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {growthItems.map((item) => renderNavItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase sidebar-text">
            {!isCollapsed && "Admin"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => renderNavItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter>
          {!isCollapsed && (
            <div className="mt-4 mb-6 flex justify-center">
              <img 
                src="/tently.png" 
                alt="Tently" 
                className="h-auto w-full max-w-[180px] mx-auto"
              />
            </div>
          )}
          <div className="mt-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/logout" className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-start")}>
                    <LogOut className={cn(
                      "sidebar-icon transition-all duration-200",
                      isCollapsed ? "mx-auto h-5 w-5" : "h-4 w-4"
                    )} />
                    {!isCollapsed && <span className="ml-3">Logout</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/setting" className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-start")}>
                    <Settings className={cn(
                      "sidebar-icon transition-all duration-200",
                      isCollapsed ? "mx-auto h-5 w-5" : "h-4 w-4"
                    )} />
                    {!isCollapsed && <span className="ml-3">Setting</span>}
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
