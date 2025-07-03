import React from 'react';
import { FolderOpen, FileCheck2, AlertTriangle, ClipboardList, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Results = ({ results, status, message, total }) => {
  // Handle the specific error case where we just have a message
  if (status === 'error' && message && (!results || results.length === 0)) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 border border-red-200/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
        <div className="relative flex items-center gap-3">
          <XCircle className="w-6 h-6 text-red-500" />
          <p className="text-red-700 font-medium text-lg">
            {message}
          </p>
        </div>
      </motion.div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center h-64 text-slate-400 font-medium text-lg"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <FolderOpen className="w-8 h-8 text-slate-400" />
          </div>
          No results to display
        </div>
      </motion.div>
    );
  }

  const isSuccess = status === 'success';

  // Extract message from the first item if it's an error
  const errorMessage =
    !isSuccess &&
    results[0]?.missing_files?.length === 1 &&
    typeof results[0].missing_files[0] === 'string'
      ? results[0].missing_files[0].replace('/mnt/input/', '').replace('/mnt/output/', '')
      : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-3 mb-8"
      >
        {isSuccess ? (
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        ) : (
          <XCircle className="w-8 h-8 text-red-500" />
        )}
        <h2 className={`text-2xl font-bold bg-gradient-to-r ${
        isSuccess 
            ? 'from-emerald-600 to-teal-600' 
            : 'from-red-600 to-rose-600'
        } bg-clip-text text-transparent`}>
        {isSuccess 
            ? `Processing Complete (${total} file${total === 1 ? '' : 's'} processed)` 
            : 'Error Occurred'}
        </h2>

      </motion.div>

      {/* Global Error Message */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative overflow-hidden bg-gradient-to-r from-red-50 to-orange-50 border border-red-200/50 rounded-xl p-4 shadow-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5"></div>
          <div className="relative flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 font-medium">{errorMessage}</span>
          </div>
        </motion.div>
      )}

      {/* Results Grid */}
      <div className="space-y-6">
        {results.map((folder, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/30 opacity-60"></div>
            
            {/* Content */}
            <div className="relative p-6">
              {/* Folder Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {folder.folder_name}
                </h3>
              </div>

              {/* Repair Ticket */}
              <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-200/50">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="w-4 h-4 text-slate-500" />
                  <span className="font-semibold text-slate-700">Repair Ticket</span>
                </div>
                <code className="text-sm text-slate-600 bg-white/80 px-3 py-1.5 rounded-lg border border-slate-200/50 font-mono">
                  {folder.repair_ticket_path || 'Not Found'}
                </code>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Fail IDs */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200/50">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <h4 className="font-semibold text-amber-800">Failed ref-des</h4>
                  </div>
                  {folder.fail_ids.length > 0 ? (
                    <div className="space-y-1">
                      {folder.fail_ids.map((fid, i) => (
                        <div key={i} className="text-sm text-amber-700 bg-white/60 px-2 py-1 rounded font-mono">
                          {fid}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-amber-600/70 italic">No fail IDs found</p>
                  )}
                </div>

                {/* Copied Files */}
{/* Copied Files */}
<div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200/50 shadow-sm">
  <div className="flex items-start gap-2 mb-3">
    <FileCheck2 className="w-4 h-4 text-emerald-600 mt-0.5" />
    <div>
      <h4 className="font-semibold text-emerald-800 text-base">Copied Files</h4>
      <p className="text-sm text-emerald-600 underline underline-offset-2 font-normal">
        (click to view)
      </p>
    </div>
  </div>

  {folder.copied_files.length > 0 ? (
    <div className="space-y-1">
      {folder.copied_files.map((file, i) => (
        <div key={i}>
          <a
            href={`http://localhost:8000/files/${encodeURIComponent(folder.local_output_path2)}/${encodeURIComponent(file)}`}
            className="block text-emerald-700 hover:text-emerald-900 underline underline-offset-4 decoration-dotted font-mono text-sm truncate transition-all duration-200 cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
            title={file}
          >
            
            {file}
          </a>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-sm text-emerald-600/70 italic">No files copied</p>
  )}
</div>



                {/* Missing Files */}
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border border-red-200/50">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <h4 className="font-semibold text-red-800">Missing Files</h4>
                  </div>
                  {folder.missing_files.length > 0 ? (
                    <div className="space-y-1">
                      {folder.missing_files.map((file, i) => (
                        <div key={i} className="text-sm text-red-700 bg-white/60 px-2 py-1 rounded font-mono truncate" title={file}>
                          {file}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-red-600/70 italic">No missing files</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Results;