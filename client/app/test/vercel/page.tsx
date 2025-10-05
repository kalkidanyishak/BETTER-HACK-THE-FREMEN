'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const API_ENDPOINT = '/api/redeploy';

export default function RedeployPage() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(API_ENDPOINT, { method: 'POST' });
      if (!res.ok) throw new Error('Redeploy failed');
      return res.json();
    },
    onSuccess: (data) => {
      setStatus(`Success! Deployment triggered: ${data.deploymentUrl}`);
      queryClient.invalidateQueries(); // Optional: Refresh any queries
    },
    onError: () => setStatus('Error: Check console for details.'),
  });

  const handleRedeploy = () => {
    setStatus('Triggering redeploy...');
    mutation.mutate();
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Vercel Redeploy Button</h1>
      <button
        onClick={handleRedeploy}
        disabled={mutation.isPending}
        style={{
          padding: '15px 30px',
          fontSize: '16px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: mutation.isPending ? 'not-allowed' : 'pointer',
        }}
      >
        {mutation.isPending ? 'Deploying...' : 'Redeploy Vercel'}
      </button>
      {status && (
        <p style={{ marginTop: '10px', color: status.includes('Success') ? 'green' : 'red' }}>
          {status}
        </p>
      )}
    </div>
  );
}