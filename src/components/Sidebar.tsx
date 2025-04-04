
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, 
  FileUp, 
  Files, 
  Calendar, 
  Settings, 
  Users, 
  Bell, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Files, label: "My Documents", path: "/documents" },
    { icon: FileUp, label: "Upload Files", path: "/upload" },
    { icon: Calendar, label: "Training Schedule", path: "/schedule" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: ShieldCheck, label: "Safety Standards", path: "/standards" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Users, label: "Team Members", path: "/team" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-[70px]"
      )}
    >
      <div className="h-16 border-b flex items-center justify-center">
        <ShieldCheck className="h-8 w-8 text-safety" />
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="py-4 px-2">
          {sidebarItems.map((item) => (
            <Link to={item.path} key={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 px-3 py-2 mb-1 hover:bg-safety-gray",
                  isActive(item.path) && "bg-safety-gray text-safety",
                  !isOpen && "md:justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive(item.path) && "text-safety")} />
                <span className={cn("font-medium", !isOpen && "md:hidden")}>
                  {item.label}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
