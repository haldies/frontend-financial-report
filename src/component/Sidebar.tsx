import React, { useState, useRef } from "react";
import { FiUpload, FiFile, FiX, FiEye, FiDownload, FiAlertCircle } from "react-icons/fi";
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
  const [nodeSummaries, setNodeSummaries] = useState<Record<string, any[]>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const uploadToAPI = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://backend-ai-financial-report-50598077190.asia-southeast1.run.app/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Upload gagal");
      }

      console.log("Upload sukses:", data);
      return data;
    } catch (error) {
      console.error("Error saat upload:", error);
      return null;
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return; 

    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    setUploadError(null); 

    let hasError = false;
    let errorMessage = '';

    for (const file of Array.from(files)) {
      if (file.type === 'application/pdf') {
        // Optional: batasi ukuran file maksimal 10MB
        if (file.size > 10 * 1024 * 1024) {
          alert('Ukuran file terlalu besar. Maksimum 10MB.');
          continue;
        }

        const apiResponse = await uploadToAPI(file);
        
        // Jika upload ke API gagal, jangan tambahkan file ke UI
        if (!apiResponse) {
          hasError = true;
          errorMessage = `Gagal mengupload "${file.name}". Silakan coba lagi.`;
          continue;
        }

        // Hanya tambahkan file ke UI jika upload ke API berhasil
        const url = URL.createObjectURL(file);
        const newFile: PDFFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: url,
          size: formatFileSize(file.size)
        };

        setPdfFiles(prev => [...prev, newFile]);

        if (apiResponse.node_sampel) {
          setNodeSummaries(prev => ({
            ...prev,
            [file.name]: apiResponse.node_sampel
          }));
        }
      }
    }

    setIsUploading(false);

    // Set error message jika ada yang gagal
    if (hasError) {
      setUploadError(errorMessage);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    if (isUploading) return; // tidak bisa klik saat upload berlangsung
    setUploadError(null); // Reset error saat upload baru
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

  const dismissError = () => {
    setUploadError(null);
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
              <div className="mb-4">
                <button
                  onClick={handleUploadClick}
                  disabled={isUploading}
                  className={`text-gray-800 flex items-center border border-emerald-300 p-2 sm:p-3 rounded-xl gap-2 sm:gap-3 w-full transition-colors duration-200 text-sm sm:text-base cursor-pointer
                    ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-50'}`}
                >
                  {isUploading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-emerald-600"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <FiUpload className="text-emerald-600" />
                      <span>Upload PDF</span>
                    </>
                  )}
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

              {/* Error Message */}
              <AnimatePresence>
                {uploadError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="flex items-start gap-2">
                      <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-red-700">{uploadError}</p>
                      </div>
                      <button
                        onClick={dismissError}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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

              <div className="flex-1 min-h-0 flex flex-col">
                {/* Mobile Fallback */}
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

                {/* Desktop Preview + Node Summary */}
                <div className="hidden sm:flex flex-1 min-h-0 gap-4 p-4 overflow-hidden">
                  <div className="w-2/3 h-full border">
                    <iframe
                      src={previewFile.url}
                      className="w-full h-full border-0"
                      title={`Preview of ${previewFile.name}`}
                    />
                  </div>

                  <div className="w-1/3 h-full overflow-y-auto">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Ringkasan Ekstraksi:</h4>
                    <ul className="text-sm space-y-3">
                      {(nodeSummaries[previewFile.name] || []).map((node, idx) => (
                        <li key={idx} className="p-2 border rounded bg-gray-50">
                          <p className="font-medium text-gray-800">#{node.nomor}</p>
                          <p className="text-gray-600 text-sm">{node.text_snippet}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
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
