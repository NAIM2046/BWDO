"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Home,
  Users,
  PlusCircle,
  LogOut,
  ChevronDown,
  ChevronUp,
  LogOutIcon,
  NewspaperIcon,
  Newspaper,
 
} from "lucide-react";
import useAxiosPrivate from "@/hook/useAxiosPrivate";
import { FaPhotoFilm } from "react-icons/fa6";
import { BiPhotoAlbum } from "react-icons/bi";

const AdminSideBar = () => {
const AxiosPrivate = useAxiosPrivate();

  const logout = async()=> {
    // Clear token cookie and redirect to login

    
      const response = await AxiosPrivate.post('/api/admin/logout');
      if(response.status === 200){
        window.location.href = '/admin-login';
      }
       

  }
  const [open, setOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/admin" },
    { name: "Manage Admins", icon: <Users className="w-5 h-5" />, path: "/admin/admin-manage" },
    {
      name: "Slide Manage" , icon: <PlusCircle className="w-5 h-5" />, path: "/admin/slide-manage"
    },
    {
      name: "Team Manage" , icon: <Users className="w-5 h-5" />, path: "/admin/team-manage"
    },
    {
      name: "Project Manage" , icon: <PlusCircle className="w-5 h-5" />, path: "/admin/project-manage"
    },
    {
      name: "News Manage" , icon: <NewspaperIcon className="w-5 h-5" />, path: "/admin/news-manage"
    },
    {
       name: "Blog Manage" , icon: <Newspaper className="w-5 h-5" />, path: "/admin/blog-manage"
    },

    {
       name: "Photo Manage" , icon: <BiPhotoAlbum className="w-5 h-5" />, path: "/admin/photo-manage"
    },


   
  ];

  return (
    <div className={`bg-gray-800 text-white h-screen p-5 ${open ? "w-64" : "w-20"} transition-all duration-300`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className={`font-bold text-xl ${!open && "hidden"}`}>Admin Panel</h2>
        <button onClick={() => setOpen(!open)} className="focus:outline-none">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            {item.icon}
            <span className={`${!open && "hidden"} font-medium`}>{item.name}</span>
          </Link>
        ))}
        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
          }}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition mt-auto"
        >
          <LogOutIcon className="w-5 h-5" />
          <span className={`${!open && "hidden"} font-medium`}>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSideBar;
