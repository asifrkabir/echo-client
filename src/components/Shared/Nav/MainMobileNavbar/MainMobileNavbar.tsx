import logo from "@/assets/images/logo.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MainMobileNavbar() {
  return (
    <div className="lg:hidden flex">
      <Sheet>
        <SheetTrigger>
          <AlignJustify className="text-white" />
        </SheetTrigger>
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Nav</SheetTitle>
            <SheetDescription>Nav</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>

        <SheetContent side="left">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Image src={logo} alt="logo" width={60} height={60} priority />
          </Link>
          <nav className="flex flex-col gap-3 lg:gap-4 mt-6">
            <Link href="/news-feed">Newsfeed</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
