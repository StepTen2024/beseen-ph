'use client';

export default function DirectoryMap({ businesses }: { businesses: any[] }) {
  return (
    <div className="w-full h-full min-h-[400px] bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
      <p>Map Component - {businesses?.length || 0} businesses</p>
    </div>
  );
}
