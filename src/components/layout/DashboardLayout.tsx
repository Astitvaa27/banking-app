import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen grid-cols-[18rem_1fr] bg-background">
      {/* Sidebar */}
      <div className="border-r border-border">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex h-screen flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}