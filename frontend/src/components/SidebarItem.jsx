function SidebarItem({ icon: Icon, title, active = false }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
        active ? "bg-blue-800 font-medium" : "hover:bg-blue-800"
      }`}
    >
      <Icon size={20} />
      <span>{title}</span>
    </button>
  );
}

export default SidebarItem;