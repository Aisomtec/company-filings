import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import HeroCarousel from "../components/HeroCarousel";
import BlogCard from "../components/BlogCard";
import {
  FiShield,
  FiCheckCircle,
  FiUsers,
  FiTrendingUp,
  FiBriefcase,
  FiFileText,
  FiPercent,
  FiArrowRight,
  FiPhoneCall,
  FiAward,
  FiClock,
  FiStar,
  FiPlus
} from "react-icons/fi";

const CountUpComponent = CountUp.default || CountUp;

const whyChooseUsData = [
  {
    title: "Corporate Documentation",
    description: "Speedy drafting of digital signatures, SPICe+ forms, MOA, AOA, and board resolutions.",
    icon: FiFileText
  },
  {
    title: "Annual ROC Filings",
    description: "Accurate filing of Form AOC-4, MGT-7, Director KYC, and corporate alterations to prevent compliance penalties.",
    icon: FiBriefcase
  },
  {
    title: "Income Tax Returns",
    description: "Expert preparation and filing of corporate and LLP tax returns (ITR-5, ITR-6) with strategic tax planning.",
    icon: FiTrendingUp
  },
  {
    title: "GST Advisory & Filing",
    description: "Hassle-free monthly/quarterly GST return filings (GSTR-1, GSTR-3B) and comprehensive input tax credit (ITC) reconciliations.",
    icon: FiShield
  },
  {
    title: "Corporate Audits & Reports",
    description: "Thorough statutory audits, tax audits, and internal financial reviews conducted by our in-house experts.",
    icon: FiAward
  }
];

const processStepsData = [
  {
    step: "01",
    title: "Free Consultation",
    description: "Understand business requirements and compliance needs.",
    icon: FiPhoneCall
  },
  {
    step: "02",
    title: "Documentation",
    description: "Collect and verify all required documents.",
    icon: FiFileText
  },
  {
    step: "03",
    title: "Application & Filing",
    description: "Prepare and submit applications with authorities.",
    icon: FiBriefcase
  },
  {
    step: "04",
    title: "Review & Approval",
    description: "Track progress and resolve any compliance queries.",
    icon: FiClock
  },
  {
    step: "05",
    title: "Completion & Support",
    description: "Receive certificates and ongoing compliance assistance.",
    icon: FiCheckCircle
  }
];

const categoriesData = [
  {
    title: "Register a Company",
    description: "Business incorporation and registration services.",
    icon: FiBriefcase,
    highlights: ["Private Limited", "LLP", "OPC"],
    href: "#consultation",
    ctaText: "View Services"
  },
  {
    title: "Company filings",
    description: "ROC and compliance management services.",
    icon: FiFileText,
    highlights: ["Annual Filing", "Director KYC", "Share Transfer"],
    href: "#consultation",
    ctaText: "View Services"
  },
  {
    title: "Startup",
    description: "Startup advisory and growth support.",
    icon: FiTrendingUp,
    highlights: ["Startup India", "Fund Raise Advisory", "Capital Structure"],
    href: "#consultation",
    ctaText: "View Services"
  },
  {
    title: "Accounting, Audit and Tax",
    description: "Accounting, audits and taxation support.",
    icon: FiPercent,
    highlights: ["Accounting", "Audit", "Income Tax"],
    href: "#consultation",
    ctaText: "View Services"
  }
];

const featuredServicesData = [
  {
    title: "Private Limited Company Registration",
    description: "End-to-end incorporation support for private limited companies.",
    icon: FiBriefcase,
    href: "#consultation"
  },
  {
    title: "LLP Registration",
    description: "Quick and compliant LLP registration services.",
    icon: FiUsers,
    href: "#consultation"
  },
  {
    title: "Annual ROC Filing",
    description: "Ensure timely compliance with mandatory ROC filings.",
    icon: FiFileText,
    href: "#consultation"
  },
  {
    title: "Startup India Registration",
    description: "Recognition and compliance support for startups.",
    icon: FiTrendingUp,
    href: "#consultation"
  },
  {
    title: "GST Audit",
    description: "Professional GST audit and compliance assistance.",
    icon: FiShield,
    href: "#consultation"
  },
  {
    title: "Income Tax Returns",
    description: "Accurate and timely tax filing services.",
    icon: FiPercent,
    href: "#consultation"
  }
];

