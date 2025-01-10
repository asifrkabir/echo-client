"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures the component is only rendered after mounting (for correct theme detection)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid rendering on the server or before theme is loaded

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <Button onClick={toggleTheme} size="icon" className="bg-transparent">
      {/* Sun Icon for light theme */}
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-transform ${
          resolvedTheme === "light"
            ? "rotate-0 scale-100"
            : "-rotate-90 scale-0"
        }`}
      />
      {/* Moon Icon for dark theme */}
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-transform ${
          resolvedTheme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
