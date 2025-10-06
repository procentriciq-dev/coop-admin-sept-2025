import { ReactNode, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search, Mail, LogOut, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { LogoutButton } from "./LogoutButton";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [currentTime] = useState(() => new Date());
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userInitial = user?.email?.[0]?.toUpperCase() || 'U';
  const userName = user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'User';
  const formattedDate = currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4 flex-1">
              <SidebarTrigger />
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search Anything..."
                  className="pl-10 bg-muted/50"
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-transparent text-muted-foreground hover:text-muted-foreground focus-visible:ring-0 data-[state=open]:text-muted-foreground"
                  >
                    <CalendarIcon className="h-5 w-5" />
                    <span className="sr-only">Calendar</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <div className="p-2">
                    <Calendar 
                      mode="single"
                      className="border-0"
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-transparent text-muted-foreground hover:text-muted-foreground focus-visible:ring-0 data-[state=open]:text-muted-foreground"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                    <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary"></span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0">
                  <div className="p-4 border-b">
                    <h4 className="font-medium">Notifications</h4>
                  </div>
                  <div className="p-2">
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      No new notifications
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-transparent text-muted-foreground hover:text-muted-foreground focus-visible:ring-0 data-[state=open]:text-muted-foreground"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary"></span>
                    <span className="sr-only">Messages</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Messages</h4>
                      <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary">
                        View all
                      </Button>
                    </div>
                  </div>
                  <div className="divide-y">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-3 hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/avatars/0${item}.png`} alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium truncate">Team Member {item}</p>
                              <span className="text-xs text-muted-foreground">2h ago</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {item === 1 && "Can we schedule a meeting for tomorrow?"}
                              {item === 2 && "I've updated the project timeline"}
                              {item === 3 && "New message from support team"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              
              <div className="h-6 w-px bg-border mx-1"></div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-10 rounded-full p-0 pr-2 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={userName} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left hidden sm:block">
                        <p className="text-sm font-medium">{userName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                          {user.email || ''}
                        </p>
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-64 p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={userName} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email || 'No email provided'}
                        </p>
                      </div>
                    </div>
                    <div className="h-px bg-border my-1"></div>
                    <Button variant="ghost" className="justify-start">
                      Profile
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      Settings
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      Help
                    </Button>
                    <div className="h-px bg-border my-1"></div>
                    <LogoutButton 
                      variant="ghost" 
                      className="justify-start text-red-600 hover:text-red-600 hover:bg-red-50 w-full"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </LogoutButton>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
