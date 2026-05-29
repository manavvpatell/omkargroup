import React from 'react';
import { Route, Building, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: string) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Company Logo / Pitch */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-extrabold text-sm">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-white text-base font-extrabold tracking-widest block uppercase">VANGUARD</span>
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block -mt-0.5">Civil & Highways</span>
              </div>
            </div>
            <p className="leading-relaxed text-slate-400 text-xs">
              Class-A Government Infrastructure Contractor delivering state expressways, modern metro rail lines, high-rise IT parks, and turnkey EPC contracts across India.
            </p>
            <div className="flex items-center gap-2 text-amber-500 font-bold font-mono text-[10px]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>ISO 9001:2015 certified</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="font-mono text-white text-xs font-bold uppercase tracking-wider">Corporate Directory</h4>
            <div className="flex flex-col gap-2.5">
              <button onClick={() => onTabChange('home')} className="text-left hover:text-white transition-colors">Company Homepage</button>
              <button onClick={() => onTabChange('about')} className="text-left hover:text-white transition-colors">Our Legacy & Core Values</button>
              <button onClick={() => onTabChange('services')} className="text-left hover:text-white transition-colors">Civil Engineering Services</button>
              <button onClick={() => onTabChange('projects')} className="text-left hover:text-white transition-colors">Landmark Portfolios</button>
              <button onClick={() => onTabChange('event')} className="text-left hover:text-white transition-colors">Vanguard Summit 2026</button>
            </div>
          </div>

          {/* Column 3: Summit Spotlight */}
          <div className="space-y-4">
            <h4 className="font-mono text-white text-xs font-bold uppercase tracking-wider">Summit Hub</h4>
            <p className="leading-relaxed text-slate-400 text-xs">
              Vanguard Infrastructure & Innovation Summit 2026. Join civil engineers, state bidders, and material researchers on June 15th, New Delhi.
            </p>
            <button 
              onClick={() => onTabChange('register')}
              className="text-amber-500 hover:text-amber-400 font-mono font-bold uppercase flex items-center gap-1 hover:translate-x-1 transition-transform"
            >
              Book Entry Pass (₹199 only)
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Column 4: Operational Offices */}
          <div className="space-y-4">
            <h4 className="font-mono text-white text-xs font-bold uppercase tracking-wider">Corporate Offices</h4>
            <ul className="space-y-3 font-sans text-slate-400">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  <strong>HQ:</strong> Vanguard House, Sector-18, Noida, Uttar Pradesh - 201301, India
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>+91 120 4930210</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>operations@vanguardinfra.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Closing Strip */}
        <div className="border-t border-slate-900 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] uppercase font-mono">
          <p>© {new Date().getFullYear()} Vanguard Construction Group Ltd. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span>License Ref: Special Class-A Unlimited NHAI-294</span>
            <span>&bull;</span>
            <span className="hover:text-slate-300 cursor-pointer">Compliance Policy</span>
            <span>&bull;</span>
            <span className="hover:text-slate-300 cursor-pointer">Safety Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
