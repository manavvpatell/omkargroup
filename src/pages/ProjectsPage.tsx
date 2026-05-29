import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Route, Building, Hammer, ExternalLink, Calendar, MapPin, BadgeCheck, CheckCircle } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: 'Road' | 'Building' | 'Infrastructure';
  status: 'Completed' | 'Ongoing';
  location: string;
  year: string;
  desc: string;
  image: string;
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'All' | 'Road' | 'Building' | 'Infrastructure'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Ongoing'>('All');

  const projects: Project[] = [
    {
      id: "proj-1",
      name: "Yamuna Highway Bypass Link",
      category: "Road",
      status: "Completed",
      location: "Uttar Pradesh",
      year: "2024",
      desc: "Delivered a high-traction 6-lane asphalt bypass link with integrated dynamic drainage channels and automated high-output toll booths.",
      image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=700"
    },
    {
      id: "proj-2",
      name: "CyberCity Commercial Towers",
      category: "Building",
      status: "Completed",
      location: "Gurugram, Haryana",
      year: "2025",
      desc: "A stunning G+30 twin tower commercial project certified LEED Platinum, containing double-glazed low-emission curtain glass facades.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=700"
    },
    {
      id: "proj-3",
      name: "Narmada Dynamic Cable Bridge",
      category: "Infrastructure",
      status: "Completed",
      location: "Gujarat",
      year: "2024",
      desc: "Erected an iconic 1.2km pre-stressed multi-cable cantilever bridge across the Narmada riverbed using deep well block foundations.",
      image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=700"
    },
    {
      id: "proj-4",
      name: "Ganga Expressway (Package 3)",
      category: "Road",
      status: "Ongoing",
      location: "Bihar - W.B. Border",
      year: "2026",
      desc: "Surgical execution of 120 Lane-Km dry-lean concrete and pavement-quality concrete structures on modern heavy transit routes.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=700"
    },
    {
      id: "proj-5",
      name: "Smart AeroHub IT SEZ Park",
      category: "Building",
      status: "Ongoing",
      location: "Bengaluru, Karnataka",
      year: "2027",
      desc: "Providing holistic architecture, piling, and pre-cast frame works for an expansive 3 million sq.ft tech enterprise landscape.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=700"
    },
    {
      id: "proj-6",
      name: "Noida Elevated Rapid Transit Line",
      category: "Infrastructure",
      status: "Ongoing",
      location: "Noida, NCR",
      year: "2026",
      desc: "Fabrication of segmental prestressed bridge girders and piling structures across dense urban highway zones.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=700"
    }
  ];

  const filteredProjects = projects.filter(proj => {
    const categoryMatch = filter === 'All' || proj.category === filter;
    const statusMatch = statusFilter === 'All' || proj.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-amber-505 font-mono tracking-widest text-xs uppercase block mb-3 text-amber-500">Portfolio Show</span>
          <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-6 text-gradient">
            Landmarks of Engineering Excellence
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed font-light">
            Take a visual tour across our monumental highways, commercial landmarks, and heavy structural integrations built under premium engineering safety guidelines.
          </p>
        </motion.div>

        {/* Filter Controls Row */}
        <div className="flex flex-col md:flex-row pb-12 border-b border-white/5 justify-between items-center gap-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 bg-slate-900/50 border border-white/5 p-2 rounded-2xl">
            {(['All', 'Road', 'Building', 'Infrastructure'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-tight font-bold uppercase transition-all duration-300 active:scale-95 ${
                  filter === cat 
                    ? 'accent-gradient text-slate-950 shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {cat === 'All' ? 'All Portfolios' : `${cat}s`}
              </button>
            ))}
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2.5 items-center">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mr-2">Civil Status:</span>
            <div className="inline-flex rounded-xl overflow-hidden border border-white/5 bg-slate-900/40 p-1">
              {(['All', 'Completed', 'Ongoing'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3-5 py-1.5 rounded-lg text-[10px] font-mono tracking-tight uppercase transition-colors font-bold ${
                    statusFilter === st 
                      ? 'bg-slate-800 text-amber-400' 
                      : 'text-slate-500 hover:text-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={proj.id}
                className="glass hover:border-amber-500/20 transition-all duration-300 rounded-2xl shadow-xl overflow-hidden flex flex-col group"
              >
                {/* Image Container with overlays */}
                <div className="relative aspect-[4/3] w-full block overflow-hidden bg-slate-950">
                  <img 
                    src={proj.image} 
                    alt={proj.name}
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105 filter brightness-90 group-hover:brightness-80"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-slate-950/90 backdrop-blur-md text-[10px] font-mono font-bold tracking-widest text-amber-400 px-2.5 py-1 rounded-xl border border-white/5 uppercase shadow-xl flex items-center gap-1.5">
                      {proj.category === 'Road' && <Route className="w-3 h-3" />}
                      {proj.category === 'Building' && <Building className="w-3 h-3" />}
                      {proj.category === 'Infrastructure' && <Hammer className="w-3 h-3" />}
                      {proj.category}
                    </span>
                  </div>

                  {/* Status overlay */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-xl shadow-xl border ${
                      proj.status === 'Completed' 
                        ? 'bg-emerald-950/90 text-emerald-400 border-emerald-900/50' 
                        : 'bg-amber-950/90 text-amber-400 border-amber-900/50'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                  
                  {/* Bottom details block */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="flex items-center text-slate-300 text-xs gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-sans font-medium">{proj.location}</span>
                    </div>
                    <div className="flex items-center text-slate-400 text-xs gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-600" />
                      <span>{proj.status === 'Completed' ? `Est. ${proj.year}` : `Due ${proj.year}`}</span>
                    </div>
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-sans text-white tracking-tight group-hover:text-amber-400 transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-sans font-light">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-550 uppercase tracking-widest flex items-center gap-1 text-slate-400">
                      <BadgeCheck className="w-3.5 h-3.5 text-amber-500" />
                      Verified Contract
                    </span>
                    <span className="text-xs font-semibold font-mono text-amber-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Corporate Record
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-slate-900/10 border border-dashed border-slate-800 rounded-2xl max-w-md mx-auto mt-12"
          >
            <p className="text-slate-400 text-sm font-mono uppercase tracking-wider">No matching projects found</p>
            <p className="text-slate-500 text-xs mt-1">Try resetting the category filter or select complete status.</p>
            <button
              onClick={() => { setFilter('All'); setStatusFilter('All'); }}
              className="mt-4 text-xs font-mono text-amber-500 underline font-bold"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
