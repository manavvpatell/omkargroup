import React from 'react';
import { Route, Building2, Ticket, Menu, X, ShieldAlert, LogOut } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isAdminLoggedIn: boolean;
  onAdminLogout: () => void;
}

export default function Navbar({ activeTab, onTabChange, isAdminLoggedIn, onAdminLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Company Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Portfolios' },
    { id: 'event', label: 'The Summit' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div 
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold group-hover:rotate-6 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-white text-base font-extrabold tracking-widest block uppercase">VANGUARD</span>
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block -mt-0.5">Civil & Highways</span>
            </div>
          </div>

          {/* Large screens nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                    activeTab === item.id 
                      ? 'text-amber-400 bg-slate-900 border border-slate-800' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-slate-900"></div>

            <div className="flex items-center gap-3">
              {/* Event booking trigger button */}
              <button
                onClick={() => onTabChange('register')}
                className={`text-xs font-mono font-bold uppercase px-4 py-2 rounded-lg border flex items-center gap-1.5 transition-all ${
                  activeTab === 'register'
                    ? 'bg-amber-500 text-slate-950 border-amber-500'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500'
                }`}
              >
                <Ticket className="w-4 h-4" />
                Book Ticket
              </button>

              {/* Admin Panel Toggle */}
              <button
                onClick={() => onTabChange('admin')}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-colors ${
                  activeTab === 'admin'
                    ? 'bg-slate-900 text-amber-400 border border-slate-800'
                    : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                Admin
              </button>

              {isAdminLoggedIn && (
                <button
                  onClick={onAdminLogout}
                  title="Logout Administrator Session"
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors shrink-0"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile hamburger icon trigger */}
          <div className="md:hidden flex items-center gap-2">
            
            {/* Quick GPay Register for mobile topbar */}
            <button
               onClick={() => onTabChange('register')}
               className="bg-amber-500 text-slate-950 font-mono font-bold text-[10px] uppercase px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <Ticket className="w-3.5 h-3.5" />
              Ticket
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-850"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 p-4 space-y-3">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onTabChange(item.id); setIsOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors ${
                  activeTab === item.id ? 'bg-slate-900 text-amber-400 font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-900 pt-3 flex flex-col gap-2">
            <button
              onClick={() => { onTabChange('register'); setIsOpen(false); }}
              className="w-full bg-amber-500 hover:bg-amber-605 text-slate-950 font-mono font-bold text-xs uppercase py-2.5 rounded-lg text-center flex items-center justify-center gap-1.5"
            >
              <Ticket className="w-4 h-4" />
              Book Summit Ticket (₹199)
            </button>

            <button
              onClick={() => { onTabChange('admin'); setIsOpen(false); }}
              className="w-full bg-slate-900 border border-slate-800 text-slate-400 font-mono font-bold text-xs uppercase py-2 rounded-lg text-center flex items-center justify-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
