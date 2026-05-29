import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, UploadCloud, Smartphone, FileText, CheckCircle2, Ticket, Check, RefreshCw, ChevronLeft, ArrowRight, X } from 'lucide-react';
import { EventDetails, Registration } from '../types';

interface RegistrationPageProps {
  event: EventDetails;
  onRegistrationSuccess: (reg: Registration) => void;
}

export default function RegistrationPage({ event, onRegistrationSuccess }: RegistrationPageProps) {
  const [step, setStep] = useState<1 | 2>(1); // 1: Profile form, 2: Payment step
  
  // Profile state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  
  // Payment states
  const [screenshotBase64, setScreenshotBase64] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success booking state
  const [bookingRef, setBookingRef] = useState<Registration | null>(null);

  // Real-time status lookup state
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupResult, setLookupResult] = useState<Registration | null>(null);
  const [lookupError, setLookupError] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form validations
  const validateStep1 = () => {
    if (!fullName.trim()) return "Full Name is required.";
    if (!email.trim() || !email.includes('@')) return "A valid Email Address is required.";
    // Mobile number cleanup: check digits
    const cleanedMobile = mobileNumber.replace(/\D/g, '');
    if (cleanedMobile.length < 10) return "A valid 10-digit Mobile Number is required.";
    if (!companyName.trim()) return "Company Name or Academic Institution is required.";
    if (!city.trim()) return "City of business is required.";
    return null;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep1();
    if (err) {
      setSubmitError(err);
      return;
    }
    setSubmitError('');
    setStep(2);
  };

  // Convert uploaded image to base64
  const processFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Only image receipts (PNG, JPG, JPEG) are permitted.');
      return;
    }

    setFileName(file.name);
    setUploadProgress(10);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 30;
      });
    }, 100);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setScreenshotBase64(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setScreenshotBase64('');
    setFileName('');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Final Registration API Submission
  const handleSubmitRegistration = async () => {
    if (!screenshotBase64) {
      setSubmitError("Please pay ₹199 and upload your GPay transaction screenshot to finish validation.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          mobileNumber,
          companyName,
          city,
          paymentScreenshot: screenshotBase64,
        }),
      });

      const data = await response.json();
      if (data.success && data.registration) {
        setBookingRef(data.registration);
        onRegistrationSuccess(data.registration);
      } else {
        setSubmitError(data.error || "Failed to submit registration. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setSubmitError("Network connection error. Server might be launching, retry in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check Status Lookup Handler
  const handleStatusLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupEmail.trim()) {
      setLookupError("Please enter your registered email address.");
      return;
    }

    setIsLookingUp(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const response = await fetch('/api/registrations');
      const allRegs: Registration[] = await response.json();
      
      // Match email case-insensitively
      const match = allRegs.find(
        (r) => r.email.trim().toLowerCase() === lookupEmail.trim().toLowerCase() ||
               r.id.trim().toLowerCase() === lookupEmail.trim().toLowerCase()
      );

      if (match) {
        setLookupResult(match);
      } else {
        setLookupError("No registration records found for this Email or Ref Code.");
      }
    } catch (err) {
      setLookupError("Failed to fetch records. Try again later.");
    } finally {
      setIsLookingUp(false);
    }
  };

  // Clickable UPI Link for phone browsers
  const upiUrl = `upi://pay?pa=corporate@upi&pn=Vanguard%20Construction%20Group&am=199&cu=INR&tn=VGIS2026_${fullName.replace(/[^a-zA-Z]/g, '')}`;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* If user successfully registered just now, display ticket success card */}
        {bookingRef ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto space-y-8"
          >
            {/* Header Success Badge */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Seat Pre-Booked Successfully!</h2>
              <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-300 font-semibold">{bookingRef.fullName}</strong>. We recorded your GPay transaction of <span className="text-amber-500">₹199</span>. Our auditing panel is verifying your screenshot.
              </p>
            </div>

            {/* Official Digital Ticket Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative block">
              <div className="absolute top-0 right-4 -translate-y-1/2 bg-amber-500 text-slate-950 font-mono font-bold text-[9px] tracking-wider uppercase px-2.5 py-1 rounded shadow-lg">
                Booking Pass
              </div>

              {/* Branding Strip */}
              <div className="bg-slate-900 border-b border-slate-800 p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-mono text-amber-400 font-extrabold text-sm uppercase tracking-wider">VANGUARD</h4>
                  <p className="text-[9px] text-slate-500 font-mono">Infrastructure & Innovation Summit 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">Ref Code</p>
                  <p className="text-xs font-mono font-bold text-white uppercase">{bookingRef.id}</p>
                </div>
              </div>

              {/* Passenger Metadata */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">DELEGATE NAME</span>
                    <span className="font-sans font-bold text-white text-sm">{bookingRef.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">COMPANY</span>
                    <span className="font-sans font-bold text-slate-300 block truncate">{bookingRef.companyName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">CONTACT EMAIL</span>
                    <span className="font-sans text-slate-400 block break-all">{bookingRef.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">CITY / REGION</span>
                    <span className="font-sans text-slate-300 font-bold block uppercase">{bookingRef.city}</span>
                  </div>
                </div>

                {/* Ticket status badge */}
                <div className="border-t border-b border-dashed border-slate-800/80 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">AUDIT STATUS</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold mt-1 uppercase">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
                      Pending Admin Audit
                    </span>
                  </div>
                  <div className="bg-slate-905 p-2 rounded-lg border border-slate-800 flex items-center gap-2">
                    {/* Tiny visual simulation of dynamic QR code */}
                    <div className="w-10 h-10 bg-white p-1 rounded">
                      <div className="w-full h-full bg-slate-950 flex items-center justify-center">
                        <span className="text-[7px] text-slate-400 font-mono">WAIT</span>
                      </div>
                    </div>
                    <div className="text-left font-mono">
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest">Digital Ticket</p>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Pending Verification</p>
                    </div>
                  </div>
                </div>

                {/* Footnote instruction instructions */}
                <div className="bg-slate-950 border border-slate-900 rounded-lg p-3 flex items-start gap-2.5 text-[10px] text-slate-400 leading-normal">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p>
                    A confirmation pass will be generated within 12-24 hours. Keep this page open or search your email '<span className="text-slate-300 font-mono">{bookingRef.email}</span>' above using the status checker as soon as audit compiles!
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setBookingRef(null)}
                className="text-xs font-mono text-amber-500 underline uppercase tracking-wider font-semibold hover:text-amber-400"
              >
                Register Another Delegate
              </button>
            </div>
          </motion.div>
        ) : (
          /* Normal registration flow containing form / payments */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: Major Form & Steps (8 columns) */}
            <div className="lg:col-span-8 glass p-6 sm:p-10 rounded-3xl space-y-8 shadow-2xl">
              
              {/* Form Heading & Progress Indicators */}
              <div className="flex justify-between items-center pb-6 border-b border-white/5">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight text-gradient uppercase">Summit Registration</h2>
                  <p className="text-xs text-slate-400 mt-1">Provide your verified coordinates to allocate a VIP delegate pass.</p>
                </div>
                <div className="flex gap-1.5 items-center">
                  <div className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all duration-300 ${
                    step === 1 ? 'accent-gradient text-slate-950 shadow-md' : 'bg-slate-800 text-slate-400'
                  }`}>1</div>
                  <div className="w-6 h-[1px] bg-slate-800"></div>
                  <div className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all duration-300 ${
                    step === 2 ? 'accent-gradient text-slate-950 shadow-md' : 'bg-slate-800 text-slate-400'
                  }`}>2</div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  /* STEP 1: Profile metadata form */
                  <motion.form 
                    key="step1"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    onSubmit={handleNextStep}
                    className="space-y-6"
                  >
                    {submitError && (
                      <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg p-3 text-xs flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Delegate Full Name *</label>
                        <input 
                          type="text" 
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Sanjay Sharma"
                          className="w-full bg-slate-950/60 border border-white/10 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Corporate Email *</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. s.sharma@sharmabuilders.in"
                          className="w-full bg-slate-950/60 border border-white/10 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Mobile Number *</label>
                        <input 
                          type="tel" 
                          required
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-slate-950/60 border border-white/10 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Company / Institution Name *</label>
                        <input 
                          type="text" 
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Sharma Civil Engineering Ltd."
                          className="w-full bg-slate-950/60 border border-white/10 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">City of Business Operation *</label>
                      <input 
                        type="text" 
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. New Delhi"
                        className="w-full bg-slate-950/60 border border-white/10 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                      />
                    </div>

                    <p className="text-[11px] text-slate-550 leading-normal text-slate-400">
                      * Vanguard Summit complies with strict cybersecurity guidelines; your business credentials are safe and shared only for verified identity badges allocation.
                    </p>

                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-xs text-amber-500 font-mono">₹199 Payable at next screen</span>
                      <button
                        type="submit"
                        className="accent-gradient border border-amber-600 hover:brightness-110 active:scale-95 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs tracking-wider uppercase font-mono inline-flex items-center gap-1.5 transition-all shadow-lg cursor-pointer self-end"
                      >
                        Secure Seat
                        <ArrowRight className="w-4 h-4 text-slate-950" />
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  /* STEP 2: Payment flow requiring UPI scan and receipt upload */
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-8"
                  >
                    {submitError && (
                      <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg p-3 text-xs flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Step 2 Heading */}
                    <div className="flex gap-4 items-center">
                      <button 
                        onClick={() => { setStep(1); setSubmitError(''); }}
                        className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div>
                        <h3 className="font-bold text-white text-base">Google Pay UPI QR Payment</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Pay exactly ₹199 and upload the verification receipt below.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      
                      {/* Left: Beautiful CSS QR code rendering */}
                      <div className="glass hover:border-amber-500/10 transition-colors p-6 text-center space-y-4 rounded-2xl relative shadow-md">
                        <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">SCAN CODE TO REGISTER</p>
                        
                        {/* QR Structure drawing */}
                        <div className="relative group p-4 border border-white/10 rounded-2xl inline-block bg-white w-44 mx-auto select-none shadow-lg">
                          <div className="grid grid-cols-4 gap-0.5 w-full aspect-square">
                            {/* Standard simulation grids mimicking structural code patterns */}
                            <div className="bg-slate-950 h-8 w-8 rounded-sm"></div>
                            <div className="bg-white h-8 w-8"></div>
                            <div className="bg-white h-8 w-8"></div>
                            <div className="bg-slate-950 h-8 w-8 rounded-sm"></div>
                            <div className="bg-white h-8 w-8"></div>
                            <div className="bg-slate-950 h-8 w-8"></div>
                            <div className="bg-slate-950 h-8 w-8"></div>
                            <div className="bg-white h-8 w-8"></div>
                            <div className="bg-white h-8 w-8"></div>
                            <div className="bg-slate-950 h-8 w-8"></div>
                            <div className="bg-slate-950 h-8 w-8"></div>
                            <div className="bg-white h-8 w-8"></div>
                            <div className="bg-slate-950 h-8 w-8 rounded-sm"></div>
                            <div className="bg-white h-8 w-8"></div>
                            <div className="bg-white h-8 w-8"></div>
                            <div className="bg-slate-950 h-8 w-8 rounded-sm"></div>
                          </div>
                          
                          {/* Inner scanner laser animation effect */}
                          <div className="absolute inset-x-0 h-0.5 bg-amber-500 animate-bounce top-4 select-none opacity-40"></div>
                        </div>

                        <div>
                          <p className="text-xs text-white font-bold tracking-tight">UPI ID: <span className="text-amber-400 font-mono">pay@vanguardinfra.com</span></p>
                          <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase">Merchant: Vanguard Civil Group</p>
                        </div>

                        {/* Interactive Click/Tap alternative for mobile */}
                        <div className="pt-2">
                          <a 
                            href={upiUrl}
                            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-wider font-bold inline-flex items-center gap-1.5 transition-colors"
                          >
                            <Smartphone className="w-3.5 h-3.5" />
                            Pay on Phone directly
                          </a>
                        </div>
                      </div>

                      {/* Right: Drag and Drop receipt uploader */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Upload Payment Screenshot *</label>
                        
                        <div 
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={triggerFileSelect}
                          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] select-none ${
                            isDragging 
                              ? 'border-amber-500 bg-amber-500/5' 
                              : screenshotBase64 
                                ? 'border-emerald-500 border-solid bg-emerald-500/5' 
                                : 'border-white/10 bg-slate-950/60 hover:bg-slate-900/60'
                          }`}
                        >
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />

                          {screenshotBase64 ? (
                            <div className="space-y-4 w-full">
                              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                                <CheckCircle2 className="w-6 h-6" />
                              </div>
                              <div className="text-xs">
                                <p className="font-bold text-white max-w-[200px] truncate mx-auto">{fileName}</p>
                                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">Receipt Captured</p>
                              </div>
                              <button 
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                className="inline-flex items-center gap-1 text-[10px] font-mono uppercase font-bold text-rose-400 border border-rose-500/15 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl px-3 py-1.5 cursor-pointer"
                              >
                                <X className="w-3 h-3" /> Remove File
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mx-auto">
                                <UploadCloud className="w-6 h-6" />
                              </div>
                              <div className="text-xs">
                                <p className="text-slate-300 font-semibold leading-relaxed">Drag screenshot here, or <span className="text-amber-500 underline font-bold">browse</span></p>
                                <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase tracking-wide">Supports PNG, JPG, JPEG receipts</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* File upload metrics bar */}
                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div className="p-3 bg-slate-900/40 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1">
                              <span>PROCESSING ATTACHMENT...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 transition-all duration-100" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Footer Registration Action Controls */}
                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <button
                        onClick={() => { setStep(1); setSubmitError(''); }}
                        className="text-xs font-semibold text-slate-400 hover:text-white font-mono uppercase cursor-pointer"
                      >
                        Edit Coordinates
                      </button>

                      <button
                        onClick={handleSubmitRegistration}
                        disabled={isSubmitting || !screenshotBase64}
                        className={`font-semibold font-mono tracking-wider uppercase inline-flex items-center gap-1.5 text-xs px-6 py-3 rounded-xl cursor-pointer shadow-md transition-all ${
                          isSubmitting || !screenshotBase64
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                            : 'accent-gradient border border-amber-600 hover:brightness-110 text-slate-950 font-bold active:scale-95'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Pre-Booking Pass...
                          </>
                        ) : (
                          <>
                            Submit Payment Screenshot
                            <CheckCircle2 className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT: Ticket Status Checker widget (4 columns) */}
            <div className="lg:col-span-4 glass rounded-3xl block overflow-hidden shadow-2xl hover:border-amber-500/10 transition-all duration-300">
              
              {/* Widget Title Strip */}
              <div className="bg-slate-900/40 p-5 border-b border-white/5">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-amber-500" />
                  Pass & Status Checker
                </h4>
                <p className="text-[10px] text-slate-505 text-slate-550 text-slate-400 mt-1">Check verified invitation credentials or re-print ticket passes.</p>
              </div>

              {/* Lookup Form */}
              <div className="p-6 space-y-6">
                <form onSubmit={handleStatusLookup} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-400 block uppercase font-semibold">Registered Email / Ref ID</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        required
                        value={lookupEmail}
                        onChange={(e) => setLookupEmail(e.target.value)}
                        placeholder="e.g. s.sharma@sharmabuilders.in"
                        className="flex-1 bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500/70 text-white font-medium"
                      />
                      <button
                        type="submit"
                        disabled={isLookingUp}
                        className="bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider relative block select-none border border-white/5 cursor-pointer"
                      >
                        {isLookingUp ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Verify"}
                      </button>
                    </div>
                  </div>
                  {lookupError && (
                    <p className="text-[10px] font-mono text-rose-450 capitalize">{lookupError}</p>
                  )}
                </form>

                {/* Display Lookup Outcome */}
                {lookupResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-white/5 bg-slate-950/40 rounded-2xl p-4 space-y-4 shadow-inner"
                  >
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                      <div>
                        <p className="text-[10px] font-mono text-slate-500 uppercase">Delegated Seat</p>
                        <h5 className="font-sans font-bold text-white text-xs truncate max-w-[130px]">{lookupResult.fullName}</h5>
                      </div>
                      <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-lg border ${
                        lookupResult.status === 'Approved'
                          ? 'bg-emerald-950/95 text-emerald-400 border-emerald-900/40 shadow-sm shadow-emerald-950'
                          : lookupResult.status === 'Rejected'
                            ? 'bg-rose-950/95 text-rose-400 border-rose-900/40'
                            : 'bg-amber-950/95 text-amber-400 border-amber-900/40 animate-pulse'
                      }`}>
                        {lookupResult.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-400">
                      <p><strong className="text-slate-300">Ref ID:</strong> <span className="font-mono uppercase text-white">{lookupResult.id}</span></p>
                      <p><strong className="text-slate-300">Company:</strong> <span className="truncate">{lookupResult.companyName}</span></p>
                      <p><strong className="text-slate-300 font-sans">Date Applied:</strong> {new Date(lookupResult.registrationDate).toLocaleDateString()}</p>
                    </div>

                    {/* If Approved, show the gorgeous actual ticket pass invitation block! */}
                    {lookupResult.status === 'Approved' && lookupResult.invitationDetails ? (
                      <div className="bg-slate-900/60 border border-white/5 p-3.5 rounded-xl space-y-3.5">
                        <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                          Official Summit Pass Generated
                        </div>
                        
                        {/* Dynamic mini pass card coordinates */}
                        <div className="space-y-1.5 text-[9px] text-slate-400 border-t border-b border-white/5 py-2">
                          <p><strong className="text-slate-500 uppercase tracking-widest font-mono">TICKET ID:</strong> <span className="font-mono text-amber-400 font-bold text-xs">{lookupResult.invitationCode}</span></p>
                          <p><strong className="text-slate-505 uppercase tracking-widest font-mono text-slate-500">VENUE:</strong> <span className="text-slate-350 text-[10px] font-sans">{lookupResult.invitationDetails.venue}</span></p>
                          <p><strong className="text-slate-505 uppercase tracking-widest font-mono text-slate-500">SCHEDULE:</strong> <span className="text-slate-350 text-[10px] font-sans">{lookupResult.invitationDetails.time}</span></p>
                        </div>

                        {/* Interactive download visualization */}
                        <div className="flex items-center gap-2.5">
                          {/* Mini QR code pattern */}
                          <div className="w-12 h-12 bg-white p-1 rounded-lg shrink-0 select-none shadow-sm">
                            <div className="grid grid-cols-3 gap-0.5 w-full h-full">
                              <div className="bg-slate-950"></div>
                              <div className="bg-white"></div>
                              <div className="bg-slate-950"></div>
                              <div className="bg-white"></div>
                              <div className="bg-slate-950"></div>
                              <div className="bg-white"></div>
                              <div className="bg-slate-950"></div>
                              <div className="bg-white"></div>
                              <div className="bg-slate-950"></div>
                            </div>
                          </div>
                          <div>
                            <p className="text-[9px] font-mono text-slate-550 uppercase font-bold tracking-widest leading-none text-slate-500">GATE PASS</p>
                            <p className="text-[10px] text-slate-300 leading-normal font-sans pt-1">Show this screen with barcode to security at the gate on seminar day.</p>
                          </div>
                        </div>

                      </div>
                    ) : lookupResult.status === 'Rejected' ? (
                      <p className="text-[10px] bg-rose-955/25 text-rose-400 border border-rose-900/30 p-2.5 rounded-xl text-center leading-normal">
                        The uploaded receipt was declined. Please verify your reference details or submit a correct transaction screenshot again.
                      </p>
                    ) : (
                      <p className="text-[11px] bg-amber-955/20 text-amber-400 border border-amber-900/30 p-3 rounded-xl text-center leading-relaxed">
                        Receipt is currently being scrutinized by Vanguard Auditors. Verification takes roughly 2 - 12 hours. Save this Ref ID or check back again soon!
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
