"use client";

import React, { useEffect, useState } from "react";
import uploadImageToImgBB from "@/components/imagebbUpload/ImageBbUpload";
import useAxiosPrivate from "@/hook/useAxiosPrivate";

const PhotoManagePage = () => {
  const AxiosSecure = useAxiosPrivate();
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageList, setImageList] = useState([]);

  // Fetch saved photos
  const fetchPhotos = async () => {
    try {
      const res = await AxiosSecure.get("/api/images");
      setImageList(res.data);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Handle file input
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const urls = [];
      for (const file of files) {
        const url = await uploadImageToImgBB(file);
        urls.push(url);
      }
      setImages([...images, ...urls]);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // Submit new gallery
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || images.length === 0) {
      alert("Title and at least one image required!");
      return;
    }

    try {
      const payload = { title, images };
      await AxiosSecure.post("/api/images", payload);

      await fetch(`/api/revalidate?tag=images`);
      setTitle("");
      setImages([]);
      alert("Images added successfully!");
      fetchPhotos();
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Failed to save images!");
    }
  };

  // Delete image
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      await AxiosSecure.delete(`/api/images/${id}`);
      setImageList(imageList.filter((img) => img._id !== id));
      alert("Image deleted successfully!");
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete image!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4 border border-gray-100">
            <span className="text-3xl">📸</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Photo Gallery Management
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Input */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">
                    Gallery Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a descriptive title for your gallery..."
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-lg"
                    required
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">
                    Upload Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-blue-400 transition-colors bg-gray-50/50">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full cursor-pointer"
                    />
                    <div className="text-center mt-2">
                      <p className="text-gray-600 font-medium">
                        Click to browse or drag & drop
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Supports JPEG, PNG, WebP, GIF
                      </p>
                    </div>
                  </div>
                </div>

                {/* Upload Progress */}
                {uploading && (
                  <div className="flex items-center justify-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                    <span className="text-blue-700 font-semibold">
                      Uploading images...
                    </span>
                  </div>
                )}

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Selected Images ({images.length})
                      </h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Ready to upload
                      </span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {images.map((url, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={url}
                            alt={`img-${idx}`}
                            className="w-full h-24 object-cover rounded-xl border-2 border-green-200 shadow-sm group-hover:border-green-400 transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setImages(images.filter((_, i) => i !== idx))
                            }
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  🎉 Create Gallery
                </button>
              </form>
            </div>
          </div>

          {/* Gallery List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Your Galleries
                  </h2>
                  <p className="text-gray-600">
                    {imageList.length} collections
                  </p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                  {imageList.length}
                </div>
              </div>

              {imageList.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50">
                  <div className="text-4xl mb-4">🖼️</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No galleries yet
                  </h3>
                  <p className="text-gray-500">
                    Create your first gallery to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {imageList.map((photo) => (
                    <div
                      key={photo._id}
                      className="group border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 bg-white"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate mb-1">
                            {photo.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => handleDelete(photo._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoManagePage;
