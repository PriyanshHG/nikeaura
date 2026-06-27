import React from 'react';
import { Cpu, Github, Mail, Send, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-nike-black border-t border-white/5 py-12 md:py-16 overflow-hidden">
      {/* Subtle bottom glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-20 bg-nike-volt/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-center md:text-left">
        
        {/* Left Column: Brand details */}
        <div className="space-y-3 max-w-sm mx-auto md:mx-0">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-6 h-6 rounded bg-nike-volt text-black flex items-center justify-center font-display font-black text-xs">
              N
            </div>
            <span className="font-display font-black text-sm tracking-widest text-white">
              NIKE <span className="text-nike-volt">AURA</span>
            </span>
          </div>
          <p className="font-sans text-[11px] text-white/40 leading-relaxed">
            Exploring the dynamic edge where athletic mastery meets human cognitive synchronization. Designing interfaces for the next generation of athletes.
          </p>
        </div>

        {/* Middle Column: Design Metadata & Hyperlinks (IMPORTANT RULES GIVEN BY USER) */}
        <div className="flex flex-col items-center justify-center gap-3 md:border-l md:border-r md:border-white/5 md:px-12 text-center">
          {/* Concept Design & AI Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded font-mono text-[9px] text-white/60 tracking-widest uppercase">
              <Sparkles size={10} className="text-nike-volt animate-pulse" />
              <span>Concept design</span>
            </div>
          </div>

          <p className="font-sans text-[11px] text-white/50 max-w-sm">
            Concept Design — Unofficial exploration inspired by Nike's design philosophy. This project is not affiliated with or endorsed by Nike.
          </p>

          {/* Designed by Priyansh Link */}
          <div className="font-sans text-xs text-white/50 mt-1">
            Designed by{' '}
            <a
              href="https://discord.com/channels/@_priyanshd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nike-volt font-bold hover:text-white transition-colors underline decoration-dotted underline-offset-4"
            >
              Priyansh
            </a>
          </div>

          {/* Contact Reference Email */}
          <a
            href="mailto:priyanshmdubey@gmail.com"
            className="font-mono text-[10px] text-white/40 hover:text-white transition-colors flex items-center gap-1.5 mt-1"
          >
            <Mail size={12} className="text-white/40" />
            <span>priyanshmdubey@gmail.com</span>
          </a>
        </div>

        {/* Right Column: Fake legal details */}
        <div className="text-center md:text-right space-y-2 max-w-xs mx-auto md:mx-0">
          <div className="font-mono text-[9px] tracking-widest text-white/30 uppercase">
            SYSTEM_SPECS_V1.0
          </div>
          <p className="font-sans text-[10px] text-white/30 leading-normal">
            This is an artistic interactive prototype. All images, quotes, and product specifications are hypothetical and part of a creative design study. 
          </p>
          <div className="font-mono text-[8px] text-white/20">
            © 2026 NIKE AURA PROTO_LAB. ALL CONCEPTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
}
