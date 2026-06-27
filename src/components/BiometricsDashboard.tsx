import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Flame, Heart, Sliders, TrendingUp, Volume2, Zap } from 'lucide-react';
import { Activity as ActivityType } from '../types';

const ACTIVITIES: ActivityType[] = [
  {
    id: 'sprint',
    name: 'ALPHA SPRINT',
    baseHeartRate: 155,
    baseVO2Max: 54,
    baseFatigue: 45,
    baseStrideEfficiency: 96,
    waveFrequency: 0.12,
    color: '#D2FC00', // Volt
    description: 'High-velocity anaerobic performance testing nervous system explosive output.',
  },
  {
    id: 'marathon',
    name: 'ENDURANCE FLOW',
    baseHeartRate: 128,
    baseVO2Max: 68,
    baseFatigue: 20,
    baseStrideEfficiency: 98,
    waveFrequency: 0.06,
    color: '#00F5FF', // Cyan
    description: 'Steady-state aerobic synchronization optimizing cardiovascular lipid burning.',
  },
  {
    id: 'hiit',
    name: 'HIIT COMBUSTION',
    baseHeartRate: 168,
    baseVO2Max: 50,
    baseFatigue: 65,
    baseStrideEfficiency: 92,
    waveFrequency: 0.18,
    color: '#FF4136', // Coral Red
    description: 'Interval maximum VO2 stress thresholds triggering mitochondrial biogenesis.',
  },
  {
    id: 'recovery',
    name: 'RECOVERY SYNAPSE',
    baseHeartRate: 98,
    baseVO2Max: 35,
    baseFatigue: 10,
    baseStrideEfficiency: 90,
    waveFrequency: 0.03,
    color: '#A066FF', // Purple
    description: 'Parasympathetic recovery flow restoring neural pathways and oxygen stores.',
  },
];

