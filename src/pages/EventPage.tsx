import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, BadgePercent, ShieldAlert, Check, Milestone, Microchip, BookOpen, Users } from 'lucide-react';
import { EventDetails } from '../types';

interface EventPageProps {
  event: EventDetails;
  onNavigateRegister: () => void;
}

export default function EventPage({ event, onNavigateRegister }: EventPageProps) {
  // Static event agendas
  const agenda = [
    {
      time: "09:30 AM",
      title: "Assembly & Registration Check-in",
      speaker: "Vanguard Hospitality Force",
      desc: "Receive attendee batch packages, safety manuals, and local project portfolios."
    },
    {
      time: "10:15 AM",
      title: "Keynote: Smart Highways & Structural BIM Optimization",
      speaker: "Dr. Alok Sen (FIE, Chief Highway Advisor)",
      desc: "An in-depth look at 3D laser profiling, soil sub-grade testing, and low-thermal asphalt layout strategies."
    },
    {
      time: "11:30 AM",
      title: "Tea & Networking Session",
      speaker: "All VIP Delegates",
      desc: "Connect with public authorities, private real-estate sponsors, and equipment suppliers."
    },
    {
      time: "12:00 PM",
      title: "Panel Talk: Bidding for State & EPC Turnkey Infrastructure",
      speaker: "Moderated by K. Raghavan (Partner, Vanguard Contracts Division)",
      desc: "Analysis of CPWD guidelines, Hybrid Annuity Models (HAM), and streamlining land acquisition clearances."
    },
    {
      time: "01:15 PM",
      title: "Catered Executive Lunch Buffet",
      speaker: "Sponsors Exhibit Lounge",
      desc: "High-level gourmet buffet with specialized network hubs based on civil engineering modules."
    },
    {
      time: "02:30 PM",
      title: "Lab Demo: Advanced Pre-stressed Concrete Segmental Viaducts",
      speaker: "Er. Priya Nair (Principal Bridge Designer)",
      desc: "Structural stress simulations showing segment launcher rigs and hydro-piling durability indexes."
    },
    {
      time: "04:00 PM",
      title: "Closing Ceremonies & Verified Attendance Certificate Dispersal",
      speaker: "Executive Panel",
      desc: "Signing of certificates and dispersals of the Vanguard infrastructure booklet."
    }
  ];

  const speakers = [
    {
      name: "Dr. Alok Sen",
      role: "Chief Structural Consultant, ex-NHAI Advisory",
      specialty: "Highways & Rigid Concrete Engineering",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300"
    },
    {
      name: "Er. Priya Nair",
      role: "Lead Infrastructure Architect, Vanguard Group",
      specialty: "Cable-Stayed Bridge Segmental Design",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300"
    }
  ];

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Summit Intro Hero */}
        <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-slate-900/10 mb-16 shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-full w-full z-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200"
              alt="Conference hall ambient light"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-10" />

          <div className="relative z-20 px-6 sm:px-12 py-16 max-w-3xl space-y-6 animate-fade-in">
            <span className="bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Live Registration Open
            </span>
            
            <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-6 text-gradient leading-tight uppercase">
              {event.title}
            </h1>

            <p className="text-slate-350 text-xs sm:text-sm leading-relaxed font-light text-slate-400">
              {event.description}
            </p>

            {/* Event Meta Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Summit Date</p>
                  <p className="text-xs font-bold text-white">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Official Time</p>
                  <p className="text-xs font-bold text-white">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Venue Location</p>
                  <p className="text-xs font-bold text-white truncate max-w-[180px]">{event.venue}</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={onNavigateRegister}
                className="accent-gradient border border-amber-600 hover:brightness-110 active:scale-95 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-xs tracking-wider uppercase font-mono transition-transform shadow-xl cursor-pointer"
              >
                Register Seat (₹199 only)
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Multi Column Benefits & Pricing Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-24">
          
          {/* Main Benefits card column (Left 2/3) */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight text-gradient">Summit Registration Perks & Syllabus</h2>
              <p className="text-slate-400 text-xs">Unlock professional structural insights and certified network opportunities.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass p-5 rounded-2xl space-y-3 shadow-md hover:border-amber-500/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Milestone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">State Highways Bidding Guidelines</h4>
                <p className="text-slate-450 text-xs leading-relaxed text-slate-400 font-light">
                  Direct manuals on NHAI project specifications, tax planning, asset procurement structures, and annuity bid submission pipelines.
                </p>
              </div>

              <div className="glass p-5 rounded-2xl space-y-3 shadow-md hover:border-amber-500/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                  <Microchip className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">New Civil Machineries Demonstration</h4>
                <p className="text-slate-450 text-xs leading-relaxed text-slate-400 font-light">
                  Interact directly with laser soil grading devices, satellite LIDAR scanners, and hydraulic shear testing devices.
                </p>
              </div>

              <div className="glass p-5 rounded-2xl space-y-3 shadow-md hover:border-amber-500/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">30-Credit Certificate of Attendance</h4>
                <p className="text-slate-450 text-xs leading-relaxed text-slate-400 font-light">
                  Earn our officially stamped Vanguard Infrastructure Seminar certificate, validated by our panel of certified engineering advisors.
                </p>
              </div>

              <div className="glass p-5 rounded-2xl space-y-3 shadow-md hover:border-amber-500/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Catered High-Tea & Dinner Buffet</h4>
                <p className="text-slate-450 text-xs leading-relaxed text-slate-400 font-light">
                  Expand your professional enterprise. Includes full tea services, refreshments, and access to our sponsors' material showcase loungers.
                </p>
              </div>
            </div>
          </div>

          {/* Exclusive pricing card column (Right 1/3) */}
          <div className="glass border-2 border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative block hover:border-amber-500/30 transition-all duration-300">
            <div className="absolute top-0 right-6 -translate-y-1/2 accent-gradient text-slate-950 font-mono font-bold text-[9px] tracking-wider uppercase px-2.5 py-1 rounded shadow-lg">
              Seats Limited
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold block">Official Entry Pass</span>
              <h3 className="text-2xl font-bold text-white">VIP Delegate Seat</h3>
              <p className="text-slate-400 text-xs font-sans">Full credentials containing food, print booklets, material catalogs, and certificate.</p>
            </div>

            <div className="border-t border-b border-white/5 py-6 !my-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight">₹{event.ticketPrice}</span>
                <span className="text-slate-500 text-xs font-sans">one-time payment</span>
              </div>
              <p className="text-emerald-400 font-mono text-[9px] mt-2 block font-extrabold uppercase">
                * All Taxes Included (GST 18% Compliant receipt on request)
              </p>
            </div>

            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-light">Unrestricted Hall Assembly Access</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-light">Executive Lunch & High Tea Access</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-light">Summit Print Manual Kits & Catalogs</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-light">Verifying Pass Code & Digital Invitation</span>
              </li>
            </ul>

            <button
              onClick={onNavigateRegister}
              className="w-full accent-gradient border border-amber-600 hover:brightness-110 active:scale-95 text-slate-950 font-bold justify-center py-3 rounded-xl text-xs uppercase tracking-wider font-mono transition-transform mt-6 shadow-md"
            >
              Book My Ticket Now
            </button>

            <div className="flex items-center gap-1.5 justify-center mt-3 text-[10px] text-slate-550">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <span>Easy UPI GPay scanner system</span>
            </div>
          </div>

        </div>

        {/* Notable Speakers Segment */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight text-gradient">Distinguished Keynote Speakers</h2>
            <p className="text-slate-400 text-xs mt-1">Acclaimed experts and veteran developers hosting summits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {speakers.map((sp, i) => (
              <div key={i} className="glass p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-lg hover:border-amber-500/20 transition-all duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-500/30 bg-slate-800 shrink-0 shadow-md">
                  <img 
                    src={sp.image} 
                    alt={sp.name}
                    className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-550"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <h4 className="text-lg font-bold text-white">{sp.name}</h4>
                  <p className="text-amber-400 text-xs font-mono">{sp.role}</p>
                  <p className="text-slate-400 text-xs pt-1.5 font-light leading-relaxed">{sp.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assembly Timetable / Agenda Timeline */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight text-gradient">Event Assembly Schedule</h2>
            <p className="text-slate-400 text-xs mt-1">Hour-by-hour roadmap of key discussions.</p>
          </div>

          <div className="max-w-4xl mx-auto glass rounded-2xl overflow-hidden divide-y divide-white/5 shadow-2xl">
            {agenda.map((ag, idx) => (
              <div key={idx} className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 hover:bg-white/3 transition-colors duration-300">
                <div className="w-full md:w-1/4">
                  <span className="glass border-amber-500/20 text-amber-400 font-mono text-xs font-bold px-3 py-1.5 rounded-lg inline-block md:block text-center md:w-32 shadow-sm">
                    {ag.time}
                  </span>
                </div>
                <div className="w-full md:w-3/4 space-y-1">
                  <h4 className="text-base font-bold text-white">{ag.title}</h4>
                  <p className="text-xs font-medium text-amber-500 font-mono tracking-wide">{ag.speaker}</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-light pt-1">{ag.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
