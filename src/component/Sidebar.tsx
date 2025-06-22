import { FiPlus } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg  z-50 transition-all duration-300 
        ${isOpen ? "w-64" : "w-16"}`}>
      
      {/* Menu Items */}
      {isOpen && (
        <nav className="p-4 mt-20">
          <ul>
            <li>
              <button className="text-black flex items-center border p-3 rounded-xl gap-3">
                <FiPlus />
                <span>New Chat</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
