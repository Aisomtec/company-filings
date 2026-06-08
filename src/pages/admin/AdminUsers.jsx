import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  FiUserPlus, 
  FiEdit2, 
  FiTrash2, 
  FiAlertTriangle, 
  FiX, 
  FiCheckCircle, 
  FiUser
} from "react-icons/fi";

import { API_BASE_URL } from "../../config";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Modal and Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedUser, setSelectedUser] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "author",
    status: "active"
  });

  const [formError, setFormError] = useState(null);

  // Fetch Users on Mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/users.php`)
      .then((res) => {
        setUsers(res.data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load users:", err);
        setError("Could not load admin users from MySQL database.");
        setLoading(false);
      });
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setSelectedUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "author",
      status: "active"
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // Leave blank unless changing
      role: user.role,
      status: user.status
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit Add or Edit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // Frontend validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.role || !formData.status) {
      setFormError("Please fill out all required fields.");
      return;
    }

    if (modalMode === "add" && !formData.password) {
      setFormError("Password is required for new users.");
      return;
    }

    if (modalMode === "add") {
      // Create request
      axios.post(`${API_BASE_URL}/users.php`, formData)
        .then((res) => {
          setIsModalOpen(false);
          setSuccessMsg("Admin user created successfully!");
          fetchUsers();
          setTimeout(() => setSuccessMsg(null), 3000);
        })
        .catch((err) => {
          console.error("Create user failed:", err);
          setFormError(err.response?.data?.error || "Failed to create user. Ensure email is unique.");
        });
    } else {
      // Edit request
      axios.put(`${API_BASE_URL}/users.php?id=${selectedUser.id}`, formData)
        .then((res) => {
          setIsModalOpen(false);
          setSuccessMsg("Admin user updated successfully!");
          fetchUsers();
          setTimeout(() => setSuccessMsg(null), 3000);
        })
        .catch((err) => {
          console.error("Update user failed:", err);
          setFormError(err.response?.data?.error || "Failed to update user.");
        });
    }
  };

  // Delete User
  const handleDeleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete user "${name}"?`)) {
      axios.delete(`${API_BASE_URL}/users.php?id=${id}`)
        .then((res) => {
          setSuccessMsg("User removed successfully.");
          fetchUsers();
          setTimeout(() => setSuccessMsg(null), 3000);
        })
        .catch((err) => {
          console.error("Delete user failed:", err);
          setError("Failed to delete the user.");
        });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      
      {/* ─── SECTION 1: Page Header ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-dark tracking-tight">Admin Users</h1>
          <p className="text-slate-500 text-sm mt-1">Manage personnel profiles authorized to access the CMS panel.</p>
        </div>
        <div>
          <button 
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-blue hover:bg-opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-200 shadow-sm focus:outline-none hover:scale-[1.01]"
          >
            <FiUserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800 text-xs font-bold shadow-xs">
          <FiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-800 text-xs font-bold shadow-xs">
          <FiAlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ─── SECTION 2: Users Table Grid ────────────────────────────── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3 bg-white border border-slate-200 rounded-xl">
          <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-400">Fetching accounts catalog...</span>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-brand-gray">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-brand-light/30 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold text-brand-dark flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-brand-light border border-brand-light flex items-center justify-center text-slate-500">
                          <FiUser className="w-3.5 h-3.5" />
                        </div>
                        <span>{user.name}</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">{user.email}</td>
                      <td className="px-6 py-4 text-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          user.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : user.status === "suspended"
                            ? "bg-red-50 text-red-705 border-red-100"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-400">{user.created_at}</td>
                      <td className="px-6 py-4 text-right text-xs font-semibold space-x-3">
                        <button 
                          onClick={() => handleOpenEditModal(user)}
                          className="text-brand-blue hover:text-brand-dark transition-colors inline-flex items-center gap-1 focus:outline-none"
                          title="Edit User Info"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="text-red-500 hover:text-red-750 transition-colors inline-flex items-center gap-1 focus:outline-none"
                          title="Remove User"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-xs font-bold text-slate-400">
                      No admin users found in the system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── SECTION 3: ADD/EDIT USER MODAL ─────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-zoom-in">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-brand-gray">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-brand-dark">
                {modalMode === "add" ? "Add New Administrator" : "Edit Admin Account"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-650 transition-colors focus:outline-none"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-xs font-bold flex items-center gap-2">
                  <FiAlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter user's name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="name@companyfilings.in"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Password {modalMode === "add" ? <span className="text-red-500">*</span> : <span className="text-slate-400">(Leave blank to keep current)</span>}
                </label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={modalMode === "add"}
                  placeholder={modalMode === "add" ? "Enter secure password" : "Enter new password"}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* Grid for Role & Status */}
              <div className="grid grid-cols-2 gap-4">
                {/* Role */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Role</label>
                  <select 
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="administrator">Administrator</option>
                    <option value="editor">Editor</option>
                    <option value="author">Author</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-brand-gray text-slate-500 font-bold text-xs rounded-lg transition-colors focus:outline-none"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-brand-blue hover:bg-opacity-95 text-white font-bold text-xs rounded-lg transition-colors focus:outline-none"
                >
                  {modalMode === "add" ? "Create Account" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
