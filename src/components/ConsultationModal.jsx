import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSend } from "react-icons/fi";
import { useConsultation } from "../context/ConsultationContext";

export default function ConsultationModal() {
  const { isOpen, closeModal, defaultCategory } = useConsultation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
  });

  const categories = [
    "Register a Company",
    "Company filings",
    "Startup",
    "Accounting, Audit and Tax",
  ];

  // Sync category when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        phone: "",
        email: "",
        category: defaultCategory || categories[0],
      });
    }
  }, [isOpen, defaultCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the WhatsApp prefilled message
    const message = `Hello, I would like to know more about "${formData.category}" services.

Here are my details:
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email}`;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Close the modal
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-[10000] border border-slate-100"
          >
            {/* Header */}
            <div className="bg-brand-dark text-white p-6 relative">
              <h3 className="text-xl font-bold">Get Free Consultation</h3>
              <p className="text-slate-300 text-xs mt-1 text-left">
                Fill in the details below. We will prefill this information on WhatsApp to connect with our experts.
              </p>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 text-left">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none text-slate-800 transition-all text-sm font-medium"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 text-left">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none text-slate-800 transition-all text-sm font-medium"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 text-left">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none text-slate-800 transition-all text-sm font-medium"
                />
              </div>

              {/* Service Category Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 text-left">
                  Service Category
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none text-slate-800 transition-all text-sm font-medium bg-white"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-brand-blue hover:bg-opacity-95 text-white py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 mt-6"
              >
                <FiSend className="w-4 h-4" />
                <span>Continue on WhatsApp</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
