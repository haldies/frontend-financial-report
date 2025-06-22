// import React from 'react'

// function Upload() {
//     return (
//         <div>   {/* File Upload Section */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//                     <div className="p-6 sm:p-10">
//                         <div className="text-center">
//                             <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
//                                 Upload Your Financial Report
//                             </h2>
//                             <p className="mt-4 text-lg text-blue-600">
//                                 Supported formats: PDF, Excel, CSV (Max 10MB)
//                             </p>
//                         </div>

//                         <div className="mt-8">
//                             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-blue-300 border-dashed rounded-md">
//                                 <div className="space-y-1 text-center">
//                                     <svg
//                                         className="mx-auto h-12 w-12 text-blue-400"
//                                         stroke="currentColor"
//                                         fill="none"
//                                         viewBox="0 0 48 48"
//                                         aria-hidden="true"
//                                     >
//                                         <path
//                                             d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                                             strokeWidth={2}
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                         />
//                                     </svg>
//                                     <div className="flex text-sm text-blue-600">
//                                         <label
//                                             htmlFor="file-upload"
//                                             className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
//                                         >
//                                             <span>Upload a file</span>
//                                             <input
//                                                 id="file-upload"
//                                                 name="file-upload"
//                                                 type="file"
//                                                 className="sr-only"
//                                                 onChange={handleFileUpload}
//                                                 accept=".pdf,.xlsx,.csv"
//                                             />
//                                         </label>
//                                         <p className="pl-1">or drag and drop</p>
//                                     </div>
//                                     <p className="text-xs text-blue-500">
//                                         PDF, XLSX, CSV up to 10MB
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {fileUploaded && (
//                             <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
//                                 <div className="flex">
//                                     <div className="flex-shrink-0">
//                                         <svg
//                                             className="h-5 w-5 text-blue-400"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             viewBox="0 0 20 20"
//                                             fill="currentColor"
//                                         >
//                                             <path
//                                                 fillRule="evenodd"
//                                                 d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
//                                                 clipRule="evenodd"
//                                             />
//                                         </svg>
//                                     </div>
//                                     <div className="ml-3">
//                                         <p className="text-sm text-blue-700">
//                                             File successfully uploaded! Click "Start Analysis" to process your financial report.
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div></div>
//     )
// }

// export default Upload