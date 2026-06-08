import React from "react";
import { FiSettings, FiSave, FiAlertCircle } from "react-icons/fi";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">System Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Configure global CMS options, API limits, and credentials parameters.</p>
        </div>
        <div>
          <button 
            onClick={() => alert("Settings modification saved successfully.")}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm focus:outline-none"
          >
            <FiSave className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>

      {/* Info Block */}
      <div className="bg-slate-100 border border-slate-200/80 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
          <FiAlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-700 text-sm">Future configurations</h3>
          <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
            This module will control global configurations like site titles, API caching intervals, notification alert email thresholds, and SEO meta index rules.
          </p>
        </div>
      </div>

      {/* Form Grid Placeholder */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">CMS Configurations Options</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">CMS System Name</label>
            <input 
              type="text" 
              defaultValue="Company Filings Portal" 
              disabled 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Admin Profile Email</label>
            <input 
              type="email" 
              defaultValue="admin@companyfilings.in" 
              disabled 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
