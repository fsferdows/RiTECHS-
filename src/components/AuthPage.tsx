import React, { useState } from 'react';
import { LogIn, KeyRound, Sparkles, CheckCircle2, ShieldAlert, Award, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthPageProps {
  initialSub?: string | null;
  onLoginSuccess: () => void;
}

export default function AuthPage({ initialSub, onLoginSuccess }: AuthPageProps) {
  const [activeSegment, setActiveSegment] = useState<'login' | 'register'>('login');
  const [userRole, setUserRole] = useState<'mentee' | 'mentor'>(
    initialSub?.includes('mentor') ? 'mentor' : 'mentee'
  );

  // Form entries
  const [emailAddress, setEmailAddress] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [profileName, setProfileName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [specializationField, setSpecializationField] = useState("");
  
  // feedback triggers
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasSuccess, setHasSuccess] = useState(false);

  const triggerAuthFlow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAddress) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasSuccess(true);
      setTimeout(() => {
        onLoginSuccess();
      }, 1500);
    }, 1500);
  };

  return (
    <div className="bg-neutral-warm min-h-screen text-text-body font-sans transition-all pb-24 pt-12">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="auth-portal-grid">
        
        {/* Left hand branding pitch Column with elegant design and typography */}
        <div className="lg:col-span-5 space-y-6 lg:pr-4" id="portal-branding-column">
          <div className="space-y-4">
            <span className="inline-flex items-center space-x-1.5 border border-[#C9A961]/30 bg-[#0A1F44] px-3 py-1.5 rounded-full text-[10px] uppercase font-mono font-bold tracking-widest text-[#C9A961]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RiTECHS GATEWAY PORTAL</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-navy leading-tight tracking-tight">
              Academic Verification & Access
            </h2>
            <p className="text-sm font-light text-gray-500 leading-relaxed">
              Verify reviews assigned to physical papers, progress across digital training, and establish secure telemetry chats with paired international scholars.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-divider shadow-md h-64 group">
            <img
              src="https://images.unsplash.com/photo-1558021211-6d1403321394?auto=format&fit=crop&q=80&w=800"
              alt="Secured Books"
              className="w-full h-full object-cover filter brightness-[0.6] grayscale transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/95 via-[#0A1F44]/55 to-transparent p-6 flex flex-col justify-end">
              <div className="space-y-2">
                <p className="font-serif italic text-sm text-accent-gold/90 leading-relaxed">
                  "Collaborating to transcend traditional research limits using global vetting pipelines."
                </p>
                <p className="text-[10px] font-mono tracking-wider uppercase text-gray-400 font-bold">
                  RiTECHS EDITORIAL BOARD
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right hand interactive portal card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-divider/60 shadow-xl p-6 sm:p-10 space-y-8" id="portal-interactive-card">
          
          <AnimatePresence mode="wait">
            {hasSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto border-2 border-emerald-100 shadow-sm">
                  <CheckCircle2 className="w-12 h-12 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-3xl font-bold text-primary-navy tracking-tight">Authorization Complete</h3>
                  <p className="text-xs text-gray-500 font-light max-w-sm mx-auto">
                    Redirecting securely to your individual scholar workspace metrics. Please wait while we decrypt keys...
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="auth-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Login / Register Segment selectors - Optimized for premium touch targets and high contrast */}
                <div className="flex border-b border-divider/80" id="portal-tabs">
                  <button
                    onClick={() => { setActiveSegment('login'); setHasSuccess(false); }}
                    className={`flex-1 min-h-[48px] py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 text-center transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 ${
                      activeSegment === 'login' 
                        ? 'border-accent-gold text-primary-navy bg-[#C9A961]/5' 
                        : 'border-transparent text-gray-400 hover:text-primary-navy hover:bg-gray-50'
                    }`}
                  >
                    <LogIn className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Scholar Sign In</span>
                  </button>
                  <button
                    onClick={() => { setActiveSegment('register'); setHasSuccess(false); }}
                    className={`flex-1 min-h-[48px] py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 text-center transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 ${
                      activeSegment === 'register' 
                        ? 'border-accent-gold text-primary-navy bg-[#C9A961]/5' 
                        : 'border-transparent text-gray-400 hover:text-primary-navy hover:bg-gray-50'
                    }`}
                  >
                    <Award className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Create Account</span>
                  </button>
                </div>

                {/* Mentee / Mentor segment selectors (optimized visual container) */}
                <div className="bg-neutral-warm/80 p-1.5 rounded-xl flex border border-divider/40" id="portal-role-container">
                  <button
                    onClick={() => setUserRole('mentee')}
                    className={`flex-1 min-h-[44px] py-2 px-3 text-[11px] uppercase tracking-wider font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer ${
                      userRole === 'mentee' 
                        ? 'bg-white text-[#0A1F44] shadow-md border border-[#C9A961]/20 font-extrabold' 
                        : 'text-gray-500 hover:text-[#0A1F44]'
                    }`}
                  >
                    <span>👥 Research Mentee</span>
                  </button>
                  <button
                    onClick={() => setUserRole('mentor')}
                    className={`flex-1 min-h-[44px] py-2 px-3 text-[11px] uppercase tracking-wider font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer ${
                      userRole === 'mentor' 
                        ? 'bg-white text-[#0A1F44] shadow-md border border-[#C9A961]/20 font-extrabold' 
                        : 'text-gray-500 hover:text-[#0A1F44]'
                    }`}
                  >
                    <span>🛡️ Certified Mentor Board</span>
                  </button>
                </div>

                {/* Form viewport */}
                <form onSubmit={triggerAuthFlow} className="space-y-5 text-xs font-semibold">
                  
                  {activeSegment === 'register' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="expanded-registration-inputs">
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-1.5 font-bold uppercase tracking-wider text-[10px]">Scholar Profile Name</label>
                        <input
                          type="text"
                          required
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          placeholder="e.g., Dr. Jane Robinson"
                          className="w-full bg-neutral-warm/40 border-2 border-divider/60 hover:border-[#C9A961]/40 focus:border-accent-gold focus:bg-white rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1.5 font-bold uppercase tracking-wider text-[10px]">Affiliated University / Lab Agency</label>
                        <input
                          type="text"
                          required
                          value={organizationName}
                          onChange={(e) => setOrganizationName(e.target.value)}
                          placeholder="e.g., Univ. of Bologna, Italy"
                          className="w-full bg-neutral-warm/40 border-2 border-divider/60 hover:border-[#C9A961]/40 focus:border-accent-gold focus:bg-white rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1.5 font-bold uppercase tracking-wider text-[10px]">Academic Research Specialty</label>
                        <input
                          type="text"
                          required
                          value={specializationField}
                          onChange={(e) => setSpecializationField(e.target.value)}
                          placeholder="e.g., Anomaly Detection, AI-IoT"
                          className="w-full bg-neutral-warm/40 border-2 border-divider/60 hover:border-[#C9A961]/40 focus:border-accent-gold focus:bg-white rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={activeSegment === 'login' ? 'md:col-span-2' : ''}>
                      <label className="block text-gray-700 mb-1.5 font-bold uppercase tracking-wider text-[10px]">Institutional Email Address</label>
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="e.g., yourname@university.edu"
                        className="w-full bg-neutral-warm/40 border-2 border-divider/60 hover:border-[#C9A961]/40 focus:border-accent-gold focus:bg-white rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none transition-all duration-200"
                      />
                    </div>

                    <div className={activeSegment === 'login' ? 'md:col-span-2' : ''}>
                      <label className="block text-gray-700 mb-1.5 font-bold uppercase tracking-wider text-[10px]">Gateway Secured Passphrase</label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          value={passphrase}
                          onChange={(e) => setPassphrase(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-neutral-warm/40 border-2 border-divider/60 hover:border-[#C9A961]/40 focus:border-accent-gold focus:bg-white rounded-xl pl-11 pr-4 py-3 text-xs font-semibold focus:outline-none transition-all duration-200"
                        />
                        <KeyRound className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {userRole === 'mentor' && activeSegment === 'register' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-amber-50 rounded-xl border-2 border-amber-200/50 p-4 text-[11px] text-amber-950 leading-relaxed flex items-start space-x-3 shadow-xs"
                      id="mentor-verification-tip"
                    >
                      <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Reviewers Panel Verification:</strong> Registrations under the Mentor Tier trigger strict validation protocols. Our board representatives will independently inspect your telemetry publications before activating editorial keys.
                      </div>
                    </motion.div>
                  )}

                  {/* Submission and redirect parameters button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 1 }}
                      type="submit"
                      disabled={isProcessing}
                      className="w-full min-h-[48px] bg-[#0A1F44] hover:bg-gradient-to-r hover:from-[#0A1F44] hover:to-[#143d7c] text-[#FAFAF7] py-3.5 px-6 rounded-xl uppercase tracking-wider font-bold text-xs transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-[0_4px_14px_rgba(10,31,68,0.25)] hover:shadow-[0_4px_20px_rgba(201,169,97,0.3)] border border-accent-gold/20 hover:border-accent-gold/60"
                      id="auth-submit-btn"
                    >
                      {isProcessing ? (
                        <>
                          <span className="w-4 h-4 border-2 border-[#C9A961] border-t-transparent rounded-full animate-spin"></span>
                          <span>Securing Gateway Connection...</span>
                        </>
                      ) : (
                        <>
                          <span>Initialize Portal Authorization</span>
                          <ArrowRight className="w-4 h-4 text-[#C9A961]" />
                        </>
                      )}
                    </motion.button>
                  </div>

                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
