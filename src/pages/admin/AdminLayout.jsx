import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  FiHome, 
  FiFileText, 
  FiSettings, 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiBell, 
  FiUser, 
  FiChevronRight 
} from "react-icons/fi";

export default function AdminLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

    // Navigation configuration
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FiHome },
    { name: "Blogs", path: "/admin/blogs", icon: FiFileText },
    { name: "Users", path: "/admin/users", icon: FiUser }
  ];

  // Derive page title and breadcrumbs from the current location
  const currentPath = location.pathname;
  
  // Build breadcrumbs array
  const pathParts = currentPath.split("/").filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const url = "/" + pathParts.slice(0, index + 1).join("/");
    return {
      label: part.charAt(0).toUpperCase() + part.slice(1),
      url: url,
      isLast: index === pathParts.length - 1
    };
  });

  const handleLogoutPlaceholder = () => {
    alert("Logout request simulated. Authenticator configurations are coming soon!");
  };

  const getSidebarContent = (isMobile = false) => (
    <div className="flex flex-col h-full bg-white text-slate-600">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 bg-brand-gray shrink-0">
       
        <div>
          <span className="text-xl font-bold tracking-tight uppercase transition-colors duration-200">
                  <span className="text-brand-blue">Company</span>{" "}
                  <span className="text-brand-dark">Filings</span>
                </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path || (item.path === "/admin/dashboard" && currentPath === "/admin");
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => isMobile && setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 group ${
                isActive
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "hover:bg-brand-light hover:text-brand-blue text-slate-500"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-brand-blue" : "text-slate-400 group-hover:text-brand-blue"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer / Logout */}
      <div className="p-4 border-t border-slate-200 bg-brand-gray shrink-0">
        <button
          onClick={handleLogoutPlaceholder}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-bold tracking-wide text-slate-500 hover:bg-red-50 hover:text-red-650 transition-all duration-200"
        >
          <FiLogOut className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <div className="min-h-screen bg-brand-gray text-brand-dark flex flex-col md:flex-row antialiased font-sans">
      
      {/* ─── DESKTOP LEFT SIDEBAR ───────────────────────────────────── */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0 border-r border-slate-200 bg-white z-30">
        {getSidebarContent()}
      </aside>

      {/* ─── MOBILE DRAWER MENU ─────────────────────────────────────── */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay shade */}
          <div 
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300" 
            onClick={() => setIsMobileOpen(false)} 
          />
          {/* Drawer container */}
          <aside className="relative w-64 max-w-xs h-full bg-white shadow-xl flex flex-col z-10 transition-transform duration-300 transform animate-slide-in">
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 focus:outline-none"
              aria-label="Close menu"
            >
              <FiX className="w-5 h-5" />
            </button>
            {getSidebarContent(true)}
          </aside>
        </div>
      )}

      {/* ─── MAIN CONTENT LAYOUT AREA ───────────────────────────────── */}
      <div className="flex-grow flex flex-col min-w-0 min-h-screen">
        
        {/* Top Header */}
        <header className="h-[69px] border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          
          {/* Mobile menu trigger + Page Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Open menu"
            >
              <FiMenu className="w-5 h-5" />
            </button>
            
          
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Current Date Display */}
            <span className="hidden lg:inline-block text-xs font-semibold text-slate-400 uppercase tracking-wider bg-brand-light border border-slate-200 px-3 py-1.5 rounded-md">
              {formattedDate}
            </span>

            {/* Admin Profile Placeholder */}
            <div className="flex items-center gap-2.5 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-brand-light border border-brand-light flex items-center justify-center text-slate-600">
                <FiUser className="w-4 h-4 text-slate-500" />
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-slate-700 block leading-tight">Admin System</span>
              </div>
            </div>

          </div>
        </header>

        {/* Dashboard Child Page Viewport */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
