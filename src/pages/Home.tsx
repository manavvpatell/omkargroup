import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, ArrowRight, ShieldCheck, Milestone, Landmark, Award, ChevronRight, 
  MapPin, Send, CheckCircle, MessagesSquare, Trophy, Network, Hammer 
} from 'lucide-react';
import { EventDetails } from '../types';
import CountdownTimer from '../components/CountdownTimer';

interface HomeProps {
  event: EventDetails;
  onNavigate: (tab: string) => void;
}

export default function Home({ event, onNavigate }: HomeProps) {
  // Contact state
  const [aliasName, setAliasName] = useState('');
  const [aliasEmail, setAliasEmail] = useState('');
  const [aliasPhone, setAliasPhone] = useState('');
  const [aliasMessage, setAliasMessage] = useState('');
  const [selectedService, setSelectedService] = useState('General Consultation');
  
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactResult, setContactResult] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const stats = [
    { value: "30+", label: "Years Experience" },
    { value: "1,500+", label: "Lane-Km Completed" },
    { value: "50+", label: "Skyscrapers Built" },
    { value: "₹4,200 Cr", label: "Govt Order Book" }
  ];

  const featuredProjects = [
    {
      title: "Yamuna Expressway Link",
      type: "Road Construction",
      image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=500"
    },
    {
      title: "CyberCity Executive Towers",
      type: "Modern Building",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=500"
    },
    {
      title: "Narmada Riverbed Cable Bridge",
      type: "Heavy Infrastructure",
      image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=500"
    }
  ];

  const testimonials = [
    {
      quote: "Vanguard Construction delivered Tower A of our IT SEZ three months ahead of schedule with flawless concrete shear walls and OHSAS safety adherence.",
      author: "V. K. Shrivastava",
      role: "Director of Infrastructures, Tata Enterprises",
      region: "Mumbai"
    },
    {
      quote: "Bidding through HAM schemes with Vanguard group has streamlined CPWD project completions. Their engineering integrity is outstanding.",
      author: "Hon. Rajiv Malhotra",
      role: "Ex-Secretary, National Highways Planning Board",
      region: "New Delhi"
    }
  ];

  // Submit contact form to express backend API
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aliasName || !aliasEmail || !aliasMessage) {
      setContactResult("Name, Email, and Message are required.");
      setIsSuccess(false);
      return;
    }

    setIsSubmittingContact(true);
    setContactResult('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: aliasName,
          email: aliasEmail,
          phone: aliasPhone,
          message: aliasMessage,
          service: selectedService
        })
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setContactResult("Thank you! Your query has been logged. Our contracting advisors will contact you shortly.");
        // clear Form
        setAliasName('');
        setAliasEmail('');
        setAliasPhone('');
        setAliasMessage('');
      } else {
        setIsSuccess(false);
        setContactResult(data.error || "Failed to log query. Try again.");
      }
    } catch (err) {
      setIsSuccess(false);
      setContactResult("Network error. Please try again.");
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      
      {/* 1. HERO BLOCK: Immersive construction visual + Event Spotlight Banner */}
      <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background photo */}
        <div className="absolute inset-0 bg-slate-950 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600" 
            alt="Tower crane on construction skyline" 
            className="w-full h-full object-cover filter brightness-[0.25] scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Diagonal architectural elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-amber-500/5 to-transparent z-10 pointer-events-none transform skew-x-12"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column (Corporate intro & Summit highlight) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded inline-block">
                ★ National Infrastructure Summit ★
              </span>
              
              <h1 className="text-4xl sm:text-6xl font-sans font-extrabold tracking-tight text-white leading-[1.1]">
                Building the Future of <span className="text-amber-500">Infrastructure</span>
              </h1>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                Vanguard Group delivers landmark state expressways, massive commercial high-rises, and heavy civil structures built to survive centuries. Join our upcoming premium business event to connect and secure tenders.
              </p>

              {/* Event Spotlight Promo card */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 backdrop-blur max-w-xl flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-mono text-amber-500 uppercase tracking-wider font-extrabold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
                    Spotlight Event
                  </p>
                  <p className="text-xs font-bold text-white mt-1 truncate max-w-[250px]">{event.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{new Date(event.date).toLocaleDateString()} &bull; ₹{event.ticketPrice} entry</p>
                </div>
                <button
                  onClick={() => onNavigate('event')}
                  className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-mono shrink-0 transition-transform flex items-center gap-1"
                >
                  Join Summit
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Hero CTA buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 px-8 py-3.5 rounded-lg text-xs font-bold uppercase font-mono tracking-wider transition-colors inline-block text-center"
                >
                  Book Seat Now (₹199)
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('company-overview-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 px-6 py-3.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors inline-block text-center"
                >
                  Learn Strategy
                </button>
              </div>
            </div>

            {/* Right Column (Summit live countdown clock) */}
            <div className="lg:col-span-5 w-full">
              <CountdownTimer targetDate={event.date} />
            </div>

          </div>
        </div>
      </div>

      {/* 2. STATS & NUMBERS BAR */}
      <div className="border-t border-b border-slate-900 bg-slate-900/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-3xl sm:text-5xl font-extrabold font-sans text-amber-500 tracking-tight">{stat.value}</p>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. BUSINESS OVERVIEW / TRUST-BUILDING */}
      <section id="company-overview-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <span className="text-amber-500 font-mono tracking-widest text-[10px] uppercase font-bold">Vanguard Assurance</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white">
              The Engineering Vanguard Grounded in Quality Standards
            </h2>
            <div className="w-16 h-1 bg-amber-500"></div>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              We manage national highway programs, high-durability concrete viaducts, metro networks, and corporate IT parks under the absolute highest compliance metrics. As a Class-A certified special road contractor, we combine advanced digital models with high-grade machinery forces.
            </p>

            {/* Technical trust capabilities checklists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Certified safety first</span>
                  <span className="text-slate-500 text-[10px]">OHSAS 18001 compliance, zero workplace incidents.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Milestone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">HAM & EPC Experts</span>
                  <span className="text-slate-500 text-[10px]">Turnkey project execution and state joint contracts.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Landmark className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Skilled Engineering Fleet</span>
                  <span className="text-slate-500 text-[10px]">Over 1,200+ trained surveyors, modelers, and project leads.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">National Award Recipient</span>
                  <span className="text-slate-500 text-[10px]">Best Highway Developer award, state ministry of works.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200" 
              alt="Severe construction site machinery details" 
              className="rounded-xl border border-slate-800 shadow-2xl relative z-10 brightness-75 aspect-video w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -inset-2 border border-dashed border-amber-500/10 rounded-xl z-0 pointer-events-none"></div>
          </div>

        </div>
      </section>

      {/* 4. BUSINESS SERVICES QUICK HIGHLIGHT GRAPHICS */}
      <section className="bg-slate-900/10 border-t border-b border-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-amber-500 font-mono text-[10px] uppercase font-bold tracking-widest block">Corporate Services</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight text-gradient">Full-Spectrum Civil Engineering Scale</h2>
            <p className="text-slate-400 text-xs">Vanguard executes strategic contracts through custom models.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            <div className="glass p-6 rounded-2xl hover:border-amber-500/30 transition-all duration-300 space-y-4">
              <span className="text-amber-500 font-bold font-mono text-xs uppercase block">01 / Roadways</span>
              <h3 className="font-bold text-white text-base">Road & Highways</h3>
              <p className="text-slate-400 text-xs leading-relaxed">High-durability highways and bypass connections with automated drainage overlays.</p>
            </div>
            
            <div className="glass p-6 rounded-2xl hover:border-amber-500/30 transition-all duration-300 space-y-4">
              <span className="text-amber-500 font-bold font-mono text-xs uppercase block">02 / Buildings</span>
              <h3 className="font-bold text-white text-base">Corporate High-Rise</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Structural skyscrapers, smart IT park campuses, and industrial assembly spaces.</p>
            </div>

            <div className="glass p-6 rounded-2xl hover:border-amber-500/30 transition-all duration-300 space-y-4">
              <span className="text-amber-500 font-bold font-mono text-xs uppercase block">03 / Infrastructure</span>
              <h3 className="font-bold text-white text-base">Metro & Viaducts</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Pre-stressed segmental bridges, viaduct works, rapid rail foundations.</p>
            </div>

            <div className="glass p-6 rounded-2xl hover:border-amber-500/30 transition-all duration-300 space-y-4">
              <span className="text-amber-500 font-bold font-mono text-xs uppercase block">04 / Contracts</span>
              <h3 className="font-bold text-white text-base">Turnkey Tenders</h3>
              <p className="text-slate-400 text-xs leading-relaxed">EPC, HAM annuity bidding, and private corporate developments joint-venture partnerships.</p>
            </div>
          </div>

          <div className="text-center pt-8">
            <button 
              onClick={() => onNavigate('services')}
              className="text-xs font-mono font-bold text-amber-500 hover:text-amber-400 uppercase tracking-widest inline-flex items-center gap-1.5"
            >
              Explore service specs
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. FEATURED PORTFOLIO SLIDER PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
          <div className="space-y-2">
            <span className="text-amber-500 font-mono text-[10px] uppercase font-bold tracking-widest block">Prestige Portfolio</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight text-gradient">Active Landmarks Completed</h2>
          </div>
          <button 
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono font-bold text-amber-500 hover:text-amber-400 uppercase tracking-wider inline-flex items-center gap-1 hover:translate-x-1 transition-transform"
          >
            Browse entire gallery
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((p, idx) => (
            <div key={idx} className="glass rounded-2xl overflow-hidden group hover:border-amber-500/20 transition-all duration-300">
              <div className="aspect-video w-full bg-slate-950 overflow-hidden block relative">
                <img 
                  src={p.image} 
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550 filter brightness-90 group-hover:brightness-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <span className="absolute bottom-4 left-4 bg-slate-950/90 text-amber-400 font-mono text-[9px] px-2.5 py-1 rounded border border-white/5 uppercase tracking-wider font-bold">
                  {p.type}
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-white text-base truncate">{p.title}</h4>
                <p className="text-slate-500 text-[10px] font-mono mt-1 uppercase">Contract Category NHAI-Unlimited</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 bg-slate-900/10 border-t border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-2">
            <span className="text-amber-500 font-mono text-[10px] uppercase font-bold tracking-widest block">Executive Praise</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white uppercase tracking-tight text-gradient">Sponsor and Client Testimonials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl relative space-y-4 block hover:border-amber-500/20 transition-all duration-300">
                <p className="text-slate-300 text-xs leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div>
                  <h5 className="font-sans font-bold text-white text-xs">{t.author}</h5>
                  <p className="text-slate-500 text-[9px] font-mono uppercase tracking-wider mt-0.5">{t.role} &bull; {t.region}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. CONTACT / CONTRACT ENQUIRIES FORM */}
      <section id="contact-form-section" className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass p-6 sm:p-10 rounded-2xl space-y-8 text-center sm:text-left shadow-2xl relative">
          
          <div className="space-y-2">
            <span className="text-amber-505 font-mono text-[10px] tracking-widest uppercase font-bold block text-amber-500">Contract Negotiation Panel</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white uppercase tracking-tight">Let's Build Strategic Infrastructure</h2>
            <p className="text-slate-400 text-xs leading-relaxed">Request project estimates, tender specifications, or compliance clearances documentation.</p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-5 text-xs text-left">
            {contactResult && (
              <div className={`p-3.5 rounded-lg border text-xs flex items-center gap-2 ${
                isSuccess 
                  ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-400' 
                  : 'bg-rose-950/20 border-rose-900/30 text-rose-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isSuccess ? 'bg-emerald-400' : 'bg-rose-400'} shrink-0 animate-ping`}></span>
                <span>{contactResult}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Your name *</label>
                <input 
                  type="text" 
                  required
                  value={aliasName}
                  onChange={(e) => setAliasName(e.target.value)}
                  placeholder="e.g. Sanjay Sharma"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Email address *</label>
                <input 
                  type="email" 
                  required
                  value={aliasEmail}
                  onChange={(e) => setAliasEmail(e.target.value)}
                  placeholder="e.g. s.sharma@sharmabuilders.in"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Phone Number</label>
                <input 
                  type="tel" 
                  value={aliasPhone}
                  onChange={(e) => setAliasPhone(e.target.value)}
                  placeholder="e.g. +91 91234 56789"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Interested Civil Department</label>
                <select 
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-amber-500-select-custom select-arrow"
                >
                  <option value="Road Construction">Road & Highway Construction</option>
                  <option value="Building Construction">Corporate High-Rise Building</option>
                  <option value="Infrastructure Projects">Heavy Bridges / Transit Infrastructure</option>
                  <option value="Government & Private Contracts">Govt Tenders / EPC Joint Venture</option>
                  <option value="General Consultation">General Contracting Inquiry</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Message details *</label>
              <textarea 
                required
                rows={3}
                value={aliasMessage}
                onChange={(e) => setAliasMessage(e.target.value)}
                placeholder="We would like to request sub-contracting pre-qualification guidelines..."
                className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 font-sans"
              ></textarea>
            </div>

            <div className="pt-4 flex justify-between items-center flex-wrap gap-2">
              <span className="text-[10px] font-mono text-slate-500">Class-A Tender ID: NHAI-UNLIMITED-2026</span>
              <button
                type="submit"
                disabled={isSubmittingContact}
                className="bg-amber-500 hover:bg-amber-600 font-bold px-6 py-2.5 rounded-lg text-slate-950 text-xs tracking-wider uppercase font-mono inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isSubmittingContact ? "Adding Inquiry..." : "Log Inquiry"}
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

        </div>
      </section>

    </div>
  );
}
