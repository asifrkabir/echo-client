"use client";

import { CircleUser } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/constant";

const NavbarUser = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: setUserLoading } = useUser();

  const handleLogout = () => {
    logout();
    setUserLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  if (!user) {
    return (
      <Button variant="secondary" onClick={() => router.push("/login")}>
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {user.profilePicture ? (
            <Image
              src={user.profilePicture}
              alt="Profile Picture"
              width={36}
              height={36}
              className="rounded-full border-2 border-yellow-500"
            />
          ) : (
            <CircleUser className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={handleLogout} className="w-full">
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUser;
