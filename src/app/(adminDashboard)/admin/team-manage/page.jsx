"use client";

import { useState, useEffect } from "react";
import uploadImageToImgBB from "@/components/imagebbUpload/ImageBbUpload";
import useAxiosPrivate from "@/hook/useAxiosPrivate";

const TeamManagePage = () => {
  const axiosPrivate = useAxiosPrivate();

  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    bio: "",
    social: {
      facebook: "",
      linkedin: "",
      email: "",
    },
    rank: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("list"); // "list" or "form"

  // 🟢 Fetch all team members
  const fetchTeam = async () => {
    try {
      const res = await axiosPrivate.get("/api/team");
      setTeam(res.data.team);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // 🟡 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["facebook", "linkedin", "email"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        social: {
          ...prev.social,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 🟡 Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImageToImgBB(file);
      if (imageUrl) setFormData({ ...formData, image: imageUrl });
      else alert("Image upload failed!");
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  // 🟢 Add or Update team member
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.image) {
      alert("Name, Role, and Image are required!");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        // 🟡 Update
        const res = await axiosPrivate.put("/api/team", {
          id: editingId,
          ...formData,
        });
        if (res.status === 200) {
          alert("✅ Team member updated successfully!");

          await fetch(`/api/revalidate?tag=team`); // Revalidate team list
        } else {
          alert("❌ Failed to update team member");
        }
      } else {
        // 🟡 Add new
        const res = await axiosPrivate.post("/api/team", formData);
        if (res.status === 201) {
          await fetch(`/api/revalidate?tag=team`); // Revalidate team list
          alert("✅ Team member added successfully!");
        } else {
          alert("❌ Failed to add team member");
        }
      }

      // Reset form
      setFormData({
        name: "",
        role: "",
        image: "",
        bio: "",
        social: { facebook: "", linkedin: "", email: "" },
        rank: 0,
      });
      setEditingId(null);
      setActiveTab("list");
      fetchTeam();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Delete team member
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      const res = await axiosPrivate.delete("/api/team", { data: { id } });
      if (res.status === 200) {
        alert("✅ Team member deleted successfully!");
        fetchTeam();
      } else {
        alert("❌ Failed to delete team member");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ✏️ Edit team member
  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      role: member.role,
      image: member.image,
      bio: member.bio,
      social: member.social || { facebook: "", linkedin: "", email: "" },
      rank: member.rank || 0,
    });
    setEditingId(member._id);
    setActiveTab("form");
  };

  // 🔄 Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      image: "",
      bio: "",
      social: { facebook: "", linkedin: "", email: "" },
      rank: 0,
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            👥 Team Management
          </h1>
          <p className="text-gray-600">
            Manage your team members and their information
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="flex border-b">
            <button
              onClick={() => {
                setActiveTab("list");
                resetForm();
              }}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === "list"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              👥 View Team ({team.length})
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === "form"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {editingId ? "✏️ Edit Member" : "➕ Add New Member"}
            </button>
          </div>

          <div className="p-6">
            {activeTab === "list" ? (
              /* Team List */
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Team Members
                  </h3>
                  <button
                    onClick={() => setActiveTab("form")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <span>➕</span>
                    Add New Member
                  </button>
                </div>

                {team.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👥</div>
                    <p className="text-gray-500 text-lg mb-4">
                      No team members found
                    </p>
                    <button
                      onClick={() => setActiveTab("form")}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Your First Team Member
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {team.map((member) => (
                      <div
                        key={member._id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col items-center text-center mb-4">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-24 h-24 object-cover rounded-full mb-3 border-4 border-blue-50"
                          />
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {member.name}
                          </h4>
                          <p className="text-blue-600 font-medium text-sm">
                            {member.role}
                          </p>
                          {member.rank > 0 && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                              Rank: {member.rank}
                            </span>
                          )}
                        </div>

                        {member.bio && (
                          <p className="text-gray-600 text-sm mb-4 text-center">
                            {member.bio}
                          </p>
                        )}

                        {/* Social Links */}
                        <div className="flex justify-center space-x-3 mb-4">
                          {member.social?.facebook && (
                            <a
                              href={member.social.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <span className="text-sm">📘</span>
                            </a>
                          )}
                          {member.social?.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-800 hover:text-blue-900"
                            >
                              <span className="text-sm">💼</span>
                            </a>
                          )}
                          {member.social?.email && (
                            <a
                              href={`mailto:${member.social.email}`}
                              className="text-red-500 hover:text-red-700"
                            >
                              <span className="text-sm">✉️</span>
                            </a>
                          )}
                        </div>

                        <div className="flex justify-center space-x-2 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => handleEdit(member)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1 rounded-md transition-colors text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(member._id)}
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
              /* Add/Edit Form */
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {editingId ? "Edit Team Member" : "Add New Team Member"}
                  </h3>
                  <button
                    onClick={() => {
                      setActiveTab("list");
                      resetForm();
                    }}
                    className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
                  >
                    ← Back to Team
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter full name"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role/Position *
                        </label>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          placeholder="e.g., CEO, Developer, Designer"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio/Description
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          placeholder="Brief description about the team member"
                          rows="4"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Display Rank
                        </label>
                        <input
                          type="number"
                          name="rank"
                          value={formData.rank}
                          onChange={handleChange}
                          placeholder="Lower numbers show first"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profile Image *
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
                                  className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-blue-50"
                                />
                                <p className="text-sm text-green-600">
                                  ✅ Image uploaded successfully
                                </p>
                                <p className="text-xs text-gray-500">
                                  Click to change image
                                </p>
                              </div>
                            ) : (
                              <div className="py-6">
                                <div className="text-4xl mb-2">📷</div>
                                <p className="text-gray-600">
                                  Click to upload profile image
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

                      {/* Social Links */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-700">
                          Social Links
                        </h4>

                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            Facebook URL
                          </label>
                          <input
                            type="url"
                            name="facebook"
                            value={formData.social.facebook}
                            onChange={handleChange}
                            placeholder="https://facebook.com/username"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            LinkedIn URL
                          </label>
                          <input
                            type="url"
                            name="linkedin"
                            value={formData.social.linkedin}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.social.email}
                            onChange={handleChange}
                            placeholder="team.member@example.com"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("list");
                        resetForm();
                      }}
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
                          {editingId ? "Updating..." : "Saving..."}
                        </div>
                      ) : editingId ? (
                        "Update Team Member"
                      ) : (
                        "Add Team Member"
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

export default TeamManagePage;
