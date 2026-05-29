import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, BarChart3, Settings, MessageSquare, Check, X, Eye, Trash2, 
  RefreshCw, TrendingUp, Calendar, MapPin, DollarSign, Award, AlertCircle 
} from 'lucide-react';
import { EventDetails, Registration, ContactQuery } from '../types';

interface AdminPanelProps {
  currentEvent: EventDetails;
  onEventUpdated: (evt: EventDetails) => void;
}

interface Analytics {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  revenue: number;
  ticketPrice: number;
  cityBreakdown: { [key: string]: number };
}

export default function AdminPanel({ currentEvent, onEventUpdated }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'registrations' | 'events' | 'queries'>('registrations');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    total: 0, approved: 0, pending: 0, rejected: 0, revenue: 0, ticketPrice: 199, cityBreakdown: {}
  });

  const [isLoading, setIsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState({ text: '', type: 'success' });

  // Event Edit State
  const [editTitle, setEditTitle] = useState(currentEvent.title);
  const [editDate, setEditDate] = useState(currentEvent.date);
  const [editTime, setEditTime] = useState(currentEvent.time);
  const [editVenue, setEditVenue] = useState(currentEvent.venue);
  const [editDesc, setEditDesc] = useState(currentEvent.description);
  const [editSeats, setEditSeats] = useState(currentEvent.availableSeats);
  const [editPrice, setEditPrice] = useState(currentEvent.ticketPrice);

  // Screenshot Lightbox State
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);

  // Fetch all administrative metadata from custom endpoints
  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [regsRes, queriesRes, analyticsRes] = await Promise.all([
        fetch('/api/registrations'),
        fetch('/api/contact'),
        fetch('/api/admin/analytics')
      ]);

      const regs = await regsRes.json();
      const queriesData = await queriesRes.json();
      const analyticsData = await analyticsRes.json();

      setRegistrations(regs);
      setQueries(queriesData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error("Failed to compile admin dashboard data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Sync event edit form when event changes
  useEffect(() => {
    setEditTitle(currentEvent.title);
    setEditDate(currentEvent.date);
    setEditTime(currentEvent.time);
    setEditVenue(currentEvent.venue);
    setEditDesc(currentEvent.description);
    setEditSeats(currentEvent.availableSeats);
    setEditPrice(currentEvent.ticketPrice);
  }, [currentEvent]);

  // Handle Verify Action (Approve / Reject)
  const handleVerifyRegistration = async (id: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch('/api/register/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
      });
      const data = await response.json();
      if (data.success) {
        setActionMessage({ 
          text: `Registration ${id} successfully ${action === 'approve' ? 'Approved' : 'Rejected'}.`, 
          type: 'success' 
        });
        fetchAdminData(); // Refresh list and counters
      } else {
        setActionMessage({ text: data.error || "Action failed.", type: 'error' });
      }
    } catch (err) {
      setActionMessage({ text: "Network connection error.", type: 'error' });
    }
  };

  // Delete registration helper
  const handleDeleteRegistration = async (id: string) => {
    if (!window.confirm(`Are you sure you want to delete registration ${id}?`)) return;
    try {
      const response = await fetch(`/api/register/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        setActionMessage({ text: "Registration file deleted successfully.", type: 'success' });
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Event Edit Settings
  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          date: editDate,
          time: editTime,
          venue: editVenue,
          description: editDesc,
          availableSeats: editSeats,
          ticketPrice: editPrice
        })
      });

      const data = await response.json();
      if (data.success) {
        onEventUpdated(data.event);
        setActionMessage({ text: "Summit event details compiled and updated successfully!", type: 'success' });
        fetchAdminData();
      } else {
        setActionMessage({ text: data.error || "Failed to update event structure.", type: 'error' });
      }
    } catch (err) {
      setActionMessage({ text: "Failed to connect to backend api.", type: 'error' });
    }
  };

  // Mark Contact Query as read
  const handleMarkQueryRead = async (id: string) => {
    try {
      const response = await fetch('/api/contact/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-slate-900">
          <div>
            <span className="text-amber-500 font-mono text-[10px] tracking-widest uppercase block font-bold">Vanguard Back-Office</span>
            <h1 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white flex items-center gap-2">
              Corporate & Summit Control Panel
            </h1>
          </div>
          
          <button
            onClick={fetchAdminData}
            disabled={isLoading}
            className="bg-slate-900 hover:bg-slate-850 text-amber-500 border border-slate-800 rounded-lg px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all w-full sm:w-auto justify-center"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh database
          </button>
        </div>

        {/* Analytics Breakdown Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Total Enrolled Card */}
          <div className="bg-slate-900/30 border border-slate-900 p-5 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Total Enrolled</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{analytics.total}</h3>
            </div>
          </div>

          {/* Pending Audit Card */}
          <div className="bg-slate-900/30 border border-slate-900 p-5 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0 animate-pulse">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Pending Audit</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{analytics.pending}</h3>
            </div>
          </div>

          {/* Approved VIPs Card */}
          <div className="bg-slate-900/30 border border-slate-900 p-5 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Approved Passes</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{analytics.approved}</h3>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-slate-900/30 border border-slate-900 p-5 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <span className="text-lg font-bold font-mono">₹</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">GPay Revenue</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">₹{analytics.revenue}</h3>
            </div>
          </div>

        </div>

        {/* Action toast output */}
        {actionMessage.text && (
          <div className={`p-4 rounded-xl border mb-6 text-xs flex justify-between items-center ${
            actionMessage.type === 'success' 
              ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-400' 
              : 'bg-rose-950/20 border-rose-900/30 text-rose-400'
          }`}>
            <span className="font-sans font-medium">{actionMessage.text}</span>
            <button 
              onClick={() => setActionMessage({ text: '', type: 'success' })}
              className="font-bold underline text-[10px] uppercase font-mono tracking-wider ml-4"
            >
              dismiss
            </button>
          </div>
        )}

        {/* Navigation Admin Category Tabs */}
        <div className="flex border-b border-slate-900 mb-8 gap-4">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`pb-3 text-xs tracking-wider uppercase font-mono font-bold border-b-2 transition-colors ${
              activeTab === 'registrations' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Registrations Array ({registrations.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-3 text-xs tracking-wider uppercase font-mono font-bold border-b-2 transition-colors ${
              activeTab === 'events' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Manage Countdown Timer
          </button>
          <button
            onClick={() => setActiveTab('queries')}
            className={`pb-3 text-xs tracking-wider uppercase font-mono font-bold border-b-2 transition-colors ${
              activeTab === 'queries' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Corporate Business Enquiries ({queries.filter(q => q.status === 'Unread').length} unread)
          </button>
        </div>

        {/* Tab content block */}
        <div className="bg-slate-900/15 border border-slate-900 rounded-2xl block overflow-hidden shadow-xl p-6 sm:p-8">
          
          <AnimatePresence mode="wait">
            {activeTab === 'registrations' && (
              /* TAB 1: User registrations manager template */
              <motion.div
                key="registrations-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white text-base font-sans">Active Summit Registrants Array</h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Click 'Receipt' to verify the transaction screenshot</span>
                </div>

                <div className="overflow-x-auto border border-slate-900 rounded-xl bg-slate-950/20">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-900 bg-slate-900/30 text-slate-400 font-mono uppercase text-[9px] tracking-wider">
                        <th className="p-4">Ref Code</th>
                        <th className="p-4">Delegate Profile</th>
                        <th className="p-4">Affiliated Corporate</th>
                        <th className="p-4">Applied Date</th>
                        <th className="p-4">Screening Pass</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-[11px]">
                      {registrations.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-500 font-mono uppercase">
                            No registration files located.
                          </td>
                        </tr>
                      ) : (
                        registrations.map((reg) => (
                          <tr key={reg.id} className="hover:bg-slate-900/30 transition-colors">
                            {/* Ref ID format */}
                            <td className="p-4 font-mono font-bold text-amber-400 uppercase">{reg.id}</td>
                            
                            {/* Delegate Name + mobile row details */}
                            <td className="p-4 space-y-1">
                              <p className="font-bold text-white text-xs">{reg.fullName}</p>
                              <p className="text-slate-500 font-mono text-[10px]">{reg.email}</p>
                              <p className="text-slate-550 font-mono text-[9px]">{reg.mobileNumber}</p>
                            </td>

                            {/* Company / City info */}
                            <td className="p-4 space-y-0.5">
                              <p className="font-sans text-slate-200 font-semibold">{reg.companyName}</p>
                              <p className="font-mono text-slate-400 uppercase text-[9px] truncate max-w-[150px]">{reg.city}</p>
                            </td>

                            {/* Date applied format */}
                            <td className="p-4 text-slate-400 font-mono">
                              {new Date(reg.registrationDate).toLocaleDateString()}
                              <span className="text-[9px] text-slate-600 block">
                                {new Date(reg.registrationDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </td>

                            {/* Status label column */}
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase font-semibold font-bold border ${
                                reg.status === 'Approved' 
                                  ? 'bg-emerald-950/40 text-emerald-405 border-emerald-900/50' 
                                  : reg.status === 'Rejected'
                                    ? 'bg-rose-950/40 text-rose-455 border-rose-900/50'
                                    : 'bg-amber-950/40 text-amber-405 border-amber-900/50 animate-pulse'
                              }`}>
                                {reg.status}
                              </span>
                            </td>

                            {/* Transaction auditing controls panel */}
                            <td className="p-4 flex gap-2 justify-center items-center h-full min-h-[64px]">
                              
                              {/* Open GPay Receipt Button */}
                              <button
                                onClick={() => setActiveScreenshot(reg.paymentScreenshot)}
                                title="Inspect Payment Screenshot"
                                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 p-2 rounded transform active:scale-95 transition-all inline-flex items-center gap-1 text-[10px] font-mono uppercase font-semibold"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                Receipt
                              </button>

                              {/* Quick actions for Pending items */}
                              {reg.status === 'Pending' && (
                                <>
                                  <button
                                    onClick={() => handleVerifyRegistration(reg.id, 'approve')}
                                    title="Approve & Send Ticket VIP Pass"
                                    className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 p-2 rounded transform active:scale-95 transition-all inline-flex items-center gap-1 text-[10px] font-mono uppercase font-extrabold"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    Verify
                                  </button>
                                  <button
                                    onClick={() => handleVerifyRegistration(reg.id, 'reject')}
                                    title="Reject screenshot"
                                    className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 p-2 rounded transform active:scale-95 transition-all inline-flex items-center gap-1 text-[10px] font-mono uppercase font-bold"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                    Reject
                                  </button>
                                </>
                              )}

                              {/* Delete option */}
                              <button
                                onClick={() => handleDeleteRegistration(reg.id)}
                                title="Erase Record"
                                className="text-slate-500 hover:text-rose-400 p-2 border border-transparent hover:border-slate-800 rounded transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>

                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'events' && (
              /* TAB 2: Dynamic config panel supporting live countdown updates! */
              <motion.div
                key="event-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 max-w-2xl mx-auto"
              >
                <div>
                  <h3 className="font-bold text-white text-base">Summit Event Real-Time Editor</h3>
                  <p className="text-xs text-slate-400 mt-1">Updates the countdown clock timer, ticker limits, and address venues instantly across the front-end layout.</p>
                </div>

                <form onSubmit={handleUpdateEvent} className="space-y-5 text-xs">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Summit Title Header</label>
                    <input 
                      type="text" 
                      required
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-4 py-3 text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Event Launch Date (YYYY-MM-DD)</label>
                      <input 
                        type="date" 
                        required
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-4 py-3 text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Event Operational Timing Slot</label>
                      <input 
                        type="text" 
                        required
                        value={editTime}
                        onChange={(e) => setEditTime(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-4 py-3 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Physical Exhibition Venue Address</label>
                    <input 
                      type="text" 
                      required
                      value={editVenue}
                      onChange={(e) => setEditVenue(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-4 py-3 text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Event Marketing Pitch Description</label>
                    <textarea
                      required
                      rows={3}
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-4 py-3 text-white focus:outline-none font-sans"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Total Available Hall Seats limit</label>
                      <input 
                        type="number" 
                        required
                        value={editSeats}
                        onChange={(e) => setEditSeats(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-4 py-3 text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Single Ticket Price Pass Fee (INR ₹)</label>
                      <input 
                        type="number" 
                        required
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-4 py-3 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-900 flex justify-end">
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 font-bold px-6 py-2.5 rounded-lg text-slate-950 text-xs tracking-wider uppercase font-mono transition-colors"
                    >
                      Save Summit Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'queries' && (
              /* TAB 3: Business inquiries viewer */
              <motion.div
                key="queries-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white text-base">Corporate Business Tenders & Inquiries</h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase">Submissions from public homepage contact form</p>
                </div>

                <div className="space-y-4">
                  {queries.length === 0 ? (
                    <p className="text-center py-10 border border-dashed border-slate-850 rounded-xl text-slate-500 font-mono text-xs uppercase">
                      No customer inquiries available.
                    </p>
                  ) : (
                    queries.map((q) => (
                      <div 
                        key={q.id} 
                        className={`border rounded-xl p-5 space-y-4 transition-all ${
                          q.status === 'Unread' 
                            ? 'bg-slate-900/40 border-amber-500/20' 
                            : 'bg-slate-950/20 border-slate-900'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-900/60 pb-3">
                          <div className="space-y-0.5">
                            <span className="bg-slate-900 text-amber-400 font-mono text-[9px] px-2 py-0.5 rounded border border-slate-800 uppercase font-semibold">
                              {q.service}
                            </span>
                            <h4 className="text-sm font-bold text-white pt-1">{q.name}</h4>
                            <p className="text-[10px] font-mono text-slate-500">{q.email} &bull; {q.phone}</p>
                          </div>
                          
                          <div className="text-left sm:text-right font-mono text-[9px]">
                            <p className="text-slate-400">{new Date(q.date).toLocaleDateString()}</p>
                            <p className="text-slate-600">{new Date(q.date).toLocaleTimeString()}</p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 font-sans leading-relaxed block italic pl-3 border-l-2 border-amber-500/40">
                          "{q.message}"
                        </p>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[10px] font-mono text-slate-500">Query ID: <span className="text-slate-400 uppercase">{q.id}</span></span>
                          
                          {q.status === 'Unread' && (
                            <button
                              onClick={() => handleMarkQueryRead(q.id)}
                              className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/15 rounded px-3 py-1.5 text-[9px] font-mono font-bold uppercase transition-colors"
                            >
                              Mark Read & Record
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* SCREENSHOT LIGHTBOX MODAL */}
        <AnimatePresence>
          {activeScreenshot && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveScreenshot(null)}
              className="fixed inset-0 bg-slate-950/90 z-50 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full block overflow-hidden shadow-2xl relative"
              >
                {/* Popup Close Header */}
                <div className="p-4 border-b border-slate-805 flex justify-between items-center bg-slate-950/45">
                  <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">Inspect Payment screenshot proof</h4>
                  <button 
                    onClick={() => setActiveScreenshot(null)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Screenshot Display container */}
                <div className="p-6 bg-slate-950 flex justify-center items-center select-none text-center min-h-[300px]">
                  {activeScreenshot.startsWith("/uploads/screenshot_sample1.png") ? (
                    <div className="space-y-4">
                      {/* Drawing an extremely beautiful realistic GPay successful invoice block if it is our mock pre-seeded file */}
                      <div className="bg-emerald-950/20 border border-emerald-900/30 p-8 rounded-xl max-w-sm space-y-4 shadow-xl">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-slate-950 mx-auto font-bold shadow-lg">
                          ✓
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-500 font-mono uppercase">Goole Pay Transaction</p>
                          <h4 className="text-2xl font-bold font-mono text-white">₹199.00</h4>
                          <p className="text-[11px] text-emerald-400 font-mono uppercase font-bold">Successfully Paid</p>
                        </div>
                        <div className="border-t border-slate-905 pt-3 space-y-1.5 text-[10px] text-slate-400 font-mono text-left">
                          <p><strong>To:</strong> pay@vanguardinfra.com</p>
                          <p><strong>Txn Ref:</strong> GPAY-94012840-A</p>
                          <p><strong>Bank Ref:</strong> SBI-420-CONSTRUCT</p>
                        </div>
                      </div>
                      <p className="text-[10px] font-mono text-slate-550">Simulated GPay proof on Server database</p>
                    </div>
                  ) : (
                    /* The actual user uploaded PNG/JPG base64 screenshot */
                    <img 
                      src={activeScreenshot} 
                      alt="Uploaded Screenshot Proof" 
                      className="max-h-[450px] w-auto max-w-full rounded-lg object-contain shadow-2xl border border-slate-800"
                    />
                  )}
                </div>

                <div className="p-4 bg-slate-900 border-t border-slate-805 text-center text-[10px] text-slate-500">
                  Click outer backdrop or press ESC to dismiss inspection screen.
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
