import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Inventory",
    icon: Package,
  },
  {
    title: "POS",
    icon: ShoppingCart,
  },
  {
    title: "Reports",
    icon: BarChart3,
  },
  {
    title: "Users",
    icon: Users,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export default navigation;