import { useState, useEffect } from "react";
import { CgMenuRightAlt, CgMenuLeftAlt } from "react-icons/cg";
import { motion } from "framer-motion"; // Import motion from framer-motion

import ChatBot from "../component/ChatBot";
import Sidebar from "../component/Sidebar";

function ChatbotPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isSidebarOpen]);

  return (
    <div className=" flex relative bg-gray-50 ">
  
      <Sidebar isOpen={isSidebarOpen} />

  
      <div className="flex-1 p-6 relative">
    

        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-emerald-900 z-40" // Removed fixed opacity class to let Framer Motion control it
            onClick={() => setIsSidebarOpen(false)}
          ></motion.div>
        )}

        <a href="/">
          <h1 className="flex items-center  text-emerald-700 ml-12 font-extrabold text-2xl relative z-40 pt-1 pb-3">
            Chatfine
          </h1>
        </a>

        <ChatBot />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-6 left-4 p-2  z-50 text-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
        >
          {isSidebarOpen ? (
            <CgMenuLeftAlt size={28} />
          ) : (
            <CgMenuRightAlt size={28} />
          )}
        </button>
      </div>

      {/* Sidebar Toggle Button */}

    </div>
  );
}

export default ChatbotPage;