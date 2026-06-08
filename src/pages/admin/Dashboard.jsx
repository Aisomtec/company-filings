import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FiFileText, 
  FiCheckCircle, 
  FiEdit, 
  FiAlertTriangle
} from "react-icons/fi";

import { API_BASE_URL } from "../../config";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/dashboard.php`)
      .then((res) => {
        setData(res.data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard statistics loading failed:", err);
        setError("Could not load dashboard statistics. Ensure your MySQL and local Apache servers are running.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold text-slate-500">Loading metrics counts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-2xl mx-auto my-10 space-y-4">
        <FiAlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
        <h3 className="text-lg font-bold text-red-800">Connection Failed</h3>
        <p className="text-sm text-red-600 leading-relaxed">
          {error}
        </p>
        <div className="pt-2 text-xs text-slate-400 font-medium">
          API Endpoint target: <code className="bg-red-100/60 px-1.5 py-0.5 rounded">{API_BASE_URL}/dashboard.php</code>
        </div>
        <div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-brand-blue hover:bg-opacity-95 text-white font-bold text-xs rounded-lg transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { statistics, recent_blogs } = data;

  const statCards = [
    { 
      label: "Total Blogs", 
      value: statistics.total_blogs, 
      icon: FiFileText, 
      colorClass: "text-brand-dark bg-brand-light border-slate-200" 
    },
    { 
      label: "Published Blogs", 
      value: statistics.published_blogs, 
      icon: FiCheckCircle, 
      colorClass: "text-emerald-700 bg-emerald-50/80 border-emerald-100" 
    },
    { 
      label: "Draft Blogs", 
      value: statistics.draft_blogs, 
      icon: FiEdit, 
      colorClass: "text-amber-700 bg-amber-50/80 border-amber-100" 
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* ─── SECTION 1: Welcome Header ───────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-black text-brand-dark tracking-tight">
          System Overview
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Monitor your corporate publications, media assets, and system diagnostics metrics.
        </p>
      </div>

      {/* ─── SECTION 2: Overview Cards ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className={`bg-white border rounded-xl p-5 flex items-center justify-between shadow-xs ${card.colorClass.split(' ').pop()}`}
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  {card.label}
                </span>
                <span className="text-3xl font-black text-brand-dark leading-none block">
                  {card.value}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-lg border flex items-center justify-center shrink-0 ${card.colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── SECTION 3: Content Dashboard Grid ───────────────────────── */}
      <div className="space-y-8">
        
        {/* Recent Blogs Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-brand-dark">
                  Recent Publications
                </h3>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Latest compliance guides added to CMS
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-brand-gray">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Publish Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {recent_blogs.length > 0 ? (
                    recent_blogs.map((blog, idx) => (
                      <tr key={idx} className="hover:bg-brand-light/30 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-brand-dark max-w-xs truncate">
                          {blog.title}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-500">
                          {blog.category || "Uncategorized"}
                        </td>
                        <td className="px-6 py-4 text-xs">
                          <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                            blog.status === 'published' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                              : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            {blog.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold text-slate-400">
                          {blog.publish_date}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-xs font-bold text-slate-400">
                        No articles registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-slate-100 bg-brand-gray/50 shrink-0">
            <button 
              onClick={() => navigate("/admin/blogs")}
              className="text-xs font-bold text-brand-blue hover:text-brand-dark uppercase tracking-wider focus:outline-none"
            >
              Manage Blog Posts
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}