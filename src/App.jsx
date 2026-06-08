import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import ConsultationModal from "./components/ConsultationModal";
import { ConsultationProvider } from "./context/ConsultationContext";

// Admin Panel Components
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminUsers from "./pages/admin/AdminUsers";


// Scroll Restoration and Hash Navigation Specialist component
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      // Wait for rendering to complete before scrolling
      const timer = setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function MainApp() {
  const location = useLocation();
  
  // Intercept all routes starting with /admin to bypass public site layout
  const isAdminPath = location.pathname.startsWith("/admin");

  if (isAdminPath) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray text-brand-dark flex flex-col font-sans antialiased selection:bg-brand-blue/15 selection:text-brand-blue">
      <ScrollToTop />
      
      {/* Premium Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
        </Routes>
      </main>

      {/* Premium Footer */}
      <Footer />

      {/* Consultation Request Popup Modal */}
      <ConsultationModal />
    </div>
  );
}

import { ImageProvider } from "./context/ImageContext";

export default function App() {
  return (
    <Router>
      <ImageProvider>
        <ConsultationProvider>
          <MainApp />
        </ConsultationProvider>
      </ImageProvider>
    </Router>
  );
}