import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, RefreshCw, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BiometricsDashboard from './components/BiometricsDashboard';
import AICoaches from './components/AICoaches';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('vision');
  const [isSyncingGlobal, setIsSyncingGlobal] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState('INITIATING COGNITIVE HANDSHAKE...');

  // 1. Setup Scrollspy to highlight active navbar lines
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['vision', 'biometrics', 'coaches', 'pricing'];
      const scrollPos = window.scrollY + 250; // offset for nav height

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Global Sync Core sequence simulator
  const handleTriggerGlobalSync = () => {
    if (isSyncingGlobal) return;
    setIsSyncingGlobal(true);
    setSyncProgress(0);
    setSyncStatus('ESTABLISHING SECURE PROTOCOL LINK...');

    // Progress increments for holographic scanline feel
    const statuses = [
      { prg: 10, text: 'MAPPING NEURAL CORE RESISTANCE...' },
      { prg: 25, text: 'SYNCING AURA POD HEEL ACCELEROMETERS...' },
      { prg: 45, text: 'STABILIZING TRANS-SWEAT VENTILATION THREADS...' },
      { prg: 65, text: 'COACH INTERACTION CORE ENGINE ARMING...' },
      { prg: 85, text: 'KINETIC CARBON DAMPENING PLATES CALIBRATING...' },
      { prg: 95, text: 'TELEMETRY CHANNELS SYNCED SUCCESSFULLY...' },
      { prg: 100, text: 'SYSTEM CALIBRATED. ACTIVE BIOMETRIC FEED ENGAGED.' }
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < statuses.length) {
        setSyncProgress(statuses[currentIdx].prg);
        setSyncStatus(statuses[currentIdx].text);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSyncingGlobal(false);
          // Smooth scroll straight to Biometrics Telemetry Section to showcase the active sync
          const biometricsEl = document.getElementById('biometrics');
          if (biometricsEl) {
            biometricsEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1200);
      }
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-nike-black text-white font-sans antialiased overflow-x-hidden selection:bg-nike-volt selection:text-black">
      
      {/* 1. Global Navigation */}
      <Navbar onSyncClick={handleTriggerGlobalSync} activeSection={activeSection} />

      {/* 2. Main Storytelling Sections */}
      <main className="relative">
        <Hero onSyncClick={handleTriggerGlobalSync} />
        <BiometricsDashboard />
        <AICoaches />
        <PricingSection />
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Global Biometric Calibration/Sync Holographic Full-Screen Overlay */}
      <AnimatePresence>
        {isSyncingGlobal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-nike-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Green glowing ambient backing aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nike-volt/10 blur-[150px] rounded-full pointer-events-none" />

            {/* Scanlines Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

            {/* Center HUD Console */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-xl w-full border border-nike-volt/30 rounded-2xl p-8 md:p-12 bg-nike-dark/60 backdrop-blur-md relative overflow-hidden shadow-2xl glow-volt/5"
            >
              {/* Animated HUD corner lines */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-nike-volt" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-nike-volt" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-nike-volt" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-nike-volt" />

              <div className="space-y-8 relative z-10">
                
                {/* Rotating Loader icon */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-white/5 border-t-nike-volt border-r-nike-volt"
                  />
                  <Cpu size={32} className="text-nike-volt animate-pulse" />
                </div>

                {/* Status labels */}
                <div className="space-y-2">
                  <div className="font-mono text-[10px] text-nike-volt font-bold tracking-[0.2em] uppercase">
                    // AURA KINETIC CALIBRATION CHANNEL
                  </div>
                  <h3 className="font-display font-black text-2xl tracking-tight text-white uppercase italic">
                    SYNCING ATHLETE PROFILE
                  </h3>
                  <p className="font-mono text-xs text-white/50 min-h-[40px] flex items-center justify-center">
                    {syncStatus}
                  </p>
                </div>

                {/* Progress bar and numeric percentage */}
                <div className="space-y-3">
                  <div className="flex justify-between font-mono text-[11px] text-white/40">
                    <span>SECTOR_ALLOCATION: RAM_OK</span>
                    <span className="font-bold text-white">{syncProgress}%</span>
                  </div>
                  
                  {/* Outer Bar */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    {/* Inner active animated bar */}
                    <motion.div
                      className="h-full bg-nike-volt"
                      initial={{ width: '0%' }}
                      animate={{ width: `${syncProgress}%` }}
                      transition={{ ease: 'easeInOut' }}
                    />
                  </div>
                </div>

                {/* HUD technical data specs */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5 text-[9px] font-mono text-white/30">
                  <div className="text-left">
                    PORT: <span className="text-white">3000 // INGRESS</span>
                  </div>
                  <div>
                    GPS: <span className="text-white">LATENCY 0.1ms</span>
                  </div>
                  <div className="text-right flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 bg-nike-volt rounded-full animate-ping" />
                    <span>SECURE_LIVE</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
