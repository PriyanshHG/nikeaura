import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, CheckCircle2, User, Dumbbell, Sparkles, MessageSquare, ChevronRight, Send, ArrowRight } from 'lucide-react';
import { Coach } from '../types';

const COACHES: Coach[] = [
  {
    id: 'bowerman',
    name: 'COACH BOWERMAN',
    title: 'THE TACITIAN OF COGNITIVE WILLPOWER',
    quote: '"If you have a body, you are an athlete. Discipline is the software."',
    bio: 'Bill Bowerman didn’t just mold rubber; he forged human potential. The Bowerman Synergy simulation brings relentless technical splits, biomechanical precision, and old-school cognitive toughness designed to break psychological limits.',
    focus: ['Mechanical Efficiency', 'Track Splits & Cadence', 'Cognitive Grit', 'Carbon Recoil Sync'],
    metricsTarget: 'STRIDE QUALITY & NERVOUS SPEED',
    accentColor: '#D2FC00', // Volt
    avatarIcon: 'Bowerman',
    initialCue: 'We are chasing efficiency down to the millimeter. Enter your current performance bottleneck, and let’s construct a plan to shatter it.',
  },
  {
    id: 'serena',
    name: 'COACH SERENA',
    title: 'THE QUEEN OF EXPLOSIVE DOMINANCE',
    quote: '"Champions are made in the dark. Grit is the fire inside."',
    bio: 'Serena Williams defined absolute power, poise, and mental grit. The Serena Synergy simulation focuses on explosive fast-twitch kinetic movement, psychological peak states, high-impact threshold intervals, and muscular endurance.',
    focus: ['Explosive Kinetic Force', 'Champion-Level Mental Focus', 'Fast-Twitch Conditioning', 'Lactate Resistance'],
    metricsTarget: 'POWER OUTPUT & MENTAL ENDURANCE',
    accentColor: '#00F5FF', // Cyan
    avatarIcon: 'Serena',
    initialCue: 'Power is nothing without confidence. Tell me your athletic goal, and we will configure a training load that makes you unstoppable.',
  },
  {
    id: 'kipchoge',
    name: 'COACH KIPCHOGE',
    title: 'THE PIONEER OF INFINITE FLOW',
    quote: '"No human is limited. Your lungs are only the first boundary."',
    bio: 'Eliud Kipchoge proved that human threshold is expandable. The Kipchoge Synergy simulation is a meditative, highly technical endurance guide focused on oxygen pacing economy, aerobic lipid adaptation, and extreme cardiovascular efficiency.',
    focus: ['Pacing & Oxygen Economy', 'Aerobic Threshold Expansion', 'Cardiovascular Flow States', 'Recovery Optimization'],
    metricsTarget: 'VO2 CAPACITANCE & STEADY CADENCE',
    accentColor: '#FF4136', // Coral Red
    avatarIcon: 'Kipchoge',
    initialCue: 'Endurance is a quiet dialogue with your lungs. Share your endurance targets, and we shall formulate a steady flow pattern.',
  },
];

const OBJECTIVES = [
  { id: 'sub3', label: 'SUB-3 HOUR MARATHON', category: 'Endurance' },
  { id: '100msprint', label: '100M EXPLOSIVE SPRINT', category: 'Speed' },
  { id: 'hiitrecovery', label: 'MITOCHONDRIAL RECOVERY BOOST', category: 'Recovery' },
  { id: 'verticaljump', label: 'VERTICAL LAUNCH POWER', category: 'Explosiveness' },
];

