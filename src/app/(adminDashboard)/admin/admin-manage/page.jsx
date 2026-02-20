"use client";

import { useState, useEffect } from "react";
import useAxiosPrivate from "@/hook/useAxiosPrivate";

const AdminManagePage = () => {
  const axiosPrivate = useAxiosPrivate();

  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("list");

  // 🔵 Fetch Admin List
  const fetchAdmins = async () => {
    try {
      const res = await axiosPrivate.get("/api/admin/get");
      setAdmins(res.data.admins);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 🟡 Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🟢 Create Admin
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Email and Password required!");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosPrivate.post("/api/admin/create", formData);

      if (res.status === 201) {
        alert("✅ Admin created successfully!");
        setFormData({ email: "", password: "" });
        setActiveTab("list");
        fetchAdmins();
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Delete Admin
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;

    try {
      const res = await axiosPrivate.delete("/api/admin/delete", {
        data: { id },
      });

      if (res.status === 200) {
        alert("✅ Admin deleted successfully!");
        fetchAdmins();
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete admin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🔐 Admin Management
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setActiveTab("list")}
            className={`flex-1 py-2 ${
              activeTab === "list"
                ? "border-b-2 border-blue-600 text-blue-600"
                : ""
            }`}
          >
            Admin List ({admins.length})
          </button>

          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-2 ${
              activeTab === "form"
                ? "border-b-2 border-blue-600 text-blue-600"
                : ""
            }`}
          >
            ➕ Add Admin
          </button>
        </div>

        {/* LIST */}
        {activeTab === "list" ? (
          <div className="space-y-4">
            {admins.length === 0 ? (
              <p className="text-gray-500 text-center">No admins found</p>
            ) : (
              admins.map((admin) => (
                <div
                  key={admin._id}
                  className="flex justify-between items-center border p-4 rounded"
                >
                  <div>
                    <p className="font-medium">{admin.email}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(admin._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          /* FORM */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create Admin"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminManagePage;
