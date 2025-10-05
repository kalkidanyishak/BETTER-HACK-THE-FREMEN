// app/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


// Our API endpoints
const API_ENDPOINT_GET = '/api/get-table-config';
const API_ENDPOINT_POST = '/api/update-table-config';

interface FileData {
  content: string;
  sha: string;
}

// Fetcher now accepts a file path argument
async function fetchFileFromApi(path: string): Promise<FileData> {
  if (!path) throw new Error("File path cannot be empty.");
  
  const res = await fetch(`${API_ENDPOINT_GET}?path=${encodeURIComponent(path)}`);
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch file from server.');
  }
  return data;
}

// Helper function to determine the language for syntax highlighting
const getLanguageFromPath = (path: string) => {
  const extension = path.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'tsx':
    case 'ts':
      return 'typescript';
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'json':
      return 'json';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    case 'html':
      return 'html';
    case 'md':
      return 'markdown';
    default:
      return 'plaintext';
  }
};


// The main component with all the UI and logic
export default function EditorComponent() {
  const [filePath, setFilePath] = useState('client/lib/table-config.tsx');
  const [textareaValue, setTextareaValue] = useState('');
  const [mode, setMode] = useState<'full' | 'patch'>('full');
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  // 1. useQuery is now dynamic
  const {
    data: fileData,
    error,
    isError,
    isFetching,
    refetch,
  } = useQuery<FileData, Error>({
    queryKey: ['githubFileContent', filePath],
    queryFn: () => fetchFileFromApi(filePath),
    enabled: false,
    retry: false,
  });

  // 2. useMutation now needs to accept the path
  const updateFileMutation = useMutation({
    mutationFn: async (variables: { path: string; content?: string; patch?: string }) => {
      const res = await fetch(API_ENDPOINT_POST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to update file');
      }
      return result;
    },
    onSuccess: (data) => {
      alert(data.message);
      queryClient.invalidateQueries({ queryKey: ['githubFileContent', filePath] });
      setIsEditing(false);
    },
    onError: (error: Error) => {
      alert(`Update failed: ${error.message}`);
    },
  });

  // Effect to populate textarea when new data is fetched
  useEffect(() => {
    if (fileData?.content) {
      setTextareaValue(fileData.content);
      setMode('full');
      setIsEditing(false);
    } else {
      setTextareaValue('');
      setIsEditing(true);
    }
  }, [fileData]);
  
  const handleLoadFile = () => {
    if (filePath.trim()) {
      refetch();
    } else {
      alert("Please enter a file path.");
    }
  };

  const handleSubmit = () => {
    if (!filePath.trim()) {
      alert("No file is loaded. Please enter a path and load the file first.");
      return;
    }
    if (!textareaValue.trim()) {
      alert("Input cannot be empty.");
      return;
    }
    
    const body = mode === 'full'
      ? { content: textareaValue }
      : { patch: textareaValue };
    
    updateFileMutation.mutate({ path: filePath, ...body });
  };
  
  const codeLanguage = useMemo(() => getLanguageFromPath(filePath), [filePath]);

  const editorStyles = {
    width: '100%',
    fontFamily: 'monospace',
    fontSize: '14px',
    border: '1px solid #ccc',
    padding: '1rem',
    boxSizing: 'border-box' as const,
    minHeight: '400px',
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>GitHub File Editor</h1>
      
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="text"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          placeholder="Enter file path (e.g., src/components/Button.tsx)"
          style={{ flex: 1, padding: '0.5rem', fontSize: '16px' }}
        />
        <button onClick={handleLoadFile} disabled={isFetching}>
          {isFetching ? 'Loading...' : 'Load File'}
        </button>
      </div>

      {isError && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      
      <div style={{ position: 'relative' }}>
        {fileData && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
          >
            Edit
          </button>
        )}

        {isEditing && (
            <div style={{ margin: '1rem 0' }}>
              <label><input type="radio" value="full" checked={mode === 'full'} onChange={() => setMode('full')} /> Full Overwrite</label>
              {/* THIS IS THE FIXED LINE */}
              <label style={{ marginLeft: '1.5rem' }}><input type="radio" value="patch" checked={mode === 'patch'} onChange={() => setMode('patch')} /> Simple Patch</label>
            </div>
        )}

        {isEditing ? (
          <textarea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            placeholder={fileData ? (mode === 'full' ? "Full file content..." : "e.g., replace: old text with new text") : "Enter content for a new file..."}
            style={editorStyles}
            disabled={isFetching}
          />
        ) : (
          <SyntaxHighlighter
            language={codeLanguage}
            style={vscDarkPlus}
            customStyle={editorStyles}
            showLineNumbers
          >
            {fileData ? textareaValue : "Load a file to see its content here..."}
          </SyntaxHighlighter>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isEditing || updateFileMutation.isPending || isFetching}
        style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', cursor: !isEditing ? 'not-allowed' : 'pointer' }}
      >
        {updateFileMutation.isPending ? 'Updating...' : 'Update File on GitHub'}
      </button>
    </div>
  );
}