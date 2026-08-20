import api from "./api";

const getDashboardStats = () => {
  return api.get("/dashboard/stats");
};

export default {
  getDashboardStats,
};