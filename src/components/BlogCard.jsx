import React from "react";
import { FiArrowRight } from "react-icons/fi";

export default function BlogCard({ category, title, excerpt, date, isoDate, image, href }) {
  return (
    <article className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-blue/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Featured Image Container */}
        <div className="h-52 overflow-hidden relative shrink-0">
          <img 
            src={image} 
            alt={title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Category overlay */}
          <span className="absolute top-4 left-4 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
            {category}
          </span>
        </div>

        {/* Content Block */}
        <div className="p-6 space-y-3">
          {/* Time stamp */}
          <time dateTime={isoDate} className="text-xs text-slate-400 font-bold block">
            {date}
          </time>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors duration-200 line-clamp-2">
            <a href={href}>{title}</a>
          </h3>
          
          {/* Excerpt */}
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>
      </div>

      {/* Read More Link */}
      <div className="px-6 pb-6 pt-4 border-t border-slate-100 shrink-0">
        <a 
          href={href} 
          className="inline-flex items-center gap-1.5 text-xs font-black text-brand-blue hover:text-brand-dark transition-colors duration-250"
        >
          <span>READ MORE</span>
          <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </a>
      </div>
    </article>
  );
}
