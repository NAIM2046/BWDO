"use client";

import AdminSideBar from "@/components/adminSideBar/AdminSideBar";


const AdminDashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSideBar/>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        </header>

        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