export default function AICoaches() {
  const [selectedCoach, setSelectedCoach] = useState<Coach>(COACHES[0]);
  const [selectedObj, setSelectedObj] = useState<string>(OBJECTIVES[0].id);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<any | null>(null);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'coach'; text: string }>>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize chat when coach changes
  useEffect(() => {
    setChatHistory([
      { role: 'coach', text: `[${selectedCoach.name}] Initiating telemetry link. ${selectedCoach.initialCue}` },
    ]);
  }, [selectedCoach]);

  // Handle plan generation simulation
  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setGeneratedPlan(null);

    setTimeout(() => {
      setIsGenerating(false);

      // Seed personalized training output based on objective & coach
      if (selectedObj === 'sub3') {
        setGeneratedPlan({
          title: '3-WEEK SYMPHONIC ENDURANCE SPLIT',
          target: 'Sub-3:00 Marathon Pace Conditioning',
          coach: selectedCoach.name,
          accent: selectedCoach.accentColor,
          schedule: [
            {
              day: 'MON // VOLUMETRIC CADENCE',
              workout: '22km Lactate Clearance Run',
              pace: '4:15 min/km flat',
              gearSync: 'Heel Pod set to 620Hz medium-flex absorption. Synaptic threads expanded to 40% breathing.',
              mentalTip: 'Match your breath to your left heel strike. Stay inside the box.',
            },
            {
              day: 'WED // OXYGEN DEPRIVATION SPLITS',
              workout: '5x 1600m VO2 Threshold Reps',
              pace: '3:45 min/km with 2-min recovery',
              gearSync: 'Forefoot stiffened to 850Hz rigid propulsion plate mode.',
              mentalTip: 'Suck in oxygen at the start of each stride. Clear your mind of physical fatigue.',
            },
            {
              day: 'FRI // RECOVERY MATRIX',
              workout: '8km Soft Grass Recovery Glide',
              pace: '5:30 min/km easy',
              gearSync: 'Aura pod set to 300Hz gentle vibration compression.',
              mentalTip: 'Reflect on your posture. Feel the ground. Let the kinetic soles absorb 100% impact.',
            },
          ],
        });
      } else if (selectedObj === '100msprint') {
        setGeneratedPlan({
          title: 'NEURAL EXPLOSION POWER BLOCK',
          target: 'Anaerobic Fast-Twitch Neuromuscular Recruitment',
          coach: selectedCoach.name,
          accent: selectedCoach.accentColor,
          schedule: [
            {
              day: 'MON // NEURAL FORCE INITIATION',
              workout: '8x 60m Acceleration Blocks with resistance',
              pace: '100% effort, 3-min standing recovery',
              gearSync: 'Heel pod set to 950Hz ultra-stiff carbon return. 0.05ms ground contact time calibration.',
              mentalTip: 'Explode out of the crouch. Drive the hips forward like a coiled spring.',
            },
            {
              day: 'WED // HIGH RECOIL STRIDE SPLITS',
              workout: '4x 150m Flyovers at 95% velocity',
              pace: 'Maximum stride frequency tracking',
              gearSync: 'Lacing polymer compresses 8% to lock down the midfoot heel cup.',
              mentalTip: 'Knees up, ankles locked. Do not let your heels touch the surface.',
            },
            {
              day: 'FRI // CADENCE DECOMPRESSION',
              workout: 'Contrast drills & light reactive strides',
              pace: 'Variable pacing with cognitive light reaction',
              gearSync: 'Dynamic calibration active: adaptive Sole stiffness.',
              mentalTip: 'Relax your jaw. Tension is the enemy of velocity.',
            },
          ],
        });
      } else if (selectedObj === 'hiitrecovery') {
        setGeneratedPlan({
          title: 'PARASYMPATHETIC MITOCHONDRIAL FLUSH',
          target: 'Lactate Threshold Adaptation & Muscle Repair Sync',
          coach: selectedCoach.name,
          accent: selectedCoach.accentColor,
          schedule: [
            {
              day: 'MON // INTERMITTENT OXYGEN SURGE',
              workout: '45-min Fartlek (Pace Play)',
              pace: 'Alternate 1-min Sprint / 2-min Recovery',
              gearSync: 'Biometrics tracking active. Sole softens automatically during recovery zones.',
              mentalTip: 'Visualize lactic acid clearing from your calves on every recovery cycle.',
            },
            {
              day: 'WED // CELLULAR REPAIR CADENCE',
              workout: 'Steady-state aerobic swim/jog crossover',
              pace: 'Zone 2 cardiac range (120-135 BPM)',
              gearSync: 'Synaptic threads fully dilated to maximize cutaneous sweat drainage.',
              mentalTip: 'Mediate. Let your heart rate settle. No rush.',
            },
            {
              day: 'FRI // HYPERBARIC INTERVAL FLUSH',
              workout: '3x 2000m progressive stride drills',
              pace: 'Build from 5:00 to 4:00 min/km',
              gearSync: 'Micro-seismic pod logs heel strike angle to optimize joint angles.',
              mentalTip: 'Let the kinetic footwear carry your natural weight distribution.',
            },
          ],
        });
      } else {
        setGeneratedPlan({
          title: 'EXPLOSIVE VERTICAL LAUNCH BLOCK',
          target: 'Eccentric Joint Deceleration & Concentric Launch Force',
          coach: selectedCoach.name,
          accent: selectedCoach.accentColor,
          schedule: [
            {
              day: 'MON // PLYOMETRIC STIFFNESS SYNC',
              workout: '6x4 Depth Jumps into Explosive Box Hurdles',
              pace: 'Under 0.2s ground impact reaction speed',
              gearSync: 'Carbon fluid plate stiffens to 980Hz on high-speed deceleration compression.',
              mentalTip: 'Absorb the drop with your tendons, then instantly rocket upwards.',
            },
            {
              day: 'WED // FAST-TWITCH KINETIC RECRUIT',
              workout: '5x5 Trap Bar Deadlifts paired with Tuck Jumps',
              pace: 'Maximum concentric velocity tracking',
              gearSync: 'Lacing compression locks down heel at 90lbs pressure during lifting frames.',
              mentalTip: 'Drive through the floor. Push the earth away from your core.',
            },
            {
              day: 'FRI // ISOMETRIC REACTION CALIBRATION',
              workout: 'Isometric squat holds into 40-yard sprints',
              pace: 'Static hold 10s then rapid burst',
              gearSync: 'Aura sensor logs precise ankle deflection angles.',
              mentalTip: 'Unleash stored kinetic energy instantly. Smooth explosive transition.',
            },
          ],
        });
      }
    }, 2000);
  };

  // Chat logic simulation
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    setChatHistory((prev) => [...prev, { role: 'user', text: userText }]);
    setChatMessage('');
    setIsTyping(true);

    // Simulate smart Coach AI response based on questions
    setTimeout(() => {
      setIsTyping(false);
      let responseText = '';

      if (selectedCoach.id === 'bowerman') {
        if (userText.toLowerCase().includes('strain') || userText.toLowerCase().includes('hurt') || userText.toLowerCase().includes('pain')) {
          responseText = `[COACH BOWERMAN] Stride telemetry warning detected. Strain implies mechanical overload. I am instantly adjusting your Kinetic Core dampening: we will soften the carbon plate to 400Hz and reduce your scheduled track splits by 15%. Rest tomorrow, and complete 4km of grass-gliding on Friday. Prioritize mechanical alignment over speed.`;
        } else if (userText.toLowerCase().includes('speed') || userText.toLowerCase().includes('faster') || userText.toLowerCase().includes('sprint')) {
          responseText = `[COACH BOWERMAN] To yield speed, we must decrease ground contact time. I am programming short 80m stride hill repetitions. I will calibrate your Aura heel pods to provide 900Hz rigid recoil to force quicker foot pick-up. Keep the trunk stable. Ready to trigger?`;
        } else {
          responseText = `[COACH BOWERMAN] Received. I have factored that into our biomechanical database. Your carbon sole recoil and synthetic ventilation threads are synced. Let’s execute the next training block without excuse. Precision leads to victory.`;
        }
      } else if (selectedCoach.id === 'serena') {
        if (userText.toLowerCase().includes('strain') || userText.toLowerCase().includes('hurt') || userText.toLowerCase().includes('pain')) {
          responseText = `[COACH SERENA] Hey, pull back! Champions respect their temple. If you have strain, your neuromuscular firing is compromised. Let’s pivot. Today is a pure parasympathetic recovery sync. We will expand the Synaptic Threading to maximum stretch, giving you full therapeutic relief. No explosive jumps until your kinetic index recovers.`;
        } else if (userText.toLowerCase().includes('mental') || userText.toLowerCase().includes('focus') || userText.toLowerCase().includes('tired')) {
          responseText = `[COACH SERENA] Power starts in the mind. When you feel tired, that is your brain trying to protect you. Bypass that warning. Breathe through the fire. I am loading a high-intensity 5-min mental drive pattern onto your Aura sync. We conquer this set now.`;
        } else {
          responseText = `[COACH SERENA] Solid point. Let's work with that energy. I have updated your anaerobic targets to match this exact pacing. Let’s load the explosiveness parameters and get to work. Go hard!`;
        }
      } else {
        // Kipchoge
        if (userText.toLowerCase().includes('strain') || userText.toLowerCase().includes('hurt') || userText.toLowerCase().includes('pain')) {
          responseText = `[COACH KIPCHOGE] Pain is a critical signal, an imbalance in our meditative flow. Do not fight it. We shall turn down your stride frequency and switch to water-immersion or easy recovery glides. Aura pods are set to cushion-only absorption mode. Rest is an active component of endurance.`;
        } else if (userText.toLowerCase().includes('marathon') || userText.toLowerCase().includes('endurance') || userText.toLowerCase().includes('long')) {
          responseText = `[COACH KIPCHOGE] True endurance is peace of mind. We will build your aerobic foundation slowly. I am configuring a 25km oxygen-sync flow. Maintain a deep 3:3 abdominal breathing pattern. No limits.`;
        } else {
          responseText = `[COACH KIPCHOGE] Beautiful. When we synchronize our breathing with the natural roll of our strides, distance dissolves. Your telemetry parameters have been updated for steady cardiovascular lipid clearance. Let us move with tranquility.`;
        }
      }

      setChatHistory((prev) => [...prev, { role: 'coach', text: responseText }]);
    }, 1800);
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  return (
    <section id="coaches" className="relative bg-nike-black py-24 border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(210,252,0,0.04),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs text-nike-volt font-bold tracking-widest block mb-2 uppercase">
            // ATHLETIC COGNITION
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white italic tracking-tighter uppercase leading-none">
            NIKE COACHING LAB
          </h2>
          <p className="font-sans text-sm text-white/50 mt-4 leading-relaxed">
            Connect with virtual simulations of legendary athletic advisors. Converse in real-time to dynamically calibrate gear telemetry and receive training splits that follow elite human wisdom.
          </p>
        </div>

        {/* Coach Profiles Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {COACHES.map((coach) => {
            const isSelected = selectedCoach.id === coach.id;
            return (
              <button
                key={coach.id}
                onClick={() => setSelectedCoach(coach)}
                className={`relative rounded-xl border p-4 sm:p-6 text-left transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-nike-dark/80 border-nike-volt glow-volt/5 shadow-xl'
                    : 'bg-nike-dark/30 border-white/5 hover:border-white/10 hover:bg-nike-dark/50'
                }`}
              >
                {/* Background glow when active */}
                {isSelected && (
                  <div
                    className="absolute inset-0 rounded-xl opacity-5 pointer-events-none transition-all duration-300"
                    style={{ backgroundColor: coach.accentColor }}
                  />
                )}

                <div>
                  {/* Coach Icon Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-black text-black text-sm"
                      style={{ backgroundColor: coach.accentColor }}
                    >
                      {coach.avatarIcon[0]}
                    </div>
                    <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">
                      ACTIVE_COGNITION
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-white italic tracking-tight mb-1">
                    {coach.name}
                  </h3>
                  <div
                    className="font-mono text-[9px] font-bold tracking-widest mb-3 uppercase"
                    style={{ color: coach.accentColor }}
                  >
                    {coach.title}
                  </div>

                  <p className="font-serif italic text-white/60 text-xs mb-4 leading-relaxed">
                    {coach.quote}
                  </p>
                  <p className="font-sans text-xs text-white/40 leading-relaxed mb-6">
                    {coach.bio}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 w-full">
                  <div className="font-mono text-[9px] text-white/40 mb-2 uppercase tracking-wider">
                    FOCUS DOMAIN
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {coach.focus.map((f) => (
                      <span
                        key={f}
                        className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/70"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Split Pane: Planner + Real-time Converse */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Custom Plan Generator */}
          <div className="lg:col-span-6 bg-nike-dark border border-white/5 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <Dumbbell size={16} className="text-nike-volt" />
                <span className="font-mono text-xs font-black tracking-widest text-white/80 uppercase">
                  SYNAPSE PERFORMANCE PLANNER
                </span>
              </div>

              <div className="space-y-4">
                <span className="font-mono text-[10px] text-white/40 tracking-widest block uppercase">
                  CHOOSE CORE ATHLETIC TARGET:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {OBJECTIVES.map((obj) => {
                    const isObjSelected = selectedObj === obj.id;
                    return (
                      <button
                        key={obj.id}
                        onClick={() => setSelectedObj(obj.id)}
                        className={`p-4 rounded-lg border text-left transition-all duration-300 ${
                          isObjSelected
                            ? 'bg-white/5 border-nike-volt glow-volt/5'
                            : 'bg-nike-black/40 border-white/5 hover:border-white/10'
                        }`}
                      >
                        <span className="font-mono text-[8px] text-white/40 tracking-widest uppercase block mb-1">
                          {obj.category}
                        </span>
                        <span className="font-display font-black text-xs text-white tracking-wide leading-none">
                          {obj.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button to Generate */}
              <button
                onClick={handleGeneratePlan}
                disabled={isGenerating}
                className="w-full py-4 bg-white text-black font-mono text-xs font-black tracking-widest hover:bg-nike-volt hover:scale-[1.02] transition-all duration-300 rounded flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                    />
                    <span>CALCULATING METABOLIC SPLITS...</span>
                  </>
                ) : (
                  <>
                    <span>COMPILE {selectedCoach.name} PLAN</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>

            {/* Generated Plan Output display */}
            <div className="mt-8 pt-6 border-t border-white/5 min-h-[220px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center space-y-4 py-8 text-center"
                  >
                    <div className="relative">
                      <Sparkles size={24} className="text-nike-volt animate-ping absolute -top-1 -right-1" />
                      <Target size={36} className="text-white/40 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-mono text-xs font-bold text-white/80">AURA CLOUD COMPILING...</div>
                      <div className="font-mono text-[9px] text-white/40">Syncing with coach parameters & sensor nodes</div>
                    </div>
                  </motion.div>
                ) : generatedPlan ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-mono text-[9px] px-2 py-0.5 rounded bg-nike-volt/10 text-nike-volt border border-nike-volt/20 w-fit mb-1 font-bold">
                          COMPILED OK // {generatedPlan.coach}
                        </div>
                        <h4 className="font-display font-black text-lg text-white italic tracking-tight">
                          {generatedPlan.title}
                        </h4>
                        <p className="font-sans text-[11px] text-white/50">{generatedPlan.target}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mt-4">
                      {generatedPlan.schedule.map((dayPlan: any, idx: number) => (
                        <div key={idx} className="bg-nike-black/50 border border-white/5 rounded-lg p-3.5 space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-nike-volt font-bold">{dayPlan.day}</span>
                            <span className="text-white/50">{dayPlan.pace}</span>
                          </div>
                          <div className="font-sans text-xs text-white font-medium">{dayPlan.workout}</div>
                          <div className="text-[10px] font-sans text-white/40 leading-relaxed">
                            <span className="text-nike-blue font-bold font-mono">CORE GEAR: </span>{dayPlan.gearSync}
                          </div>
                          <div className="text-[10px] italic font-serif text-white/55">
                            💡 "{dayPlan.mentalTip}"
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center space-y-2 text-center py-12 text-white/30"
                  >
                    <Target size={32} />
                    <span className="font-mono text-xs">AURA PLAN READY FOR DEPLOYMENT</span>
                    <span className="font-sans text-[10px] max-w-xs leading-normal">
                      Click the compilation button above to generate a modular day-by-day coaching sync block customized for this coach.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column: Converse Live (Chat Interface) */}
          <div className="lg:col-span-6 bg-nike-dark border border-white/5 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between h-[520px] lg:h-auto">
            
            {/* Chat header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <MessageSquare size={16} className="text-nike-blue animate-pulse" />
                <span className="font-mono text-xs font-black tracking-widest text-white/80 uppercase">
                  CONVERSE LIVE SYNAPSE
                </span>
              </div>
              <span className="font-mono text-[9px] text-white/40 uppercase">
                STATUS: ENCRYPTED_SYNC
              </span>
            </div>

            {/* Chat Messages Log Area */}
            <div
              ref={scrollRef}
              className="flex-grow overflow-y-auto space-y-3.5 pr-2 mb-4 scrollbar-thin"
            >
              {chatHistory.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={idx}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-3 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-white text-black font-sans font-medium rounded-tr-none'
                          : 'bg-nike-black border border-white/5 text-white font-mono rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-nike-black border border-white/5 rounded-lg rounded-tl-none px-4 py-3 text-xs text-white/50 font-mono flex items-center gap-2">
                    <span>{selectedCoach.name} AI is processing</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-nike-volt rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-nike-volt rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-nike-volt rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Suggestion Bubbles */}
            <div className="flex flex-row overflow-x-auto gap-2 mb-4 pb-1.5 scrollbar-none max-w-full">
              <button
                onClick={() => {
                  setChatMessage('Can you adapt my splits for a mild calf strain?');
                }}
                className="font-mono text-[9px] text-white/50 hover:text-white bg-nike-black/40 border border-white/5 hover:border-white/15 rounded-full px-3 py-1.5 transition-colors text-left flex-shrink-0"
              >
                🩹 Calf strain adaptation?
              </button>
              <button
                onClick={() => {
                  setChatMessage('How do I optimize my footwear carbon sole recoil for speed?');
                }}
                className="font-mono text-[9px] text-white/50 hover:text-white bg-nike-black/40 border border-white/5 hover:border-white/15 rounded-full px-3 py-1.5 transition-colors text-left flex-shrink-0"
              >
                ⚡ Optimize carbon recoil
              </button>
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="relative flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder={`Ask ${selectedCoach.name} AI (e.g. adjust for injury, improve pacing)...`}
                className="flex-grow bg-nike-black border border-white/5 focus:border-nike-volt rounded-lg px-4 py-3 text-xs text-white placeholder-white/30 font-sans focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-12 bg-white hover:bg-nike-volt text-black rounded-lg flex items-center justify-center transition-all focus:outline-none"
              >
                <Send size={14} />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
