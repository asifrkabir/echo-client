import { DarkModeToggle } from "@/components/ui/DarkModeToggle/DarkModeToggle";
import DashboardMobileDrawer from "@/components/ui/Dashboard/DashboardMobileDrawer/DashboardMobileDrawer";
import { ISidebarItem } from "@/types";
import NavbarUser from "../../NavbarUser/NavbarUser";

interface IProps {
  items: ISidebarItem[];
}

const DashboardNavbar = ({ items }: IProps) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <DashboardMobileDrawer items={items} />
      <div className="w-full flex-1"></div>
      <DarkModeToggle />
      <NavbarUser />
    </header>
  );
};

export default DashboardNavbar;
