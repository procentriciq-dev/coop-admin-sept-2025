import { ReactNode, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Calendar as CalendarIcon, Search, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
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
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" sideOffset={8} className="w-[288px] h-[288px] p-2">
                  <div className="flex h-full flex-col">
                    <div className="relative mb-2">
                      <Input className="h-8 pr-8 text-sm" placeholder="" />
                      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range: DateRange | undefined) => setDateRange(range)}
                        className="rounded-md border p-0"
                        classNames={{
                          table: "w-full border-collapse space-y-0",
                          row: "flex w-full mt-1",
                          head_cell: "text-muted-foreground rounded w-8 font-normal text-[10px]",
                          cell: "h-8 w-8 text-center text-[12px] p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                          day: "h-8 w-8 p-0 font-normal",
                          caption_label: "text-xs font-medium",
                          months: "flex flex-col",
                        }}
                      />
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Button
                        variant="ghost"
                        className="h-8 flex-1 text-destructive hover:text-destructive"
                        onClick={() => setDateRange(undefined)}
                      >
                        REMOVE
                      </Button>
                      <Button className="h-8 flex-1 bg-[#10b981] hover:bg-[#059669] text-white">
                        DONE
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <div className="relative group">
                <Button variant="ghost" size="icon" className="relative hover:bg-transparent group/icon">
                  <Mail className="h-5 w-5 group-hover/icon:text-foreground" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </Button>
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-100">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">Messages</p>
                      <span className="text-xs text-primary">Mark all as read</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center py-2">No new messages</p>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <Button variant="ghost" size="icon" className="relative hover:bg-transparent group/icon">
                  <Bell className="h-5 w-5 group-hover/icon:text-foreground" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                </Button>
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-100">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">Notifications</p>
                      <span className="text-xs text-primary">Clear all</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center py-2">No new notifications</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/Avatar.png" alt="User Avatar" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    JH
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Jay Hargudson</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
