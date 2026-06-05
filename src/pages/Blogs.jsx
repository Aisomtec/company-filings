import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { blogData } from "../data/blogData";
import BlogCard from "../components/BlogCard";

export default function Blogs() {
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

  return (
    <div className="font-sans antialiased text-brand-dark bg-brand-gray">
      {/* ─── SECTION 1: Blogs Hero Section ────────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-brand-dark text-white border-b border-slate-800">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
            alt="Corporate Business Intelligence Technology Network"
            className="w-full h-full object-cover"
          />
          {/* Overlay shade */}
          <div className="absolute inset-0 bg-slate-950/80 z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3 py-1.5 rounded-full border border-brand-blue/20 inline-block">
              Knowledge Center
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
              Business Compliance Insights & Resources
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Explore expert guidance on company registration, ROC filings, startup compliance, accounting, and taxation. Stay informed and run your business default-free.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
          >
            <a
              href="#articles-grid"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-blue hover:bg-opacity-95 text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-200 shadow-md hover:scale-[1.02]"
            >
              Browse Articles
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            >
              Contact Experts
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: Featured Blogs Grid ───────────────────────────── */}
      <section id="articles-grid" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Section Heading */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block">
              Recent Publications
            </h2>
            <h3 className="text-3xl font-extrabold text-brand-dark">
              Latest Articles from Our Experts
            </h3>
            <p className="text-slate-500 text-sm">
              Read detailed breakdowns, tutorials, and compliance checklists designed by our certified company secretaries and chartered accountants.
            </p>
          </div>

          {/* Grid Layout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogData.map((blog) => (
              <motion.div key={blog.id} variants={itemVariants}>
                <BlogCard
                  category={blog.category}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  date={blog.publishDate}
                  isoDate={blog.publishDate}
                  image={blog.featuredImage}
                  href={`/blogs/${blog.slug}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: Call To Action ────────────────────────────────── */}
      <section className="relative py-16 md:py-20 bg-brand-dark text-white overflow-hidden border-t border-slate-800">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Expert Guidance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Need Professional Compliance Assistance?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Our experts are here to help with registrations, filings, startup services, and taxation support. Let us handle the legal stress while you focus on scaling your business.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-blue hover:bg-opacity-95 text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-200 shadow-md hover:scale-[1.02]"
            >
              Get Consultation
            </a>
            <a
              href="/contact"
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
