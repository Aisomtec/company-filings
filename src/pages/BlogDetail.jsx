import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiClock,
  FiUser,
  FiCalendar,
  FiChevronRight,
  FiArrowLeft,
  FiShare2,
  FiCopy,
  FiCheckCircle,
  FiInfo,
  FiCheck,
  FiAlertTriangle,
  FiLinkedin,
  FiTwitter,
  FiList,
  FiX
} from "react-icons/fi";
import { blogData } from "../data/blogData";
import BlogCard from "../components/BlogCard";

import { API_BASE_URL } from "../config";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  // Share & Interactive UI States
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState("");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isTabletDropdownOpen, setIsTabletDropdownOpen] = useState(false);

  // Fetch current blog by slug
  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/blogs.php?slug=${slug}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to fetch blog by slug from API, using static fallback:", err);
        const fallback = blogData.find((b) => b.slug === slug);
        setBlog(fallback || null);
        setLoading(false);
      });
  }, [slug]);

  // Fetch related blogs (up to 3 published posts, excluding current)
  useEffect(() => {
    axios.get(`${API_BASE_URL}/blogs.php`)
      .then((res) => {
        const published = (res.data || []).filter(b => b.status === "published" && b.slug !== slug);
        setRelatedBlogs(published.slice(0, 3));
      })
      .catch((err) => {
        const fallbackRelated = blogData.filter((b) => b.slug !== slug);
        setRelatedBlogs(fallbackRelated.slice(0, 3));
      });
  }, [slug]);

  // Inject additional corporate images dynamically across the article content
  const finalContent = useMemo(() => {
    if (!blog || !blog.content) return [];
    const contentBlocks = [...blog.content];
    const imageBlockCount = contentBlocks.filter(b => b.type === "image").length;

    if (imageBlockCount < 2 && contentBlocks.length > 4) {
      const img1 = {
        type: "image",
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        caption: "Our advisory team collaborating on structural corporate compliance and filings."
      };
      const img2 = {
        type: "image",
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        caption: "Dynamic digital auditing tools for tracking business filing requirements."
      };

      contentBlocks.splice(3, 0, img1);
      if (contentBlocks.length > 9) {
        contentBlocks.splice(9, 0, img2);
      } else {
        contentBlocks.splice(contentBlocks.length - 1, 0, img2);
      }
    }
    return contentBlocks;
  }, [blog]);

  // Extract Heading2 items dynamically for the Table of Contents
  const headings = useMemo(() => {
    return finalContent
      .map((block, idx) => {
        if (block.type === "heading2") {
          return { id: `section-${idx}`, text: block.text };
        }
        return null;
      })
      .filter(Boolean);
  }, [finalContent]);

  // Dynamic Browser SEO Meta updates & reset state
  useEffect(() => {
    if (blog) {
      document.title = `${blog.seoTitle || blog.title} | Company Filings`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", blog.seoDescription || blog.excerpt);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = blog.seoDescription || blog.excerpt;
        document.head.appendChild(meta);
      }

      window.scrollTo(0, 0);
      setIsMobileDrawerOpen(false);
      setIsTabletDropdownOpen(false);
    }
  }, [blog]);

  // Scroll spy to highlight active section in table of contents
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // trigger offset
      let currentActiveId = "";

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (el && scrollPosition >= el.offsetTop) {
          currentActiveId = headings[i].id;
        }
      }

      if (currentActiveId) {
        setActiveSectionId(currentActiveId);
      } else {
        setActiveSectionId(headings[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings, blog]);

  // Smooth scroll offset navigation handler
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // sticky header buffer
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setIsMobileDrawerOpen(false);
      setIsTabletDropdownOpen(false);
    }
  };

  // Copy Link share handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-brand-gray px-4">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mb-3" />
        <span className="text-xs font-semibold text-slate-400">Loading compliance publication...</span>
      </div>
    );
  }

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

  // Dynamic Content Component Redenderer
  const renderBlock = (block, idx) => {
    switch (block.type) {
      case "heading2":
        return (
          <h2
            key={idx}
            id={`section-${idx}`}
            className="text-xl sm:text-2xl font-extrabold text-brand-dark mt-10 mb-4 tracking-tight border-b border-slate-100 pb-2.5 leading-tight scroll-mt-28"
          >
            {block.text}
          </h2>
        );
      case "heading3":
        // REDESIGN: Check if this is a registration process step block
        const stepMatch = block.text.match(/^(Phase|Step)\s*(\d+)[:.-]?\s*(.*)$/i);
        if (stepMatch) {
          const stepLabel = `${stepMatch[1]} ${stepMatch[2]}`;
          const stepTitle = stepMatch[3];
          return (
            <div key={idx} className="my-6 p-5 bg-white border border-slate-200/70 rounded-xl shadow-xs relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-blue/5 rounded-bl-full flex items-start justify-end p-3 text-brand-blue/15 font-black text-3xl select-none group-hover:bg-brand-blue/8 transition-colors">
                {stepMatch[2]}
              </div>
              <div className="space-y-1.5 max-w-[85%]">
                <span className="text-[9px] font-black text-brand-blue uppercase tracking-widest bg-brand-blue/5 border border-brand-blue/10 px-2 py-0.5 rounded">
                  {stepLabel}
                </span>
                <h3 className="text-base font-extrabold text-brand-dark leading-snug">
                  {stepTitle}
                </h3>
              </div>
            </div>
          );
        }
        return (
          <h3 key={idx} className="text-lg font-bold text-brand-dark mt-6 mb-3 leading-snug">
            {block.text}
          </h3>
        );
      case "paragraph":
        return (
          <p key={idx} className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-5 text-justify">
            {block.text}
          </p>
        );
      case "bullet-list":
      case "numbered-list":
        const isBullet = block.type === "bullet-list";
        return (
          <ul key={idx} className="my-5 pl-1 space-y-3">
            {block.items.map((item, itemIdx) => (
              <li key={itemIdx} className="flex items-start gap-3 text-slate-650 text-sm sm:text-[14px] leading-relaxed">
                {isBullet ? (
                  <div className="mt-1 w-4 h-4 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <FiCheck className="w-2.5 h-2.5" />
                  </div>
                ) : (
                  <span className="font-extrabold text-brand-blue text-[10px] shrink-0 w-5 h-5 bg-brand-blue/5 border border-brand-blue/10 rounded flex items-center justify-center">
                    {itemIdx + 1}
                  </span>
                )}
                <span className="text-justify flex-grow">{item}</span>
              </li>
            ))}
          </ul>
        );
      case "quote":
        return (
          <blockquote
            key={idx}
            className="my-7 pl-5 border-l-4 border-brand-blue italic text-base text-slate-700 bg-brand-light/40 py-4.5 pr-4 rounded-r-lg"
          >
            <p className="mb-2 leading-relaxed">"{block.text}"</p>
            {block.author && (
              <cite className="block text-[10px] font-bold text-slate-400 not-italic uppercase tracking-widest">
                — {block.author}
              </cite>
            )}
          </blockquote>
        );
      case "highlight-box":
        // REDESIGN: Categorize highlight boxes dynamically to prevent monotonic styling
        const textLower = block.text.toLowerCase();
        const isTip = textLower.includes("tip:");
        const isWarning = textLower.includes("warning:") || textLower.includes("caution:") || textLower.includes("important:");

        if (isTip) {
          return (
            <div key={idx} className="my-6 p-4 bg-emerald-50/40 border-l-4 border-emerald-500 rounded-r-lg flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-md bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                <FiCheck className="w-4 h-4" />
              </div>
              <div className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                <span className="font-extrabold text-emerald-800 mr-1.5 uppercase tracking-wider text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded">EXPERT TIP</span>
                {block.text.replace(/tip:/i, "").trim()}
              </div>
            </div>
          );
        } else if (isWarning) {
          return (
            <div key={idx} className="my-6 p-4 bg-red-50/40 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-md bg-red-100 flex items-center justify-center shrink-0 text-red-600">
                <FiAlertTriangle className="w-4 h-4" />
              </div>
              <div className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                <span className="font-extrabold text-red-800 mr-1.5 uppercase tracking-wider text-[10px] bg-red-100 px-1.5 py-0.5 rounded">ATTENTION</span>
                {block.text.replace(/warning:|caution:|important:/i, "").trim()}
              </div>
            </div>
          );
        } else {
          return (
            <div key={idx} className="my-6 p-4 bg-slate-50 border-l-4 border-slate-400 rounded-r-lg flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-md bg-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                <FiInfo className="w-4 h-4" />
              </div>
              <div className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                {block.text}
              </div>
            </div>
          );
        }
      case "image":
        return (
          <div key={idx} className="my-7 space-y-2">
            <div className="rounded-xl overflow-hidden shadow-xs border border-slate-200/60 aspect-[16/9] max-h-[380px] bg-slate-50">
              <img src={block.src} alt={block.caption || blog.title} className="w-full h-full object-cover" />
            </div>
            {block.caption && (
              <p className="text-center text-[10px] text-slate-400 font-bold italic tracking-wide">{block.caption}</p>
            )}
          </div>
        );
      case "table":
        return (
          <div key={idx} className="my-7 overflow-x-auto border border-slate-200/80 rounded-xl shadow-xs">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  {block.headers.map((header, headIdx) => (
                    <th
                      key={headIdx}
                      className="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200"
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
                      <td key={cellIdx} className="px-5 py-3 text-xs text-slate-600 font-medium leading-relaxed">
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

  // Compile dynamically rendered elements including the inline CTA injection
  const renderAllContent = () => {
    if (!blog || !finalContent) return null;

    // Find index of the conclusion header (often heading2 with "conclusion")
    let conclusionIndex = finalContent.findIndex(b =>
      b.type === "heading2" && b.text.toLowerCase().includes("conclusion")
    );

    // If not found, inject CTA right before the last paragraph block
    if (conclusionIndex === -1 && finalContent.length > 1) {
      conclusionIndex = finalContent.length - 1;
    }

    const rendered = [];
    finalContent.forEach((block, idx) => {
      // Inject inline CTA just before the conclusion
      if (idx === conclusionIndex) {
        rendered.push(
          <div key="inline-cta-block" className="my-9 p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-sm border border-slate-700/40 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="absolute right-0 top-0 w-28 h-28 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-1.5 md:max-w-[70%]">
              <span className="text-[9px] font-black text-brand-blue uppercase tracking-widest bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/20">
                Corporate Advisory
              </span>
              <h4 className="text-base font-extrabold leading-snug">
                Need Help With {blog.category || "Company Compliance"}?
              </h4>
              <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed text-justify">
                Speak directly to our practicing Chartered Accountants and Corporate Registrars. We handle registrations, e-filings, and advisory services.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full md:w-auto">
              <a
                href="/contact"
                className="px-3.5 py-2 bg-brand-blue hover:bg-opacity-95 text-white font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition-all shadow-xs"
              >
                Get Consultation
              </a>
              <a
                href="/contact"
                className="px-3.5 py-2 bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition-colors"
              >
                Contact Expert
              </a>
            </div>
          </div>
        );
      }

      rendered.push(renderBlock(block, idx));
    });

    return rendered;
  };

  return (
    <div className="font-sans antialiased text-brand-dark bg-brand-gray min-h-screen">

      {/* Dynamic Copy toast indicator */}
      {copySuccess && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white rounded-lg px-4 py-2 text-xs font-bold shadow-lg flex items-center gap-2 z-50 animate-fade-in">
          <FiCheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Article link copied!</span>
        </div>
      )}

      {/* ─── SECTION 1: REDESIGNED COMPACT HERO ───────────────────────── */}
      <section className="pt-6 pb-4 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-blue transition-colors">Home</Link>
            <FiChevronRight className="w-3 h-3 text-slate-300" />
            <Link to="/blogs" className="hover:text-brand-blue transition-colors">Knowledge Center</Link>
            <FiChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-500 truncate max-w-[200px] sm:max-w-xs">{blog.title}</span>
          </nav>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-brand-blue bg-brand-blue/5 border border-brand-blue/10 px-2.5 py-1 rounded">
              {blog.category}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark leading-tight tracking-tight mb-3">
            {blog.title}
          </h1>

          {/* Short Excerpt Description */}
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 text-justify">
            {blog.excerpt}
          </p>

          {/* Metadata Row + Social Share */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 pt-4 pb-2">

            {/* Meta details */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-bold text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-650">
                <FiUser className="w-3.5 h-3.5 text-slate-300" />
                <span>{blog.author}</span>
              </span>
              <span className="text-slate-200 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <FiCalendar className="w-3.5 h-3.5 text-slate-300" />
                <time>{blog.publishDate}</time>
              </span>
              <span className="text-slate-200 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <FiClock className="w-3.5 h-3.5 text-slate-300" />
                <span>{blog.readingTime}</span>
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* ─── SECTION 2 & 3: MAIN TWO-COLUMN CONTENT LAYOUT ────────────────── */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-10">

          {/* LEFT COLUMN: DESKTOP STICKY NAVIGATION SIDEBAR */}
          {headings.length > 0 && (
            <aside className="w-72 shrink-0 hidden lg:block sticky top-24 self-start space-y-4">
              <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-3.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2.5">
                  On This Page
                </h4>
                <nav className="space-y-1" aria-label="Table of Contents">
                  {headings.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => scrollToSection(h.id)}
                      className={`w-full text-left text-xs font-semibold py-1.5 px-2 rounded-md transition-all truncate block ${activeSectionId === h.id
                          ? "text-brand-blue bg-brand-blue/5 font-extrabold border-l-2 border-brand-blue pl-2"
                          : "text-slate-500 hover:text-brand-blue hover:bg-slate-50 pl-2"
                        }`}
                    >
                      {h.text}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* RIGHT COLUMN: MAIN ARTICLE CONTENTS */}
          <article className="max-w-[880px] flex-grow bg-white lg:border border-slate-200/80 lg:rounded-2xl p-4 sm:p-8 shadow-xs">

            {/* Tablet Dropdown Navigation (Width collapses to MD range) */}
            {headings.length > 0 && (
              <div className="lg:hidden mb-6 relative border border-slate-200 rounded-xl bg-slate-50">
                <button
                  onClick={() => setIsTabletDropdownOpen(!isTabletDropdownOpen)}
                  className="w-full text-left px-4 py-3 text-xs font-bold text-slate-700 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FiList className="w-4 h-4 text-brand-blue" />
                    <span>Contents: {headings.find(h => h.id === activeSectionId)?.text || "Navigate Article"}</span>
                  </span>
                  <FiChevronRight className={`w-4 h-4 text-slate-450 transition-transform ${isTabletDropdownOpen ? 'rotate-90' : ''}`} />
                </button>
                {isTabletDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 p-2 space-y-0.5">
                    {headings.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => scrollToSection(h.id)}
                        className={`w-full text-left text-xs font-semibold p-2 rounded-md block truncate ${activeSectionId === h.id ? 'text-brand-blue bg-brand-blue/5' : 'text-slate-500 hover:text-brand-blue'
                          }`}
                      >
                        {h.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Render dynamically compiled content blocks */}
            <div className="prose prose-slate max-w-none">
              {renderAllContent()}
            </div>

          </article>

        </div>
      </section>

      {/* ─── SECTION 6: REDESIGNED RELATED ARTICLES ───────────────────── */}
      {relatedBlogs.length > 0 && (
        <section className="bg-white border-y border-slate-200/80 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="space-y-10">

              {/* Redesigned Section Header */}
              <div className="text-center space-y-2 max-w-3xl mx-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                  Continue Reading
                </span>
                <h2 className="text-2xl font-extrabold text-brand-dark">
                  Related Compliance Resources
                </h2>
              </div>

              {/* Grid (Equal heights display) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedBlogs.map((rBlog) => (
                  <div key={rBlog.id || rBlog.slug} className="flex">
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

      {/* ─── SECTION 7: REDESIGNED FINAL CTA BANNER ────────────────────── */}
      <section className="relative py-12 bg-brand-dark text-white overflow-hidden border-t border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-brand-blue">
              Expert Compliance Partner
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
              Need Professional Compliance Support?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Speak with our corporate consults for company registration, annual ROC filings, startup services, and tax compliances.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-xs sm:max-w-md mx-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-blue hover:bg-opacity-95 text-white font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              Get Consultation
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* MOBILE FLOATING ARTICLE CONTENTS WIDGET (Displays on mobile view only) */}
      {headings.length > 0 && (
        <div className="lg:hidden">
          {/* Floating toggle button */}
          <button
            onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
            className="fixed bottom-6 right-6 z-40 bg-brand-blue hover:bg-opacity-95 text-white shadow-xl p-3.5 rounded-full flex items-center justify-center border border-brand-blue/20 transition-all hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Toggle Table of Contents drawer"
          >
            <FiList className="w-5 h-5" />
          </button>

          {/* Drawer backdrop overlay */}
          {isMobileDrawerOpen && (
            <div
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-45"
            />
          )}

          {/* Drawer Sheet */}
          <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 rounded-t-2xl z-50 p-6 shadow-2xl transition-transform duration-300 transform max-h-[60vh] overflow-y-auto ${isMobileDrawerOpen ? 'translate-y-0' : 'translate-y-full'
            }`}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Article Contents
              </h4>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1.5" aria-label="Mobile Table of Contents">
              {headings.map((h) => (
                <button
                  key={h.id}
                  onClick={() => scrollToSection(h.id)}
                  className={`w-full text-left text-xs font-bold py-2.5 px-3 rounded-lg block truncate transition-colors ${activeSectionId === h.id
                      ? 'text-brand-blue bg-brand-blue/5 font-extrabold border-l-2 border-brand-blue pl-3'
                      : 'text-slate-500 hover:bg-slate-50'
                    }`}
                >
                  {h.text}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

    </div>
  );
}
