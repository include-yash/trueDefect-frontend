import React, { useState } from 'react';

const FolderProcessor = () => {
  const [inputPath, setInputPath] = useState('');
  const [outputPath, setOutputPath] = useState('');
  const [status, setStatus] = useState('');

  const handleRun = async () => {
    setStatus('Processing...');
    try {
      const res = await fetch("http://localhost:8000/process-folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_subpath: inputPath,   // e.g. "/test"
          output_subpath: outputPath  // e.g. "/result"
        }),
      });

      const data = await res.json();
      setStatus(data.message || 'Done!');
    } catch (error) {
      setStatus(`❌ Failed: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '2rem' }}>Fail Image Extractor</h2>

      <input
        type="text"
        placeholder="Enter relative input subfolder (e.g. /test)"
        value={inputPath}
        onChange={(e) => setInputPath(e.target.value)}
        style={{ width: '60%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <br />
      <input
        type="text"
        placeholder="Enter relative output subfolder (e.g. /result)"
        value={outputPath}
        onChange={(e) => setOutputPath(e.target.value)}
        style={{ width: '60%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <br />
      <button
        onClick={handleRun}
        style={{ padding: '0.7rem 2rem', fontSize: '1rem' }}
      >
        Run
      </button>

      <p style={{ marginTop: '2rem', fontWeight: 'bold', whiteSpace: 'pre-wrap' }}>
        {status}
      </p>
    </div>
  );
};

export default FolderProcessor;
