import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  if (!process.env.VERCEL_DEPLOY_HOOK_URL) {
    return NextResponse.json({ error: 'Missing VERCEL_DEPLOY_HOOK_URL env var' }, { status: 500 });
  }

  try {
    const res = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, {
      method: 'POST',
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Deploy hook error: ${error}`);
    }

    // Deploy hook returns a redirect to the deployment status page on success
    const location = res.headers.get('location') || 'Deploying... Check Vercel dashboard.';
    return NextResponse.json({ 
      success: true, 
      deploymentUrl: location 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Redeploy failed' }, { status: 500 });
  }
}