import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";

import StatsCard from "./StatsCard";
import { useEffect, useState } from "react";
import dashboard from "../../api/dashboard";

function StatsGrid() {
    const [stats, setStats] = useState({
  today_sales: 0,
  orders: 0,
  products: 0,
  customers: 0,
});
useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await dashboard.getDashboardStats();

      setStats(response.data);
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    }
  };

  fetchStats();
}, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatsCard
        title="Today's Sales"
        value={`KSh ${stats.today_sales}`}
        icon={DollarSign}
        color="bg-green-600"
      />

      <StatsCard
        title="Orders"
        value={stats.orders}
        icon={ShoppingCart}
        color="bg-blue-600"
      />

      <StatsCard
        title="Products"
        value={stats.products}
        icon={Package}
        color="bg-orange-500"
      />

      <StatsCard
        title="Customers"
        value={stats.customers}
        icon={Users}
        color="bg-purple-600"
      />

    </div>
  );
}

export default StatsGrid;