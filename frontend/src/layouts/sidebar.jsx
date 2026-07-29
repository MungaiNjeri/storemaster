import SidebarItem from "../components/SidebarItem";
import navigation from "../data/navigation";

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-blue-700 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-blue-600">
        <h1 className="text-2xl font-bold">StoreMaster</h1>
        <p className="text-sm text-blue-200 mt-1">
          Smart POS System
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
  {navigation.map((item) => (
    <SidebarItem
      key={item.title}
      icon={item.icon}
      title={item.title}
      active={item.active}
    />
  ))}
</nav>

    </aside>
  );
}

export default Sidebar;