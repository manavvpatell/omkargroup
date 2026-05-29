import React from 'react';
import { motion } from 'motion/react';
import { Award, Shield, Users, Compass, CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-amber-500 font-mono tracking-widest text-xs uppercase block mb-3">Est. 1995 — Corporate Profile</span>
          <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-6 text-gradient">
            Architects of Modern Infrastructure
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Vanguard Construction Group delivers industry-defining civil engineering, highway networks, high-rise architectural landmarks, and strategic public-private contract execution across India.
          </p>
        </motion.div>

        {/* Brand Mission & Values Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Our Core Development Ethos</h2>
            <div className="w-16 h-1 bg-amber-500 accent-gradient"></div>
            <p className="text-slate-300 leading-relaxed">
              For over three decades, Vanguard has stood at the vanguard of structural development. We approach complex public projects and private skyscrapers with absolute design engineering perfection, strict safety metrics, and zero-compromise mechanical protocols.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm">
              Our multidisciplinary workforce of 1,200+ engineers, planners, and survey experts synergize with local authorities to complete robust expressways, rapid transit lines, and smart commercial spaces built to survive centuries.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass p-5 rounded-xl shadow-lg hover:border-amber-550/20 transition-all duration-300">
                <p className="text-3xl font-extrabold text-amber-400">99.8%</p>
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-1 font-semibold">On-Time Execution</p>
              </div>
              <div className="glass p-5 rounded-xl shadow-lg hover:border-amber-550/20 transition-all duration-300">
                <p className="text-3xl font-extrabold text-amber-400">ZERO</p>
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-1 font-semibold">Safety Breaches</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200" 
              alt="Heavy cranes on construction site" 
              className="rounded-2xl border border-white/10 shadow-2xl brightness-90 relative z-10 w-full object-cover h-[350px]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-amber-500/10 rounded-2xl z-0 pointer-events-none"></div>
          </motion.div>
        </div>

        {/* Corporate Pillars */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">The Pillars of Vanguard Trust</h2>
            <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">Engineered to deliver unmatched scale and structural excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass hover:border-amber-500/30 transition-all duration-300 p-8 rounded-2xl shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Safety & Compliance First</h3>
              <p className="text-slate-405 text-xs leading-relaxed font-light">
                We stringently implement high-level workplace safety protocols and conform strictly with National Building Codes, holding top certifications.
              </p>
            </div>

            <div className="glass hover:border-amber-500/30 transition-all duration-300 p-8 rounded-2xl shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Government Pre-Qualified</h3>
              <p className="text-slate-405 text-xs leading-relaxed font-light">
                As a Class-A registered contractor, we are trusted with mega-scale state highways, public health infrastructure, and national rail interfaces.
              </p>
            </div>

            <div className="glass hover:border-amber-500/30 transition-all duration-300 p-8 rounded-2xl shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Strategic Partner Force</h3>
              <p className="text-slate-405 text-xs leading-relaxed font-light">
                Forging deep joint-ventures with leading multinational architects and raw material refineries to ensure low lead times and premier builds.
              </p>
            </div>
          </div>
        </div>

        {/* Milestones / Company Timeline */}
        <div className="mb-16">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">Our Journey of Building India</h2>
            <p className="text-slate-400 text-sm mt-1">Key historical milestones of the Vanguard Engineering Group.</p>
          </div>

          <div className="relative border-l-2 border-dashed border-amber-500/20 max-w-4xl mx-auto pl-8 ml-4 sm:ml-auto">
            <div className="space-y-10">
              <div className="relative timeline-item group">
                <div className="absolute -left-[39.5px] top-4 bg-amber-500 hover:bg-orange-500 transition-colors rounded-full w-4 h-4 border-2 border-slate-950 z-10 ring-4 ring-amber-500/10 group-hover:ring-amber-500/20" />
                <div className="glass p-6 rounded-2xl shadow-xl transition-all duration-300 hover:border-amber-500/20">
                  <p className="font-mono text-amber-400 font-bold text-xs uppercase tracking-wider">1995</p>
                  <h4 className="text-lg font-bold text-white mt-1 font-sans">Foundation of Vanguard Co.</h4>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Incorporated in New Delhi as an independent civil works enterprise specializing in urban residential complexes and reinforced concrete bridges.
                  </p>
                </div>
              </div>

              <div className="relative timeline-item group">
                <div className="absolute -left-[39.5px] top-4 bg-amber-500 hover:bg-orange-500 transition-colors rounded-full w-4 h-4 border-2 border-slate-950 z-10 ring-4 ring-amber-500/10 group-hover:ring-amber-500/20" />
                <div className="glass p-6 rounded-2xl shadow-xl transition-all duration-300 hover:border-amber-500/20">
                  <p className="font-mono text-amber-400 font-bold text-xs uppercase tracking-wider">2006</p>
                  <h4 className="text-lg font-bold text-white mt-1 font-sans">Venturing into State Expressways</h4>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    First Class-A government contract commission: Bid and completed a 45km toll-way expressway within budget, incorporating high-tech automated toll booth centers.
                  </p>
                </div>
              </div>

              <div className="relative timeline-item group">
                <div className="absolute -left-[39.5px] top-4 bg-amber-500 hover:bg-orange-500 transition-colors rounded-full w-4 h-4 border-2 border-slate-950 z-10 ring-4 ring-amber-500/10 group-hover:ring-amber-500/20" />
                <div className="glass p-6 rounded-2xl shadow-xl transition-all duration-300 hover:border-amber-500/20">
                  <p className="font-mono text-amber-400 font-bold text-xs uppercase tracking-wider">2014</p>
                  <h4 className="text-lg font-bold text-white mt-1 font-sans">Mega Commercial Skyscrapers</h4>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Pivoted majorly to corporate office parks. Built 3 prime commercial IT towers over 2 million sq.ft in Gurgaon & Pune featuring premium curtain wall glass facades.
                  </p>
                </div>
              </div>

              <div className="relative timeline-item group">
                <div className="absolute -left-[39.5px] top-4 bg-amber-500 hover:bg-orange-500 transition-colors rounded-full w-4 h-4 border-2 border-slate-950 z-10 ring-4 ring-amber-500/10 group-hover:ring-amber-500/20" />
                <div className="glass p-6 rounded-2xl shadow-xl transition-all duration-300 hover:border-amber-500/20">
                  <p className="font-mono text-amber-400 font-bold text-xs uppercase tracking-wider">2026</p>
                  <h4 className="text-lg font-bold text-white mt-1 font-sans">Smart Infrastructure & Summit Hub</h4>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Now deploying AI-managed site safety monitoring and structural modeling tools. Sponsoring the nationwide Construction Leadership Summit to bring key industry contracts forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
