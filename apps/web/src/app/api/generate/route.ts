/**
 * BE SEEN.PH - AI Content Generation API
 * Generates social media posts for businesses
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAdmin } from '@/lib/supabase/server';

export const runtime = 'edge';

interface GeneratedPost {
  id: number;
  type: 'viral' | 'product' | 'trust';
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

const POST_TEMPLATES = {
  viral: [
    `Sino ang mas excited sa weekend kaysa sa Monday? 😅🙋‍♀️\n\nKami sa {name}, honestly, EVERYDAY is a good day kasi nakakapag-serve kami sa inyo! 💜\n\nPero seryoso, anong plans niyo this weekend? Comment below! 👇`,
    `POV: Pag sinabi mong "last na to" pero ending {name} pa rin ang pinili mo 😂\n\nWala e, masarap kasi talaga! 🔥\n\nTag yung friend na laging "diet mode" pero first to order! 😅`,
    `UNPOPULAR OPINION: Mas masarap ang {category} pag may kasama kang kaibigan! 🫂\n\nAgree or disagree? Sound off below! 👇`,
  ],
  product: [
    `✨ NEW ARRIVAL ALERT ✨\n\nMga ka-{name}! May bagong stocks na naman tayo! Fresh na fresh, gaya ng service na binibigay namin sa inyo araw-araw 🌟\n\n📍 Available na sa amin\n💳 GCash accepted\n🚚 Free delivery around Pampanga\n\nMessage us now!`,
    `🚨 RESTOCK ALERT 🚨\n\nYung hinihintay niyo? MERON NA ULI! 🎉\n\nDon't miss out this time! Limited stocks lang available.\n\n📱 Order now: DM us or call xxxxxxx\n📍 Walk-ins welcome!`,
    `What's your {name} order? 🤔\n\nA. Our bestseller 🏆\nB. The new one everyone's talking about ✨\nC. The classic OG 👑\nD. Surprise me! 🎲\n\nComment your choice below! 👇`,
  ],
  trust: [
    `"Hindi ko in-expect na ganito kaganda yung quality! Sulit na sulit!" - Maria, Angeles City 💎\n\nSalamat po sa tiwala! Kayo ang dahilan kung bakit kami ginigising ng maaga araw-araw. ☀️\n\n⭐⭐⭐⭐⭐ 4.9/5 rating from 200+ customers\n\n#{hashtag} #Trusted`,
    `8 years na kaming nagse-serve sa Pampanga! 🎉\n\nFrom a small {category} to what we are now - salamat sa inyong lahat! 💜\n\nTo our loyal customers: YOU ARE THE REAL MVPs! 🏆`,
    `Behind every order is a family working together to bring you the best. 👨‍👩‍👧‍👦\n\nWe're not just a business - we're your neighbors, your friends, your community.\n\nThank you for choosing {name}! 🙏`,
  ],
};

function generatePosts(businessName: string, category: string = 'business'): GeneratedPost[] {
  const hashtag = businessName.replace(/\s+/g, '');
  
  const posts: GeneratedPost[] = [
    {
      id: 1,
      type: 'viral',
      content: POST_TEMPLATES.viral[Math.floor(Math.random() * POST_TEMPLATES.viral.length)]
        .replace(/{name}/g, businessName)
        .replace(/{category}/g, category)
        .replace(/{hashtag}/g, hashtag),
      likes: Math.floor(Math.random() * 300) + 150,
      comments: Math.floor(Math.random() * 60) + 20,
      shares: Math.floor(Math.random() * 30) + 5,
    },
    {
      id: 2,
      type: 'product',
      content: POST_TEMPLATES.product[Math.floor(Math.random() * POST_TEMPLATES.product.length)]
        .replace(/{name}/g, businessName)
        .replace(/{category}/g, category)
        .replace(/{hashtag}/g, hashtag),
      likes: Math.floor(Math.random() * 200) + 100,
      comments: Math.floor(Math.random() * 40) + 15,
      shares: Math.floor(Math.random() * 35) + 10,
    },
    {
      id: 3,
      type: 'trust',
      content: POST_TEMPLATES.trust[Math.floor(Math.random() * POST_TEMPLATES.trust.length)]
        .replace(/{name}/g, businessName)
        .replace(/{category}/g, category)
        .replace(/{hashtag}/g, hashtag),
      likes: Math.floor(Math.random() * 350) + 200,
      comments: Math.floor(Math.random() * 50) + 25,
      shares: Math.floor(Math.random() * 25) + 8,
    },
  ];

  return posts;
}

export async function POST(request: NextRequest) {
  try {
    const { businessName, category } = await request.json();

    if (!businessName || typeof businessName !== 'string') {
      return NextResponse.json(
        { error: 'Business name is required' },
        { status: 400 }
      );
    }

    // Generate posts
    const posts = generatePosts(businessName.trim(), category || 'business');

    // Optional: Track generation event
    try {
      const admin = createAdmin();
      await admin.from('analytics_events').insert({
        event_type: 'page_view', // Using closest available type
        metadata: {
          type: 'content_generation',
          business_name: businessName,
          posts_generated: posts.length,
        },
      });
    } catch (e) {
      // Non-critical, continue
    }

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate posts' },
      { status: 500 }
    );
  }
}
