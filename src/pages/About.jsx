import React from "react";
import { motion } from "framer-motion";
import { useImages } from "../context/ImageContext";
import {
  FiShield,
  FiCheckCircle,
  FiUsers,
  FiTrendingUp,
  FiBriefcase,
  FiFileText,
  FiArrowRight,
  FiAward,
  FiTarget,
  FiEye,
  FiZap,
  FiCpu,
  FiShoppingBag,
  FiMessageSquare,
  FiPackage,
  FiHeart,
  FiBookOpen,
  FiPercent,
  FiPhoneCall
} from "react-icons/fi";

export default function About() {
  const { getImageUrl } = useImages();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Section 4 Values
  const valuesData = [
    {
      title: "Integrity",
      description: "Transparent and ethical business practices.",
      icon: FiShield,
    },
    {
      title: "Accuracy",
      description: "Attention to detail in every filing and compliance process.",
      icon: FiCheckCircle,
    },
    {
      title: "Client Focus",
      description: "Building long-term relationships through dependable support.",
      icon: FiUsers,
    },
    {
      title: "Continuous Improvement",
      description: "Adapting to evolving regulations and business needs.",
      icon: FiTrendingUp,
    },
  ];

  // Section 5 Features
  const featuresData = [
    {
      title: "Experienced Professionals",
      description: "Our in-house staff is comprised 100% of certified Company Secretaries, Chartered Accountants, and corporate legal advisors.",
      icon: FiAward,
    },
    {
      title: "Dedicated Compliance Support",
      description: "You receive a single point of contact who understands your business structure and monitors your filing timeline.",
      icon: FiUsers,
    },
    {
      title: "Transparent Pricing",
      description: "Flat, fixed pricing on all standard compliance operations with zero hidden administrative fees or surprise charges.",
      icon: FiPercent,
    },
    {
      title: "Timely Service Delivery",
      description: "Strict SLA compliance backed by our proactive deadlines tracking to assure zero delay penalty filings.",
      icon: FiCheckCircle,
    },
    {
      title: "Startup-Friendly Guidance",
      description: "Customized mentorship packages helping early-stage founders with equity structuring, mentor shares, and seed round prep.",
      icon: FiZap,
    },
    {
      title: "End-to-End Business Solutions",
      description: "A complete platform covering entity incorporation, ROC filings, book-keeping, statutory audits, and income tax returns.",
      icon: FiBriefcase,
    },
  ];

  // Section 6 Industries
  const industriesData = [
    { name: "Startups", icon: FiZap, color: "text-amber-500 bg-amber-50" },
    { name: "Technology", icon: FiCpu, color: "text-blue-500 bg-blue-50" },
    { name: "E-Commerce", icon: FiShoppingBag, color: "text-emerald-500 bg-emerald-50" },
    { name: "Consulting", icon: FiMessageSquare, color: "text-purple-500 bg-purple-50" },
    { name: "Manufacturing", icon: FiPackage, color: "text-orange-500 bg-orange-50" },
    { name: "Professional Services", icon: FiBriefcase, color: "text-sky-500 bg-sky-50" },
    { name: "Healthcare", icon: FiHeart, color: "text-rose-500 bg-rose-50" },
    { name: "Education", icon: FiBookOpen, color: "text-indigo-500 bg-indigo-50" },
  ];

  // Section 7 Steps
  const approachSteps = [
    {
      step: "01",
      title: "Understand Requirements",
      description: "We audit your current company setup and map out all immediate secretarial, tax, and licensing compliance gaps.",
    },
    {
      step: "02",
      title: "Plan Compliance Strategy",
      description: "Our experts design an annual custom compliance calendar configured specifically to prevent structural filing defaults.",
    },
    {
      step: "03",
      title: "Execute Documentation",
      description: "Our in-house CS professionals draft precise SPICe+ applications, board resolutions, MOAs, and AOAs.",
    },
    {
      step: "04",
      title: "Manage Filings",
      description: "We secure direct submissions and handle liaison loops with the MCA, ROC, GST Council, and CBDT department.",
    },
    {
      step: "05",
      title: "Provide Ongoing Support",
      description: "Gain continuous compliance tracking, dynamic updates on regulatory shifts, and prompt professional advisory support.",
    },
  ];

  return (
    <div className="font-sans antialiased text-brand-dark">
      {/* ─── SECTION 1: Page Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-brand-dark text-white border-b border-slate-800">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={getImageUrl("About Page Hero Background", "/about-hero.avif")}
            alt="Corporate boardroom"
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
            About Us
          </motion.h1>
        </div>
      </section>

      {/* ─── SECTION 2: Company Overview ─────────────────────────────── */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Professional Corporate Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-6 relative"
            >
              <div className="absolute inset-0 bg-brand-blue/5 rounded-2xl rotate-2 transform scale-105 z-0" />
              <img
                src={getImageUrl("About Page Corporate Overview Section", "/overview.avif")}
                alt="Professional Business Compliance Consultation Boardroom"
                className="relative w-full h-[380px] sm:h-[460px] object-cover rounded-2xl shadow-lg border border-slate-100 z-10 transition-transform duration-500 hover:scale-[1.01]"
              />
            </motion.div>

            {/* Right: Content Blocks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="lg:col-span-6 space-y-6"
            >
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block mb-2">
                  Company Overview
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
                  Your Trusted Compliance Partner
                </h2>
              </div>

              {/* 3 Concise Content Blocks */}
              <div className="space-y-6 pt-2">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue shrink-0">
                    <FiAward className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-base">Expert Advisory Board</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      Founded and directed by senior Company Secretaries and seasoned Chartered Accountants, we bring profound regulatory expertise to ensure your filings strictly abide by CBDT, MCA, and GST guidelines.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue shrink-0">
                    <FiZap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-base">Built for Startups, SMEs & Growing Enterprises</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      Whether you are an early-stage venture seeking incorporation and mentor equity structures, or an established company shifting registered offices, we deliver tailored, scalable advisory and compliance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue shrink-0">
                    <FiShield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-base">Commitment to Accuracy & Trust</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      We believe in zero-default governance. We assume total accountability for tracking legal deadlines proactively, fostering secure long-term partnerships built entirely on precision and high-trust.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Mission & Vision ─────────────────────────────── */}
      <section className="py-10 md:py-12 bg-brand-gray border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-8 md:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shadow-inner">
                  <FiTarget className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-brand-dark">Our Mission</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Helping businesses achieve compliance through transparent, efficient and expert-driven services. We aim to take regulatory stress completely off your shoulders, allowing you to scale with absolute confidence.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-8 md:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shadow-inner">
                  <FiEye className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-brand-dark">Our Vision</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Becoming a trusted partner for businesses seeking long-term compliance, growth and governance support. We strive to set the industry standard for integrity and efficiency in corporate secretarial services.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 4: Core Values ───────────────────────────────────── */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Core Values
            </span>
            <h2 className="text-3xl font-extrabold text-brand-dark">
              What Drives Us
            </h2>
            <p className="text-slate-500 text-sm">
              Our cultural cornerstones define how we interact with our clients, verify documentation, and engage with regulatory departments.
            </p>
          </div>

          {/* 4-column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuesData.map((val, idx) => {
              const ValueIcon = val.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white border border-slate-200/70 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-brand-blue/20 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
                >
                  <div className="w-11 h-11 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue mb-4 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    <ValueIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-brand-dark text-base group-hover:text-brand-blue transition-colors duration-200">
                    {val.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mt-2 font-medium">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Why Businesses Choose Us ──────────────────────── */}
      <section className="py-10 md:py-12 bg-brand-gray border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Feature Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="lg:col-span-7 space-y-6"
            >
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block mb-2">
                  Our Advantage
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
                  Why Clients Trust Our Expertise
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-4">
                {featuresData.map((feat, idx) => {
                  const FeatIcon = feat.icon;
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="flex gap-3 items-start group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue shadow-sm transition-all duration-300">
                        <FeatIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-dark text-sm group-hover:text-brand-blue transition-colors duration-200">
                          {feat.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column: Office Facade Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute inset-0 bg-brand-blue/5 rounded-2xl -rotate-2 transform scale-105 z-0" />
              <img
                src={getImageUrl("About Page Company Advantage Section", "/advantage.avif")}
                alt="Corporate Skyscraper Workspace representing stability and trust"
                className="relative w-full h-[460px] object-cover rounded-2xl shadow-md border border-slate-200 z-10 transition-transform duration-500 hover:scale-[1.01]"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Industries We Support ─────────────────────────── */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto space-y-4 mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block">
              Versatility
            </span>
            <h2 className="text-3xl font-extrabold text-brand-dark">
              Serving Businesses Across Industries
            </h2>
            <p className="text-slate-500 text-sm">
              From fast-scaling IT platforms and high-volume e-commerce portals to local consulting firms and manufacturers, our expert services scale with your industry regulatory guidelines.
            </p>
          </div>

          {/* Clean badge-style responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {industriesData.map((ind, idx) => {
              const IndIcon = ind.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white border border-slate-200/70 hover:border-brand-blue/20 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center gap-3.5"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ind.color} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
                    <IndIcon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-brand-dark text-xs uppercase tracking-wide group-hover:text-brand-blue transition-colors">
                    {ind.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: Our Approach ──────────────────────────────────── */}
      <section className="py-10 md:py-12 bg-brand-gray border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block">
              Our Methodology
            </span>
            <h2 className="text-3xl font-extrabold text-brand-dark">
              Our Client-Centric Approach
            </h2>
            <p className="text-slate-500 text-sm">
              We replace complex paperwork and bureaucracy with an incredibly transparent, linear filing workflow that keeps you fully in control.
            </p>
          </div>

          {/* Process Flow Layout */}
          <div className="relative mt-12">
            
            {/* Connector Line for Desktop */}
            <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-slate-200 via-brand-blue/30 to-slate-200 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
              {approachSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white lg:bg-transparent border border-slate-200/60 lg:border-0 rounded-2xl p-6 lg:p-0 flex flex-row lg:flex-col gap-4 lg:gap-5 items-start lg:items-center text-left lg:text-center group shadow-sm lg:shadow-none"
                >
                  
                  {/* Step Badge */}
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 rounded-full scale-125 transition-all duration-300 z-0" />
                    
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white border-2 border-slate-200/80 flex items-center justify-center text-brand-blue font-black text-sm lg:text-base shadow-sm relative z-10 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-all duration-300">
                      {step.step}
                    </div>
                  </div>

                  {/* Step Description */}
                  <div className="space-y-1.5 pt-1 lg:pt-0">
                    <h4 className="font-bold text-base text-brand-dark group-hover:text-brand-blue transition-colors duration-250">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: Leadership Message ───────────────────────────── */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-6 bg-slate-50 border border-slate-200/70 rounded-3xl p-8 md:p-14 shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto text-brand-blue text-lg font-bold">
              CF
            </div>
            
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block">
              Leadership Message
            </span>
            
            <h2 className="text-3xl font-extrabold text-brand-dark leading-tight">
              Committed to Helping Businesses Succeed
            </h2>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed italic max-w-2xl mx-auto">
              "In a rapidly evolving regulatory landscape, businesses deserve absolute compliance peace of mind. We founded Company Filings to bridge the gap between regulatory complexities and business growth. By acting as your dedicated corporate advisory and compliance council, we enable founders and CEOs to focus entirely on scale, knowing that governance and accuracy are flawlessly managed. We are committed to integrity, execution excellence, and your long-term success."
            </p>

            <div className="pt-4 border-t border-slate-200 max-w-xs mx-auto">
              <span className="block font-bold text-brand-dark text-sm">Ankit Parekh</span>
              <span className="block text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Founders, Company Filings</span>
              
              {/* Premium Handwritten SVG Signature Representation */}
              <svg 
                className="w-40 h-10 text-brand-blue/60 mx-auto mt-4 shrink-0 transition-opacity duration-300 hover:opacity-100" 
                viewBox="0 0 200 60" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 38c12-8 25-18 42-12s8 18 20 8 18-20 28-2 8 20 22 5 15-28 25-10" />
                <path d="M35 22c15-4 30-10 40-5" />
              </svg>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── SECTION 9: Call To Action ───────────────────────────────── */}
      <section className="relative py-12 md:py-14 bg-brand-dark text-white overflow-hidden">
        {/* Visual background glow to mirror the homepage dark statistics bar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Ready to Simplify Your Business Compliance?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Let our experts assist you with registrations, filings, taxation and business advisory services.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-blue hover:bg-opacity-95 text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-200 shadow-md hover:scale-[1.02]"
            >
              Get Free Consultation
            </a>
            <a
              href="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            >
              Contact Us
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
