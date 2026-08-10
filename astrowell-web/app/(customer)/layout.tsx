import { BottomNav } from "@/components/layout/bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { ReactNode } from "react";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex flex-col lg:flex-row">
      {/* Persistent Sidebar for Desktop (lg:) */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <Navbar />

        {/* Scrollable Main View Area */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Pinned Bottom Navigation for Mobile (< lg:) */}
      <BottomNav />
    </div>
  );
}
