import { NextRequest, NextResponse } from "next/server";

interface Post {
  id: number;
  type: "viral" | "product" | "trust";
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

// Taglish content templates for different business types
const generateViralPost = (businessName: string): string => {
  const templates = [
    `Sino ang mas excited sa weekend kaysa sa Monday? 😅🙋‍♀️\n\nKami sa ${businessName}, honestly, EVERYDAY is a good day kasi nakakapag-serve kami sa inyo! 💜\n\nPero seryoso, anong plans niyo this weekend? Comment below! 👇`,
    
    `POV: Nag-check ka ng Facebook tapos nakita mo na naman kami 😎\n\nHindi namin kasalanan na gusto mo yung quality ng ${businessName}! 🤷‍♀️✨\n\nTag mo yung friend mong kailangan din nito! 👇`,
    
    `That feeling when...\n\n✅ Nasolve mo yung problema mo\n✅ Nakamura ka pa\n✅ Sa ${businessName} ka pa bumili\n\nBest feeling ever! 🥰 Sino ang relate?`,
    
    `Monday motivation from ${businessName} 💪\n\n"Hindi mahalaga kung gaano ka kabagal, basta hindi ka tumitigil."\n\nKaya tara, simulan na natin ang week na to ng malakas! 🔥`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
};

const generateProductPost = (businessName: string): string => {
  const templates = [
    `✨ NEW ARRIVAL ALERT ✨\n\nMga ka-${businessName}! May bagong stocks na naman tayo! Fresh na fresh, gaya ng service na binibigay namin sa inyo araw-araw 🌟\n\n📍 Available na sa amin\n💳 GCash accepted\n🚚 Free delivery around Pampanga\n\nMessage us now!`,
    
    `LIMITED TIME OFFER! ⏰\n\nHanggang this week lang! Special discount para sa mga suki ni ${businessName}! 💎\n\n✨ Premium quality guaranteed\n✨ Best price in town\n✨ Same-day delivery available\n\nHuwag palampasin! PM na 👇`,
    
    `Behind the scenes sa ${businessName} 📸\n\nGanito kami mag-prepare para siguradong perfect ang quality bago ma-deliver sa inyo! 💯\n\nQuality check? DONE ✅\nPackaging? SECURED 📦\nService? LEGIT 👌\n\nOrder na!`,
    
    `Bakit mas pinipili ang ${businessName}? 🤔\n\n⭐ Premium quality products\n⭐ Mura pero hindi cheap\n⭐ Fast & reliable service\n⭐ Trusted by 500+ customers\n\nExperience the difference today! ✨`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
};

const generateTrustPost = (businessName: string): string => {
  const testimonials = [
    `"Hindi ko in-expect na ganito kaganda yung quality! Sulit na sulit!" - Maria, Angeles City 💎`,
    `"First time ko umorder, pero hindi na ako maghahanap ng iba. Dito na ako sa ${businessName}!" - John, San Fernando 🌟`,
    `"Grabe yung customer service! Sinagot lahat ng tanong ko. 10/10 would recommend!" - Sarah, Mabalacat ⭐`,
    `"Nirecommend ko na sa buong family ko. Lahat sila satisfied!" - Liza, Clark 💜`,
  ];
  
  const selectedTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
  
  return `${selectedTestimonial}\n\nSalamat po sa tiwala! Kayo ang dahilan kung bakit kami ginigising ng maaga araw-araw. ☀️\n\n⭐⭐⭐⭐⭐ 4.9/5 rating from 200+ customers\n\n#${businessName.replace(/\s+/g, '')} #Trusted #SatisfiedCustomers`;
};

export async function POST(request: NextRequest) {
  try {
    const { businessName } = await request.json();

    if (!businessName || typeof businessName !== "string") {
      return NextResponse.json(
        { error: "Business name is required" },
        { status: 400 }
      );
    }

    // Simulate AI processing delay for realism
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate the three posts
    const posts: Post[] = [
      {
        id: 1,
        type: "viral",
        content: generateViralPost(businessName),
        likes: Math.floor(Math.random() * 200) + 150,
        comments: Math.floor(Math.random() * 50) + 20,
        shares: Math.floor(Math.random() * 30) + 5,
      },
      {
        id: 2,
        type: "product",
        content: generateProductPost(businessName),
        likes: Math.floor(Math.random() * 150) + 100,
        comments: Math.floor(Math.random() * 40) + 15,
        shares: Math.floor(Math.random() * 40) + 10,
      },
      {
        id: 3,
        type: "trust",
        content: generateTrustPost(businessName),
        likes: Math.floor(Math.random() * 250) + 200,
        comments: Math.floor(Math.random() * 60) + 25,
        shares: Math.floor(Math.random() * 35) + 8,
      },
    ];

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error generating sample:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

// Rate limiting could be added here
export const runtime = "edge";
