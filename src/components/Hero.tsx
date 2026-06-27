import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Cpu, Eye, Info, RefreshCw, Sparkles, Target } from 'lucide-react';
import nikeAuraConcept from '../assets/images/nike_aura_concept_1782536813615.jpg';

interface HeroProps {
  onSyncClick: () => void;
}

export default function Hero({ onSyncClick }: HeroProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const hotspots = [
    {
      id: 'biopod',
      name: 'AURA BIO-POD V1',
      x: '75%',
      y: '78%',
      description: 'Micro-seismic sensor reading cellular temperature, lactate buildup, and stride oscillation at 1,000 samples per second.',
      placement: 'left',
    },
    {
      id: 'synaptic',
      name: 'SYNAPTIC TENSION YARN',
      x: '38%',
      y: '35%',
      description: 'Electro-active polymer threading that dilates for targeted compression or ventilation based on localized muscle fatigue.',
      placement: 'bottom',
    },
    {
      id: 'kinetic',
      name: 'NEURAL FLUID PLATE',
      x: '55%',
      y: '85%',
      description: 'Non-Newtonian carbon dampening core that stiffens during heavy acceleration and cushions during deceleration, guided by real-time stride analysis.',
      placement: 'top',
    },
  ];

  return (
    <section id="vision" className="relative min-h-screen bg-nike-black pt-32 pb-20 overflow-hidden flex flex-col justify-center">
      {/* Background Grids & Ambient Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(210,252,0,0.07),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Storytelling Copy & Philosophy */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-nike-dark border border-white/10 rounded text-[10px] font-mono tracking-[0.2em] text-nike-volt mb-6 w-fit"
          >
            <Sparkles size={12} className="text-nike-volt animate-pulse" />
            <span>HYPOTHETICAL CONCEPT PREMIERE</span>
          </motion.div>

          {/* Nike Aggressive Slogan */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white uppercase italic leading-[0.85] mb-6"
          >
            WHAT IF <br />
            <span className="text-stroke-nike">NIKE</span> LAUNCHED <br />
            <span className="text-nike-volt">AURA?</span>
          </motion.h1>

          {/* Story Narrative */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="space-y-4 max-w-xl text-white/70"
          >
            <p className="font-sans text-lg font-light leading-relaxed">
              If you have a body, you are an athlete. But what if your gear possessed a responsive, living biometric feedback system?
            </p>
            <p className="font-sans text-sm leading-relaxed text-white/50">
              For over half a century, Nike designed the interface between the athlete and the ground. Now, we introduce the interface between human willpower and physical synchronization. <strong className="text-white font-semibold">NIKE AURA</strong> is a seamless kinetic apparel ecosystem that translates muscle intent, metabolic load, and focus states into real-time performance adjustments.
            </p>
          </motion.div>

          {/* Interactive Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              onClick={onSyncClick}
              id="hero-sync-cta"
              className="px-8 py-4 bg-nike-volt text-black font-mono text-xs font-black tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 rounded flex items-center gap-3 shadow-lg shadow-nike-volt/10"
            >
              <span>INITIALIZE BIOMETRIC SYNC</span>
              <ArrowRight size={14} />
            </button>
            <a
              href="#biometrics"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('biometrics')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-nike-dark border border-white/10 text-white font-mono text-xs font-bold tracking-widest hover:border-nike-volt/50 hover:bg-white/5 transition-all duration-300 rounded flex items-center gap-2"
            >
              <span>TELEMETRY FEED</span>
            </a>
          </motion.div>
        </div>

        {/* 3D Render Interactive Showcase */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden bg-nike-dark/40 backdrop-blur-3xl p-4 flex items-center justify-center group"
          >
            {/* The Generated High-End Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={nikeAuraConcept}
                alt="Nike Aura AI-Powered Human Performance Footwear"
                className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nike-black via-transparent to-nike-black/60 opacity-80" />
            </div>

            {/* Futuristic Tech Scanlines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40" />

            {/* Hotspots Panel Overlay */}
            <div className="absolute top-4 left-4 z-10 font-mono text-[9px] tracking-widest bg-black/70 backdrop-blur border border-white/10 rounded px-2.5 py-1 text-white/50 flex items-center gap-1.5">
              <Eye size={10} className="text-nike-volt" />
              <span>INTERACTIVE SCHEMA / TOUCH NODES</span>
            </div>

            {/* Dynamic UI Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
              <div className="font-mono text-[10px] text-white/40">
                SYS_STATUS: <span className="text-nike-volt">ARMED</span>
              </div>
              <div className="font-mono text-[10px] text-white/40">
                MODEL: <span className="text-nike-blue">AURA_CELL_V1</span>
              </div>
            </div>

            {/* Interactive Hotspots */}
            {hotspots.map((spot) => (
              <div
                key={spot.id}
                style={{ left: spot.x, top: spot.y }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              >
                {/* Glowing Outer Rings */}
                <button
                  onMouseEnter={() => {
                    if (window.innerWidth >= 768) setActiveHotspot(spot.id);
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth >= 768) setActiveHotspot(null);
                  }}
                  onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                  className="relative w-8 h-8 flex items-center justify-center focus:outline-none"
                  aria-label={`View spec for ${spot.name}`}
                >
                  <span className="absolute inset-0 rounded-full bg-nike-volt/30 animate-ping opacity-75" />
                  <span className="absolute w-4 h-4 rounded-full bg-nike-volt glow-volt border border-black flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  </span>
                </button>

                {/* Hotspot Info Bubble (Desktop only to prevent off-screen overlaps) */}
                <AnimatePresence>
                  {activeHotspot === spot.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute z-30 w-64 bg-nike-black/95 backdrop-blur-xl border border-nike-volt/30 rounded-lg p-3 text-left glow-volt shadow-2xl hidden md:block ${
                        spot.placement === 'left' ? 'right-10 -top-10' :
                        spot.placement === 'top' ? '-left-28 bottom-10' :
                        spot.placement === 'bottom' ? '-left-28 top-10' : 'left-10 -top-10'
                      }`}
                    >
                      <h4 className="font-mono text-xs font-black text-nike-volt tracking-widest uppercase mb-1 flex items-center gap-1">
                        <Info size={12} />
                        {spot.name}
                      </h4>
                      <p className="font-sans text-[11px] leading-relaxed text-white/80">
                        {spot.description}
                      </p>
                      <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/40">
                        <span>LATENCY: 0.8ms</span>
                        <span>TELEMETRY: LIVE</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Mobile Sheet for active hotspot (Responsive safety to prevent overlapping) */}
            <AnimatePresence>
              {activeHotspot && (
                <motion.div
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="absolute bottom-0 left-0 right-0 z-30 bg-nike-black/95 backdrop-blur-2xl border-t border-nike-volt/30 p-5 block md:hidden text-left"
                >
                  {(() => {
                    const spot = hotspots.find(h => h.id === activeHotspot);
                    if (!spot) return null;
                    return (
                      <>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-mono text-xs font-black text-nike-volt tracking-widest uppercase flex items-center gap-1.5">
                            <Info size={12} className="text-nike-volt" />
                            {spot.name}
                          </h4>
                          <button
                            onClick={() => setActiveHotspot(null)}
                            className="text-white/40 hover:text-white font-mono text-[10px] tracking-widest uppercase border border-white/10 px-2 py-0.5 rounded bg-white/5"
                          >
                            CLOSE
                          </button>
                        </div>
                        <p className="font-sans text-xs leading-relaxed text-white/90">
                          {spot.description}
                        </p>
                        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/40">
                          <span>LATENCY: 0.8ms</span>
                          <span>SIGNAL_STRENGTH: 100%</span>
                          <span>TELEMETRY: ACTIVE</span>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
