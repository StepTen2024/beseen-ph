/**
 * BE SEEN.PH - Posts API (MOCK)
 * Phase 2: The Delivery Engine ("Pinky")
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getPostsByClient,
  getPostById,
  createPost,
  updatePost,
  getPostsPendingApproval,
  getClientById,
} from '@/lib/supabase-mock';
import type { Post, PostStatus, PostType } from '@/types/database';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const clientId = searchParams.get('clientId');
    const status = searchParams.get('status') as PostStatus | null;
    const pending = searchParams.get('pending') === 'true';
    
    if (id) {
      const post = await getPostById(id);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ post });
    }
    
    if (pending) {
      const posts = await getPostsPendingApproval();
      return NextResponse.json({ posts, count: posts.length });
    }
    
    if (clientId) {
      const posts = await getPostsByClient(clientId, { status: status || undefined });
      return NextResponse.json({ posts, count: posts.length });
    }
    
    return NextResponse.json({ error: 'Please provide clientId, id, or pending=true' }, { status: 400 });
    
  } catch (error) {
    console.error('[API] Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (body.action === 'publish' && body.postId) {
      return handlePublishRequest(body.postId);
    }
    
    const requiredFields = ['client_id', 'content', 'scheduled_date'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    
    const postData: Partial<Post> = {
      ...body,
      type: (body.type || 'engagement') as PostType,
      status: (body.status || 'pending_approval') as PostStatus,
      scheduled_time: body.scheduled_time || '18:00',
      requires_revision: false,
      retry_count: 0,
    };
    
    if (postData.scheduled_date && postData.scheduled_time) {
      postData.scheduled_for = new Date(`${postData.scheduled_date}T${postData.scheduled_time}:00+08:00`).toISOString();
    }
    
    const post = await createPost(postData);
    
    if (!post) {
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
    
    return NextResponse.json({ post, message: 'Post created successfully' }, { status: 201 });
    
  } catch (error) {
    console.error('[API] Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    if (updates.action) {
      switch (updates.action) {
        case 'approve':
          updates.status = 'scheduled';
          break;
        case 'reject':
          updates.status = 'rejected';
          updates.requires_revision = true;
          updates.revision_notes = updates.feedback || 'Rejected by client';
          break;
        case 'request_revision':
          updates.status = 'pending_approval';
          updates.requires_revision = true;
          updates.revision_notes = updates.feedback;
          break;
      }
      delete updates.action;
    }
    
    const post = await updatePost(id, updates);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found or update failed' }, { status: 404 });
    }
    
    return NextResponse.json({ post, message: 'Post updated successfully' });
    
  } catch (error) {
    console.error('[API] Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

async function handlePublishRequest(postId: string) {
  try {
    const post = await getPostById(postId);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    const client = await getClientById(post.client_id);
    
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    
    if (!client.facebook_connected) {
      return NextResponse.json({ error: 'Client Facebook not connected' }, { status: 400 });
    }
    
    // Mock publish
    return NextResponse.json({
      success: true,
      postId,
      facebookPostId: 'mock_fb_' + postId,
      message: 'Post published successfully (MOCK)',
    });
    
  } catch (error) {
    console.error('[API] Error publishing post:', error);
    return NextResponse.json({ error: 'Failed to publish post' }, { status: 500 });
  }
}
