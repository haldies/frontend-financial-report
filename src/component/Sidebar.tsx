import React, { useState, useRef } from "react";
import { FiUpload, FiFile, FiX, FiEye, FiDownload } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface PDFFile {
  id: string;
  name: string;
  url: string;
  size: string;
}

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [previewFile, setPreviewFile] = useState<PDFFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type === 'application/pdf') {
        const url = URL.createObjectURL(file);
        const newFile: PDFFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: url,
          size: formatFileSize(file.size)
        };
        setPdfFiles(prev => [...prev, newFile]);
      }
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = (id: string) => {
    setPdfFiles(prev => {
      const fileToDelete = prev.find(f => f.id === id);
      if (fileToDelete) {
        URL.revokeObjectURL(fileToDelete.url);
      }
      return prev.filter(f => f.id !== id);
    });
    
    // Close preview if deleted file was being previewed
    if (previewFile && previewFile.id === id) {
      setPreviewFile(null);
    }
  };

  const handlePreviewFile = (file: PDFFile) => {
    setPreviewFile(file);
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -256, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -256, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-64 sm:w-72 bg-white shadow-lg z-50 overflow-hidden"
          >
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="p-3 sm:p-4 mt-16 sm:mt-20 h-full flex flex-col"
            >
              {/* Upload Button */}
              <div className="mb-4">
                <button 
                  onClick={handleUploadClick}
                  className="text-gray-800 flex items-center border border-emerald-300 p-2 sm:p-3 rounded-xl gap-2 sm:gap-3 w-full hover:bg-emerald-50 transition-colors duration-200 text-sm sm:text-base"
                >
                  <FiUpload className="text-emerald-600" />
                  <span>Upload PDF</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* PDF Files List */}
              <div className="flex-1 overflow-y-auto">
                <h3 className="text-sm font-medium text-gray-600 mb-3">PDF Files</h3>
                <ul className="space-y-2">
                  {pdfFiles.map((file) => (
                    <motion.li
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200"
                    >
                      <div className="flex items-start gap-2">
                        <FiFile className="text-red-500 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate" title={file.name}>
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handlePreviewFile(file)}
                            className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                            title="Preview PDF"
                          >
                            <FiEye size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteFile(file.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Delete PDF"
                          >
                            <FiX size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                {pdfFiles.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No PDF files uploaded yet
                  </p>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Preview Modal */}
      <AnimatePresence>
        {previewFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-1 sm:p-2"
            onClick={closePreview}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-[98vw] h-[98vh] sm:w-[95vw] sm:h-[95vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate" title={previewFile.name}>
                  {previewFile.name}
                </h2>
                <button
                  onClick={closePreview}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 min-h-0 flex flex-col">
                {/* Mobile Detection and Fallback */}
                <div className="block sm:hidden p-4 text-center">
                  <div className="mb-4">
                    <FiFile className="mx-auto text-red-500 mb-2" size={48} />
                    <p className="text-gray-600 mb-4">
                      PDF preview tidak tersedia di mobile. Silakan download untuk melihat file.
                    </p>
                  </div>
                  <a
                    href={previewFile.url}
                    download={previewFile.name}
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <FiDownload />
                    Download PDF
                  </a>
                </div>

                {/* Desktop PDF Viewer */}
                <div className="hidden sm:block flex-1 min-h-0">
                  <iframe
                    src={previewFile.url}
                    className="w-full h-full border-0"
                    title={`Preview of ${previewFile.name}`}
                    onError={() => {
                      console.log('PDF preview failed');
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;