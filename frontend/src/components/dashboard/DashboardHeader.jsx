function DashboardHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {user?.full_name?.split(" ")[0]} 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's what's happening in your store today.
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm text-slate-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;