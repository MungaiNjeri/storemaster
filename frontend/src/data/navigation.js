import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

// 👑 Admin
export const adminNavigation = [
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

// 👔 Manager
export const managerNavigation = [
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
];

// 💰 Cashier
export const cashierNavigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "POS",
    icon: ShoppingCart,
  },
];