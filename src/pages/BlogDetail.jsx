import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiUser, FiCalendar, FiChevronRight, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { blogData } from "../data/blogData";
import BlogCard from "../components/BlogCard";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find the current blog post by slug
  const blog = blogData.find((b) => b.slug === slug);

  // Dynamic Browser SEO Meta updates
  useEffect(() => {
    if (blog) {
      // Set Document Title
      document.title = `${blog.seoTitle} | Company Filings`;

      // Set Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", blog.seoDescription);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = blog.seoDescription;
        document.head.appendChild(meta);
      }

      // Scroll to top on slug change
      window.scrollTo(0, 0);
    }
  }, [blog]);

  // If blog is not found, render a premium 404/Not Found state
  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-brand-gray px-4 py-16 text-center">
        <div className="max-w-md space-y-6">
          <h1 className="text-6xl font-black text-brand-blue">404</h1>
          <h2 className="text-2xl font-bold text-brand-dark">Article Not Found</h2>
          <p className="text-slate-500 text-sm">
            The compliance guide or resource you are looking for might have been moved or is currently unavailable.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate("/blogs")}
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-opacity-95 text-white font-bold px-6 py-3 rounded-lg transition-all shadow-sm hover:scale-[1.02]"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Knowledge Center</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get related articles (all other blogs in the dataset)
  const relatedBlogs = blogData.filter((b) => b.id !== blog.id);

  // Dynamic Block Rendering Engine
  const renderBlock = (block, idx) => {
    switch (block.type) {
      case "heading2":
        return (
          <h2
            key={idx}
            className="text-2xl sm:text-3xl font-extrabold text-brand-dark mt-10 mb-4 tracking-tight border-b border-slate-100 pb-2 leading-tight"
          >
            {block.text}
          </h2>
        );
      case "heading3":
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-brand-dark mt-8 mb-3 leading-snug">
            {block.text}
          </h3>
        );
      case "paragraph":
        return (
          <p key={idx} className="text-slate-600 text-base leading-relaxed mb-6 text-justify">
            {block.text}
          </p>
        );
      case "bullet-list":
        return (
          <ul key={idx} className="list-disc pl-6 mb-6 space-y-2.5 text-slate-600 text-base">
            {block.items.map((item, itemIdx) => (
              <li key={itemIdx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        );
      case "numbered-list":
        return (
          <ol key={idx} className="list-decimal pl-6 mb-6 space-y-2.5 text-slate-600 text-base">
            {block.items.map((item, itemIdx) => (
              <li key={itemIdx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        );
      case "quote":
        return (
          <blockquote
            key={idx}
            className="my-8 pl-6 border-l-4 border-brand-blue italic text-lg text-slate-700 bg-brand-light/50 py-4 pr-4 rounded-r-lg"
          >
            <p className="mb-2 leading-relaxed">"{block.text}"</p>
            {block.author && (
              <cite className="block text-xs font-bold text-slate-400 not-italic uppercase tracking-wider">
                — {block.author}
              </cite>
            )}
          </blockquote>
        );
      case "highlight-box":
        return (
          <div
            key={idx}
            className="my-8 p-5 bg-brand-blue/5 border-l-4 border-brand-blue rounded-r-xl text-slate-700 text-base leading-relaxed font-medium"
          >
            {block.text}
          </div>
        );
      case "image":
        return (
          <div key={idx} className="my-8 space-y-2">
            <div className="rounded-xl overflow-hidden shadow-md border border-slate-200/50">
              <img src={block.src} alt={block.alt || blog.title} className="w-full h-auto object-cover" />
            </div>
            {block.caption && (
              <p className="text-center text-xs text-slate-400 font-semibold italic">{block.caption}</p>
            )}
          </div>
        );
      case "table":
        return (
          <div key={idx} className="my-8 overflow-x-auto border border-slate-200/80 rounded-xl shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {block.headers.map((header, headIdx) => (
                    <th
                      key={headIdx}
                      className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {block.rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-6 py-4 text-xs sm:text-sm text-slate-600 font-medium">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans antialiased text-brand-dark bg-brand-gray min-h-screen">
      {/* ─── FUTURE SEO / METADATA STRUCTURE PREPARATION ───────────────── */}
      {/* 
        This section is pre-configured for React Helmet or Next.js layout injection:
        - Meta Title: {blog.seoTitle}
        - Meta Description: {blog.seoDescription}
        - Open Graph Title: {blog.title}
        - Open Graph Image: {blog.featuredImage}
        - Open Graph Description: {blog.excerpt}
        - Canonical URL: window.location.href
        
        - JSON-LD Blog Schema:
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "image": blog.featuredImage,
            "datePublished": blog.publishDate,
            "author": {
              "@type": "Person",
              "name": blog.author
            },
            "description": blog.excerpt
          }
        
        - JSON-LD Breadcrumb Schema:
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "window.location.origin" },
              { "@type": "ListItem", "position": 2, "name": "Blogs", "item": "window.location.origin/blogs" },
              { "@type": "ListItem", "position": 3, "name": blog.title, "item": "window.location.href" }
            ]
          }
      */}

      {/* ─── BLOG DETAIL SECTION 1: Hero Area ─────────────────────────── */}
      <article className="pt-6 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-8 uppercase tracking-wider" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-blue transition-colors">
              Home
            </Link>
            <FiChevronRight className="w-3.5 h-3.5" />
            <Link to="/blogs" className="hover:text-brand-blue transition-colors">
              Blogs
            </Link>
            <FiChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-500 font-bold truncate max-w-[240px] sm:max-w-xs md:max-w-md">
              {blog.title}
            </span>
          </nav>

          {/* Article Info Header */}
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-10">
            {/* Category */}
            <div>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3 py-1.5 rounded-full border border-brand-blue/20">
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark leading-tight tracking-tight">
              {blog.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-slate-400 border-y border-slate-200/60 py-4 max-w-2xl mx-auto">
              <span className="flex items-center gap-1.5">
                <FiUser className="w-4 h-4 text-slate-300" />
                <span className="text-slate-600 font-bold">{blog.author}</span>
              </span>
              <span className="hidden sm:inline text-slate-200">|</span>
              <span className="flex items-center gap-1.5">
                <FiCalendar className="w-4 h-4 text-slate-300" />
                <time>{blog.publishDate}</time>
              </span>
              <span className="hidden sm:inline text-slate-200">|</span>
              <span className="flex items-center gap-1.5">
                <FiClock className="w-4 h-4 text-slate-300" />
                <span>{blog.readingTime}</span>
              </span>
            </div>
          </div>

          {/* Large Featured Image */}
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-slate-200/40 aspect-[21/9] min-h-[260px] sm:min-h-[360px] relative mb-12">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* ─── BLOG DETAIL SECTION 2: Article Content ─────────────────────── */}
          <div className="max-w-[760px] mx-auto px-4">
            <div className="prose prose-slate max-w-none">
              {blog.content.map((block, idx) => renderBlock(block, idx))}
            </div>
          </div>

        </div>
      </article>

      {/* ─── BLOG DETAIL SECTION 3: Related Articles ────────────────────── */}
      {relatedBlogs.length > 0 && (
        <section className="bg-white border-y border-slate-200/80 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div className="space-y-3">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue block">
                    Keep Reading
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                    Related Compliance Insights
                  </h2>
                </div>
                <div>
                  <Link
                    to="/blogs"
                    className="inline-flex items-center gap-1.5 text-xs font-black text-brand-blue hover:text-brand-dark transition-colors"
                  >
                    <span>VIEW ALL ARTICLES</span>
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {relatedBlogs.map((rBlog) => (
                  <div key={rBlog.id}>
                    <BlogCard
                      category={rBlog.category}
                      title={rBlog.title}
                      excerpt={rBlog.excerpt}
                      date={rBlog.publishDate}
                      isoDate={rBlog.publishDate}
                      image={rBlog.featuredImage}
                      href={`/blogs/${rBlog.slug}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── BLOG DETAIL SECTION 4: Article CTA Banner ───────────────────── */}
      <section className="relative py-16 md:py-20 bg-brand-dark text-white overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Direct Expert Access
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Need Expert Assistance With Business Compliance?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Speak with our professionals for registration, compliance, and taxation support. Set up your consultation today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-blue hover:bg-opacity-95 text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-200 shadow-md hover:scale-[1.02]"
            >
              Get Consultation
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
