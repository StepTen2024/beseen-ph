'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Camera, CheckCircle, ArrowRight, ArrowLeft,
  Shield, Sparkles, Store, Loader2, X
} from 'lucide-react';

type Step = 'search' | 'verify-location' | 'selfie' | 'complete';

export default function ClaimBusinessPage() {
  const [step, setStep] = useState<Step>('search');
  const [businessName, setBusinessName] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Mock business search results
  const searchResults = businessName.length > 2 ? [
    { id: 1, name: `${businessName} Restaurant`, address: '123 Main St, Angeles City', claimed: false },
    { id: 2, name: `${businessName} Cafe`, address: '456 Food Ave, Angeles City', claimed: false },
    { id: 3, name: `${businessName} Bar`, address: '789 Night St, Angeles City', claimed: true },
  ] : [];

  // Get user's location
  const getLocation = () => {
    setIsLoadingLocation(true);
    setLocationError('');
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLoadingLocation(false);
        setStep('selfie');
      },
      (error) => {
        setLocationError('Please enable location access to verify your business');
        setIsLoadingLocation(false);
      },
      { enableHighAccuracy: true }
    );
  };

  // Camera handling
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setSelfieImage(imageData);
      
      // Stop camera
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setCameraActive(false);
      
      // Move to complete
      setStep('complete');
    }
  };

  useEffect(() => {
    if (step === 'selfie' && !selfieImage) {
      startCamera();
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-500"
          initial={{ width: '0%' }}
          animate={{ 
            width: step === 'search' ? '25%' : 
                   step === 'verify-location' ? '50%' : 
                   step === 'selfie' ? '75%' : '100%' 
          }}
        />
      </div>

      <div className="max-w-lg mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Search Business */}
          {step === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Store className="w-16 h-16 text-fuchsia-400 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">Claim Your Business</h1>
                <p className="text-slate-400">Search for your business to get started</p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your business name..."
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500 text-lg"
                />
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-3">
                  <p className="text-slate-500 text-sm">Select your business:</p>
                  {searchResults.map((biz) => (
                    <button
                      key={biz.id}
                      disabled={biz.claimed}
                      onClick={() => {
                        setSelectedBusiness(biz);
                        setStep('verify-location');
                      }}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        biz.claimed 
                          ? 'bg-slate-900/30 border-slate-800 opacity-50 cursor-not-allowed'
                          : 'bg-slate-900/50 border-slate-700 hover:border-fuchsia-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold">{biz.name}</h3>
                          <p className="text-slate-500 text-sm">{biz.address}</p>
                        </div>
                        {biz.claimed ? (
                          <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">Already Claimed</span>
                        ) : (
                          <ArrowRight className="w-5 h-5 text-slate-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="text-center pt-4">
                <p className="text-slate-500 text-sm">Can't find your business?</p>
                <button className="text-fuchsia-400 text-sm font-medium">Add it manually →</button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Verify Location */}
          {step === 'verify-location' && (
            <motion.div
              key="location"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button onClick={() => setStep('search')} className="flex items-center gap-2 text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <div className="text-center">
                <MapPin className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">Verify Your Location</h1>
                <p className="text-slate-400">We need to confirm you're at {selectedBusiness?.name}</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-700">
                <h3 className="font-bold mb-2">{selectedBusiness?.name}</h3>
                <p className="text-slate-500 text-sm">{selectedBusiness?.address}</p>
              </div>

              {locationError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {locationError}
                </div>
              )}

              {location && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Location verified! ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
                </div>
              )}

              <button
                onClick={getLocation}
                disabled={isLoadingLocation}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoadingLocation ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Getting Location...</>
                ) : (
                  <><MapPin className="w-5 h-5" /> Verify My Location</>
                )}
              </button>
            </motion.div>
          )}

          {/* Step 3: Selfie Verification */}
          {step === 'selfie' && (
            <motion.div
              key="selfie"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button onClick={() => setStep('verify-location')} className="flex items-center gap-2 text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <div className="text-center">
                <Camera className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">Take a Selfie</h1>
                <p className="text-slate-400">Prove you're at your business right now</p>
              </div>

              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-700">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted
                  className="w-full h-full object-cover"
                />
                {!cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
                  </div>
                )}
              </div>

              <button
                onClick={capturePhoto}
                disabled={!cameraActive}
                className="w-full py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Camera className="w-5 h-5" /> Capture Photo
              </button>
            </motion.div>
          )}

          {/* Step 4: Complete */}
          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              <h1 className="text-3xl font-bold">Claim Submitted!</h1>
              <p className="text-slate-400">We'll review your verification and activate your business within 24 hours.</p>

              {selfieImage && (
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-slate-700">
                  <img src={selfieImage} alt="Verification selfie" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="p-6 rounded-2xl bg-gradient-to-r from-fuchsia-900/20 to-cyan-900/20 border border-fuchsia-500/20">
                <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">You earned 3 Gold Tokens! 🎉</h3>
                <p className="text-slate-400 text-sm">Use them to boost your listing or unlock premium features.</p>
              </div>

              <Link 
                href="/dashboard"
                className="w-full py-4 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 font-bold transition-all block text-center"
              >
                Go to Dashboard →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
