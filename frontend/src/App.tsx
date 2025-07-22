// src/App.tsx
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [mode, setMode] = useState<'upload' | 'paste'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedCode, setPastedCode] = useState('');
  const [response, setResponse] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (mode === 'upload') {
      if (!selectedFile) {
        alert("Please select a Python file.");
        return;
      }
      formData.append('file', selectedFile);
    } else {
      if (!pastedCode.trim()) {
        alert("Please paste some Python code.");
        return;
      }
      const blob = new Blob([pastedCode], { type: 'text/plain' });
      formData.append('file', blob, 'pasted_code.py');
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setResponse(data.response || data.error || "No response received.");
    } catch (error) {
      setResponse("Error communicating with the backend.");
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">🛠️ AI Debugging Assistant</h1>

      <div className="mode-select">
        <label>
          <input
            type="radio"
            value="upload"
            checked={mode === 'upload'}
            onChange={() => setMode('upload')}
          /> Upload File
        </label>
        <label>
          <input
            type="radio"
            value="paste"
            checked={mode === 'paste'}
            onChange={() => setMode('paste')}
          /> Paste Code
        </label>
      </div>

      <div className="input-area">
        {mode === 'upload' ? (
          <input type="file" accept=".py" onChange={handleFileChange} />
        ) : (
          <textarea
            value={pastedCode}
            onChange={(e) => setPastedCode(e.target.value)}
            rows={10}
            cols={60}
            placeholder="Paste your Python code here..."
          />
        )}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>Submit</button>

      <div className="response-section">
        <strong className="response-title">Response:</strong>
        <div className="response-box">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default App;
