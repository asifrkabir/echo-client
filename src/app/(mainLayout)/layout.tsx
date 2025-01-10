import MainHeader from "@/components/Shared/Nav/MainHeader/MainHeader";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainHeader />
      <div className="min-h-screen w-full p-8">{children}</div>
    </div>
  );
}
