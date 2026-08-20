import { Bell, Search, User } from "lucide-react";

function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      {/* Search */}
      <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg w-80">
        <Search size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2">

          <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white">
            <User size={20} />
          </div>

          <div>
            <p className="font-semibold">
              {user?.full_name}
            </p>

            <p className="text-sm text-gray-500">
              {user?.role}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;