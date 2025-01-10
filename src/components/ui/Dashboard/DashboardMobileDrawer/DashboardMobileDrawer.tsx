"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ISidebarItem } from "@/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../../../assets/images/logo.png";

interface IProps {
  items: ISidebarItem[];
}

const DashboardMobileDrawer = ({ items }: IProps) => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Mobile Navigation</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Image src={logo} alt="logo" width={30} height={30} />
            <span className="">Pawfect</span>
          </Link>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
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
      </SheetContent>
    </Sheet>
  );
};

export default DashboardMobileDrawer;
