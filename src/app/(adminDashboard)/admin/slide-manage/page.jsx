"use client";
import React, { useState, useEffect } from "react";
import uploadImageToImgBB from "@/components/imagebbUpload/ImageBbUpload";
import useAxiosPrivate from "@/hook/useAxiosPrivate";

const SlideManagePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [slides, setSlides] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    
    description: "",
    number: "",
    image: "",
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("list"); // "list" or "add"

  // Fetch slides from backend
  const fetchSlides = async () => {
    try {
      const res = await axiosPrivate.get("/api/slide");
      setSlides(res.data.slides);
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // Upload image to ImgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const imageUrl = await uploadImageToImgBB(file);
      if (imageUrl) {
        setFormData({ ...formData, image: imageUrl });
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form (Add slide)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosPrivate.post("/api/slide", formData);

      if (res.status === 201) {
        alert("✅ Slide created successfully!");
        setFormData({
          title: "",
         
          description: "",
          number: "",
          image: "",
        });
        fetchSlides();
        setActiveTab("list");
      } else {
        alert("❌ Failed to create slide");
      }
    } catch (error) {
      console.error("Error submitting slide:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Delete slide
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;
    try {
      const res = await axiosPrivate.delete("/api/slide", { data: { id } });

      if (res.status === 200) {
        alert("Slide deleted successfully!");
        fetchSlides();
      } else {
        alert("Failed to delete slide.");
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🖼️ Slide Management
          </h1>
          <p className="text-gray-600">Manage your presentation slides</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("list")}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === "list"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📜 View Slides ({slides.length})
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === "add"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              ➕ Add New Slide
            </button>
          </div>

          <div className="p-6">
            {activeTab === "list" ? (
              /* Slide List */
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Existing Slides
                  </h3>
                  <button
                    onClick={() => setActiveTab("add")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add New Slide
                  </button>
                </div>

                {slides.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📄</div>
                    <p className="text-gray-500 text-lg mb-4">
                      No slides found
                    </p>
                    <button
                      onClick={() => setActiveTab("add")}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Your First Slide
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {slides.map((slide) => (
                      <div
                        key={slide._id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-4">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-24 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 truncate">
                                {slide.title}
                              </h4>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                #{slide.number}
                              </span>
                            </div>
                            
                            {slide.description && (
                              <p className="text-gray-500 text-sm truncate">
                                {slide.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => handleDelete(slide._id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded-md transition-colors text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Add Slide Form */
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Add New Slide
                  </h3>
                  <button
                    onClick={() => setActiveTab("list")}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    ← Back to Slides
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Slide Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Enter slide title"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Slide Number *
                        </label>
                        <input
                          type="number"
                          name="number"
                          value={formData.number}
                          onChange={handleChange}
                          placeholder="Enter slide number"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Enter slide description"
                          rows="4"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Slide Image *
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer block"
                          >
                            {formData.image ? (
                              <div className="space-y-2">
                                <img
                                  src={formData.image}
                                  alt="Uploaded"
                                  className="w-32 h-24 object-cover rounded-lg mx-auto border"
                                />
                                <p className="text-sm text-green-600">
                                  ✅ Image uploaded successfully
                                </p>
                                <p className="text-xs text-gray-500">
                                  Click to change image
                                </p>
                              </div>
                            ) : (
                              <div className="py-4">
                                <div className="text-4xl mb-2">📁</div>
                                <p className="text-gray-600">
                                  Click to upload image
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  PNG, JPG, JPEG up to 5MB
                                </p>
                              </div>
                            )}
                          </label>
                        </div>
                        {uploading && (
                          <div className="mt-2 text-blue-600 text-sm flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                            Uploading image...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab("list")}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || uploading}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Saving...
                        </div>
                      ) : (
                        "Add Slide"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideManagePage;