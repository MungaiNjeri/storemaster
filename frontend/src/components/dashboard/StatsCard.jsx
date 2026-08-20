function StatsCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-500",
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`${color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}
        >
          <Icon size={26} />
        </div>

      </div>
    </div>
  );
}

export default StatsCard;