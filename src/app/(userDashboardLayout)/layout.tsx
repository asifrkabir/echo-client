import DashboardNavbar from "@/components/ui/Dashboard/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "@/components/ui/Dashboard/DashboardSidebar/DashboardSidebar";
import { Cat, CircleUser, Newspaper } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pawfect | Dashboard",
  description:
    "Your ultimate platform for pet care tips, stories, and nutrition advice. Explore and share knowledge to keep your pets happy and healthy.",
};

const navItems = [
  {
    label: "Newsfeed",
    href: "/user-dashboard/news-feed",
    icon: <Cat className="h-5 w-5" />,
  },
  {
    label: "Following",
    href: "/user-dashboard/following",
    icon: <Newspaper className="h-5 w-5" />,
  },
  {
    label: "Profile",
    href: "/user-dashboard/my-profile",
    icon: <CircleUser className="h-5 w-5" />,
  },
];

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardSidebar items={navItems} />
      <div className="flex flex-col">
        <DashboardNavbar items={navItems} />
        {children}
      </div>
    </div>
  );
}
