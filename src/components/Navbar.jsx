import React, { useState, useEffect, useRef } from "react";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// High-fidelity structured services data mapping all 29 sub-services
const servicesData = [
  {
    category: "Register a Company",
    items: [
      { name: "Private Limited", href: "#pvt-ltd" },
      { name: "Public Limited", href: "#pub-ltd" },
      { name: "Limited Liability Partnership", href: "#llp" },
      { name: "Conversion of Private Limited to LLP or LLP to Private Limited", href: "#conversion" },
      { name: "One Person Company", href: "#opc" },
      { name: "Section 8 Company", href: "#sec-8" },
      { name: "Producer Company", href: "#producer" }
    ]
  },
  {
    category: "Company filings",
    items: [
      { name: "Annual ROC Filings", href: "#roc-filings" },
      { name: "Shifting of registered office", href: "#office-change" },
      { name: "Company name change", href: "#name-change" },
      { name: "Increase or reclassification in share capital", href: "#capital-change" },
      { name: "Share certificates", href: "#share-cert" },
      { name: "Transfer of shares", href: "#share-transfer" },
      { name: "Change in Directors", href: "#director-change" },
      { name: "KYC of Directors", href: "#director-kyc" },
      { name: "Alteration of MOA and AOA of the Company", href: "#moa-aoa" },
      { name: "Winding up", href: "#winding-up" }
    ]
  },
  {
    category: "Startup",
    items: [
      { name: "Startup India Registration", href: "#startup-india" },
      { name: "Fund Raise related advisory and compliances", href: "#fund-raise" },
      { name: "Advisory on capital structure", href: "#capital-struct" },
      { name: "Term sheet and Share Subscription and Shareholders Agreement", href: "#sha-ssa" },
      { name: "Advisory/ Mentor equity", href: "#mentor-equity" }
    ]
  },
  {
    category: "Accounting, Audit and Tax",
    items: [
      { name: "Accounting and book keeping", href: "#accounting" },
      { name: "Statutory Audit", href: "#statutory-audit" },
      { name: "Tax Audit", href: "#tax-audit" },
      { name: "GST Audit", href: "#gst-audit" },
      { name: "Internal Audit", href: "#internal-audit" },
      { name: "Income Tax Returns", href: "#itr" },
      { name: "GST Returns", href: "#gst-returns" }
    ]
  }
];

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(false);
  const [activeMobileAccordion, setActiveMobileAccordion] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  const megaMenuRef = useRef(null);

  // Monitor scroll to trigger sticky behavior and add a premium drop shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy logic to track active page section and highlight active nav link
  useEffect(() => {
    const handleScrollspy = () => {
      const sections = ["home", "about", "services", "blogs", "contact"];
      const scrollPosition = window.scrollY + 140; // safe offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScrollspy);
    handleScrollspy();
    return () => window.removeEventListener("scroll", handleScrollspy);
  }, []);

  // Close mega menu when clicking outside on desktop
  useEffect(() => {
    function handleClickOutside(event) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setActiveMegaMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans ${isSticky
          ? "bg-white border-b border-slate-100 shadow-md py-3"
          : "bg-white/95 backdrop-blur-md py-4 border-b border-slate-200/50"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between">

            {/* Left Section: Typographic Logo & Brand Identity */}
            <a href="#" className="flex items-center gap-2 group focus:outline-none">
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight uppercase transition-colors duration-200">
                  <span className="text-brand-blue">Company</span>{" "}
                  <span className="text-brand-dark">Filings</span>
                </span>
              </div>
            </a>

            {/* Center Section: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="#"
                className={`text-[15px] font-medium transition-colors duration-200 ${
                  activeSection === "home"
                    ? "text-brand-blue active"
                    : "text-brand-dark hover:text-brand-blue"
                }`}
              >
                Home
              </a>
              <a
                href="#about"
                className={`text-[15px] font-medium transition-colors duration-200 ${
                  activeSection === "about"
                    ? "text-brand-blue active"
                    : "text-brand-dark hover:text-brand-blue"
                }`}
              >
                About Us
              </a>

              {/* Mega Menu Dropdown Trigger */}
              <div
                ref={megaMenuRef}
                onMouseEnter={() => setActiveMegaMenu(true)}
                onMouseLeave={() => setActiveMegaMenu(false)}
              >
                <button
                  onClick={() => setActiveMegaMenu(!activeMegaMenu)}
                  className={`flex items-center gap-1 text-[15px] font-medium transition-colors duration-200 focus:outline-none ${
                    activeSection === "services" || activeMegaMenu
                      ? "text-brand-blue active"
                      : "text-brand-dark hover:text-brand-blue"
                  }`}
                >
                  <span>Services</span>
                  <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu || activeSection === "services" ? "rotate-180 text-brand-blue" : "text-slate-500"}`} />
                </button>

                {/* Premium Corporate Mega Menu Panel */}
                <AnimatePresence>
                  {activeMegaMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{
                        left: "20vw",
                        transform: "translateX(-50%)",
                        top: isSticky ? "60px" : "72px",
                      }}
                      className="fixed w-[900px] max-w-[95vw] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 pointer-events-auto"
                    >
                      <div className="grid grid-cols-4 p-6 gap-4 bg-white">
                        {servicesData.map((category, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col border-r border-slate-100 last:border-0 pr-4 last:pr-0"
                          >
                            <div className="flex items-center mb-3">
                              <h4 className="text-[15px] font-bold text-brand-dark">
                                {category.category}
                              </h4>
                            </div>

                            <ul className="space-y-2.5">
                              {category.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <a
                                    href={item.href}
                                    className="group flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-brand-blue transition-colors duration-150"
                                  >
                                    <FiChevronRight className="w-2.5 h-2.5 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all shrink-0" />
                                    <span>{item.name}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="bg-brand-gray border-t border-slate-100 px-8 py-4 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">
                          Need custom legal advisory or corporate structural structuring?
                        </span>

                        <a
                          href="#consultation"
                          className="text-brand-blue font-bold hover:opacity-90 transition-opacity duration-150"
                        >
                          Talk to our compliance experts
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#blogs"
                className={`text-[15px] font-medium transition-colors duration-200 ${
                  activeSection === "blogs"
                    ? "text-brand-blue active"
                    : "text-brand-dark hover:text-brand-blue"
                }`}
              >
                Blogs
              </a>
              <a
                href="#contact"
                className={`text-[15px] font-medium transition-colors duration-200 ${
                  activeSection === "contact"
                    ? "text-brand-blue active"
                    : "text-brand-dark hover:text-brand-blue"
                }`}
              >
                Contact
              </a>
            </nav>

            {/* Right Section: Contact & Primary CTA (Desktop) */}
            <div className="hidden lg:flex items-center gap-8">
              <a
                href="#consultation"
                className="bg-brand-blue hover:bg-opacity-95 text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              >
                Get Free Consultation
              </a>
            </div>

            {/* Hamburger Button (Mobile) */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-brand-dark hover:text-brand-blue hover:bg-brand-light transition-all focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Slide Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col lg:hidden border-l border-slate-100"
            >
              {/* Mobile Drawer Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-brand-gray">
                <div className="flex items-center gap-2">
                  <span className="font-bold uppercase tracking-tight">
                    <span className="text-brand-blue">Company</span>{" "}
                    <span className="text-brand-dark">Filings</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 hover:text-brand-dark transition-all focus:outline-none"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer Scrollable Links */}
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
                <nav className="space-y-4">
                  <a
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-[16px] font-bold py-1 transition-colors ${
                      activeSection === "home"
                        ? "text-brand-blue active"
                        : "text-brand-dark hover:text-brand-blue"
                    }`}
                  >
                    Home
                  </a>
                  <a
                    href="#about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-[16px] font-bold py-1 transition-colors ${
                      activeSection === "about"
                        ? "text-brand-blue active"
                        : "text-brand-dark hover:text-brand-blue"
                    }`}
                  >
                    About Us
                  </a>

                  {/* Mobile Accordion Services */}
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <button
                      onClick={() =>
                        setActiveMobileAccordion(
                          activeMobileAccordion === "services" ? null : "services"
                        )
                      }
                      className={`flex items-center justify-between w-full text-[16px] font-bold py-1 text-left transition-colors ${
                        activeSection === "services" || activeMobileAccordion === "services"
                          ? "text-brand-blue active"
                          : "text-brand-dark hover:text-brand-blue"
                      }`}
                    >
                      <span>Services</span>
                      <FiChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                          activeMobileAccordion === "services" || activeSection === "services" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Subcategories Accordion Content */}
                    <AnimatePresence>
                      {activeMobileAccordion === "services" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-2 border-l border-slate-100 ml-1 space-y-1 pt-2"
                        >
                          <ul className="space-y-1">
                            {servicesData.map((category, idx) => (
                              <li key={idx}>
                                <a
                                  href="#services"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="group flex items-center justify-between text-[14px] font-bold text-slate-700 hover:text-brand-blue py-2 transition-colors border-b border-slate-100 last:border-0"
                                >
                                  <span>{category.category}</span>
                                  <FiChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-colors shrink-0" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <a
                    href="#blogs"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-[16px] font-bold py-1 border-t border-slate-100 pt-3 transition-colors ${
                      activeSection === "blogs"
                        ? "text-brand-blue active"
                        : "text-brand-dark hover:text-brand-blue"
                    }`}
                  >
                    Blogs
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-[16px] font-bold py-1 transition-colors ${
                      activeSection === "contact"
                        ? "text-brand-blue active"
                        : "text-brand-dark hover:text-brand-blue"
                    }`}
                  >
                    Contact
                  </a>
                </nav>

                {/* Mobile Drawer Phone Support Section */}
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <a
                    href="tel:+919876543210"
                    className="flex flex-col p-3 bg-brand-gray rounded-xl hover:bg-brand-light transition-colors"
                  >
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Call Support</span>
                    <span className="text-[14px] font-bold text-brand-dark mt-0.5">
                      +91 98765 43210
                    </span>
                  </a>

                  <a
                    href="#consultation"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center bg-brand-blue hover:bg-opacity-95 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md"
                  >
                    Get Free Consultation
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
