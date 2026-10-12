import AccountSidebar from "@/components/AccountSidebar/AccountSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen xl:grid xl:grid-cols-12">
        <div className="max-xl:hidden col-span-3 xl:block">
          <AccountSidebar />
        </div>
        <SidebarInset className="col-span-9">
          <main className="flex-1 min-w-0 bg-white px-6 py-8 xl:py-12 xl:px-14">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
