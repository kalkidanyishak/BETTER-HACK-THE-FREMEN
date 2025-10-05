// app/api/redeploy/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  if (!process.env.VERCEL_TOKEN || !process.env.VERCEL_PROJECT_ID) {
    return NextResponse.json({ error: 'Missing Vercel env vars' }, { status: 500 });
  }

  try {
    const res = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: process.env.VERCEL_PROJECT_ID,
        target: 'production',
        ref: 'main', // Adjust branch if needed
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Vercel API error: ${error}`);
    }

    const data = await res.json();
    return NextResponse.json({ 
      success: true, 
      deploymentUrl: data.url || 'Deploying... Check Vercel dashboard.' 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Redeploy failed' }, { status: 500 });
  }
}