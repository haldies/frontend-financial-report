import { useState, useEffect } from "react";

import { CgMenuRightAlt, CgMenuLeftAlt } from "react-icons/cg";

import ChatBot from "../component/ChatBot";
import Sidebar from "../component/Sidebar";

function Chatbot() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar dengan Scroll Sendiri */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content dengan Overlay */}
      <div className="flex-1 p-6 relative ">
        {/* Overlay hanya muncul di ChatBot saat sidebar terbuka */}
        {isSidebarOpen && (
          <div className="absolute inset-0 bg-black opacity-50 z-40 transition-opacity duration-300 pointer-events-none"></div>
        )}

        <h1 className="text-blue-700 ml-12  font-mono text-2xl mb-8 relative z-40">
          Chatfine
        </h1>
        <ChatBot />
      </div>

      {/* Tombol Toggle Sidebar */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 left-4 p-2 bg-white shadow-lg rounded-full z-50"
      >
        {isSidebarOpen ? <CgMenuLeftAlt size={30} color="blue" /> : <CgMenuRightAlt size={30} color="blue" />}
      </button>
    </div>
  );
}

export default Chatbot;