const testimonialsData = [
  {
    name: "Amit Sharma",
    role: "Startup Founder",
    initials: "AS",
    content: "Incorporating our tech startup was completely seamless. The CS team handled Startup India registration and board allocations in under 10 days!"
  },
  {
    name: "Sarah D'Souza",
    role: "Private Limited Company Owner",
    initials: "SD",
    content: "We migrated our annual filings to Company Filings last year. Their zero-penalty commitment gives us absolute peace of mind. Outstanding SLA compliance."
  },
  {
    name: "Vikram Malhotra",
    role: "LLP Business Owner",
    initials: "VM",
    content: "LLP setup and subsequent compliance filings were executed flawlessly. Clear pricing, dedicated account managers, and no hidden surprises."
  },
  {
    name: "Priya Nair",
    role: "E-commerce Business",
    initials: "PN",
    content: "Managing GST audits and monthly filings was a headache until we hired them. Highly responsive team of professionals who explain everything clearly."
  },
  {
    name: "Rajesh Patel",
    role: "Consulting Firm",
    initials: "RP",
    content: "Excellent corporate advisory services. They set up our capital structure and drafted shareholder agreements with extreme precision."
  },
  {
    name: "Sanjay Singhania",
    role: "Manufacturer",
    initials: "SS",
    content: "End-to-end statutory and taxation support. Our statutory compliance is always completed ahead of the deadlines. Highly recommended!"
  }
];

const faqData = [
  {
    question: "How long does company registration take?",
    answer: "Private Limited Company incorporation typically takes between 7 to 10 business days. This timeframe is dependent on name approval and government processing times at the Ministry of Corporate Affairs (MCA)."
  },
  {
    question: "What documents are required for LLP registration?",
    answer: "Key requirements include a PAN card, identity proof (Aadhaar, Passport, or Voter ID), bank statements/utility bills as address proof for all partners, along with a registered office address proof (electricity bill, NOC, and rent agreement)."
  },
  {
    question: "Is annual ROC filing mandatory?",
    answer: "Yes, annual ROC filing is completely mandatory for all registered Private Limited companies and LLPs under the Companies Act, even if the business has no active operations, zero turnover, or has not commenced business."
  },
  {
    question: "Can I change my company name later?",
    answer: "Yes, you can change your company name post-incorporation. It requires passing a special resolution in an Extraordinary General Meeting (EGM), seeking availability and approval from the MCA (ROC), and altering your MOA and AOA."
  },
  {
    question: "What is Startup India registration?",
    answer: "Startup India is a flagship government initiative that offers eligible startups benefits such as a 3-year income tax holiday, self-certification under labor laws, relaxed procurement rules, and significant intellectual property filing rebates."
  },
  {
    question: "Do you provide GST compliance support?",
    answer: "Yes, we offer comprehensive GST compliance solutions, including new GST registrations, monthly/quarterly tax filings, GSTR-2B input tax credit reconciliations, annual returns (GSTR-9), and representation for statutory GST audits."
  }
];

const blogsData = [
  {
    title: "Steps to Register a Private Limited Company",
    category: "Registration",
    excerpt: "A comprehensive step-by-step guide to incorporating your Private Limited company including name approval, digital signatures, and SPICe+ form submissions.",
    date: "May 28, 2026",
    isoDate: "2026-05-28",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    href: "#blog-1"
  },
  {
    title: "Annual ROC Filing Requirements Explained",
    category: "Compliance",
    excerpt: "Stay compliant and avoid penalties. Understand mandatory forms, ROC deadlines, statutory audits, and board meetings required for your company.",
    date: "May 24, 2026",
    isoDate: "2026-05-24",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    href: "#blog-2"
  },
  {
    title: "Startup India Registration Benefits",
    category: "Startup",
    excerpt: "Unlock tax holidays, self-certifications, government procurement advantages, and patent rebates by securing Startup India recognition.",
    date: "May 15, 2026",
    isoDate: "2026-05-15",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    href: "#blog-3"
  }
];

