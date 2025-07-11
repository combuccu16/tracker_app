import { useState } from "react";
import { FaHome, FaShoppingCart, FaChartLine, FaCogs, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out bg-[#0b1e2d] text-white shadow-lg ${
          isOpen ? "w-64" : "w-16"
        } relative`}
        // Removed the boxShadow style for no glow
      >
        {/* Toggle button */}
        <button
          className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-[#2eaefb] text-black rounded-full p-1 shadow"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "<" : ">"}
        </button>

        <div className="p-4 flex items-center space-x-2">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="w-8 h-8"
          />
          {isOpen && <h1 className="text-xl font-bold text-[#2eaefb]">XPTracker</h1>}
        </div>

        {/* User section aligned left */}
        <div className="p-4 flex items-center space-x-4">
          <img
            src="/character.png" // Replace with user character path
            alt="User"
            className="w-16 h-16 rounded-full border-2 border-[#2eaefb] shadow-none"
          />
          {isOpen && (
            <div>
              <p className="font-semibold text-[#2eaefb]">Akram Bouslama</p>
            </div>
          )}
        </div>

        <nav className="mt-6 space-y-4 px-2">
          <NavItem icon={<FaHome />} label="Dashboard" isOpen={isOpen} href="/dashboard" />
          <NavItem icon={<FaShoppingCart />} label="Item Shop" isOpen={isOpen} href="/item-shop" />
          <NavItem icon={<FaChartLine />} label="Analytics" isOpen={isOpen} href="/analytics" />
          <NavItem icon={<FaLock />} label="Achievements" isOpen={isOpen} href="/achievements" />
          <NavItem icon={<FaCogs />} label="Settings" isOpen={isOpen} href="/settings" />
        </nav>
      </div>

    </div>
  );
}

function NavItem({ icon, label, isOpen , href}) {
  return (
    <Link to={href} className="flex items-center space-x-2 hover:bg-[#164a7c] p-2 rounded cursor-pointer transition-all">
      <span className="text-[#2eaefb]">{icon}</span>
      {isOpen && <span className="text-sm">{label}</span>}
    </Link>
  );
}
