// app/api/get-table-config/route.ts

import { NextRequest, NextResponse } from 'next/server'; // Import NextRequest
import { Octokit } from '@octokit/rest';

if (!process.env.GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN environment variable is not set.");
}

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const REPO_OWNER = 'kalkidanyishak';
const REPO_NAME = 'BETTER-HACK-THE-FREMEN';
// We no longer need a hardcoded FILE_PATH constant here

export async function GET(request: NextRequest) { // Add request parameter
  try {
    // 1. Get the file path from the query string
    const path = request.nextUrl.searchParams.get('path');

    if (!path) {
      return NextResponse.json({ success: false, error: 'File path is required.' }, { status: 400 });
    }

    // 2. Fetch the file data using the dynamic path
    const { data: fileData } = await octokit.rest.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: path, // Use the path from the request
    });

    if (Array.isArray(fileData) || !('content' in fileData) || !('sha' in fileData)) {
      return NextResponse.json({ success: false, error: 'Path resolved to a directory, not a file.' }, { status: 400 });
    }

    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');

    return NextResponse.json({
      success: true,
      content: content,
      sha: fileData.sha,
    });

  } catch (error: any) {
    console.error('API GET ERROR:', error);
    // Handle file not found gracefully
    if (error.status === 404) {
        return NextResponse.json({ success: false, error: 'File not found on GitHub.' }, { status: 404 });
    }
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to fetch file from GitHub.' 
    }, { status: 500 });
  }
}