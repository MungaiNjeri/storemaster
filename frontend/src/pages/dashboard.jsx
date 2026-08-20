import MainLayout from "../layouts/MainLayout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";

function Dashboard() {
  return (
    <MainLayout>
        <DashboardHeader />
        <StatsGrid />

    </MainLayout>
  );
}

export default Dashboard;