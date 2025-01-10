"use client";

import { ISidebarItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../../assets/images/logo.png";

interface IProps {
  items: ISidebarItem[];
}

const DashboardSidebar = ({ items }: IProps) => {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src={logo} alt="logo" width={30} height={30} />
            <span className="">Pawfect</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary 
                  ${
                    pathname === item.href
                      ? "bg-accent text-primary"
                      : "text-muted-foreground"
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
