"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import useAxiosPrivate from "@/hook/useAxiosPrivate";
import uploadImageToImgBB from "@/components/imagebbUpload/ImageBbUpload";
import BlogList from "@/components/blogList/BlogList";

const BlogManagePage = () => {
  const AxiosSecure = useAxiosPrivate();
  const [blogList, setBlogList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // File input refs for reset functionality
  const coverImageInputRef = useRef(null);
  const authorAvatarInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const contentImageInputRefs = useRef({});

  const [formData, setFormData] = useState({
    title: "",
    coverImage: "",
    author: {
      name: "",
      role: "",
      avatar: ""
    },
    date: new Date().toISOString().split('T')[0],
    readTime: "",
    tags: [],
    category: "",
    shortDescription : "",
    content: [],
    gallery: [],
    videoUrl: ""
  });

  const [tagInput, setTagInput] = useState("");

  // ✅ Warn about unsaved changes before navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (unsavedChanges && editingId) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [unsavedChanges, editingId]);

  // Success/Error message helper
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  // ✅ Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const result = await AxiosSecure.get("/api/blogs");
      setBlogList(result.data);
    } catch (error) {
      console.error("Failed to load blogs:", error);
      showMessage("Failed to load blogs", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Handle input changes with unsaved tracking
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('author.')) {
      const authorField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        author: {
          ...prev.author,
          [authorField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    setUnsavedChanges(true);
  };

  // ✅ Handle tag input
  const handleTagInput = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
        setUnsavedChanges(true);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
    setUnsavedChanges(true);
  };

  // ✅ Validate file type
  const isValidImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      showMessage("Please select a valid image file (JPEG, PNG, WebP, or GIF)", "error");
      return false;
    }

    if (file.size > maxSize) {
      showMessage("Image size must be less than 5MB", "error");
      return false;
    }

    return true;
  };

  // ✅ Handle image upload with file reset
  const handleImageUpload = useCallback(async (e, type = "cover") => {
    const file = e.target.files[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      e.target.value = '';
      return;
    }

    setImageLoading(true);
    try {
      const imageUrl = await uploadImageToImgBB(file);

      if (type === "cover") {
        setFormData(prev => ({ ...prev, coverImage: imageUrl }));
      } else if (type === "author") {
        setFormData(prev => ({
          ...prev,
          author: { ...prev.author, avatar: imageUrl }
        }));
      }

      setUnsavedChanges(true);
      showMessage("✅ Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      showMessage("❌ Image upload failed", "error");
    } finally {
      setImageLoading(false);
      e.target.value = ''; // Reset file input
    }
  }, []);

  // ✅ Handle gallery image upload with better error handling
  const handleGalleryUpload = useCallback(async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Validate all files first
    const validFiles = files.filter(file => {
      if (!isValidImageFile(file)) {
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      e.target.value = '';
      return;
    }

    setImageLoading(true);
    try {
      const uploadPromises = validFiles.map(file =>
        uploadImageToImgBB(file).catch(error => {
          console.error(`Failed to upload ${file.name}:`, error);
          showMessage(`❌ Failed to upload ${file.name}`, "error");
          return null;
        })
      );

      const uploadedUrls = (await Promise.all(uploadPromises))
        .filter(url => url !== null);

      if (uploadedUrls.length > 0) {
        setFormData(prev => ({
          ...prev,
          gallery: [...prev.gallery, ...uploadedUrls]
        }));
        setUnsavedChanges(true);
        showMessage(`✅ ${uploadedUrls.length} image(s) uploaded to gallery!`);
      }
    } catch (error) {
      console.error(error);
      showMessage("❌ Gallery upload failed", "error");
    } finally {
      setImageLoading(false);
      e.target.value = ''; // Reset file input
    }
  }, []);

  // ✅ Content block management
  const addContentBlock = useCallback((type) => {
    const newBlock = {
      type,
      text: "",
      imageUrl: "",

    };
    setFormData(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }));
    setUnsavedChanges(true);
  }, []);

  const updateContentBlock = useCallback((index, field, value) => {
    const updatedContent = [...formData.content];
    updatedContent[index] = {
      ...updatedContent[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, content: updatedContent }));
    setUnsavedChanges(true);
  }, [formData.content]);

  const removeContentBlock = useCallback((index) => {
    const updatedContent = formData.content.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, content: updatedContent }));
    setUnsavedChanges(true);
  }, [formData.content]);

  const moveContentBlock = useCallback((index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === formData.content.length - 1)
    ) return;

    const updatedContent = [...formData.content];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [updatedContent[index], updatedContent[newIndex]] =
      [updatedContent[newIndex], updatedContent[index]];

    setFormData(prev => ({ ...prev, content: updatedContent }));
    setUnsavedChanges(true);
  }, [formData.content]);

  // ✅ Validate form data
  const validateFormData = () => {
    const errors = [];

    if (!formData.title.trim()) errors.push("Blog title is required");
    if (!formData.category.trim()) errors.push("Category is required");
    if (!formData.author.name.trim()) errors.push("Author name is required");
    if (!formData.coverImage) errors.push("Cover image is required");
    if (!formData.date) errors.push("Publish date is required");

    const emptyContentBlocks = formData.content.filter(
      block => !block.text?.trim() && !block.imageUrl?.trim()
    );
    if (emptyContentBlocks.length > 0) {
      errors.push(`${emptyContentBlocks.length} content block(s) are empty - please fill them or remove them`);
    }

    if (formData.content.length === 0) {
      errors.push("Please add at least one content block");
    }

    return errors;
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      coverImage: "",
      author: {
        name: "",
        role: "",
        avatar: ""
      },
      date: new Date().toISOString().split('T')[0],
      readTime: "",
      tags: [],
      category: "",
      content: [],
      gallery: [],
      videoUrl: "",
      shortDescription: ""
    });
    setEditingId(null);
    setTagInput("");
    setUnsavedChanges(false);

    // Reset file inputs
    if (coverImageInputRef.current) coverImageInputRef.current.value = '';
    if (authorAvatarInputRef.current) authorAvatarInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  // ✅ Handle submit with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFormData();
    if (validationErrors.length > 0) {
      showMessage(validationErrors[0], "error");
      return;
    }

    setIsLoading(true);

    const formattedData = {
      ...formData,
      date: new Date(formData.date).toLocaleDateString(
        navigator.language || 'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      )
    };
    console.log(formData)

    try {
      if (editingId) {
        await AxiosSecure.put(`/api/blogs/${editingId}`, formattedData);
        showMessage("✅ Blog updated successfully!");
      } else {
        await AxiosSecure.post("/api/blogs", formattedData);
        showMessage("✅ Blog added successfully!");
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error(error.message);
      const errorMsg = error.response?.data?.message || "Failed to save blog";
      showMessage(`❌ ${errorMsg}`, "error");
    } finally {
      setIsLoading(false);
    }
  };





  // ✅ Cancel edit with unsaved changes check
  const handleCancelEdit = () => {
    if (unsavedChanges && !confirm("You have unsaved changes. Are you sure you want to cancel?")) {
      return;
    }
    resetForm();
    showMessage("Edit cancelled", "info");
  };

  // ✅ Remove gallery image
  const removeGalleryImage = (index) => {
    const updatedGallery = formData.gallery.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, gallery: updatedGallery }));
    setUnsavedChanges(true);
  };

  // ✅ Handle content image upload
  const handleContentImageUpload = useCallback(async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      e.target.value = '';
      return;
    }

    try {
      setImageLoading(true);
      const imageUrl = await uploadImageToImgBB(file);
      updateContentBlock(index, 'imageUrl', imageUrl);
      showMessage("✅ Image added to content!");
    } catch (error) {
      console.error(error);
      showMessage("❌ Image upload failed", "error");
    } finally {
      setImageLoading(false);
      e.target.value = '';
    }
  }, [updateContentBlock]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto justify-center items-center">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 Blog Management</h1>
          <p className="text-gray-600 text-lg">
            {editingId ? "Edit existing blog post" : "Create and manage blog posts"}
          </p>
          {unsavedChanges && (
            <p className="text-orange-600 text-sm mt-2">⚠️ You have unsaved changes</p>
          )}
        </div>

        {/* Alert Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg border-l-4 ${message.type === "error"
            ? "bg-red-50 border-red-500 text-red-700"
            : message.type === "info"
              ? "bg-blue-50 border-blue-500 text-blue-700"
              : "bg-green-50 border-green-500 text-green-700"
            }`}>
            <div className="flex items-center">
              <span className="text-lg mr-2">
                {message.type === "error" ? "❌" : message.type === "info" ? "ℹ️" : "✅"}
              </span>
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Section - 2/3 width */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {editingId ? "✏️ Edit Blog Post" : "📝 Create New Blog Post"}
              </h2>
              {editingId && (
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  aria-label="Cancel editing"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">Blog Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a compelling blog title"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                    aria-label="Blog title"
                  />
                </div>

                {/* Category & Read Time */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Project Update, News"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                    aria-label="Blog category"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Read Time</label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder="e.g., 5 min read"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    aria-label="Read time"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Publish Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                    aria-label="Publish date"
                  />
                </div>

                {/* Video URL */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Video URL (Optional)</label>
                  <input
                    type="text"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    placeholder="v-khsdofiwjeoifj"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    aria-label="Video URL"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Tags</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInput}
                    placeholder="Type a tag and press Enter"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    aria-label="Blog tags"
                  />
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                          aria-label={`Remove tag ${tag}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">👤 Author Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Author Name *</label>
                    <input
                      type="text"
                      name="author.name"
                      value={formData.author.name}
                      onChange={handleChange}
                      placeholder="Author's full name"
                      className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                      aria-label="Author name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Author Role</label>
                    <input
                      type="text"
                      name="author.role"
                      value={formData.author.role}
                      onChange={handleChange}
                      placeholder="e.g., Project Coordinator"
                      className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      aria-label="Author role"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">Author Avatar</label>
                    <div className="flex items-center space-x-4">
                      <input
                        ref={authorAvatarInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "author")}
                        className="flex-1 border border-gray-300 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                        aria-label="Author avatar"
                      />
                      {formData.author.avatar && (
                        <img
                          src={formData.author.avatar}
                          alt="Author avatar"
                          className="w-16 h-16 rounded-full object-cover border-2 border-green-200"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🖼️ Cover Image *</h3>
                <div className="space-y-3">
                  <input
                    ref={coverImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "cover")}
                    className="w-full border border-gray-300 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                    required={!formData.coverImage}
                    aria-label="Cover image"
                  />

                  {imageLoading && (
                    <div className="flex items-center justify-center p-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-3 text-gray-600">Uploading image...</span>
                    </div>
                  )}

                  {formData.coverImage && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600 mb-2">✅ Cover image ready!</p>
                      <img
                        src={formData.coverImage}
                        alt="Cover preview"
                        className="w-full max-w-md h-48 object-cover rounded-xl border-2 border-green-200"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Short Description
                      </label>

                      <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        placeholder="e.g., Blog short description (around 100 words)..."
                        rows={4}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                        aria-label="Short description"
                      />
                    </div>


              {/* Content Blocks */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">📄 Content</h3>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => addContentBlock('heading')}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                      aria-label="Add heading block"
                    >
                      + Heading
                    </button>
                    <button
                      type="button"
                      onClick={() => addContentBlock('paragraph')}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                      aria-label="Add paragraph block"
                    >
                      + Paragraph
                    </button>
                    <button
                      type="button"
                      onClick={() => addContentBlock('blockquote')}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                      aria-label="Add quote block"
                    >
                      + Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => addContentBlock('image')}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                      aria-label="Add image block"
                    >
                      + Image
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {formData.content.map((block, index) => (
                    <div key={block._id || index} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {block.type}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => moveContentBlock(index, 'up')}
                            disabled={index === 0}
                            className="px-2 py-1 text-xs bg-white border border-gray-300 rounded disabled:opacity-50"
                            aria-label="Move content block up"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveContentBlock(index, 'down')}
                            disabled={index === formData.content.length - 1}
                            className="px-2 py-1 text-xs bg-white border border-gray-300 rounded disabled:opacity-50"
                            aria-label="Move content block down"
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() => removeContentBlock(index)}
                            className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                            aria-label="Remove content block"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {block.type === 'image' ? (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleContentImageUpload(e, index)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                            aria-label={`Upload image for block ${index + 1}`}
                          />
                          {block.imageUrl && (
                            <img
                              src={block.imageUrl}
                              alt="Content"
                              className="mt-2 max-w-xs h-32 object-cover rounded-lg"
                            />
                          )}
                        </div>
                      ) : (
                        <textarea
                          value={block.text}
                          onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                          placeholder={`Enter ${block.type} text...`}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-vertical min-h-[80px]"
                          rows={block.type === 'paragraph' ? 3 : 2}
                          aria-label={`${block.type} content for block ${index + 1}`}
                        />
                      )}
                    </div>
                  ))}

                  {formData.content.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No content added yet. Start by adding a heading or paragraph!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🖼️ Gallery Images</h3>
                <div className="space-y-3">
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="w-full border border-gray-300 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                    aria-label="Upload gallery images"
                  />

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {formData.gallery.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                          aria-label={`Remove gallery image ${index + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || imageLoading}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${isLoading || imageLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : editingId
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                aria-label={editingId ? "Update blog post" : "Create blog post"}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </span>
                ) : editingId ? (
                  "📤 Update Blog Post"
                ) : (
                  "📥 Create Blog Post"
                )}
              </button>
            </form>
          </div>

        </div>
        <BlogList setEditingId={setEditingId} setFormData={setFormData}  ></BlogList>
      </div>
    </div>
  );
};

export default BlogManagePage;