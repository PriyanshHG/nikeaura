import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  onSyncClick: () => void;
  activeSection: string;
}

export default function Navbar({ onSyncClick, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'THE VISION', href: '#vision' },
    { name: 'BIO-FEEDBACK', href: '#biometrics' },
    { name: 'COACHING LAB', href: '#coaches' },
    { name: 'PRICING', href: '#pricing' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header id="nike-navbar" className="fixed top-0 left-0 w-full z-50 bg-nike-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          {/* Futuristic minimalist geometric Swoosh + CPU logo */}
          <div className="relative flex items-center justify-center w-8 h-8 rounded bg-white text-black font-black overflow-hidden group-hover:bg-nike-volt transition-colors">
            <Cpu size={16} className="group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black tracking-widest text-lg text-white leading-none">
              NIKE <span className="text-nike-volt">AURA</span>
            </span>
            <span className="text-[9px] font-mono tracking-[0.2em] text-white/40">AI STUDIO PROTOTYPE</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="relative text-xs font-mono font-bold tracking-widest text-white/70 hover:text-white transition-colors py-2"
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-nike-volt"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onSyncClick}
            id="sync-button"
            className="relative px-5 py-2.5 bg-white text-black font-mono text-xs font-bold tracking-widest hover:bg-nike-volt hover:text-black transition-all duration-300 rounded overflow-hidden group flex items-center gap-2 glow-volt/10"
          >
            <Zap size={14} className="fill-current" />
            <span>SYNC CORE</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-nike-volt transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-nike-dark border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-sm font-mono font-bold tracking-widest text-white/80 hover:text-nike-volt transition-colors py-1 block"
                >
                  {item.name}
                </a>
              ))}
              <hr className="border-white/5 my-2" />
              <button
                onClick={() => {
                  setIsOpen(false);
                  onSyncClick();
                }}
                className="w-full py-3 bg-nike-volt text-black font-mono text-xs font-bold tracking-widest hover:bg-white transition-colors rounded flex items-center justify-center gap-2"
              >
                <Zap size={14} className="fill-current" />
                <span>SYNC CORE</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
