import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import Results from './components/Results';

function App() {
  const [result, setResult] = useState({ results: [], status: '', message: '', total: 0 });
  const [loading, setLoading] = useState(false);

  const handleFind = async (inputPath, outputPath) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/process-folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input_subpath: inputPath, output_subpath: outputPath }),
      });

      const data = await response.json();
      if (response.ok) {
      setResult({ 
        results: data.results || [], 
        status: data.status,
        message: data.message || '',
        total: data.total_files_processed || 0
      });
    } else {
      setResult({
        results: [],
        status: 'error',
        message: data.message || 'An error occurred',
        total_files_processed: 0
      });
    }
    } catch (error) {
      // For network/request errors, also just pass the message
      setResult({
        results: [],
        status: 'error',
        message: `Request Failed: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      {/* Main Content Container */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Input Section */}
        <div className="w-2/5 min-w-[480px] p-8 border-r border-gray-200/60 bg-white/40 backdrop-blur-sm">
          <div className="sticky top-8">
            <InputSection onFind={handleFind} loading={loading} />
          </div>
        </div>

        {/* Right Panel - Results Section */}
        <div className="flex-1 p-8 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 pr-2">
            <Results 
              results={result.results} 
              status={result.status} 
              message={result.message}
              total={result.total}
            />

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;