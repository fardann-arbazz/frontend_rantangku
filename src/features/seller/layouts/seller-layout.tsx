import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarContent } from "@/components/seller/sidebar-content";
import MobileHeader from "@/components/seller/mobile-header";
import DesktopHeader from "@/components/seller/desktop-header";

const SellerLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <MobileHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 min-h-screen bg-white border-r border-slate-200 sticky top-0">
          <SidebarContent setMobileMenuOpen={setMobileMenuOpen} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Desktop Header */}
          <DesktopHeader />

          {/* Page Content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