export default function BiometricsDashboard() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>(ACTIVITIES[0]);
  const [speed, setSpeed] = useState<number>(75); // percentage slider
  const [intensity, setIntensity] = useState<number>(60); // percentage slider
  const [tick, setTick] = useState<number>(0);
  const [audioCue, setAudioCue] = useState<string | null>(null);
  const [isPlayingCue, setIsPlayingCue] = useState<boolean>(false);
  const audioCueTimeout = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // High-performance WebGL-inspired 2D Canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const particlesCount = 70;
    const particles: Array<{
      x: number;
      y: number;
      speedY: number;
      speedX: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedY: (Math.random() * 0.4 + 0.1) * -1,
        speedX: (Math.random() * 0.4 - 0.2),
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw custom HUD vector background grids
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Floating bio-metric data particles
      const speedMult = 0.5 + (speed / 50);
      particles.forEach((p) => {
        p.y += p.speedY * speedMult;
        p.x += p.speedX * speedMult;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }

        ctx.fillStyle = selectedActivity.color;
        ctx.globalAlpha = p.opacity * (intensity / 80 + 0.2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Interactive sweep radar line
      const sweepTime = Date.now() * 0.0015;
      const sweepX = ((sweepTime * 140) % (width + 120)) - 60;
      
      const gradient = ctx.createLinearGradient(sweepX - 50, 0, sweepX, 0);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.5, `${selectedActivity.color}04`);
      gradient.addColorStop(1, `${selectedActivity.color}18`);

      ctx.fillStyle = gradient;
      ctx.fillRect(sweepX - 50, 0, 50, height);

      ctx.strokeStyle = `${selectedActivity.color}35`;
      ctx.beginPath();
      ctx.moveTo(sweepX, 0);
      ctx.lineTo(sweepX, height);
      ctx.stroke();

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedActivity, speed, intensity]);

  // Computed live stats that react to activity selection, speed, and intensity
  const liveHeartRate = Math.round(
    selectedActivity.baseHeartRate + (speed / 10) * 2 + (intensity / 10) * 1.5
  );
  const liveVO2Max = parseFloat(
    (selectedActivity.baseVO2Max + (intensity / 20) * 1.2 - (speed / 30) * 0.5).toFixed(1)
  );
  const liveFatigue = Math.min(
    100,
    Math.round(selectedActivity.baseFatigue + (speed / 100) * 20 + (intensity / 100) * 25)
  );
  const liveStrideEfficiency = parseFloat(
    Math.min(
      100,
      selectedActivity.baseStrideEfficiency + (speed / 100) * 2.5 - (intensity / 100) * 3
    ).toFixed(1)
  );

  // Sine Wave movement frame ticker
  useEffect(() => {
    let animFrameId: number;
    const update = () => {
      // Speed up animation frequency with activity wave frequency and speed slider
      const speedMultiplier = 1 + (speed - 50) / 50;
      setTick((prev) => prev + selectedActivity.waveFrequency * speedMultiplier * 4);
      animFrameId = requestAnimationFrame(update);
    };
    animFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animFrameId);
  }, [selectedActivity, speed]);

  // Generate automated real-time coach feedback based on telemetry thresholds
  useEffect(() => {
    if (liveHeartRate > 180) {
      setAudioCue(
        `[Coach Bowerman] CRITICAL ALERT: Heart rate at ${liveHeartRate} BPM. Entering Anaerobic Zone 5. Your carbon plates are stiffening to maximum recoil. Slow down to 4:15/km pace to avoid hamstring locking.`
      );
    } else if (liveFatigue > 75) {
      setAudioCue(
        `[Coach Serena] ENERGY STRESS: Muscle fatigue is at ${liveFatigue}%. Stride sync is dropping. Readjusting your synaptic yarn fibers. Breathe deep, hold for 2 seconds, and focus on explosive knee drives.`
      );
    } else if (liveStrideEfficiency < 93) {
      setAudioCue(
        `[Coach Kipchoge] EFFICIENCY CUE: Stride economy has dropped to ${liveStrideEfficiency}%. Left foot ground contact time is 12ms too long. Keep your torso tall and lean slightly forward from the ankles.`
      );
    } else {
      setAudioCue(
        `[Aura Core Sync] SYSTEM BALANCED: Heart rate ${liveHeartRate} BPM is highly synchronized. VO2 efficiency is optimal. Fluid carbon plating absorbs 98% of muscular shock.`
      );
    }
  }, [liveHeartRate, liveFatigue, liveStrideEfficiency]);

  // Generate a beautiful organic SVG wave representation of heart + synaptic electric rhythm
  const getWavePath = () => {
    const width = 800;
    const height = 150;
    const amp = 18 * (intensity / 50) * (selectedActivity.id === 'hiit' ? 1.4 : 1);
    const step = 8;
    const points: string[] = [];

    for (let x = 0; x <= width; x += step) {
      // Base heartbeat ECG impulse shape + sine waves
      const phase = (x / width) * Math.PI * 4;
      const t = tick * 0.05;
      
      // ECG simulation: Add intermittent high-energy spikes
      let spike = 0;
      const ecgCycle = (x + tick * 15) % 180;
      if (ecgCycle > 60 && ecgCycle < 75) {
        // QRS complex of ECG
        const spikeRatio = (ecgCycle - 60) / 15;
        spike = Math.sin(spikeRatio * Math.PI) * amp * 3 * (speed / 60);
        if (ecgCycle > 66 && ecgCycle < 70) spike = -spike * 0.8; // deep drop
      }

      const y =
        height / 2 +
        Math.sin(phase - t) * amp * 0.6 +
        Math.cos(phase * 1.8 + t * 1.5) * (amp * 0.3) +
        spike;

      points.push(`${x},${y}`);
    }

    return `M ${points.join(' L ')}`;
  };

  const handleTriggerVoiceCue = () => {
    if (isPlayingCue) return;
    setIsPlayingCue(true);
    // Mimic synthetic audio playback animation
    audioCueTimeout.current = setTimeout(() => {
      setIsPlayingCue(false);
    }, 4500);
  };

  useEffect(() => {
    return () => {
      if (audioCueTimeout.current) clearTimeout(audioCueTimeout.current);
    };
  }, []);

  return (
    <section id="biometrics" className="relative bg-nike-dark py-24 border-t border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,245,255,0.05),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-xs text-nike-volt font-bold tracking-widest block mb-2 uppercase">
              // TELEMETRY ENGINE
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white italic tracking-tighter uppercase leading-none">
              REAL-TIME BIOMETRICS
            </h2>
            <p className="font-sans text-sm text-white/50 mt-3 max-w-xl">
              Simulate human biometrics matching in-gear physical performance. Push sliders to witness immediate computational fabric response.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-nike-volt rounded-full animate-ping" />
            <span className="font-mono text-xs text-white/60 tracking-widest">
              CHANNEL: SECURE_CORE_SYNC
            </span>
          </div>
        </div>

        {/* Outer Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Activity Selectors & Controllers */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* Activity Pickers */}
            <div className="bg-nike-black border border-white/5 rounded-xl p-6 space-y-4">
              <span className="font-mono text-[10px] text-white/40 tracking-widest block uppercase">
                SELECT ATHLETIC INTENT
              </span>
              
              <div className="grid grid-cols-1 gap-2.5">
                {ACTIVITIES.map((act) => {
                  const isSelected = selectedActivity.id === act.id;
                  return (
                    <button
                      key={act.id}
                      onClick={() => setSelectedActivity(act)}
                      className={`relative w-full text-left p-4 rounded-lg border transition-all duration-300 group ${
                        isSelected
                          ? 'bg-white/5 border-nike-volt glow-volt/5'
                          : 'bg-nike-dark/40 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className="font-mono text-xs font-black tracking-widest"
                          style={{ color: act.color }}
                        >
                          {act.name}
                        </span>
                        {isSelected && <Zap size={12} className="text-nike-volt fill-current" />}
                      </div>
                      <p className="font-sans text-[11px] text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                        {act.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Performance Controls (Sliders) */}
            <div className="bg-nike-black border border-white/5 rounded-xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-white/80 font-mono text-xs font-bold tracking-widest uppercase">
                <Sliders size={14} className="text-nike-volt" />
                <span>SIMULATOR FORCE</span>
              </div>

              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-white/50">ATHLETE SPEED / PACE</span>
                  <span className="text-nike-volt font-bold">{Math.round(speed / 10)}.{speed % 10} km/h</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="120"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-nike-volt hover:accent-white transition-all focus:outline-none"
                />
              </div>

              {/* Incline / Intensity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-white/50">WORKOUT INCLINE / LOAD</span>
                  <span className="text-nike-blue font-bold">{Math.round(intensity / 10)}.{intensity % 10}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-nike-blue hover:accent-white transition-all focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Telemetry Visualizations */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            
            {/* Visual Wave Canvas Container */}
            <div className="bg-nike-black border border-white/5 rounded-xl p-4 sm:p-6 relative flex flex-col justify-between overflow-hidden min-h-[220px]">
              
              {/* Dynamic canvas rendering the particle field */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
              />

              {/* Telemetry Wave Background Overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5">
                <div className="w-96 h-96 rounded-full border border-nike-volt animate-ping duration-[12000ms]" />
              </div>

              {/* Panel Top Details */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-widest text-white/40">
                <span>WAVEFORM: CELLULAR_SYNC_OSCILLOSCOPE</span>
                <span className="flex items-center gap-1.5 text-nike-volt">
                  <Activity size={10} className="animate-pulse" />
                  LIVE GRAPH
                </span>
              </div>

              {/* SVG Dynamic Wave Rendering */}
              <div className="relative w-full h-40 flex items-center justify-center my-4 overflow-hidden">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 800 150" preserveAspectRatio="none">
                  {/* Backdrop glowing trace line */}
                  <path
                    d={getWavePath()}
                    fill="none"
                    stroke={selectedActivity.color}
                    strokeWidth="3"
                    className="opacity-20 blur-[3px] transition-all duration-300"
                  />
                  {/* Sharp foreground trace line */}
                  <path
                    d={getWavePath()}
                    fill="none"
                    stroke={selectedActivity.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>
              </div>

              {/* Status footer with current wave metric feedback */}
              <div className="relative z-10 flex justify-between items-center text-[11px] font-mono border-t border-white/5 pt-3">
                <div className="text-white/40">
                  REF_V_FREQ: <span className="text-white font-bold">{(selectedActivity.waveFrequency * (1 + (speed - 50) / 100)).toFixed(3)} Hz</span>
                </div>
                <div className="text-white/40">
                  SYSTEM_INTEGRITY: <span className="text-nike-volt font-bold">99.98% OK</span>
                </div>
              </div>
            </div>

            {/* Grid of live quantitative metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Metric 1: Heart Rate */}
              <div className="bg-nike-black border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col justify-between group hover:border-nike-volt/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-[10px] text-white/40 tracking-widest">HEART RATE</span>
                  <Heart size={14} className="text-red-500 fill-current animate-pulse" />
                </div>
                <div>
                  <span className="font-display font-black text-3xl md:text-4xl text-white tracking-tight">
                    {liveHeartRate}
                  </span>
                  <span className="font-mono text-xs text-white/50 ml-1">BPM</span>
                </div>
                <div className="text-[10px] font-mono text-white/40 mt-2 border-t border-white/5 pt-1">
                  LIMIT: <span className="text-white">195 BPM</span>
                </div>
              </div>

              {/* Metric 2: VO2 Max */}
              <div className="bg-nike-black border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col justify-between group hover:border-nike-blue/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-[10px] text-white/40 tracking-widest">OXYGEN (VO2)</span>
                  <TrendingUp size={14} className="text-nike-blue" />
                </div>
                <div>
                  <span className="font-display font-black text-3xl md:text-4xl text-white tracking-tight">
                    {liveVO2Max}
                  </span>
                  <span className="font-mono text-xs text-white/50 ml-1">ml/kg</span>
                </div>
                <div className="text-[10px] font-mono text-white/40 mt-2 border-t border-white/5 pt-1">
                  AEROBIC EFF: <span className="text-nike-blue">94%</span>
                </div>
              </div>

              {/* Metric 3: Muscle Fatigue */}
              <div className="bg-nike-black border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col justify-between group hover:border-orange-500/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-[10px] text-white/40 tracking-widest">FATIGUE</span>
                  <Flame size={14} className="text-orange-500" />
                </div>
                <div>
                  <span className="font-display font-black text-3xl md:text-4xl text-white tracking-tight">
                    {liveFatigue}
                  </span>
                  <span className="font-mono text-xs text-white/50 ml-1">%</span>
                </div>
                <div className="text-[10px] font-mono text-white/40 mt-2 border-t border-white/5 pt-1">
                  LACTATE: <span className="text-orange-400">{(liveFatigue * 0.08).toFixed(1)} mmol</span>
                </div>
              </div>

              {/* Metric 4: Stride Efficiency */}
              <div className="bg-nike-black border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col justify-between group hover:border-purple-500/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-[10px] text-white/40 tracking-widest">STRIDE ECON</span>
                  <Activity size={14} className="text-purple-400" />
                </div>
                <div>
                  <span className="font-display font-black text-3xl md:text-4xl text-white tracking-tight">
                    {liveStrideEfficiency}
                  </span>
                  <span className="font-mono text-xs text-white/50 ml-1">%</span>
                </div>
                <div className="text-[10px] font-mono text-white/40 mt-2 border-t border-white/5 pt-1">
                  BALANCE: <span className="text-white">49.8/50.2%</span>
                </div>
              </div>

            </div>

            {/* Simulated Live Audio Coach Guidance Box */}
            <div className="bg-nike-black border border-white/10 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="flex-shrink-0">
                <button
                  onClick={handleTriggerVoiceCue}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                    isPlayingCue
                      ? 'bg-nike-volt text-black animate-pulse glow-volt'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-nike-volt/50'
                  }`}
                  title="Trigger interactive verbal coach update"
                >
                  <Volume2 size={16} className={isPlayingCue ? 'animate-bounce' : ''} />
                </button>
              </div>

              <div className="flex-grow text-center md:text-left space-y-1.5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                  <span className="font-mono text-[10px] text-nike-volt font-bold tracking-widest uppercase">
                    LIVE AI COACH INSTRUCTION FEED
                  </span>
                  <span className="font-mono text-[9px] text-white/30">
                    LATENCY: 14ms (EDGE_SYNC)
                  </span>
                </div>
                
                <p className="font-mono text-xs text-white/80 leading-relaxed min-h-[40px] italic">
                  {isPlayingCue ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-white"
                    >
                      🔊 {audioCue?.replace(/\[(.*?)\]/, '[$1 // SPEAKING...]')}
                    </motion.span>
                  ) : (
                    <span className="text-white/40">
                      Tap the audio button to hear your Nike AI Coach construct synthetic verbal feedback based on this precise simulation telemetry.
                    </span>
                  )}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
