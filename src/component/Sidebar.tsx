import { FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <AnimatePresence> {/* Required for exit animations */}
      {isOpen && (
        <motion.div
          // Animate X position to slide in/out
          initial={{ x: -256, opacity: 0 }} // Start off-screen left and transparent
          animate={{ x: 0, opacity: 1 }}     // Slide to original position and full opacity
          exit={{ x: -256, opacity: 0 }}     // Slide back off-screen left and fade out
          transition={{ duration: 0.3 }}
          // Set fixed width and make it absolute/fixed to overlay
          className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 overflow-hidden"
        >
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }} // Delay content fade-in slightly
            className="p-4 mt-20"
          >
            <ul>
              <li>
                <button className="text-gray-800 flex items-center border border-emerald-300 p-3 rounded-xl gap-3 w-full hover:bg-emerald-50 transition-colors duration-200">
                  <FiPlus className="text-emerald-600" />
                  <span>New Chat</span>
                </button>
              </li>
            </ul>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;