import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pawfect",
  description:
    "Your ultimate platform for pet care tips, stories, and nutrition advice. Explore and share knowledge to keep your pets happy and healthy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
