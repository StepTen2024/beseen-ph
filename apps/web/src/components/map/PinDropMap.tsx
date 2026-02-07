'use client';

interface PinDropMapProps {
  onLocationSelect?: (lat: number, lng: number, address: string) => void;
}

export default function PinDropMap({ onLocationSelect }: PinDropMapProps) {
  return (
    <div className="w-full h-64 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
      <p>Pin Drop Map - Click to select location</p>
    </div>
  );
}
