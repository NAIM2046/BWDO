"use client";

import React, { useEffect, useState } from "react";
import useAxiosPrivate from "@/hook/useAxiosPrivate";
import uploadImageToImgBB from "@/components/imagebbUpload/ImageBbUpload";

const NewsManagePage = () => {
  const AxiosSecure = useAxiosPrivate();
  const [newsList, setNewsList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    link: "",
    author: "",
  });

  // Success/Error message helper
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  // ✅ Fetch all news
  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const result = await AxiosSecure.get("/api/news");
      setNewsList(result.data);
    } catch (error) {
      console.error("Failed to load news:", error);
      showMessage("Failed to load news", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showMessage("Please select a valid image file", "error");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showMessage("Image size should be less than 5MB", "error");
      return;
    }

    setImageLoading(true);
    try {
      const imageUrl = await uploadImageToImgBB(file);
      setFormData({ ...formData, imageUrl });
      showMessage("✅ Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      showMessage("❌ Image upload failed", "error");
    } finally {
      setImageLoading(false);
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      link: "",
      author: "",
    });
    setEditingId(null);
  };

  // ✅ Handle submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId) {
        // Update existing news
        await AxiosSecure.put(`/api/news/${editingId}`, formData);
        showMessage("✅ News updated successfully!");
      } else {
        // Add new news
        await AxiosSecure.post("/api/news", formData);
        showMessage("✅ News added successfully!");
      }

      resetForm();
      fetchNews();
    } catch (error) {
      console.error(error.message);
      showMessage("❌ Failed to save news", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle Edit button click
  const handleEdit = (news) => {
    setFormData({
      title: news.title,
      description: news.description,
      imageUrl: news.imageUrl,
      link: news.link,
      author: news.author,
    });
    setEditingId(news._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    showMessage("Editing news: " + news.title, "info");
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    const newsItem = newsList.find(news => news._id === id);
    if (!confirm(`Are you sure you want to delete "${newsItem?.title}"?`)) return;

    try {
      await AxiosSecure.delete(`/api/news/${id}`);
      showMessage("🗑️ News deleted successfully!");
      fetchNews();
    } catch (error) {
      console.error(error);
      showMessage("❌ Failed to delete news", "error");
    }
  };

  // ✅ Cancel edit
  const handleCancelEdit = () => {
    resetForm();
    showMessage("Edit cancelled", "info");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📰 News Management</h1>
          <p className="text-gray-600 text-lg">
            {editingId ? "Edit existing news article" : "Create and manage news articles"}
          </p>
        </div>

        {/* Alert Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg border-l-4 ${
            message.type === "error" 
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {editingId ? "✏️ Edit News" : "📝 Add New News"}
              </h2>
              {editingId && (
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">News Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a compelling news title"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a brief description of the news..."
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-vertical min-h-[100px]"
                  rows="3"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Featured Image
                  <span className="text-sm text-gray-500 ml-2">(Max 5MB)</span>
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                  />
                  
                  {imageLoading && (
                    <div className="flex items-center justify-center p-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-3 text-gray-600">Uploading image...</span>
                    </div>
                  )}

                  {formData.imageUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600 mb-2">✅ Image ready!</p>
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full max-w-xs h-48 object-cover rounded-xl border-2 border-green-200"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Link & Author Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Link */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">News Link</label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    placeholder="https://example.com/news"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author name"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || imageLoading}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                  isLoading || imageLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : editingId
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </span>
                ) : editingId ? (
                  "📤 Update News"
                ) : (
                  "📥 Add News"
                )}
              </button>
            </form>
          </div>

          {/* News List Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">📋 All News Articles</h3>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {newsList.length} articles
              </span>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : newsList.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📰</div>
                <h4 className="text-xl font-semibold text-gray-600 mb-2">No News Articles</h4>
                <p className="text-gray-500">Get started by creating your first news article!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {newsList.map((news) => (
                  <div
                    key={news._id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition group"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate group-hover:text-blue-600 transition">
                          {news.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {news.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>By {news.author}</span>
                            <span>•</span>
                            <span>{new Date(news.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                            <button
                              onClick={() => handleEdit(news)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(news._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsManagePage;