import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, Sparkles, X, Zap } from 'lucide-react';
import { PricingPlan } from '../types';

const PLANS: PricingPlan[] = [
  {
    id: 'sync',
    name: 'AURA SYNC',
    priceMonthly: 19,
    priceAnnually: 15,
    tagline: 'Connect your biometrics. Harness basic athletic cognitive synchronization.',
    features: [
      'Real-time heart rate & VO2 Max sync',
      'Dynamic telemetry waveform monitoring',
      'Unified basic coaching feedback',
      'Bluetooth Core integration',
      '24/7 athletic performance logs'
    ],
    ctaText: 'START AURA SYNC'
  },
  {
    id: 'pro',
    name: 'PERFORMANCE LAB',
    priceMonthly: 39,
    priceAnnually: 29,
    tagline: 'Unlock individual legendary coaches and dynamic footwear telemetry adjustment.',
    features: [
      'All Sync core metrics',
      'Full access to Bowerman, Serena, & Kipchoge coaching blueprints',
      'Adaptive Carbon Sole Stiffness adjustments (0-1000Hz)',
      'Custom 3-Week metabolic plan compilations',
      'Live bio-feedback voice cues simulation',
      'Electro-polymer synaptic yarn ventilation control'
    ],
    isPopular: true,
    ctaText: 'ACQUIRE LAB ACCESS'
  },
  {
    id: 'elite',
    name: 'ELITE ATHLETE',
    priceMonthly: 99,
    priceAnnually: 79,
    tagline: 'For world-record breaking attempts. Future custom sensor delivery.',
    features: [
      'All Performance Lab modules',
      'Pre-order physical Aura Pods V1 hardware sensors',
      'Custom 1-on-1 weekly telemetry profiles',
      'Advanced mitochondrial recovery algorithms',
      'Priority neural sync servers with 0.1ms ping',
      'Beta firmware access for futuristic Nike apparel concepts'
    ],
    ctaText: 'SECURE ELITE PASS'
  }
];

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('annually');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isPreOrderOpen, setIsPreOrderOpen] = useState<boolean>(false);
  const [athleteName, setAthleteName] = useState<string>('');
  const [athleteEmail, setAthleteEmail] = useState<string>('');
  const [athleteCoach, setAthleteCoach] = useState<string>('Bowerman');
  const [athleteLevel, setAthleteLevel] = useState<string>('Marathoner');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [ticketNumber, setTicketNumber] = useState<string>('');

  const handleOpenPreOrder = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsPreOrderOpen(true);
    setIsSuccess(false);
  };

  const handlePreOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteName.trim() || !athleteEmail.trim()) return;

    setIsRegistering(true);

    // Simulate futuristic holographic processing
    setTimeout(() => {
      setIsRegistering(false);
      setIsSuccess(true);
      // Generate standard professional serial number
      const serial = `AURA-${Math.floor(100000 + Math.random() * 900000)}-${athleteLevel.substring(0,3).toUpperCase()}`;
      setTicketNumber(serial);
    }, 2200);
  };

  const handleCloseModal = () => {
    setIsPreOrderOpen(false);
    setSelectedPlan(null);
    setAthleteName('');
    setAthleteEmail('');
  };

  return (
    <section id="pricing" className="relative bg-nike-dark py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,255,0.03),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs text-nike-volt font-bold tracking-widest block mb-2 uppercase">
            // METRIC ACQUISITION
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white italic tracking-tighter uppercase leading-none">
            PRICING SCHEMATIC
          </h2>
          <p className="font-sans text-sm text-white/50 mt-4 leading-relaxed">
            Select your cognitive membership. Calibrate your performance nodes for continuous, real-time biological sync. Toggle billing below for optimized yearly rates.
          </p>

          {/* Toggle Switch */}
          <div className="mt-8 inline-flex items-center bg-nike-black border border-white/5 p-1 rounded-lg">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 text-xs font-mono font-bold tracking-widest rounded-md transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingPeriod('annually')}
              className={`relative px-4 py-2 text-xs font-mono font-bold tracking-widest rounded-md transition-all flex items-center gap-1.5 ${
                billingPeriod === 'annually'
                  ? 'bg-nike-volt text-black font-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              YEARLY SYNC
              <span className="text-[8px] bg-red-500 text-white font-mono px-1 rounded">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PLANS.map((plan) => {
            const price = billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceAnnually;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-nike-black border-nike-volt glow-volt/5 scale-[1.02]'
                    : 'bg-nike-black/40 border-white/5 hover:border-white/10'
                }`}
              >
                <div>
                  {/* Popular Ribbon Accent */}
                  {plan.isPopular && (
                    <div className="inline-block bg-nike-volt text-black font-mono text-[9px] font-black tracking-widest px-2.5 py-1 rounded mb-3">
                      RECOMMENDED // ACTIVE SYNAPSE
                    </div>
                  )}

                  <h3 className="font-display font-black text-3xl text-white italic tracking-tight uppercase mb-1">
                    {plan.name}
                  </h3>
                  <p className="font-sans text-xs text-white/50 leading-relaxed min-h-[40px] mb-6">
                    {plan.tagline}
                  </p>

                  {/* Pricing Number */}
                  <div className="flex items-baseline gap-1 mb-8 border-b border-white/5 pb-6">
                    <span className="font-mono text-2xl text-white/40">$</span>
                    <span className="font-display font-black text-6xl text-white tracking-tighter">
                      {price}
                    </span>
                    <span className="font-mono text-xs text-white/40 ml-1">
                      / month
                    </span>
                    {billingPeriod === 'annually' && (
                      <span className="font-mono text-[9px] text-nike-volt block mt-1 ml-2 font-bold">
                        Billed annually (${price * 12}/yr)
                      </span>
                    )}
                  </div>

                  {/* Features Checklist */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-white/80">
                        <Check size={14} className="text-nike-volt mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleOpenPreOrder(plan)}
                  className={`w-full py-4 rounded font-mono text-xs font-black tracking-widest transition-all duration-300 ${
                    plan.isPopular
                      ? 'bg-nike-volt text-black hover:bg-white hover:scale-[1.02]'
                      : 'bg-white/5 text-white border border-white/10 hover:border-nike-volt/50 hover:bg-white/10'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Pre-Order / Concept Signup Modal */}
      <AnimatePresence>
        {isPreOrderOpen && selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-nike-dark border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden z-10 shadow-2xl"
            >
              {/* Scanline aesthetic overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30" />

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-nike-volt/10 border border-nike-volt/20 text-[9px] font-mono text-nike-volt mb-2">
                        <Sparkles size={10} />
                        CONCEPT EARLY ACCESS SYNC
                      </div>
                      <h3 className="font-display font-black text-2xl text-white italic uppercase tracking-tight">
                        SECURE {selectedPlan.name} CONCEPT PASS
                      </h3>
                      <p className="font-sans text-xs text-white/50 leading-relaxed mt-1">
                        Register your athletic credentials below. This triggers a hypothetical telemetry slot calibration simulation for early concepts testing.
                      </p>
                    </div>

                    <form onSubmit={handlePreOrderSubmit} className="space-y-4 font-mono text-xs">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-white/60 text-[10px] tracking-wider block uppercase">
                          ATHLETE NAME
                        </label>
                        <input
                          type="text"
                          required
                          value={athleteName}
                          onChange={(e) => setAthleteName(e.target.value)}
                          placeholder="e.g. Priyansh"
                          className="w-full bg-nike-black border border-white/5 focus:border-nike-volt rounded px-3.5 py-2.5 text-white placeholder-white/20 focus:outline-none transition-colors font-sans"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label className="text-white/60 text-[10px] tracking-wider block uppercase">
                          TELEMETRY CONTACT EMAIL
                        </label>
                        <input
                          type="email"
                          required
                          value={athleteEmail}
                          onChange={(e) => setAthleteEmail(e.target.value)}
                          placeholder="priyanshmdubey@gmail.com"
                          className="w-full bg-nike-black border border-white/5 focus:border-nike-volt rounded px-3.5 py-2.5 text-white placeholder-white/20 focus:outline-none transition-colors font-sans"
                        />
                      </div>

                      {/* Coach picker & Athlete Level */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-white/60 text-[10px] tracking-wider block uppercase">
                            ASSIGNED SYNERGY COACH
                          </label>
                          <select
                            value={athleteCoach}
                            onChange={(e) => setAthleteCoach(e.target.value)}
                            className="w-full bg-nike-black border border-white/5 focus:border-nike-volt rounded px-3 py-2.5 text-white focus:outline-none focus:bg-nike-black font-sans text-xs"
                          >
                            <option>Bowerman</option>
                            <option>Serena</option>
                            <option>Kipchoge</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-white/60 text-[10px] tracking-wider block uppercase">
                            RUNNING DIVISION
                          </label>
                          <select
                            value={athleteLevel}
                            onChange={(e) => setAthleteLevel(e.target.value)}
                            className="w-full bg-nike-black border border-white/5 focus:border-nike-volt rounded px-3 py-2.5 text-white focus:outline-none focus:bg-nike-black font-sans text-xs"
                          >
                            <option>Amateur Jogger</option>
                            <option>Competitive Sprinter</option>
                            <option>Marathoner</option>
                            <option>Elite Pro World-Championships</option>
                          </select>
                        </div>
                      </div>

                      {/* Simulated T&C */}
                      <div className="flex items-start gap-2.5 border-t border-white/5 pt-4">
                        <input
                          type="checkbox"
                          required
                          id="terms"
                          className="w-4 h-4 rounded bg-nike-black border-white/10 accent-nike-volt cursor-pointer mt-0.5"
                        />
                        <label htmlFor="terms" className="text-[10px] leading-relaxed text-white/40 font-sans cursor-pointer">
                          I accept that this is an unofficial design prototype. I authorize telemetry calculation for early concept mapping.
                        </label>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isRegistering}
                        className="w-full py-4 bg-nike-volt text-black font-bold tracking-widest hover:bg-white transition-colors duration-300 rounded flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                      >
                        {isRegistering ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                            />
                            <span>CALIBRATING SENSORS...</span>
                          </>
                        ) : (
                          <>
                            <Zap size={14} className="fill-current" />
                            <span>CONFIRM TELEMETRY SYNC</span>
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-nike-volt/10 border border-nike-volt flex items-center justify-center mx-auto text-nike-volt animate-bounce">
                      <ShieldCheck size={32} />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-black text-2xl text-white italic uppercase tracking-tight">
                        ATHLETE CONNECTED OK
                      </h4>
                      <p className="font-sans text-xs text-white/50 max-w-sm mx-auto">
                        Your biological profile is now securely calibrated into the Nike Aura core. Early prototype pre-order queued.
                      </p>
                    </div>

                    {/* Futuristic Ticket Slip Card */}
                    <div className="bg-nike-black border border-white/10 rounded-xl p-5 text-left space-y-3 text-xs font-mono relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-nike-volt/30 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-nike-volt/30 pointer-events-none" />

                      <div className="flex justify-between items-center text-[10px] text-white/40 border-b border-white/5 pb-2">
                        <span>NIKE AURA SYSTEM PASS // v1.0</span>
                        <span className="text-nike-volt font-bold">STATUS: OK</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-1">
                        <div>
                          <span className="text-[9px] text-white/30 block uppercase">ATHLETE</span>
                          <span className="text-white font-bold font-sans text-sm">{athleteName}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-white/30 block uppercase">SYNC SLOT ID</span>
                          <span className="text-nike-volt font-bold font-mono">{ticketNumber}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-white/30 block uppercase">COACH</span>
                          <span className="text-nike-blue font-bold">{athleteCoach}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-white/30 block uppercase">DIVISION</span>
                          <span className="text-white font-bold">{athleteLevel}</span>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[9px] text-white/30">
                        <span>CALIBRATION: 100% OK</span>
                        <span>LATENCY: 0.1ms</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-3 bg-white hover:bg-nike-volt text-black font-mono font-bold tracking-widest text-xs transition-colors rounded"
                    >
                      DISCONNECT SYSTEM PANEL
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