export default function Home() {
  const [openFaqIdx, setOpenFaqIdx] = React.useState(null);

  return (
    <>
      {/* HERO CAROUSEL SECTION */}
      <HeroCarousel />

      {/* TRUST & CREDIBILITY STRIP */}
      <section className="bg-white border-y border-slate-100 py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">

            {/* Stat 1 */}
            <div className="group flex flex-col items-center hover:scale-[1.03] transition-transform duration-300 ease-out cursor-default">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight hover:text-slate-700 transition-colors duration-300">
                <CountUpComponent end={500} enableScrollSpy={true} scrollSpyOnce={true} duration={2.5} />
                <span className="text-brand-blue font-extrabold">+</span>
              </span>
              <span className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                Companies Registered
              </span>
            </div>

            {/* Stat 2 */}
            <div className="group flex flex-col items-center hover:scale-[1.03] transition-transform duration-300 ease-out cursor-default">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight hover:text-slate-700 transition-colors duration-300">
                <CountUpComponent end={1000} enableScrollSpy={true} scrollSpyOnce={true} duration={2.5} />
                <span className="text-brand-blue font-extrabold">+</span>
              </span>
              <span className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                Compliance Filings Completed
              </span>
            </div>

            {/* Stat 3 */}
            <div className="group flex flex-col items-center hover:scale-[1.03] transition-transform duration-300 ease-out cursor-default">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight hover:text-slate-700 transition-colors duration-300">
                <CountUpComponent end={98} enableScrollSpy={true} scrollSpyOnce={true} duration={2.5} />
                <span className="text-brand-blue font-extrabold">%</span>
              </span>
              <span className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                Client Satisfaction
              </span>
            </div>

            {/* Stat 4 */}
            <div className="group flex flex-col items-center hover:scale-[1.03] transition-transform duration-300 ease-out cursor-default">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight hover:text-slate-700 transition-colors duration-300">
                <CountUpComponent end={10} enableScrollSpy={true} scrollSpyOnce={true} duration={2.5} />
                <span className="text-brand-blue font-extrabold">+</span>
              </span>
              <span className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                Years Industry Experience
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES SECTION */}
      <section id="services" className="py-12 md:py-14 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Our Services
            </h2>
            <p className="text-3xl font-extrabold text-brand-dark">
              Comprehensive Business Compliance Solutions
            </p>
            <p className="text-slate-600">
              Explore our complete range of company registration, compliance, startup and taxation services.
            </p>
          </div>

          {/* Core Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoriesData.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={index}
                  className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-brand-blue/30 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Category Icon with smooth hover animation */}
                    <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand-blue transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
                      <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors duration-200">
                        {category.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    {/* Service Highlights */}
                    <ul className="space-y-2.5 pt-2 border-t border-slate-100">
                      {category.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                          <FiCheckCircle className="text-brand-blue w-4 h-4 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View Services CTA */}
                  <div className="pt-6 mt-6 border-t border-slate-100/60">
                    <a
                      href={category.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-dark transition-colors duration-200"
                    >
                      <span>{category.ctaText}</span>
                      <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FEATURED SERVICES SECTION */}
      <section id="featured-services" className="py-12 md:py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block">
              Popular Services
            </span>
            <h2 className="text-3xl font-extrabold text-brand-dark">
              Most Requested Business Compliance Services
            </h2>
            <p className="text-slate-600">
              Explore our most frequently requested registration and compliance solutions.
            </p>
          </div>

          {/* Cards Grid with premium stagger entries */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredServicesData.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="group bg-slate-50 border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:bg-white hover:border-brand-blue/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Icon container with bounce hover effect */}
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-blue shadow-sm transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue group-hover:scale-105">
                      <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors duration-250">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Learn More CTA */}
                  <div className="pt-6 mt-6 border-t border-slate-200/40">
                    <a
                      href={service.href}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-brand-blue hover:text-brand-dark transition-colors duration-250"
                    >
                      <span>LEARN MORE</span>
                      <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section id="why-choose-us" className="py-12 md:py-14 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Side: Professional visual with smooth bounce-in from left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              {/* Decorative Frame */}
              <div className="absolute inset-0 bg-brand-blue/5 rounded-2xl -rotate-2 transform scale-105 z-0" />
              <img 
                src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=1000&q=80" 
                alt="Corporate Compliance Documentation Workspace" 
                className="relative w-full h-[460px] object-cover rounded-2xl shadow-md border border-slate-200 z-10"
              />
            </motion.div>

            {/* Right Side: Header and Feature List with slide-up from bottom */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Header */}
              <div className="space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block">
                  Our Expertise
                </span>
                <h3 className="text-3xl font-extrabold text-brand-dark leading-tight">
                  Comprehensive Corporate Filings & Compliance Support
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Providing reliable end-to-end secretarial, audit, and tax filing solutions tailored for Indian companies and LLPs.
                </p>
              </div>

              {/* Feature List (Mapped Array) */}
              <div className="space-y-5 pt-4">
                {whyChooseUsData.map((feature, idx) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="group flex gap-4 items-start hover:scale-[1.01] transition-transform duration-200 cursor-default"
                    >
                      {/* Feature Icon Container with dynamic flip */}
                      <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                        <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-dark group-hover:text-brand-blue transition-colors duration-200">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="process" className="py-12 md:py-14 bg-brand-gray border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block">
              How It Works
            </span>
            <h3 className="text-3xl font-extrabold text-brand-dark">
              Simple Process. Professional Execution.
            </h3>
            <p className="text-slate-600">
              Our streamlined process ensures your registration and compliance requirements are completed efficiently and accurately.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="relative mt-12 md:mt-16">

            {/* Desktop Horizontal Line */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-slate-200 via-brand-blue/30 to-slate-200 z-0" />

            {/* Mobile Vertical Line */}
            <div className="lg:hidden absolute left-[20px] sm:left-[24px] top-6 bottom-6 w-[2px] bg-slate-200 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
              {processStepsData.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.12 }}
                    className="flex flex-row lg:flex-col gap-4 lg:gap-5 items-start lg:items-center text-left lg:text-center group"
                  >
                    {/* Circle Badge and Icon */}
                    <div className="relative shrink-0">
                      {/* Outer Ring hover pulse */}
                      <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 rounded-full scale-125 transition-all duration-300 z-0" />

                      {/* Main Icon Circle */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white border-2 border-slate-200/80 flex items-center justify-center text-brand-blue shadow-sm relative z-10 transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue group-hover:scale-105">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      {/* Overlapping Number Badge */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-sky-50 border-2 border-white flex items-center justify-center text-brand-blue text-[10px] sm:text-xs font-black shadow-sm z-20 transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue group-hover:scale-110">
                        <span className="leading-none select-none">{step.step}</span>
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className="space-y-1 sm:space-y-2 lg:pt-2">
                      <div className="flex flex-col lg:items-center">
                        <h4 className="font-bold text-base sm:text-lg text-brand-dark group-hover:text-brand-blue transition-colors duration-250">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* STATISTICS & ACHIEVEMENTS SECTION */}
      <section id="statistics" className="py-16 md:py-18 bg-brand-dark text-white relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-400 block">
              Our Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Helping Businesses Stay Compliant and Grow
            </h2>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 text-center">

            {/* Stat 1 */}
            <div className="group flex flex-col items-center hover:scale-[1.03] transition-transform duration-300 ease-out cursor-default">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white transition-colors duration-300">
                <CountUpComponent end={500} enableScrollSpy={true} scrollSpyOnce={true} duration={2.5} />
                <span className="text-sky-400 font-extrabold">+</span>
              </span>
              <span className="mt-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 max-w-[200px]">
                Companies Registered
              </span>
            </div>

            {/* Stat 2 */}
            <div className="group flex flex-col items-center hover:scale-[1.03] transition-transform duration-300 ease-out cursor-default">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white transition-colors duration-300">
                <CountUpComponent end={1000} enableScrollSpy={true} scrollSpyOnce={true} duration={2.5} />
                <span className="text-sky-400 font-extrabold">+</span>
              </span>
              <span className="mt-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 max-w-[200px]">
                Compliance Filings Completed
              </span>
            </div>

            {/* Stat 3 */}
            <div className="group flex flex-col items-center hover:scale-[1.03] transition-transform duration-300 ease-out cursor-default">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white transition-colors duration-300">
                <CountUpComponent end={98} enableScrollSpy={true} scrollSpyOnce={true} duration={2.5} />
                <span className="text-sky-400 font-extrabold">%</span>
              </span>
              <span className="mt-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 max-w-[200px]">
                Client Satisfaction
              </span>
            </div>

            {/* Stat 4 */}
            <div className="group flex flex-col items-center hover:scale-[1.03] transition-transform duration-300 ease-out cursor-default">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white transition-colors duration-300">
                <CountUpComponent end={10} enableScrollSpy={true} scrollSpyOnce={true} duration={2.5} />
                <span className="text-sky-400 font-extrabold">+</span>
              </span>
              <span className="mt-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 max-w-[200px]">
                Years Industry Experience
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-12 md:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="space-y-6">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                About Company Filings
              </h2>
              <h3 className="text-3xl font-extrabold text-brand-dark leading-tight">
                High-Trust Corporate Secretarial & Compliance Council
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Founded by senior Company Secretaries and Chartered Accountants, Company Filings is built to remove compliance stress for fast-growing companies and startups. We represent your interest in front of the Registrar of Companies (ROC), Ministry of Corporate Affairs (MCA), and GST authorities.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <FiCheckCircle className="text-brand-blue w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-brand-dark">Zero Penalty Commitment</h4>
                    <p className="text-sm text-slate-500">We track deadlines proactively and assume full financial responsibility for any delay penalties incurred under our watch.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <FiCheckCircle className="text-brand-blue w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-brand-dark">Secure Client Portal</h4>
                    <p className="text-sm text-slate-500">Secure cloud repository storing all your MOA, AOA, Certificate of Incorporation, and board resolutions with bank-grade encryption.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 grid grid-cols-2 gap-8 text-center">
              <div className="space-y-2 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <FiUsers className="w-6 h-6 text-brand-blue mx-auto" />
                <div className="text-3xl font-extrabold text-brand-dark">100%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">CA & CS In-House Staff</div>
              </div>

              <div className="space-y-2 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <FiTrendingUp className="w-6 h-6 text-brand-blue mx-auto" />
                <div className="text-3xl font-extrabold text-brand-dark">&lt; 24h</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Average SLA Turnaround</div>
              </div>

              <div className="space-y-2 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <FiShield className="w-6 h-6 text-brand-blue mx-auto" />
                <div className="text-3xl font-extrabold text-brand-dark">99.9%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Client Retention Rate</div>
              </div>

              <div className="space-y-2 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <FiCheckCircle className="w-6 h-6 text-brand-blue mx-auto" />
                <div className="text-3xl font-extrabold text-brand-dark">12 Years</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Industry Advisory Experience</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-12 md:py-14 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block">
              Client Testimonials
            </span>
            <h2 className="text-3xl font-extrabold text-brand-dark">
              What Our Clients Say
            </h2>
            <p className="text-slate-600">
              Businesses across industries trust us for their registration, compliance and taxation requirements.
            </p>
          </div>

          {/* Testimonial Cards Grid with stagger entries */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="group bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-brand-blue/20 hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative Quote Mark */}
                <span className="absolute -top-2 right-4 text-brand-blue/5 text-8xl font-black select-none pointer-events-none font-sans leading-none">
                  &ldquo;
                </span>

                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-sm text-slate-600 leading-relaxed italic relative z-10">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* User Avatar & Identity Info */}
                <div className="flex gap-3 items-center pt-6 mt-6 border-t border-slate-100 shrink-0">
                  {/* Client Avatar Container */}
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 border border-brand-blue/15 flex items-center justify-center text-brand-blue font-bold text-xs uppercase shrink-0 transition-transform duration-300 group-hover:scale-105">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-dark group-hover:text-brand-blue transition-colors duration-200">
                      {testimonial.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-semibold tracking-wide mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* LATEST INSIGHTS (BLOGS) */}
      <section id="blogs" className="py-12 md:py-14 bg-brand-gray border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block">
              Latest Insights
            </span>
            <h2 className="text-3xl font-extrabold text-brand-dark">
              Business Compliance & Startup Resources
            </h2>
            <p className="text-slate-600">
              Stay updated with the latest registration, compliance, taxation and startup guidance.
            </p>
          </div>

          {/* Blog Cards Grid with stagger entries */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogsData.map((blog, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
              >
                <BlogCard {...blog} />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <a
              href="#blogs"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-white border border-slate-200 text-brand-blue hover:bg-brand-blue hover:text-white hover:border-brand-blue rounded-lg text-sm font-bold shadow-sm transition-all duration-300 hover:scale-[1.02]"
            >
              <span>View All Blogs</span>
              <FiArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* FAQ PREVIEW SECTION */}
      <section id="faq" className="py-12 md:py-14 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center space-y-4 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-brand-dark">
              Common Questions About Business Compliance
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Find answers to the most frequently asked questions regarding registration, filings and taxation services.
            </p>
          </div>

          {/* Accordion List with dynamic reveal */}
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFaqIdx === index;
              return (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200/60 rounded-xl overflow-hidden transition-colors duration-300 hover:bg-white hover:border-brand-blue/30"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : index)}
                    className="flex justify-between items-center w-full px-6 py-5 text-left font-bold text-sm sm:text-base text-brand-dark transition-colors duration-200 hover:text-brand-blue focus:outline-none group select-none"
                  >
                    <span>{faq.question}</span>
                    <span className={`shrink-0 ml-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-all duration-300 ${isOpen ? 'bg-brand-blue border-brand-blue text-white' : ''}`}>
                      <FiPlus className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                    </span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-200/40 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <a
              href="#faq"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-brand-light text-brand-blue hover:bg-brand-blue hover:text-white rounded-lg text-sm font-bold shadow-sm transition-all duration-300 hover:scale-[1.02]"
            >
              <span>View All FAQs</span>
              <FiArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* FREE CONSULTATION FORM */}
      {/* <section id="consultation" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <FiPhoneCall className="w-10 h-10 text-brand-blue mx-auto" />
            <h2 className="text-3xl font-extrabold text-brand-dark">
              Get a Free Consultation
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Leave your business requirements and contact details below. A senior chartered accountant or company secretary will contact you within 2 business hours.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Our senior compliance specialist will connect with you within 2 business hours.'); }} className="space-y-6 bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullname" className="block text-sm font-bold text-brand-dark mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-blue"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-brand-dark mb-2">
                  Business Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-brand-dark mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  placeholder="Enter your mobile number"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-blue"
                />
              </div>
              
              <div>
                <label htmlFor="interest" className="block text-sm font-bold text-brand-dark mb-2">
                  Interested Service
                </label>
                <select
                  id="interest"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-blue"
                >
                  <option>Company Incorporation</option>
                  <option>Annual ROC Filings</option>
                  <option>Director KYC / Board Addition</option>
                  <option>Startup India Registration</option>
                  <option>Statutory & Tax Audit</option>
                  <option>Accounting & GST Returns</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-bold text-brand-dark mb-2">
                Tell us about your business or requirement (Optional)
              </label>
              <textarea
                id="notes"
                rows="4"
                placeholder="Provide any details that will help our CAs/CS understand your query better..."
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-blue"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-blue hover:bg-opacity-95 text-white font-bold py-3.5 rounded-lg shadow-md transition-colors"
            >
              Submit Consultation Request
            </button>
          </form>
        </div>
      </section> */}
    </>
  );
}
