import {
  Home,
  Target,
  GraduationCap,
  Heart,
  Sprout,
  Palette,
  Users,
  Briefcase,
  FolderOpen,
  Calendar,
  CheckCircle,
  Megaphone,
  FileText,
  Image,
  Eye,
  Handshake,
  Phone,
  HeartHandshake,
  Activity,


} from "lucide-react";
import { MdOutlineSportsEsports } from "react-icons/md";


export const navItems = [
  {
    href: "/",
    label: "Home",
    icon: Home
  },
  {
    label: "Focus",
    type: "submenu",
    icon: Target,
    items: [
      {
        href: "/focusarea/education/3",
        icon: GraduationCap,
        label: "Education",

      },
      {
        href: "/focusarea/health/5",
        icon: Heart,
        label: "Health",
      },
      {
        href: "/focusarea/environment/1",
        icon: Sprout,
        label: "Environment",
      },
      {
        href: "/focusarea/culture/4",
        icon: Palette,
        label: "Culture",
      },
      {
        href: "/focusarea/relife/7",
        icon: Users,
        label: "Re-Life",
      },
      {
        href: "/focusarea/self-employment/2",
        icon: Briefcase,
        label: "Self-Employment",
      },
      {
        href: "/focusarea/sport/2",
        icon: MdOutlineSportsEsports,
        label: "Sport",
      },
    ],
  },
  {
    type: "submenu",
    label: "Projects",
    icon: FolderOpen,
    items: [
      {
        href: "/projects/current",
        icon: Calendar,
        label: "Current-Project",
        badge: "New",
      },
      {
        href: "/projects/completed",
        icon: CheckCircle,
        label: "Completed-Project",
      },
    ],
  },
  {
    type: "submenu",
    label: "Updates",
    icon: Megaphone,
    items: [
      {
        href: "/news",
        icon: Megaphone,
        label: "News"
      },
      {
        href: "/blog",
        icon: FileText,
        label: "Blog"
      },
      {
        href: "/gallery",
        icon: Image,
        label: "Photo Gallery"
      },
    ],
  },
  {
    type: "submenu",
    label: "About Us",
    icon: Users,
    items: [
      {
        href: "/vision-mission",
        icon: Eye,
        label: "Vision, Mission, Values"
      },
      {
        href: "/ourteam",
        icon: Users,
        label: "Our Team"
      },
      {
        href: "/partners",
        icon: Handshake,
        label: "Partners"
      },
      {
        href: "/contact-us",
        icon: Phone,
        label: "Contact Us"
      },
      {
        href: "/volunteer",
        icon: HeartHandshake,
        label: "Become A Volunteer"
      },
    ],
  },
];