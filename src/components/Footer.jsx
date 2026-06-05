import React from "react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiShield,
  FiUsers,
  FiAward,
  FiArrowRight,
  FiChevronRight,
} from "react-icons/fi";

// ─── Data ────────────────────────────────────────────────────────────────────

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const servicesCategories = [
  { label: "Register a Company", href: "/#services" },
  { label: "Company filings", href: "/#services" },
  { label: "Startup", href: "/#services" },
  { label: "Accounting, Audit and Tax", href: "/#services" },
];

const contactDetails = [
  {
    icon: <FiMapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />,
    content: "Mumbai, India",
    type: "text",
  },
  {
    icon: <FiPhone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />,
    content: "+91 98765 43210",
    href: "tel:+919876543210",
    type: "link",
  },
  {
    icon: <FiMail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />,
    content: "support@companyfilings.com",
    href: "mailto:support@companyfilings.com",
    type: "link",
  },
  {
    icon: <FiClock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />,
    content: "Mon – Sat: 9:00 AM – 7:00 PM IST",
    type: "text",
  },
];



// ─── Reusable Sub-Components ─────────────────────────────────────────────────

function FooterHeading({ children }) {
  return (
    <h3 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-5 pb-2 border-b border-slate-200">
      {children}
    </h3>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <a
        href={href}
        className="group flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors duration-200"
      >
        <FiChevronRight className="w-3 h-3 text-blue-400/60 group-hover:text-blue-600 transition-colors duration-200 shrink-0" />
        {children}
      </a>
    </li>
  );
}

// ─── Main Footer Component ───────────────────────────────────────────────────

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-label="Site Footer"
      className="bg-slate-50 text-slate-800 font-sans border-t border-slate-200"
    >
      {/* ── Top accent bar ─────────────────────────────────────── */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700" />

      {/* ── Main Content Grid ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">

        {/* Brand + Description row at top of grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* ─── Col 0: Brand Description ──────────────────────── */}
          <div className="lg:col-span-3 space-y-5">
            {/* Logo */}
            <a href="/" className="inline-flex flex-col group focus:outline-none">
              <span className="text-2xl font-extrabold tracking-tight uppercase leading-none">
                <span className="text-blue-600 group-hover:text-blue-500 transition-colors">
                  Company
                </span>{" "}
                <span className="text-slate-800">Filings</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mt-1">
                Corporate Compliance Experts
              </span>
            </a>

            <p className="text-sm text-slate-500 leading-relaxed">
              India's most trusted corporate secretarial and ROC compliance partner.
              We handle incorporations, annual filings, statutory audits, and taxation
              — so you can focus on growing your business.
            </p>

          </div>

          {/* ─── Col 1: Quick Links ─────────────────────────────── */}
          <div className="lg:col-span-3">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* ─── Col 2: Services ───────────────────────────────── */}
          <div className="lg:col-span-3">
            <FooterHeading>Services</FooterHeading>
            <ul className="space-y-3">
              {servicesCategories.map((cat) => (
                <FooterLink key={cat.label} href={cat.href}>
                  {cat.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* ─── Col 4: Contact Information ─────────────────────── */}
          <div className="lg:col-span-3">
            <FooterHeading>Contact Information</FooterHeading>
            <ul className="space-y-4">
              {contactDetails.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  {item.icon}
                  {item.type === "link" ? (
                    <a
                      href={item.href}
                      className="text-sm text-slate-500 hover:text-blue-600 transition-colors duration-200"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <span className="text-sm text-slate-500">{item.content}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-slate-200" />
      </div>

      {/* ── Bottom Bar ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-slate-400 text-center md:text-left">
            &copy; {currentYear}{" "}
            <span className="text-slate-600 font-semibold">
              Company Filings
            </span>{" "}
            All rights reserved.
          </p>

          {/* Design & Development Credit */}
          <p className="text-xs text-slate-400 text-center">
            Design &amp; Developed by{" "}
            <a
              href="https://www.aisomtec.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold hover:underline"
            >
              Aisomtec
            </a>{" "}
            💙
          </p>

          {/* Legal Links */}
          <nav
            aria-label="Legal links"
            className="flex items-center gap-1 text-xs text-slate-400"
          >
            <a
              href="#privacy"
              className="px-3 py-1 rounded hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              Privacy Policy
            </a>
            <span className="text-slate-300 select-none">·</span>
            <a
              href="#terms"
              className="px-3 py-1 rounded hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              Terms &amp; Conditions
            </a>
            <span className="text-slate-300 select-none">·</span>
            <a
              href="#disclaimer"
              className="px-3 py-1 rounded hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              Legal Disclaimer
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
