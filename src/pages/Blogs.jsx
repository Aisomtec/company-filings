import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useImages } from "../context/ImageContext";
import { blogData } from "../data/blogData";
import BlogCard from "../components/BlogCard";

import { API_BASE_URL } from "../config";

export default function Blogs() {
  const { getImageUrl } = useImages();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/blogs.php`)
      .then((res) => {
        // Only show published articles on the public page
        const published = (res.data || []).filter(b => b.status === "published");
        setBlogs(published);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to fetch dynamic blogs from API, loading static fallback:", err);
        setBlogs(blogData); // Fallback to hardcoded dataset
        setLoading(false);
      });
  }, []);

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
                  src={getImageUrl("Blogs Listing Hero Background", "/blogs-hero.avif")}
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
                  Knowledge Center
                </motion.h1>
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
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold text-slate-400">Loading publications library...</span>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogs.map((blog) => (
                <motion.div key={blog.id || blog.slug} variants={itemVariants}>
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
          )}
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
