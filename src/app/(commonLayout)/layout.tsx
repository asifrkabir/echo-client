import CommonFooter from "@/components/ui/CommonFooter/CommonFooter";
import CommonNavbar from "@/components/ui/CommonNavbar/CommonNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pawfect",
  description:
    "Your ultimate platform for pet care tips, stories, and nutrition advice. Explore and share knowledge to keep your pets happy and healthy.",
};

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <CommonNavbar />
      {children}
      <CommonFooter />
    </div>
  );
}
