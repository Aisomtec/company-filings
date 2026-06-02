import React from "react";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiTrendingUp,
  FiPercent
} from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slidesData = [
 
  {
    id: 2,
    badge: "ROC Compliance & Filings",
    badgeIcon: FiFileText,
    heading: "Stay Compliant with Expert Filing Support",
    subheading: "Annual ROC Filings, Director KYC, Share Transfers, Name Changes and Compliance Management.",
    primaryBtn: { text: "Get Started", href: "#consultation" },
    secondaryBtn: { text: "View Filing Services", href: "#services" },
    trustHighlights: ["ROC Experts", "Compliance Focused", "Dedicated Support"],
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 3,
    badge: "Startup Growth Advisory",
    badgeIcon: FiTrendingUp,
    heading: "Launch and Scale Your Startup Successfully",
    subheading: "Startup India Registration, Fund Raise Advisory, Capital Structure Planning and Founder Support.",
    primaryBtn: { text: "Speak with an Expert", href: "#consultation" },
    secondaryBtn: { text: "Explore Startup Services", href: "#services" },
    trustHighlights: ["Startup Focused", "Investor Ready Guidance", "Long-Term Advisory"],
    bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 4,
    badge: "Accounting, Audit & Tax",
    badgeIcon: FiPercent,
    heading: "Simplify Your Accounting and Tax Compliance",
    subheading: "Accounting, Audits, GST Services and Income Tax Return Support.",
    primaryBtn: { text: "Request Consultation", href: "#consultation" },
    secondaryBtn: { text: "View Tax Services", href: "#services" },
    trustHighlights: ["Qualified Experts", "Audit Ready", "End-to-End Compliance"],
    bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
  }
];

// Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// SlideContent Sub-component to manage active state animations
function SlideContent({ slide }) {
  const swiperSlide = useSwiperSlide();
  const isActive = swiperSlide.isActive;
  const BadgeIcon = slide.badgeIcon;

  return (
    <div className="relative w-full flex items-center z-10">
      {/* Centered container, left-aligned content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          className="max-w-[600px] text-white space-y-4 pt-6"
        >
          {/* Small service category badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 backdrop-blur-md"
          >
            <BadgeIcon className="text-brand-blue w-4 h-4 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              {slide.badge}
            </span>
          </motion.div>

          {/* Large bold heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight sm:leading-none md:leading-tight"
          >
            {slide.heading}
          </motion.h1>

          {/* Supporting description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal"
          >
            {slide.subheading}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <a
              href={slide.primaryBtn.href}
              className="bg-brand-blue hover:bg-opacity-90 text-white font-bold text-center px-6 py-3 rounded-lg shadow-lg hover:shadow-brand-blue/20 transition-all duration-300 transform hover:scale-[1.01]"
            >
              {slide.primaryBtn.text}
            </a>
            <a
              href={slide.secondaryBtn.href}
              className="flex items-center justify-center gap-2 border border-white/40 hover:border-white text-white hover:bg-white/10 font-bold px-6 py-3 rounded-lg transition-all duration-300"
            >
              {slide.secondaryBtn.text}
              <FiArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </motion.div>

          {/* Trust highlights row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-white/10"
          >
            {slide.trustHighlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-2">
                <FiCheckCircle className="text-brand-blue w-5 h-5 shrink-0" />
                <span className="text-sm font-semibold text-slate-300">{highlight}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function HeroCarousel() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-brand-dark">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        navigation={{
          prevEl: ".custom-prev-btn",
          nextEl: ".custom-next-btn"
        }}
        
        className="w-full h-full"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full min-h-[550px] py-20 sm:py-24 md:py-0 md:h-[70vh] lg:h-[85vh] flex items-center overflow-hidden">
              {/* Zoom background effect */}
              <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              />

              {/* Premium dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/45 z-0" />

              {/* Active content */}
              <SlideContent slide={slide} />
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Manual Navigation Arrows */}
        <button
          className="custom-prev-btn hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/25 backdrop-blur-sm text-white items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all duration-300 focus:outline-none"
          aria-label="Previous Slide"
        >
          <FiChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          className="custom-next-btn hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/25 backdrop-blur-sm text-white items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all duration-300 focus:outline-none"
          aria-label="Next Slide"
        >
          <FiChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

      
      </Swiper>
    </section>
  );
}
