// app/api/update-table-config/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

if (!process.env.GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN environment variable is not set.");
}
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const REPO_OWNER = 'kalkidanyishak';
const REPO_NAME = 'BETTER-HACK-THE-FREMEN';
// No hardcoded FILE_PATH constant needed

export async function POST(request: NextRequest) {
  try {
    // 1. Get path, content, and patch from the request body
    const { path, content, patch } = await request.json();

    if (!path) {
        return NextResponse.json({ success: false, error: 'File path is required.' }, { status: 400 });
    }

    // 2. Fetch the current file using the dynamic path to get its SHA
    const { data: fileData } = await octokit.rest.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: path, // Use dynamic path
    });

    if (Array.isArray(fileData) || !('content' in fileData) || !('sha' in fileData)) {
      return NextResponse.json({ success: false, error: 'File not found.' }, { status: 404 });
    }

    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
    let modifiedContent: string;

    // ... (the rest of the logic is the same)
    if (patch && typeof patch === 'string') {
      if (patch.startsWith('replace: ')) {
        const instruction = patch.substring('replace: '.length);
        const parts = instruction.split(' with ');
        if (parts.length === 2) {
          modifiedContent = currentContent.replace(parts[0], parts[1] || '');
        } else {
          return NextResponse.json({ success: false, error: 'Invalid patch format.' }, { status: 400 });
        }
      } else {
        return NextResponse.json({ success: false, error: 'Unsupported patch command.' }, { status: 400 });
      }
    } else if (content !== undefined) {
      modifiedContent = content;
    } else {
      return NextResponse.json({ success: false, error: 'Request needs "content" or "patch".' }, { status: 400 });
    }
    
    if (modifiedContent === currentContent) {
      return NextResponse.json({ success: true, message: 'No changes detected. File not updated.' });
    }

    // 3. Commit the update to GitHub using the dynamic path
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: path, // Use dynamic path
      message: `docs: Update ${path} via web editor`,
      content: Buffer.from(modifiedContent).toString('base64'),
      sha: fileData.sha,
    });

    return NextResponse.json({ success: true, message: 'File updated successfully!' });

  } catch (error: any) {
    console.error('API POST ERROR:', error);
    return NextResponse.json({ 
        success: false, 
        error: error.message || 'Failed to update file on GitHub.' 
    }, { status: 500 });
  }
}