// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

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
  
  // Append path as a query parameter. encodeURIComponent is crucial for safety.
  const res = await fetch(`${API_ENDPOINT_GET}?path=${encodeURIComponent(path)}`);
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch file from server.');
  }
  return data;
}

// The main component with all the UI and logic
export default function EditorComponent() {
  // State for the path input and the content textarea
  const [filePath, setFilePath] = useState('client/lib/table-config.tsx');
  const [textareaValue, setTextareaValue] = useState('');
  const [mode, setMode] = useState<'full' | 'patch'>('full');
  const queryClient = useQueryClient();

  // 1. useQuery is now dynamic
  const {
    data: fileData,
    error,
    isError,
    isFetching, // Use isFetching for loading state as it covers refetches
    refetch,   // We'll trigger the fetch manually
  } = useQuery<FileData, Error>({
    queryKey: ['githubFileContent', filePath], // The key now includes the path
    queryFn: () => fetchFileFromApi(filePath),
    enabled: false, // Important: This prevents the query from running automatically
    retry: false, // Don't retry automatically on failure
  });

  // 2. useMutation now needs to accept the path
  const updateFileMutation = useMutation({
    mutationFn: async (variables: { path: string; content?: string; patch?: string }) => {
      const res = await fetch(API_ENDPOINT_POST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables), // Send the whole variables object
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to update file');
      }
      return result;
    },
    onSuccess: (data) => {
      alert(data.message);
      // Invalidate the query for the specific file that was updated
      queryClient.invalidateQueries({ queryKey: ['githubFileContent', filePath] });
    },
    onError: (error: Error) => {
      alert(`Update failed: ${error.message}`);
    },
  });

  // Effect to populate textarea when new data is fetched
  useEffect(() => {
    if (fileData?.content) {
      setTextareaValue(fileData.content);
      setMode('full'); // Reset to full mode when a new file is loaded
    } else {
      setTextareaValue(''); // Clear textarea if fetch fails or no file is loaded
    }
  }, [fileData]);
  
  const handleLoadFile = () => {
    if (filePath.trim()) {
      refetch(); // Manually trigger the fetch for the current filePath
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
    
    // Pass the file path along with the content/patch
    updateFileMutation.mutate({ path: filePath, ...body });
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

      <div style={{ margin: '1rem 0' }}>
        <label><input type="radio" value="full" checked={mode === 'full'} onChange={() => setMode('full')} /> Full Overwrite</label>
        <label style={{ marginLeft: '1.5rem' }}><input type="radio" value="patch" checked={mode === 'patch'} onChange={() => setMode('patch')} /> Simple Patch</label>
      </div>

      <textarea
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
        rows={25}
        placeholder={fileData ? (mode === 'full' ? "Full file content..." : "e.g., replace: old text with new text") : "Load a file to see its content here..."}
        style={{ width: '100%', fontFamily: 'monospace', fontSize: '14px', border: '1px solid #ccc', padding: '0.5rem' }}
        disabled={!fileData || isFetching}
      />

      <button
        onClick={handleSubmit}
        disabled={!fileData || updateFileMutation.isPending || isFetching}
        style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', cursor: !fileData ? 'not-allowed' : 'pointer' }}
      >
        {updateFileMutation.isPending ? 'Updating...' : 'Update File on GitHub'}
      </button>
    </div>
  );
}

// QueryClientProvider setup remains the same