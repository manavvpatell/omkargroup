import React from 'react';
import { motion } from 'motion/react';
import { Route, Building, Hammer, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

interface ServiceDetail {
  id: string;
  icon: React.ReactNode;
  name: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  features: string[];
  machinery: string[];
  specifications: { label: string; value: string }[];
}

export default function ServicesPage() {
  const services: ServiceDetail[] = [
    {
      id: "road-construction",
      icon: <Route className="w-8 h-8 text-amber-400" />,
      name: "Road & Highway Construction",
      shortDesc: "Arterial expressways and intelligent urban road networks using advanced pavement asphalt routing.",
      longDesc: "Vanguard executes large-scale, high-durability highway networks, national expressways, toll-ways, and critical urban bypasses. Utilizing state-of-the-art slipform concrete pavers and high-tonnage intelligent rolling compactors, we construct smooth, safe, and moisture-resistant highway carpets modeled to endure extreme seasonal temperatures.",
      image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=800",
      features: [
        "Soil Stabilization & Advanced Geo-textiles Layout",
        "High-friction Asphalt overlays with low heating coefficient",
        "Automated Toll plazas & smart highway lighting systems integration",
        "Rigid dry lean concrete (DLC) and Pavement-Quality Concrete (PQC)"
      ],
      machinery: [
        "Slipform concrete pavers (Wirtgen)",
        "Double-drum vibratory rollers (Hamm)",
        "Asphalt batch-mix plants (Ammann)"
      ],
      specifications: [
        { label: "Durability Rating", value: "30+ Years Design Life" },
        { label: "Completed Track", value: "1,500+ Lane-Kilometers" },
        { label: "Material standard", value: "IRC Certified Grade" }
      ]
    },
    {
      id: "building-construction",
      icon: <Building className="w-8 h-8 text-amber-400" />,
      name: "Building Construction",
      shortDesc: "Vibrant commercial high-rises, IT parks, and massive industrial assembly warehouses.",
      longDesc: "We bring complex structural blueprints to life. From ultra-modern glass curtained skyscrapers and eco-friendly shopping malls to heavy-duty automated manufacturing facilities, Vanguard manages end-to-end building engineering. We focus on state-of-the-art seismic resistance, thermal insulation, and luxury detailing.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
      features: [
        "Reinforced Concrete Shear Wall structure design",
        "LEED Platinum standard green building configurations",
        "Advanced post-tensioning concrete modular slabs",
        "BIM (Building Information Modeling) LOD-500 level drafting"
      ],
      machinery: [
        "Luffing-jib tower cranes (Liebherr)",
        "Pre-cast concrete batchers",
        "Seismic testing stress devices"
      ],
      specifications: [
        { label: "Premium Floors Build", value: "Up to G+50 Storeys" },
        { label: "Total Space Area", value: "8.4 Million Sq.ft" },
        { label: "Safety Rating", value: "Zone V Seismic Complaint" }
      ]
    },
    {
      id: "infrastructure-projects",
      icon: <Hammer className="w-8 h-8 text-amber-400" />,
      name: "Major Infrastructure Projects",
      shortDesc: "Strategic bridge construction, elevated viaducts, metro rails, and clean water channels.",
      longDesc: "Connecting cities and communities demands top engineering courage. Our heavy-infrastructure division specializes in structural pre-cast segmental viaducts, multi-span cantilever bridges over major rivers, deep water channels, and rapid passenger transit networks. We tackle difficult geo-technical conditions with tailored structural solutions.",
      image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800",
      features: [
        "Deep pile and multi-well caisson foundations",
        "Incremental launching and segment erection methodologies",
        "Pre-stressed bridge girder fabrication facilities",
        "Heavy marine construction and river-bed works"
      ],
      machinery: [
        "Segmental launcher gantries (120 Tons)",
        "Hydraulic rotary piling rigs (Bauer)",
        "Heavy crawler cranes (Demag)"
      ],
      specifications: [
        { label: "Longest Span Built", value: "1.2 Kilometers river-over" },
        { label: "Metro Viaduct Completed", value: "42.5 Kilometers" },
        { label: "Anchor Type", value: "Pre-stressed Post-tension Cables" }
      ]
    },
    {
      id: "government-private-contracts",
      icon: <FileText className="w-8 h-8 text-amber-400" />,
      name: "Govt & Private Joint Contracts",
      shortDesc: "EPC bidding and Hybrid Annuity Model (HAM) partnerships delivering strategic assets.",
      longDesc: "Vanguard coordinates robust financial and administrative execution protocols. We bid on large government tenders (CPWD, NHAI, state authorities) under strict engineering standards. Additionally, we work on private EPC (Engineering, Procurement, and Construction) turnkey commercial projects, ensuring legal alignment and on-time structural handovers.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800",
      features: [
        "Hybrid Annuity Model (HAM) financial planning expertise",
        "Comprehensive EPC (Engineering Procurement Construction) Turnkey delivery",
        "Strict adherence to environmental impact clearances (EIA)",
        "Robust legal framework management and land-clearance facilitation"
      ],
      machinery: [
        "Complete enterprise resource ERP modules",
        "LIDAR drone land mapping cameras",
        "Autonomous material tracking machinery"
      ],
      specifications: [
        { label: "License Category", value: "Class-A Special Unlimited" },
        { label: "Annuity Portfolios", value: "₹4,200 Crore valuation" },
        { label: "Contract Handovers", value: "100% Conflict-Free Track" }
      ]
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-amber-500 font-mono tracking-widest text-xs uppercase block mb-3">Enterprise Capabilities</span>
          <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-6 text-gradient">
            Pioneering Civil Engineering
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Our expert builders and master planners specialize in constructing robust, highly durable public highways, multi-tenant corporate office skyscrapers, and monumental urban bridges.
          </p>
        </motion.div>

        {/* Services Showcase List */}
        <div className="space-y-24">
          {services.map((svc, idx) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Banner */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl relative block bg-slate-900 aspect-video max-h-[380px]">
                  <img 
                    src={svc.image} 
                    alt={svc.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Service Badge Overlaid */}
                  <div className="absolute bottom-4 left-4 bg-slate-950/95 border border-white/15 px-4 py-2 rounded-xl flex items-center gap-3 shadow-lg">
                    {svc.icon}
                    <span className="text-xs font-semibold font-mono uppercase tracking-wider text-white">{svc.name}</span>
                  </div>
                </div>

                <div className="absolute -inset-1 border border-amber-500/10 rounded-2xl pointer-events-none group-hover:border-amber-500/20 transition-colors z-0"></div>
              </div>

              {/* Service Info Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <span className="text-amber-505 font-mono text-xs uppercase tracking-wider block mb-2 text-amber-500">Service Portfolio 0{idx + 1}</span>
                  <h3 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">{svc.name}</h3>
                </div>

                <p className="text-slate-300 leading-relaxed text-sm font-light">{svc.longDesc}</p>

                {/* Features Checklist */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">Service Capabilities</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {svc.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-400 text-xs leading-normal">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology and Specifications row */}
                <div className="border-t border-slate-900 pt-6 mt-6">
                  <div className="grid grid-cols-3 gap-4">
                    {svc.specifications.map((spec, i) => (
                      <div key={i} className="glass p-3 rounded-xl shadow-md">
                        <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider font-semibold">{spec.label}</p>
                        <p className="text-xs font-bold text-amber-400 mt-1">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Machinery footnote */}
                <div className="glass border-dashed rounded-xl p-3.5 flex items-center gap-3">
                  <span className="text-[9px] font-mono text-amber-500 px-1.5 py-0.5 border border-amber-500/20 bg-amber-500/5 rounded uppercase">Machinery Force</span>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {svc.machinery.join(" \u2022 ")}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-12 rounded-3xl text-center mt-28 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Have a Major Project Tender?</h3>
          <p className="text-slate-450 text-xs max-w-lg mx-auto mb-6 text-slate-400">
            We bid for state scale roads and high-density commercial assets under EPC or HAM models. Reach out to negotiate custom contract estimates.
          </p>
          <div className="inline-flex gap-4">
            <button 
              onClick={() => {
                const el = document.getElementById('contact-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="accent-gradient border border-amber-600 hover:brightness-110 text-slate-950 font-bold font-mono uppercase text-xs px-6 py-3 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Contact Contractors
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
