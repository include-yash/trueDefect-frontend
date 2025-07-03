import React, { useState } from 'react';
import { Folder, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const InputSection = ({ onFind, loading }) => {
  const [inputPath, setInputPath] = useState('');
  const [outputPath, setOutputPath] = useState('');
  const [errors, setErrors] = useState({ input: false, output: false });

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputEmpty = !inputPath.trim();
    const outputEmpty = !outputPath.trim();

    if (inputEmpty || outputEmpty) {
      setErrors({ input: inputEmpty, output: outputEmpty });
      return;
    }

    setErrors({ input: false, output: false });
    onFind(inputPath, outputPath);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6"
    >

      {/* Input Folder */}
      <div>
        <label className="text-gray-700 font-medium flex items-center gap-2 mb-1">
          <Folder className="w-5 h-5 text-emerald-600" />
          Input Folder
        </label>
        <input
          type="text"
          value={inputPath}
          onChange={(e) => setInputPath(e.target.value)}
          placeholder="e.g. test"
          className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${
            errors.input
              ? 'border-red-400 focus:ring-red-400'
              : 'border-gray-300 focus:ring-emerald-400'
          }`}
        />
        {errors.input && (
          <p className="text-red-500 text-sm mt-1">Please enter an input folder path.</p>
        )}
      </div>

      {/* Output Folder */}
      <div>
        <label className="text-gray-700 font-medium flex items-center gap-2 mb-1">
          <Folder className="w-5 h-5 text-emerald-600" />
          Output Folder
        </label>
        <input
          type="text"
          value={outputPath}
          onChange={(e) => setOutputPath(e.target.value)}
          placeholder="e.g. result"
          className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${
            errors.output
              ? 'border-red-400 focus:ring-red-400'
              : 'border-gray-300 focus:ring-emerald-400'
          }`}
        />
        {errors.output && (
          <p className="text-red-500 text-sm mt-1">Please enter an output folder path.</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all ${
          loading
            ? 'bg-emerald-300 text-white cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-md'
        }`}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          'Process Files'
        )}
      </button>
    </motion.form>
  );
};

export default InputSection;
