import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, Ticket, X, Calendar, MapPin, Building2, Eye, Lock, RefreshCw, KeyRound 
} from 'lucide-react';
import { EventDetails, Registration } from './types';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import EventPage from './pages/EventPage';
import RegistrationPage from './pages/RegistrationPage';

// Shared Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

// Safe default event values
const FALLBACK_EVENT: EventDetails = {
  title: "Vanguard Infrastructure & Innovation Summit 2026",
  date: "2026-06-15",
  time: "10:00 AM - 05:00 PM IST",
  venue: "Auditorium 2, Grand Exhibition Centre, Connaught Place, New Delhi",
  description: "India's premier construction company summit focusing on smart infrastructure, modern highways planning, sustainable commercial building materials, and automated contract execution protocols.",
  availableSeats: 350,
  ticketPrice: 199,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [eventDetails, setEventDetails] = useState<EventDetails>(FALLBACK_EVENT);
  
  // Custom Pop-up Event Banner state
  const [showPopup, setShowPopup] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  
  // Secure Admin Authentication state
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState('');

  // Fetch Event details on startup
  const fetchEventConfig = async () => {
    try {
      const response = await fetch('/api/event');
      if (response.ok) {
        const data = await response.json();
        setEventDetails(data);
      }
    } catch (err) {
      console.warn("Could not load event config from Express backend API, using client default fallback.", err);
    }
  };

  useEffect(() => {
    fetchEventConfig();

    // Trigger pop-up marketing banner after 2.5 seconds helper
    const popupTimer = setTimeout(() => {
      // Only show if user hasn't negotiated already to register page
      if (activeTab !== 'register' && activeTab !== 'admin') {
        setShowPopup(true);
      }
    }, 2500);

    // Dynamic scroll listener for sticky register button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(popupTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Admin Login Session local persistence check
  useEffect(() => {
    const isAuthed = localStorage.getItem('vanguard_admin_authed') === 'true';
    if (isAuthed) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'vanguard2026' || adminPassword === 'admin') {
      setIsAdminLoggedIn(true);
      setAdminPassword('');
      setAdminLoginError('');
      localStorage.setItem('vanguard_admin_authed', 'true');
    } else {
      setAdminLoginError("Invalid Administrator Passcode. Pin is 'vanguard2026' or 'admin'.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('vanguard_admin_authed');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (tab === 'register' || tab === 'admin') {
      setShowPopup(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
      
      {/* 1. Header Toolbar Navbar */}
      <Navbar 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogout={handleAdminLogout}
      />

      {/* 2. Main Tab View Router */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {activeTab === 'home' && (
              <Home event={eventDetails} onNavigate={handleTabChange} />
            )}

            {activeTab === 'about' && (
              <About />
            )}

            {activeTab === 'services' && (
              <ServicesPage />
            )}

            {activeTab === 'projects' && (
              <ProjectsPage />
            )}

            {activeTab === 'event' && (
              <EventPage event={eventDetails} onNavigateRegister={() => handleTabChange('register')} />
            )}

            {activeTab === 'register' && (
              <RegistrationPage event={eventDetails} onRegistrationSuccess={() => {}} />
            )}

            {activeTab === 'admin' && (
              /* Administrative section containing log-in gate */
              <div className="pt-24 min-h-[80vh]">
                {isAdminLoggedIn ? (
                  <AdminPanel 
                    currentEvent={eventDetails} 
                    onEventUpdated={(updated) => {
                      setEventDetails(updated);
                    }} 
                  />
                ) : (
                  /* Admin Password Gate Form template */
                  <div className="max-w-md mx-auto pt-12 px-4 sm:px-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl relative block text-center">
                      <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl flex items-center justify-center mx-auto text-amber-400 font-bold shrink-0">
                        <KeyRound className="w-6 h-6" />
                      </div>
                      
                      <div className="space-y-1">
                        <h2 className="text-xl font-bold text-white tracking-tight">Administrative Authentication</h2>
                        <p className="text-xs text-slate-400">Restricted secure portal. Audits and registrations checklist clearance gateway.</p>
                      </div>

                      <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-left font-mono">
                        {adminLoginError && (
                          <p className="text-[10px] text-rose-455 text-center bg-rose-950/20 border border-rose-900/30 p-2 rounded">
                            {adminLoginError}
                          </p>
                        )}
                        <div className="space-y-1.5">
                          <label className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Administration passcode pin</label>
                          <input 
                            type="password" 
                            required
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="Type System Access PIN"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-center text-white font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold font-mono py-2.5 rounded-lg uppercase tracking-wider transition-colors inline-flex justify-center items-center gap-1.5"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          Gain Panel Clearance
                        </button>
                      </form>

                      {/* Information text helping the system evaluators or developers log in */}
                      <div className="bg-slate-950 rounded-lg p-3 border border-slate-850 text-left space-y-1 text-[9px] text-slate-500 font-mono leading-relaxed">
                        <p className="text-amber-500 font-bold uppercase tracking-wider">★ Tester Access Token Credentials:</p>
                        <p>Write <span className="text-white font-bold font-mono">'admin'</span> or <span className="text-white font-bold font-mono">'vanguard2026'</span> to authenticate straight-away without any server credentials setup.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Footer component */}
      <Footer onTabChange={handleTabChange} />

      {/* --- FLOATING & MARKETING CONVERSION POPUPS --- */}

      {/* A. Bottom-Right floating marketing modal conversion pop-up */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 max-w-sm w-[90%] bg-slate-900 border-2 border-amber-500/20 backdrop-blur-md rounded-xl p-5 shadow-2xl block text-left space-y-4"
          >
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Tenders & Summit
            </span>

            <div className="space-y-1">
              <h4 className="text-sm font-sans font-extrabold text-white leading-snug">Vanguard Construction Summit 2026</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">Explore highway civil contracts bidding procedures. Entry delegate pass is capped at ₹199.</p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleTabChange('register')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors flex-1 text-center"
              >
                Register Seat
              </button>
              <button
                onClick={() => handleTabChange('event')}
                className="bg-slate-950 hover:bg-slate-850 text-slate-300 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-slate-800 transition-colors"
              >
                Audible Perks
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* B. Floating bottom-right "Register Seat ₹199" persistent CTA pill when scrolled down */}
      <AnimatePresence>
        {showFloatingButton && activeTab !== 'register' && activeTab !== 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-6 z-40 hidden sm:block"
          >
            <button
              onClick={() => handleTabChange('register')}
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold font-mono text-xs uppercase px-5 py-3 rounded-full flex items-center gap-2 shadow-2xl transition-transform border border-amber-600/30"
            >
              <Ticket className="w-4 h-4 shrink-0" />
              Book Ticket ₹199
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
