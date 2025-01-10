"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../assets/images/logo.png";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";
import NavbarUser from "../NavbarUser/NavbarUser";
import { useUser } from "@/context/user.provider";

const CommonNavbar = () => {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-black">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image src={logo} alt="logo" width={40} height={40} priority />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Home
          </Link>
          {user && user?.role === "admin" ? (
            <Link
              href="/admin-dashboard"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/user-dashboard/news-feed"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Newsfeed
            </Link>
          )}

          <Link
            href="/about-us"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            About
          </Link>
          <Link
            href="/contact-us"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Contact
          </Link>
          <Link
            href="/nutrition"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Nutrition
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          <NavbarUser />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <VisuallyHidden>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Mobile Navigation</SheetDescription>
                </SheetHeader>
              </VisuallyHidden>
              <div className="grid gap-4 p-4">
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Services
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default CommonNavbar;
