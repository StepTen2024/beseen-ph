/**
 * BE SEEN.PH - Article Content Component
 * Phase 3: Content Site Engine
 */

'use client';

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article 
      className="prose prose-invert prose-lg max-w-none
        prose-headings:text-slate-100 
        prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-slate-300 prose-p:leading-relaxed
        prose-a:text-fuchsia-400 prose-a:no-underline hover:prose-a:text-fuchsia-300
        prose-strong:text-slate-200
        prose-ul:text-slate-300 prose-ol:text-slate-300
        prose-li:marker:text-fuchsia-500
        prose-blockquote:border-l-fuchsia-500 prose-blockquote:bg-slate-800/30 
        prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
        prose-img:rounded-xl prose-img:border prose-img:border-slate-800
        prose-hr:border-slate-800"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
