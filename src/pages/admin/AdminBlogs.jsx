import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  FiFileText, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiArrowUp, 
  FiArrowDown, 
  FiTrash, 
  FiCheck, 
  FiX, 
  FiSearch, 
  FiAlertTriangle, 
  FiCheckCircle,
  FiCornerDownRight,
  FiImage
} from "react-icons/fi";

import { API_BASE_URL } from "../../config";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Form context (Categories and Authors loaded from DB)
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [mediaList, setMediaList] = useState([]); // Loaded images from Media Library

  // Modal and Form UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  // Search filter
  const [searchTerm, setSearchTerm] = useState("");

  // Primary Blog Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category_id: "",
    author_id: "",
    guest_author_name: "",
    readingTime: "5 min read",
    publishDateRaw: "",
    status: "draft",
    featuredImageId: "",
    seoTitle: "",
    seoDescription: "",
    excerpt: "",
    content: [] // Array of block objects
  });

  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch blogs on load
  useEffect(() => {
    fetchBlogs();
    loadFormContext();
    loadMediaList();
  }, []);

  const fetchBlogs = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/blogs.php`)
      .then((res) => {
        setBlogs(res.data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blogs:", err);
        setError("Could not load blogs from database.");
        setLoading(false);
      });
  };

  const loadFormContext = () => {
    axios.get(`${API_BASE_URL}/blogs.php?action=form-context`)
      .then((res) => {
        setCategories(res.data.categories || []);
        setAuthors(res.data.authors || []);
      })
      .catch((err) => {
        console.error("Failed to load categories/authors:", err);
      });
  };

  const loadMediaList = () => {
    axios.get(`${API_BASE_URL}/images.php`)
      .then((res) => {
        setMediaList(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load media assets:", err);
      });
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setModalMode("add");
    setSelectedBlogId(null);
    setFormError(null);
    setFormData({
      title: "",
      slug: "",
      category_id: categories[0]?.id || "",
      author_id: authors[0]?.id || "",
      guest_author_name: "",
      readingTime: "6 min read",
      publishDateRaw: new Date().toISOString().split('T')[0],
      status: "draft",
      featuredImageId: "",
      seoTitle: "",
      seoDescription: "",
      excerpt: "",
      content: [
        { type: "paragraph", text: "Write your introductory paragraph here to engage the reader and summarize the compliance discussion." },
        { type: "heading2", text: "What is the Core Concept?" },
        { type: "paragraph", text: "Explain the central concept, its definition under legal frameworks, and why it is critical for business promoters." },
        { 
          type: "image", 
          image_id: "", 
          src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80", 
          caption: "Our advisory team collaborating on structural corporate compliance and filings." 
        },
        { type: "quote", text: "Insert a quote from a senior consultant or legal code here.", author: "CA Rohan Mehta, Advisory Lead" },
        { type: "heading2", text: "Key Benefits and Advantages" },
        { type: "paragraph", text: "Detail the specific benefits and strategic advantages that this structure offers over other options." },
        { type: "bullet-list", items: ["Benefit 1: Limited liability shield for assets", "Benefit 2: Higher institutional trust and access to bank credits", "Benefit 3: Uninterrupted perpetual corporate existence"] },
        { type: "heading2", text: "Eligibility Criteria & Guidelines" },
        { 
          type: "image", 
          image_id: "", 
          src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80", 
          caption: "Dynamic digital auditing tools for tracking business filing requirements." 
        },
        { type: "paragraph", text: "Describe the minimum criteria, requirements, and compliance guidelines that need to be met before filing." },
        { type: "numbered-list", items: ["Criterion 1: Minimum of two active directors", "Criterion 2: Registered corporate office within India", "Criterion 3: Statutory name clearance under MCA guidelines"] },
        { type: "heading2", text: "Required Documentation Checklist" },
        { type: "paragraph", text: "Gather digital scans of identity proofs and physical records to support SPICe+ web forms." },
        { type: "table", headers: ["Document Name", "Purpose", "Authority"], rows: [
          ["PAN Card / Passport", "Identity Verification", "IT Department"],
          ["Utility Bill / Lease", "Registered Address", "Municipal Corp"]
        ] },
        { type: "heading2", text: "Step-by-Step Execution Process" },
        { type: "paragraph", text: "Follow this sequence of phases to complete registration on the MCA electronic services portal." },
        { type: "heading3", text: "Phase 1: Secure Digital Signatures" },
        { type: "paragraph", text: "Obtain Class 3 digital signature certificates for all proposed board directors." },
        { type: "heading3", text: "Phase 2: Name Reservation" },
        { type: "paragraph", text: "Submit unique corporate names for registry search and reserve the name for 20 days." },
        { type: "heading3", text: "Phase 3: Legal Bylaws Filing" },
        { type: "paragraph", text: "Draft and submit MOA/AOA charters defining the corporate objects and bylaws." },
        { type: "heading2", text: "Post-Incorporation Compliance Rules" },
        { type: "paragraph", text: "Complete these statutory compliances immediately after receiving the certificate of incorporation." },
        { type: "bullet-list", items: ["Compliance 1: Appoint first statutory auditor within 30 days", "Compliance 2: Open a corporate bank account in the company name", "Compliance 3: Deposit capital subscription within 185 days"] },
        { type: "heading2", text: "Conclusion" },
        { type: "paragraph", text: "A structured setup guarantees legal compliance and prepares your startup for institutional funding." }
      ]
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (blogSummary) => {
    setLoading(true);
    setFormError(null);
    setSelectedBlogId(blogSummary.id);
    setModalMode("edit");

    axios.get(`${API_BASE_URL}/blogs.php?id=${blogSummary.id}`)
      .then((res) => {
        const fullBlog = res.data;
        let contentBlocks = [...(fullBlog.content || [])];
        const imageBlockCount = contentBlocks.filter(b => b.type === "image").length;

        if (imageBlockCount < 2 && contentBlocks.length > 4) {
          const img1 = {
            type: "image",
            image_id: "",
            src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
            caption: "Our advisory team collaborating on structural corporate compliance and filings."
          };
          const img2 = {
            type: "image",
            image_id: "",
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

        setFormData({
          title: fullBlog.title,
          slug: fullBlog.slug,
          category_id: fullBlog.category_id,
          author_id: fullBlog.author_id || "",
          guest_author_name: fullBlog.guest_author_name || "",
          readingTime: fullBlog.readingTime,
          publishDateRaw: fullBlog.publishDateRaw,
          status: fullBlog.status,
          featuredImageId: fullBlog.featuredImageId || "",
          seoTitle: fullBlog.seoTitle || "",
          seoDescription: fullBlog.seoDescription || "",
          excerpt: fullBlog.excerpt,
          content: contentBlocks
        });
        setLoading(false);
        setIsModalOpen(true);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Failed to fetch full blog details:", err);
        alert("Failed to retrieve full blog details.");
      });
  };

  const getBlockLabel = (block, index) => {
    const type = block.type;
    if (index === 0 && type === "paragraph") return "Introductory Paragraph";
    
    switch (type) {
      case "heading2":
        if (block.text?.toLowerCase().includes("conclusion")) return "Conclusion Section Heading";
        return "Section Heading (H2)";
      case "heading3":
        if (block.text?.toLowerCase().includes("phase") || block.text?.toLowerCase().includes("step")) return "Process Step Title (H3)";
        return "Sub-Section Title (H3)";
      case "paragraph":
        return "Section Body Paragraph";
      case "quote":
        return "Expert Quote / Citation text";
      case "bullet-list":
        return "Bullet Checklist Items";
      case "numbered-list":
        return "Numbered Sequence Checklist Items";
      case "table":
        return "Structured Corporate Data Table";
      case "highlight-box":
        return "Callout Box / Advisory Warning Alert Copy";
      case "image":
        return "Inline Graphic Image Illustration";
      default:
        return `${type.charAt(0).toUpperCase() + type.slice(1)} Block`;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Auto fill SEO title & slug if editing title for the first time
      if (name === "title" && modalMode === "add") {
        updated.seoTitle = value;
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return updated;
    });
  };

  // Content Block modifiers
  const addBlock = (type) => {
    let newBlock = { type };
    if (type === "paragraph" || type === "heading2" || type === "heading3" || type === "highlight-box") {
      newBlock.text = "";
    } else if (type === "quote") {
      newBlock.text = "";
      newBlock.author = "";
    } else if (type === "bullet-list" || type === "numbered-list") {
      newBlock.items = ["New list item"];
    } else if (type === "image") {
      newBlock.image_id = mediaList[0]?.id || "";
      newBlock.src = mediaList[0]?.url || "";
      newBlock.caption = "";
    } else if (type === "table") {
      newBlock.headers = ["Header 1", "Header 2"];
      newBlock.rows = [
        ["Cell 1", "Cell 2"]
      ];
    }

    setFormData(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }));
  };

  const updateBlockField = (index, field, value) => {
    setFormData(prev => {
      const updatedContent = [...prev.content];
      updatedContent[index] = { ...updatedContent[index], [field]: value };
      return { ...prev, content: updatedContent };
    });
  };

  const updateBlockListItems = (blockIndex, itemIndex, value) => {
    setFormData(prev => {
      const updatedContent = [...prev.content];
      const items = [...updatedContent[blockIndex].items];
      items[itemIndex] = value;
      updatedContent[blockIndex] = { ...updatedContent[blockIndex], items };
      return { ...prev, content: updatedContent };
    });
  };

  const addBlockListItem = (blockIndex) => {
    setFormData(prev => {
      const updatedContent = [...prev.content];
      const items = [...updatedContent[blockIndex].items, ""];
      updatedContent[blockIndex] = { ...updatedContent[blockIndex], items };
      return { ...prev, content: updatedContent };
    });
  };

  const removeBlockListItem = (blockIndex, itemIndex) => {
    setFormData(prev => {
      const updatedContent = [...prev.content];
      const items = [...updatedContent[blockIndex].items].filter((_, idx) => idx !== itemIndex);
      updatedContent[blockIndex] = { ...updatedContent[blockIndex], items };
      return { ...prev, content: updatedContent };
    });
  };

  // Table Cell modifiers
  const updateTableCell = (blockIndex, rowIndex, cellIndex, value) => {
    setFormData(prev => {
      const updatedContent = [...prev.content];
      const rows = [...updatedContent[blockIndex].rows];
      const row = [...rows[rowIndex]];
      row[cellIndex] = value;
      rows[rowIndex] = row;
      updatedContent[blockIndex] = { ...updatedContent[blockIndex], rows };
      return { ...prev, content: updatedContent };
    });
  };

  const updateTableHeader = (blockIndex, cellIndex, value) => {
    setFormData(prev => {
      const updatedContent = [...prev.content];
      const headers = [...updatedContent[blockIndex].headers];
      headers[cellIndex] = value;
      updatedContent[blockIndex] = { ...updatedContent[blockIndex], headers };
      return { ...prev, content: updatedContent };
    });
  };

  const addTableRow = (blockIndex) => {
    setFormData(prev => {
      const updatedContent = [...prev.content];
      const colCount = updatedContent[blockIndex].headers.length;
      const rows = [...updatedContent[blockIndex].rows, Array(colCount).fill("")];
      updatedContent[blockIndex] = { ...updatedContent[blockIndex], rows };
      return { ...prev, content: updatedContent };
    });
  };

  const removeTableRow = (blockIndex, rowIndex) => {
    setFormData(prev => {
      const updatedContent = [...prev.content];
      const rows = [...updatedContent[blockIndex].rows].filter((_, idx) => idx !== rowIndex);
      updatedContent[blockIndex] = { ...updatedContent[blockIndex], rows };
      return { ...prev, content: updatedContent };
    });
  };

  const addTableColumn = (blockIndex) => {
    setFormData(prev => {
      const updatedContent = [...prev.content];
      const headers = [...updatedContent[blockIndex].headers, `Header ${updatedContent[blockIndex].headers.length + 1}`];
      const rows = updatedContent[blockIndex].rows.map(row => [...row, ""]);
      updatedContent[blockIndex] = { ...updatedContent[blockIndex], headers, rows };
      return { ...prev, content: updatedContent };
    });
  };

  const removeTableColumn = (blockIndex, colIndex) => {
    setFormData(prev => {
      const updatedContent = [...prev.content];
      const headers = [...updatedContent[blockIndex].headers].filter((_, idx) => idx !== colIndex);
      const rows = updatedContent[blockIndex].rows.map(row => row.filter((_, idx) => idx !== colIndex));
      updatedContent[blockIndex] = { ...updatedContent[blockIndex], headers, rows };
      return { ...prev, content: updatedContent };
    });
  };

  // Block movement/delete
  const moveBlock = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= formData.content.length) return;

    setFormData(prev => {
      const content = [...prev.content];
      const temp = content[index];
      content[index] = content[targetIndex];
      content[targetIndex] = temp;
      return { ...prev, content };
    });
  };

  const removeBlock = (index) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content.filter((_, idx) => idx !== index)
    }));
  };

  // Handle save
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.title.trim() || !formData.category_id || !formData.excerpt.trim()) {
      setFormError("Title, Category, and Card Excerpt are required fields.");
      return;
    }

    setSaving(true);

    const apiCall = modalMode === "add" 
      ? axios.post(`${API_BASE_URL}/blogs.php`, formData)
      : axios.put(`${API_BASE_URL}/blogs.php?id=${selectedBlogId}`, formData);

    apiCall
      .then((res) => {
        setSaving(false);
        setIsModalOpen(false);
        setSuccessMsg(modalMode === "add" ? "Blog created successfully!" : "Blog updated successfully!");
        fetchBlogs();
        setTimeout(() => setSuccessMsg(null), 3000);
      })
      .catch((err) => {
        setSaving(false);
        console.error("Save blog failed:", err);
        setFormError(err.response?.data?.details || err.response?.data?.error || "Failed to save blog post.");
      });
  };

  // Delete Blog
  const handleDeleteBlog = (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete the post "${title}"?`)) {
      axios.delete(`${API_BASE_URL}/blogs.php?id=${id}`)
        .then((res) => {
          setSuccessMsg("Blog post removed successfully.");
          fetchBlogs();
          setTimeout(() => setSuccessMsg(null), 3000);
        })
        .catch((err) => {
          console.error("Delete blog failed:", err);
          setError("Failed to delete the blog post.");
        });
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-dark tracking-tight">Blogs Catalog</h1>
          <p className="text-slate-500 text-sm mt-1">Manage article contents, categories, publishing workflows, and meta-descriptions.</p>
        </div>
        <div>
          <button 
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-blue hover:bg-opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-200 shadow-sm focus:outline-none hover:scale-[1.01]"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add New Post</span>
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

      {/* Search Bar */}
      <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3.5 py-2 w-full max-w-md shadow-xs">
        <FiSearch className="text-slate-400 w-4 h-4 mr-2" />
        <input 
          type="text"
          placeholder="Filter by title, category, author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-0 text-xs text-brand-dark focus:outline-none w-full font-medium"
        />
      </div>

      {/* Table Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3 bg-white border border-slate-200 rounded-xl">
          <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-400">Fetching blogs catalog...</span>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-brand-gray">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Publish Date</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-brand-light/30 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold text-brand-dark max-w-sm truncate" title={blog.title}>
                        {blog.title}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                        {blog.category}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">
                        {blog.author}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-400">
                        {blog.publishDate}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          blog.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-xs font-semibold space-x-3">
                        <button 
                          onClick={() => handleOpenEdit(blog)}
                          className="text-brand-blue hover:text-brand-dark transition-colors inline-flex items-center gap-1 focus:outline-none"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteBlog(blog.id, blog.title)}
                          className="text-red-500 hover:text-red-750 transition-colors inline-flex items-center gap-1 focus:outline-none"
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
                      No blog posts found matching current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden animate-zoom-in my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-brand-gray">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-brand-dark flex items-center gap-2">
                <FiFileText className="w-4 h-4 text-brand-blue" />
                <span>{modalMode === "add" ? "Create New Publication" : "Edit Compliance Publication"}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-650 transition-colors focus:outline-none"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-xs font-bold flex items-center gap-2">
                  <FiAlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* GRID: Basic Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Post Title <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter clean publication title"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Slug Link (URL Address)
                  </label>
                  <input 
                    type="text" 
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="steps-to-register-company"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue font-mono"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                  >
                    <option value="">-- Choose Category --</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Author Selection */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Central Author Profile
                  </label>
                  <select 
                    name="author_id"
                    value={formData.author_id}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                  >
                    <option value="">-- Guest/External Author (Fill details below) --</option>
                    {authors.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.role})</option>
                    ))}
                  </select>
                </div>

                {/* Guest Author Name */}
                {!formData.author_id && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Guest Author Name
                    </label>
                    <input 
                      type="text" 
                      name="guest_author_name"
                      value={formData.guest_author_name}
                      onChange={handleInputChange}
                      placeholder="e.g Rohan Mehta"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                )}

                {/* Reading time */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Reading Time Estimate
                  </label>
                  <input 
                    type="text" 
                    name="readingTime"
                    value={formData.readingTime}
                    onChange={handleInputChange}
                    placeholder="e.g. 8 min read"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                  />
                </div>

                {/* Publish Date */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Publish Date
                  </label>
                  <input 
                    type="date" 
                    name="publishDateRaw"
                    value={formData.publishDateRaw}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue font-mono"
                  />
                </div>



                {/* Status Selection */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Workflow Status
                  </label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                  >
                    <option value="draft">Draft (Private)</option>
                    <option value="published">Published (Public)</option>
                  </select>
                </div>
              </div>

              {/* Card Excerpt */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Card Excerpt Summary <span className="text-red-500">*</span>
                </label>
                <textarea 
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="Provide a concise 2-3 sentence overview displayed on catalog listing cards."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* GRID: SEO Metadata */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-4">
                <h4 className="font-extrabold text-[11px] text-brand-dark uppercase tracking-wider border-b border-slate-200 pb-2">
                  SEO Search Engine Metadata
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* SEO Title */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      SEO Document Title
                    </label>
                    <input 
                      type="text" 
                      name="seoTitle"
                      value={formData.seoTitle}
                      onChange={handleInputChange}
                      placeholder="Title tag displayed in search results tabs"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  {/* SEO Meta description */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      SEO Meta Description
                    </label>
                    <input 
                      type="text" 
                      name="seoDescription"
                      value={formData.seoDescription}
                      onChange={handleInputChange}
                      placeholder="Summary snippet indexing page contents"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>
              </div>

              {/* FIXED CONTENT BLOCKS CMS */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-xs text-brand-dark uppercase tracking-widest border-b border-slate-200 pb-3">
                  <span>Publication Article Contents</span>
                </h4>

                <div className="space-y-4">
                  {formData.content.map((block, index) => (
                    <div 
                      key={index} 
                      className="border border-slate-200 bg-white rounded-xl shadow-xs p-4 hover:border-slate-300 transition-colors"
                    >
                      {/* Fixed Block Descriptive Label */}
                      <div className="text-[10px] font-black text-brand-blue uppercase tracking-widest bg-brand-blue/5 border border-brand-blue/10 px-2.5 py-1 rounded-full inline-block mb-3.5">
                        {getBlockLabel(block, index)}
                      </div>

                      {/* DYNAMIC FIELD RENDERERS */}

                      {/* 1. Paragraph / Headings / Highlight-box inputs */}
                      {(block.type === "paragraph" || block.type === "heading2" || block.type === "heading3" || block.type === "highlight-box") && (
                        <div>
                          <textarea 
                            rows={block.type === "paragraph" || block.type === "highlight-box" ? "3" : "1"}
                            value={block.text || ""}
                            onChange={(e) => updateBlockField(index, "text", e.target.value)}
                            placeholder={`Type ${block.type} content...`}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue font-medium leading-relaxed"
                          />
                        </div>
                      )}

                      {/* 2. Quote input */}
                      {block.type === "quote" && (
                        <div className="space-y-2">
                          <textarea 
                            rows="2"
                            value={block.text || ""}
                            onChange={(e) => updateBlockField(index, "text", e.target.value)}
                            placeholder="Type quote content..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-blue font-medium italic"
                          />
                          <div className="flex items-center gap-2">
                            <FiCornerDownRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <input 
                              type="text" 
                              value={block.author || ""}
                              onChange={(e) => updateBlockField(index, "author", e.target.value)}
                              placeholder="Citation Author (e.g. Pranav Singhania, Co-Founder)"
                              className="w-full max-w-sm bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 focus:outline-none focus:border-brand-blue font-bold uppercase tracking-wider"
                            />
                          </div>
                        </div>
                      )}

                      {/* 3. Bullet & Numbered lists inputs */}
                      {(block.type === "bullet-list" || block.type === "numbered-list") && (
                        <div className="space-y-2.5">
                          <div className="space-y-1.5">
                            {(block.items || []).map((item, itemIdx) => (
                              <div key={itemIdx} className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-400 font-bold shrink-0 w-4">
                                  {block.type === "bullet-list" ? "•" : `${itemIdx + 1}.`}
                                </span>
                                <input 
                                  type="text" 
                                  value={item}
                                  onChange={(e) => updateBlockListItems(index, itemIdx, e.target.value)}
                                  placeholder="List item description..."
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                                />
                                <button 
                                  type="button" 
                                  onClick={() => removeBlockListItem(index, itemIdx)}
                                  className="text-slate-400 hover:text-red-500 p-1"
                                >
                                  <FiX className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button 
                            type="button" 
                            onClick={() => addBlockListItem(index)}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-blue uppercase tracking-wider focus:outline-none hover:underline"
                          >
                            <FiPlus className="w-3 h-3" />
                            <span>Add Item</span>
                          </button>
                        </div>
                      )}

                      {/* 4. Image Block input */}
                      {block.type === "image" && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                Upload Block Image
                              </label>
                              <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const uploadFormData = new FormData();
                                    uploadFormData.append("image", file);
                                    uploadFormData.append("alt_text", block.caption || "Article block image");
                                    uploadFormData.append("title", block.caption || "Article block image");
                                    
                                    axios.post(`${API_BASE_URL}/images.php`, uploadFormData, {
                                      headers: { "Content-Type": "multipart/form-data" }
                                    })
                                      .then((res) => {
                                        updateBlockField(index, "image_id", res.data.id);
                                        updateBlockField(index, "src", res.data.url);
                                      })
                                      .catch((err) => {
                                        console.error("Block image upload failed:", err);
                                        alert("Failed to upload block image.");
                                      });
                                  }
                                }}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-brand-dark focus:outline-none focus:border-brand-blue file:mr-2 file:py-0.5 file:px-1.5 file:rounded file:border-0 file:text-[9px] file:font-bold file:uppercase file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                Caption Description
                              </label>
                              <input 
                                type="text"
                                value={block.caption || ""}
                                onChange={(e) => updateBlockField(index, "caption", e.target.value)}
                                placeholder="Caption text displayed under image"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-brand-dark focus:outline-none focus:border-brand-blue"
                              />
                            </div>
                          </div>
                          {block.src && (
                            <div className="border border-slate-200 rounded-lg overflow-hidden max-w-sm aspect-[16/9] bg-slate-50">
                              <img src={block.src} alt={block.caption || "Preview"} className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* 5. Table block editor */}
                      {block.type === "table" && (
                        <div className="space-y-3 overflow-x-auto">
                          <table className="min-w-full border-collapse border border-slate-200 rounded-lg text-xs">
                            <thead>
                              <tr className="bg-slate-50">
                                {block.headers.map((hdr, hdrIdx) => (
                                  <th key={hdrIdx} className="border border-slate-200 p-2">
                                    <div className="flex items-center gap-1">
                                      <input 
                                        type="text" 
                                        value={hdr}
                                        onChange={(e) => updateTableHeader(index, hdrIdx, e.target.value)}
                                        className="bg-transparent border-0 font-bold text-center text-slate-700 w-full focus:outline-none"
                                      />
                                      <button 
                                        type="button" 
                                        onClick={() => removeTableColumn(index, hdrIdx)}
                                        className="text-slate-400 hover:text-red-500 p-0.5"
                                        disabled={block.headers.length <= 1}
                                        title="Remove Column"
                                      >
                                        <FiX className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </th>
                                ))}
                                <th className="border border-slate-200 p-1 w-8 text-center bg-slate-100">
                                  <button 
                                    type="button" 
                                    onClick={() => addTableColumn(index)}
                                    className="text-brand-blue hover:text-brand-dark p-0.5 focus:outline-none"
                                    title="Add Column"
                                  >
                                    <FiPlus className="w-3.5 h-3.5" />
                                  </button>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {block.rows.map((row, rowIdx) => (
                                <tr key={rowIdx}>
                                  {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className="border border-slate-200 p-1.5">
                                      <input 
                                        type="text" 
                                        value={cell}
                                        onChange={(e) => updateTableCell(index, rowIdx, cellIdx, e.target.value)}
                                        className="bg-transparent border-0 text-slate-600 w-full focus:outline-none"
                                      />
                                    </td>
                                  ))}
                                  <td className="border border-slate-200 p-1 text-center bg-slate-50 w-8">
                                    <button 
                                      type="button" 
                                      onClick={() => removeTableRow(index, rowIdx)}
                                      className="text-slate-400 hover:text-red-500 p-0.5"
                                      disabled={block.rows.length <= 1}
                                      title="Remove Row"
                                    >
                                      <FiTrash className="w-3 h-3" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="flex gap-4">
                            <button 
                              type="button" 
                              onClick={() => addTableRow(index)}
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-blue uppercase tracking-wider focus:outline-none hover:underline"
                            >
                              <FiPlus className="w-3 h-3" />
                              <span>Add Row</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-brand-gray text-slate-500 font-bold text-xs rounded-lg transition-colors focus:outline-none"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-brand-blue hover:bg-opacity-95 text-white font-bold text-xs rounded-lg transition-colors focus:outline-none flex items-center gap-2"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving changes...</span>
                    </>
                  ) : (
                    <span>Save Publication</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
