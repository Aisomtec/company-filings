import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useImages } from "../context/ImageContext";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiAward,
  FiPercent,
  FiUsers,
  FiZap,
  FiBriefcase,
  FiFileText,
  FiCheckCircle,
  FiPlus,
  FiMinus,
  FiPhoneCall,
  FiArrowRight
} from "react-icons/fi";

export default function Contact() {
  const { getImageUrl } = useImages();
  // Form State for API-readiness
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    serviceCategory: "",
    subService: "",
    message: ""
  });

  const servicesMap = {
    "Company Registration": [
      "Private Limited Incorporation",
      "LLP Registration",
      "One Person Company (OPC) Setup"
    ],
    "Company Filings": [
      "Annual ROC Filing (Form AOC-4 / MGT-7)",
      "Director KYC & Active Status",
      "MOA & AOA Alterations"
    ],
    "Startup Services": [
      "Startup India Registration",
      "Capital Structure & Equity Advisory",
      "Shareholders Agreements (SHA)"
    ],
    "Accounting & Tax Services": [
      "Bookkeeping & Ledger Setup",
      "Statutory & Tax Auditing",
      "Income Tax & GST Return Filings"
    ]
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Accordion FAQ State (Only one item open at a time)
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // Form Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "serviceCategory") {
        next.subService = "";
      }
      return next;
    });

    // Clear error message when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
    if (name === "serviceCategory") {
      setErrors((prev) => ({
        ...prev,
        subService: ""
      }));
    }
  };

  // Form Validation
  const validateForm = () => {
    const tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Full Name is required";
    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phoneNumber.trim())) {
      tempErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!formData.emailAddress.trim()) {
      tempErrors.emailAddress = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())) {
      tempErrors.emailAddress = "Please enter a valid email address";
    }
    if (!formData.serviceCategory) {
      tempErrors.serviceCategory = "Please select a service category";
    }
    if (formData.serviceCategory && !formData.subService) {
      tempErrors.subService = "Please select a specific service";
    }
    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Form Submit Handler (structured for future PHP backend API integration)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API integration delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        fullName: "",
        phoneNumber: "",
        emailAddress: "",
        serviceCategory: "",
        subService: "",
        message: ""
      });
      // Clear success modal after a delay
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  // Standard Scroll helper
  const scrollToForm = (e) => {
    e.preventDefault();
    const element = document.getElementById("inquiry-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Section 2: Cards Data
  const contactCards = [
    {
      title: "Phone",
      info: "+91 98765 43210",
      description: "Speak directly with our compliance experts.",
      icon: FiPhone,
      action: "tel:+919876543210"
    },
    {
      title: "Email",
      info: "support@companyfilings.com",
      description: "Send your requirements anytime.",
      icon: FiMail,
      action: "mailto:support@companyfilings.com"
    },
    {
      title: "Office Address",
      info: "Mumbai, India",
      description: "Visit our office during business hours.",
      icon: FiMapPin,
      action: "#location"
    },
    {
      title: "Business Hours",
      info: "Mon – Sat: 9:00 AM – 7:00 PM IST",
      description: "Monday to Saturday availability.",
      icon: FiClock,
      action: null
    }
  ];

  // Section 4: Why Choose Us Data
  const whyChooseUsData = [
    {
      title: "Experienced Compliance Professionals",
      description: "Managed by certified Company Secretaries, Chartered Accountants, and legal advisors ensuring zero errors.",
      icon: FiAward
    },
    {
      title: "Transparent Pricing",
      description: "Flat compliance fees, complete upfront estimates, and zero hidden or surprise administrative fees.",
      icon: FiPercent
    },
    {
      title: "Dedicated Support",
      description: "Get assigned a single point-of-contact compliance manager tracking all filings and ROC deadlines.",
      icon: FiUsers
    },
    {
      title: "Fast Response Time",
      description: "Guaranteed initial call-back within 2 hours and rapid document processing SLAs.",
      icon: FiZap
    },
    {
      title: "End-to-End Assistance",
      description: "From entity creation and structural capital advisory to annual audits and monthly tax returns.",
      icon: FiBriefcase
    },
    {
      title: "Accurate Documentation",
      description: "High-precision preparation of SPICe+ applications, MoAs, AoAs, board declarations, and filings.",
      icon: FiFileText
    }
  ];

  // Section 5: Services Data
  const serviceCategories = [
    {
      title: "Company Registration",
      description: "Incorporate your business entity legally and securely with MCA and ROC.",
      services: ["Private Limited Incorporation", "LLP Registration", "One Person Company (OPC) Setup"],
      icon: FiBriefcase
    },
    {
      title: "Company Filings",
      description: "Maintain seamless compliance and avoid corporate defaults or filing penalties.",
      services: ["Annual ROC Filing (Form AOC-4 / MGT-7)", "Director KYC & Active Status", "MOA & AOA Alterations"],
      icon: FiFileText
    },
    {
      title: "Startup Services",
      description: "Scale your business with structural growth advisory and funding compliances.",
      services: ["Startup India Registration", "Capital Structure & Equity Advisory", "Shareholders Agreements (SHA)"],
      icon: FiZap
    },
    {
      title: "Accounting & Tax Services",
      description: "Accurate corporate ledger upkeep and federal tax filing operations.",
      services: ["Bookkeeping & Ledger Setup", "Statutory & Tax Auditing", "Income Tax & GST Return Filings"],
      icon: FiPercent
    }
  ];

  // Section 7: FAQs Data
  const faqData = [
    {
      question: "How quickly can I expect a response?",
      answer: "We guarantee a call-back or direct response from a compliance specialist within 2 hours of submitting your requirements during our standard working hours (9:00 AM to 7:00 PM IST, Monday to Saturday)."
    },
    {
      question: "What information should I provide?",
      answer: "To help us offer a highly accurate initial consultation, please provide your basic business entity idea, structural requirements (e.g., number of directors/partners), current registration status (if any), and specific services needed (such as incorporation, annual filings, or bookkeeping)."
    },
    {
      question: "Can consultations be conducted remotely?",
      answer: "Yes, 100% of our consulting and document collection operations are conducted securely online. We arrange professional consultations via Phone, Google Meet, or Zoom, eliminating any need for you to visit our physical offices."
    },
    {
      question: "Do you assist businesses across India?",
      answer: "Absolutely. We are a fully digitalized compliance council assisting businesses, founders, LLPs, and enterprises across all states and Union Territories in India. We coordinate directly with the central MCA portal and local Registrar of Companies (ROC) offices nationwide."
    }
  ];

  return (
    <div className="font-sans antialiased text-brand-dark bg-brand-gray">
      {/* ─── SECTION 1: Contact Hero ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-brand-dark text-white border-b border-slate-800">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={getImageUrl("Contact Page Hero Background", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80")}
            alt="Corporate skyscraper"
            className="w-full h-full object-cover"
          />
          {/* Overlay shade */}
          <div className="absolute inset-0 bg-slate-950/75 z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase"
          >
            Contact Us
          </motion.h1>
        </div>
      </section>

      {/* ─── SECTION 2: Contact Information Cards ───────────────────── */}
      <section className="py-8 md:py-10 bg-brand-gray border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, idx) => {
              const CardIcon = card.icon;
              const hasAction = card.action !== null;

              const CardWrapper = ({ children }) => {
                if (hasAction) {
                  return (
                    <a
                      href={card.action}
                      className="group block bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-brand-blue/20 hover:-translate-y-1 transition-all duration-300 h-full text-left"
                    >
                      {children}
                    </a>
                  );
                }
                return (
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full text-left">
                    {children}
                  </div>
                );
              };

              return (
                <div key={idx} className="h-full">
                  <CardWrapper>
                    <div className="flex flex-col h-full justify-between space-y-4">
                      <div>
                        {/* Card Icon */}
                        <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand-blue mb-4 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                          <CardIcon className="w-5 h-5" />
                        </div>
                        {/* Title */}
                        <h3 className="text-slate-400 text-xs font-extrabold uppercase tracking-wider">
                          {card.title}
                        </h3>
                        {/* Contact Information */}
                        <p className="font-bold text-brand-dark text-sm lg:text-sm mt-1 break-all tracking-tight group-hover:text-brand-blue transition-colors">
                          {card.info}
                        </p>
                      </div>
                      {/* Supporting Description */}
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </CardWrapper>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
      {/* ─── SECTION 5: Service Assistance Section ───────────────────── */}
      <section className="py-10 md:py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block">
              Core Expertise
            </span>
            <h2 className="text-3xl font-extrabold text-brand-dark">
              We Can Help You With
            </h2>
            <p className="text-slate-600 text-sm">
              Review our specialized corporate secretarial division services to identify the ideal category for your legal compliance needs.
            </p>
          </div>

          {/* Grid Layout: 4 responsive cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((cat, idx) => {
              const CatIcon = cat.icon;
              return (
                <div
                  key={idx}
                  className="bg-brand-gray border border-slate-200/70 rounded-2xl p-6 shadow-sm hover:shadow-md hover:bg-white hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-blue shadow-sm shrink-0">
                      <CatIcon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-base font-bold text-brand-dark">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    {/* Bullet list of services */}
                    <ul className="space-y-2 pt-2 border-t border-slate-200/50">
                      {cat.services.map((srv, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-xs font-medium text-slate-600">
                          <FiCheckCircle className="text-brand-blue w-3.5 h-3.5 mt-0.5 shrink-0" />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-200/50">
                    <a
                      href="#inquiry-form"
                      onClick={scrollToForm}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-dark transition-colors"
                    >
                      Request Assistance
                      <FiArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Office Location ──────────────────────────────── */}
      <section id="location" className="py-10 md:py-12 bg-brand-gray border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Corporate Office
            </span>
            <h2 className="text-3xl font-extrabold text-brand-dark">
              Visit Our Office
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Office information */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-8 shadow-sm">
              <div className="space-y-6">
                <h3 className="font-extrabold text-brand-dark text-lg md:text-xl tracking-tight">
                  Company Filings Headquarters
                </h3>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue shrink-0">
                      <FiMapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Office Address</h4>
                      <p className="text-sm font-bold text-brand-dark mt-0.5 leading-relaxed">
                        Maker Chambers V, Nariman Point,<br />
                        Mumbai, Maharashtra 400021, India
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue shrink-0">
                      <FiPhone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Direct Hotline</h4>
                      <p className="text-sm font-bold text-brand-dark mt-0.5">
                        <a href="tel:+919876543210" className="hover:text-brand-blue transition-colors">
                          +91 98765 43210
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue shrink-0">
                      <FiMail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Email Queries</h4>
                      <p className="text-sm font-bold text-brand-dark mt-0.5 break-all">
                        <a href="mailto:support@companyfilings.com" className="hover:text-brand-blue transition-colors">
                          support@companyfilings.com
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue shrink-0">
                      <FiClock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Working Hours</h4>
                      <p className="text-sm font-semibold text-brand-dark mt-0.5">
                        Monday – Saturday: 9:00 AM – 7:00 PM IST
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Consultation Card Footer */}
              <div className="p-4 bg-brand-light rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Looking for a remote meeting?</span>
                <a
                  href="#inquiry-form"
                  onClick={scrollToForm}
                  className="text-brand-blue font-bold hover:underline"
                >
                  Book Virtual Call
                </a>
              </div>
            </div>

            {/* Right: Embedded Google Map Placeholder */}
            <div className="lg:col-span-7 relative min-h-[300px] bg-slate-200 border border-slate-300 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center justify-center text-center p-6 select-none">
              {/* Subtle map pattern lines inside placeholder background */}
              <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-25 z-0" />
              
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-white border border-slate-300 flex items-center justify-center text-brand-blue shadow-md mx-auto">
                  <FiMapPin className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-base">Interactive Map Integration</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                    Marker Chambers V, Nariman Point, Mumbai. Live Google Map API integration will be activated post-deployment.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    
      {/* ─── SECTION 8: Final Call To Action ─────────────────────────── */}
      <section className="relative py-12 md:py-14 bg-brand-dark text-white overflow-hidden">
        {/* Visual background glow to mirror standard footer designs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Need Expert Guidance for Your Business Compliance?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect with our team and receive professional assistance tailored to your business needs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#inquiry-form"
              onClick={scrollToForm}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-blue hover:bg-opacity-95 text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-200 shadow-md hover:scale-[1.02] cursor-pointer"
            >
              Request Consultation
            </a>
            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <FiPhone className="mr-2 w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
