import React, { useState, useEffect } from 'react';
import { CONFERENCES, MEMBERS, SERVICES, PARTNERS, BLOG_POSTS } from '../data';
import { Conference, Member } from '../types';
import { MapPin, Calendar, Clock, ArrowRight, ShieldCheck, Play, Sparkles, Award, Globe, Users, ChevronRight, Check, BookOpen, GraduationCap, FileEdit, Presentation, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  onNavigate: (page: string, subPage?: string | null, extraId?: string | null) => void;
  onSelectMentor: (mentor: Member) => void;
}

export default function HomeView({ onNavigate, onSelectMentor }: HomeViewProps) {
  // Cinematic background images supporting premium uploaded files with premium Unsplash fallback resources
  const heroBgImagesConfig = [
    { primary: "/banner_1.png", secondary: "/banner%201.png", fallback: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200" },
    { primary: "/banner_2.png", secondary: "/banner%202.png", fallback: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" },
    { primary: "/banner_3.png", secondary: "/banner%203.png", fallback: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" },
    { primary: "/banner_4.png", secondary: "/banner%204.png", fallback: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200" },
    { primary: "/banner_5.png", secondary: "/banner%205.png", fallback: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, 'secondary' | 'failed'>>({});

  const getActiveImageSrc = (index: number) => {
    const config = heroBgImagesConfig[index];
    if (!config) return "";
    const failureType = imageErrors[config.primary];
    if (!failureType) return config.primary;
    if (failureType === 'secondary') return config.secondary;
    return config.fallback;
  };

  // Prefetching strategy: Pre-fetch the next slide to ensure zero loading latency
  useEffect(() => {
    const nextIndex = (currentSlideIndex + 1) % heroBgImagesConfig.length;
    const config = heroBgImagesConfig[nextIndex];
    if (!config) return;
    const img = new Image();
    img.src = getActiveImageSrc(nextIndex);
    img.onerror = () => {
      const currentFail = imageErrors[config.primary];
      if (!currentFail) {
        setImageErrors(prev => ({ ...prev, [config.primary]: 'secondary' }));
      } else if (currentFail === 'secondary') {
        setImageErrors(prev => ({ ...prev, [config.primary]: 'failed' }));
      }
    };
  }, [currentSlideIndex, imageErrors]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroBgImagesConfig.length);
    }, 6000); // 6 seconds per slide for a premium editorial showcase pace
    return () => clearInterval(timer);
  }, []);

  // Rotate upcoming conferences in Hero Banner
  const upcomingConfs = CONFERENCES.filter(c => c.type === 'upcoming');
  const [activeHeroConf, setActiveHeroConf] = useState(0);

  // Inner sub-tabs inside rotating Hero Banner for high-density international reviews
  const [heroSubTab, setHeroSubTab] = useState<'overview' | 'tracks' | 'dates' | 'speakers' | 'fees'>('overview');

  // Control active workflow video ('video1' or 'video2')
  const [activeWorkflowVideo, setActiveWorkflowVideo] = useState<'video1' | 'video2'>('video1');

  // Play button on MP4 explanatory workflow simulation state
  const [videoPlayState, setVideoPlayState] = useState(false);

  // Testimonials state
  const testimonials = [
    {
      text: "RiTECHS double-blind vetting modified my thesis's methodology parameters and passive sentence rhythms flawlessly. ICETCS review board recommended publication directly.",
      author: "Adnan Sami",
      title: "PhD Student, Universitat de Girona",
      location: "Spain"
    },
    {
      text: "Serving as General Chair has matched me with promising postgraduates across Bangladesh, Nigeria, and Iraq. The match concierge maps drafts precisely.",
      author: "Prof. Dr. Kim-Kwang Raymond Choo",
      title: "Advisory board, IEEE Fellow",
      location: "USA"
    }
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="space-y-16 pb-12 font-sans">
      
      {/* 1. Cinematic Hero Banner */}
      <section className="bg-[#0A1F44] text-[#FAFAF7] py-16 md:py-20 px-4 md:px-8 border-b-2 border-accent-gold/40 relative overflow-hidden" id="cinematic-hero">
        {/* Background sliding images using Framer Motion with Ken Burns effect */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentSlideIndex}
              src={getActiveImageSrc(currentSlideIndex)}
              onError={() => {
                const config = heroBgImagesConfig[currentSlideIndex];
                if (config) {
                  const currentFail = imageErrors[config.primary];
                  if (!currentFail) {
                    setImageErrors(prev => ({ ...prev, [config.primary]: 'secondary' }));
                  } else if (currentFail === 'secondary') {
                    setImageErrors(prev => ({ ...prev, [config.primary]: 'failed' }));
                  }
                }
              }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 0.55, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ 
                opacity: { duration: 1.4, ease: "easeInOut" },
                scale: { duration: 6.2, ease: "easeOut" }
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          {/* Transparent premium overlay gradients to ensure excellent typography contrast while showcasing the majestic background images */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44] via-[#0A1F44]/85 to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44] via-transparent to-[#0A1F44]/40 z-0" />
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>
        </div>
        
        {/* Navigation dots specifically targeting this sliding elements region */}
        <div className="absolute bottom-6 left-8 flex space-x-2.5 z-20 pointer-events-auto">
          {heroBgImagesConfig.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlideIndex === idx 
                  ? 'bg-[#C9A961] w-6 ring-2 ring-[#C9A961]/30' 
                  : 'bg-white/40 hover:bg-white/85'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Intro */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                  type: "spring",
                  damping: 25,
                  stiffness: 120
                }
              }
            }}
            className="lg:col-span-5 space-y-6"
          >
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="inline-flex items-center space-x-1 border border-accent-gold/30 bg-accent-gold/10 px-3 py-1 rounded text-[10px] uppercase font-mono font-semibold tracking-widest text-[#C9A961]"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#C9A961]" />
              <span>International Academic Hub</span>
            </motion.span>

            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
              className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Where Research <br />Meets Global <br /><span className="text-[#C9A961] underline decoration-accent-gold/40">Recognition</span>
            </motion.h1>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-sm font-light text-gray-300 leading-relaxed max-w-sm"
            >
              Supporting academic scholars, PhD candidates, and technologists through dual-blind peer mentoring, certified training, and high-impact conference indexing.
            </motion.p>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
              className="pt-2 flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(201, 169, 97, 0.4)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('mentorship')}
                className="bg-[#C9A961] hover:bg-[#bda056] text-[#0A1F44] font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded transition shadow-lg cursor-pointer"
              >
                Find Qualified Mentors
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, bg: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('conferences')}
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded transition cursor-pointer"
              >
                Explore Conferences
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero Right: Rotating Conference announcements Stacked card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 100, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute right-0 top-0 -mr-6 -mt-6 w-32 h-32 bg-[#C9A961]/10 rounded-full blur-2xl"></div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 shadow-xl space-y-4 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 bg-[#C9A961] text-[#0A1F44] font-mono font-bold text-[8px] uppercase tracking-widest px-3 py-1 rounded-bl">
                Call for Papers Active
              </div>

              {/* Stacked Conf header switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex space-x-2">
                  {upcomingConfs.map((c, idx) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveHeroConf(idx);
                        // Default to overview tab on conference swap for stable visual layouts
                        setHeroSubTab('overview');
                      }}
                      className={`text-[10px] font-semibold py-1 px-3 rounded font-mono transition-all duration-300 cursor-pointer ${
                        activeHeroConf === idx 
                          ? 'bg-[#C9A961] text-[#0A1F44] shadow font-bold' 
                          : 'text-gray-400 hover:text-white bg-white/5'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
                <span className="text-[9px] text-gray-400 font-mono font-bold uppercase tracking-wider hidden sm:inline-block">Scopus Springer Indexed</span>
              </div>

              {/* Advanced Interactive Meta-Tabs Selector */}
              <div className="flex flex-wrap border-b border-white/5 pb-2 mb-2 gap-1 sm:gap-2">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'tracks', label: 'Tracks' },
                  { id: 'dates', label: 'Milestones' },
                  { id: 'speakers', label: 'Keynotes' },
                  { id: 'fees', label: 'Fees' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setHeroSubTab(tab.id as any)}
                    className={`px-2 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded transition-all duration-200 cursor-pointer ${
                      heroSubTab === tab.id
                        ? 'bg-[#C9A961] text-[#0A1F44] font-extrabold shadow-sm'
                        : 'text-gray-400 hover:text-white hover:bg-white/10 bg-white/5'
                    }`}
                  >
                    {tab.id === 'overview' && '📋 '}
                    {tab.id === 'tracks' && '⚡ '}
                    {tab.id === 'dates' && '📅 '}
                    {tab.id === 'speakers' && '👑 '}
                    {tab.id === 'fees' && '💶 '}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Selected Conf Metadata (Animated switches) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeHeroConf}-${heroSubTab}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="space-y-4 text-left"
                >
                  {/* Sub-tabs switch view rendering */}
                  <div className="min-h-[224px] flex flex-col justify-between">
                    {heroSubTab === 'overview' && (
                      <div className="space-y-3 animate-fade-in text-xs">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-snug">
                          {upcomingConfs[activeHeroConf].full_name}
                        </h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-light">
                          Submit high-quality research drafts to the {upcomingConfs[activeHeroConf].name} hybrid assembly. Accepted papers undergo dual-blind peer scores before publication in Springer or digital indexes.
                        </p>
                        {/* Chair list */}
                        <div className="border-t border-b border-white/5 py-2.5 mt-1">
                          <p className="text-[#C9A961] uppercase font-mono font-bold text-[8px] tracking-widest leading-none mb-1.5">General Chairs</p>
                          <p className="font-semibold text-gray-200">{upcomingConfs[activeHeroConf].general_chairs.join(" · ")}</p>
                        </div>
                        {/* Metadata drawer */}
                        <div className="grid grid-cols-2 gap-4 font-mono mt-1">
                          <div className="flex items-center space-x-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#C9A961] shrink-0" />
                            <div>
                              <p className="text-[8px] text-gray-500 font-bold leading-none">Assembly Dates</p>
                              <p className="font-medium text-gray-300 mt-0.5 text-[10px]">{upcomingConfs[activeHeroConf].dates.display}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#C9A961] shrink-0" />
                            <div>
                              <p className="text-[8px] text-gray-500 font-bold leading-none">Geographical Spot</p>
                              <p className="font-medium text-gray-300 mt-0.5 text-[10px] truncate max-w-[140px]">{upcomingConfs[activeHeroConf].location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {heroSubTab === 'tracks' && (
                      <div className="space-y-2.5 animate-fade-in">
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                          <span className="text-[9px] text-[#C9A961] font-mono uppercase font-bold">Primary Scientific Tracks</span>
                          <span className="text-[8px] text-gray-400 font-mono">Dual-Blind Vetted</span>
                        </div>
                        <div className="max-h-[180px] overflow-y-auto space-y-1.5 pr-1 text-left scrollbar-thin">
                          {upcomingConfs[activeHeroConf].id === 'ICETCS2026' ? (
                            [
                              "Track 1: Cyber Security & Network Space Challenges & Solutions",
                              "Track 2: Cyber Security Challenges for Mobile & Autonomous Vehicles",
                              "Track 3: Cloud Security, Architecture and its Future",
                              "Track 4: Blockchain Architecture & Distributed Ledgers",
                              "Track 5: Securing the Connected World: IoT Security",
                              "Track 6: Cybersecurity for Space Systems & Infrastructure",
                              "Track 7: CyberVehiCare: Mobile Health & V2X Monitoring",
                              "Track 8: Hardware Security, Trojans & Supply-Chain Trust Verification"
                            ].map((tr, tIdx) => (
                              <div key={tIdx} className="p-1.5 bg-white/5 rounded hover:bg-white/10 transition-colors text-[10px] text-gray-300 font-sans flex items-start space-x-1.5">
                                <span className="bg-[#C9A961]/20 text-[#C9A961] text-[8px] font-mono font-bold px-1 py-0.5 rounded shrink-0">T0{tIdx+1}</span>
                                <span className="leading-tight">{tr}</span>
                              </div>
                            ))
                          ) : upcomingConfs[activeHeroConf].id === 'AIoT-RSE2026' ? (
                            [
                              "Track 1: Smart Photovoltaic Array Grid Control Systems",
                              "Track 2: Deep Neural Networks for Carbon Capture",
                              "Track 3: Edge AI for Battery Management Systems",
                              "Track 4: Sovereign Biomass Generation Protocols"
                            ].map((tr, tIdx) => (
                              <div key={tIdx} className="p-1.5 bg-white/5 rounded hover:bg-white/10 transition-colors text-[10px] text-gray-300 font-sans flex items-start space-x-1.5">
                                <span className="bg-[#C9A961]/20 text-[#C9A961] text-[8px] font-mono font-bold px-1 py-0.5 rounded shrink-0">T0{tIdx+1}</span>
                                <span className="leading-tight">{tr}</span>
                              </div>
                            ))
                          ) : (
                            [
                              "Track 1: Dynamic Resource Scheduling in 5G Networks",
                              "Track 2: Architectures for Internet of Everything (IoE)",
                              "Track 3: Smart Agriculture Sensors & Extenders",
                              "Track 4: Data Management in Distributed Ledger Systems"
                            ].map((tr, tIdx) => (
                              <div key={tIdx} className="p-1.5 bg-white/5 rounded hover:bg-white/10 transition-colors text-[10px] text-gray-300 font-sans flex items-start space-x-1.5">
                                <span className="bg-[#C9A961]/20 text-[#C9A961] text-[8px] font-mono font-bold px-1 py-0.5 rounded shrink-0">T0{tIdx+1}</span>
                                <span className="leading-tight">{tr}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {heroSubTab === 'dates' && (
                      <div className="space-y-2.5 animate-fade-in text-xs">
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                          <span className="text-[9px] text-[#C9A961] font-mono uppercase font-bold">Important Dates & Milestones</span>
                          <span className="text-[8px] text-gray-400 font-mono">Strict 23:59 GMT Submission</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                          {upcomingConfs[activeHeroConf].deadlines.map((dl, idx) => (
                            <div key={idx} className="p-1.5 bg-white/5 rounded border border-white/5 flex justify-between items-center text-[10px] font-mono">
                              <span className="text-gray-400 font-sans font-medium">{dl.label}:</span>
                              <span className="text-[#C9A961] font-bold">{dl.date}</span>
                            </div>
                          ))}
                        </div>
                        <div className="p-2 bg-[#C9A961]/10 rounded border border-[#C9A961]/20 text-[9px] text-gray-300 leading-relaxed font-sans">
                          <strong>Sovereign Vetting Timeline:</strong> Double-blind papers status returned fully inside 30 review days with direct Springer format compliance suggestions.
                        </div>
                      </div>
                    )}

                    {heroSubTab === 'speakers' && (
                      <div className="space-y-2.5 animate-fade-in text-xs">
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                          <span className="text-[9px] text-[#C9A961] font-mono uppercase font-bold">Keynote Speakers & Advisors</span>
                          <span className="text-[8px] text-gray-400 font-mono">Confirmed International Panelist</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[180px] overflow-y-auto pr-1">
                          {upcomingConfs[activeHeroConf].id === 'ICETCS2026' ? (
                            [
                              { name: "Emma Fadlon", org: "Innovate UK CyberASAP" },
                              { name: "Giulio Ferro", org: "University of Genoa, Italy" },
                              { name: "Hendrik Wöhrle", org: "Duisburg-Essen, Germany" },
                              { name: "Imed Ben Dhaou", org: "University of Turku, Finland" },
                              { name: "Luigi Coppolino", org: "University Parthenope, Naples" },
                              { name: "Mario Marchese", org: "University of Genoa, Italy" },
                              { name: "Matteo Repetto", org: "CNR / IMATI" },
                              { name: "Paul Wooderson", org: "HORIBA MIRA Cybersecurity" }
                            ].map((sp, idx) => (
                              <div key={idx} className="p-1.5 bg-white/5 rounded border border-white/5 text-[10px] flex flex-col justify-start text-left">
                                <span className="font-bold text-white leading-tight font-serif">{sp.name}</span>
                                <span className="text-[9px] text-gray-450 font-mono mt-0.5 leading-none">{sp.org}</span>
                              </div>
                            ))
                          ) : (
                            upcomingConfs[activeHeroConf].keynote_speakers.map((sp, idx) => (
                              <div key={idx} className="p-1.5 bg-white/5 rounded border border-white/5 text-[10px] flex flex-col justify-start text-left">
                                <span className="font-bold text-white leading-tight font-serif">{sp}</span>
                                <span className="text-[9px] text-gray-450 font-mono mt-0.5 leading-none">Keynote Presenter</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {heroSubTab === 'fees' && (
                      <div className="space-y-2.5 animate-fade-in text-xs text-left">
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                          <span className="text-[9px] text-[#C9A961] font-mono uppercase font-bold">Standard Registration Pricing</span>
                          <span className="text-[8px] text-gray-400 font-mono">Lecture printing & Lunch pass</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <div className="p-2.5 bg-[#C9A961]/5 rounded-lg border border-[#C9A961]/20">
                            <span className="text-[8px] font-mono text-[#C9A961] block leading-none">LOCAL ATTENDEE</span>
                            <strong className="text-base text-white block mt-1 font-serif">EUR 400</strong>
                            <p className="text-[8px] text-gray-400 mt-1 leading-tight">Covers conference proceedings and catering bills.</p>
                          </div>

                          <div className="p-2.5 bg-[#C9A961]/5 rounded-lg border border-[#C9A961]/20">
                            <span className="text-[8px] font-mono text-[#C9A961] block leading-none">OVERSEAS DELEGATE</span>
                            <strong className="text-base text-white block mt-1 font-serif">EUR 400</strong>
                            <p className="text-[8px] text-gray-400 mt-1 leading-tight">Global online portal access and electronic volume.</p>
                          </div>
                        </div>

                        <div className="p-2 bg-white/5 rounded text-[9px] text-gray-450 leading-relaxed font-sans">
                          * Early bird registrations receive direct access to LaTeX style toolchains and template diagnostics webinar programs handled by the chief publication editors.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Row */}
                  <div className="pt-2 flex justify-between items-center bg-white/5 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-3.5 mt-2">
                    <button
                      onClick={() => onNavigate('conferences', null, upcomingConfs[activeHeroConf].id)}
                      className="text-[#C9A961] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 cursor-pointer group"
                    >
                      <span className="group-hover:underline">Read Editorial Scope & Submit</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[9px] text-gray-400 font-mono italic">Springer Engineering Series</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. How Does It Work Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="workflow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Dual video Segmented Switcher & Frame */}
          <div className="space-y-4">
            <div className="flex bg-[#0A1F44]/5 p-1 rounded-xl border border-divider/60 text-[11px] font-semibold font-mono">
              <button 
                type="button" 
                onClick={() => {
                  setActiveWorkflowVideo('video1');
                  setVideoPlayState(false);
                }}
                className={`flex-1 py-2 rounded-lg text-center transition-all duration-300 cursor-pointer ${
                  activeWorkflowVideo === 'video1' 
                    ? 'bg-[#0A1F44] text-white font-bold shadow-sm' 
                    : 'text-gray-500 hover:text-[#0A1F44]'
                }`}
              >
                📹 Video 1: Editorial Workflow Walkthrough
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setActiveWorkflowVideo('video2');
                  setVideoPlayState(false);
                }}
                className={`flex-1 py-2 rounded-lg text-center transition-all duration-300 cursor-pointer ${
                  activeWorkflowVideo === 'video2' 
                    ? 'bg-[#0A1F44] text-white font-bold shadow-sm' 
                    : 'text-gray-500 hover:text-[#0A1F44]'
                }`}
              >
                🎓 Video 2: Mentorship Process Simulator
              </button>
            </div>

            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden border shadow-lg group bg-black h-80">
              {videoPlayState ? (
                <div className="relative w-full h-full bg-black flex flex-col justify-between animate-fade-in">
                  <video
                    autoPlay
                    controls
                    className="w-full h-full object-contain"
                    src={activeWorkflowVideo === 'video1' ? "/video%201.mp4" : "/video%202.mp4"}
                    playsInline
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      console.log("Local mp4 failed, playing premium developer overlay");
                      e.currentTarget.src = activeWorkflowVideo === 'video1'
                        ? "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-programmer-typing-on-a-keyboard-40546-large.mp4"
                        : "https://assets.mixkit.co/videos/preview/mixkit-man-working-hard-in-the-office-42323-large.mp4";
                    }}
                  />
                  <button
                    onClick={() => setVideoPlayState(false)}
                    className="absolute top-3 right-3 bg-black/60 hover:bg-black/85 text-white p-1.5 rounded-full backdrop-blur-xs transition z-20 cursor-pointer shadow-md"
                    title="Close Video"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={
                      activeWorkflowVideo === 'video1'
                        ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                        : "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={activeWorkflowVideo === 'video1' ? "Editorial Workflow" : "Process Simulator"}
                    className="w-full h-80 object-cover filter brightness-90 transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                    <button
                      onClick={() => setVideoPlayState(true)}
                      className="w-16 h-16 rounded-full bg-accent-gold hover:bg-[#bda056] text-primary-navy shadow-xl flex items-center justify-center hover:scale-110 transition cursor-pointer"
                      title="Play presentation video"
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Workflow Narrative */}
          <div className="space-y-5">
            <span className="inline-flex self-start text-[10px] uppercase font-mono tracking-widest bg-accent-gold/10 text-primary-navy px-2.5 py-1 rounded font-bold">
              Procedural Blueprint
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0A1F44]">
              How the Mentorship Ecosystem Operates
            </h2>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              We guide students, university professors, and PhD specialists from initially unstructured manuscript drafts to bulletproof peer certifications.
            </p>

            <div className="space-y-4 mt-2">
              {[
                { title: "Vetting & Structural Diagnosis", desc: "Dual-blind peer review flags grammatical flaws, structural gaps, or telemetry errors before general assembly." },
                { title: "Targeted Scholar Mapping", desc: "Our concierge maps your manuscript coordinates with leading IEEE/Springer board experts based on research tags." },
                { title: "Defending & Certifying", desc: "Coauthors coordinate mock defenses, polish drafts, and unlock double-signed certifications for high-impact journals." }
              ].map((step, sIdx) => (
                <div key={sIdx} className="group/step p-4 bg-white border hover:border-[#C9A961]/40 rounded-xl transition-all duration-300 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-[#0A1F44] text-[#C9A961] font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-sm group-hover/step:bg-[#C9A961] group-hover/step:text-[#0A1F44] transition-colors duration-300">
                    0{sIdx + 1}
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="font-serif text-sm font-bold text-primary-navy group-hover/step:text-accent-gold transition-colors duration-300">{step.title}</h4>
                    <p className="text-[11px] text-gray-500 font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Global Impact Stats Counter (Glassmorphic Bento Card Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="impact-stats">
        <div className="bg-[#0A1F44] border-2 border-[#C9A961]/40 rounded-2xl py-10 px-6 sm:px-8 shadow-xl relative overflow-hidden text-neutral-warm">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            <div className="space-y-1 group">
              <strong className="font-serif text-3.5xl sm:text-4xl font-bold block text-white tracking-tight group-hover:scale-105 transition-transform duration-300">170+</strong>
              <div className="w-8 h-0.5 bg-[#C9A961]/50 mx-auto rounded-full my-1.5" />
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#C9A961] font-bold">Registered Scholars</span>
            </div>
            <div className="space-y-1 group">
              <strong className="font-serif text-3.5xl sm:text-4xl font-bold block text-white tracking-tight group-hover:scale-105 transition-transform duration-300">50+</strong>
              <div className="w-8 h-0.5 bg-[#C9A961]/50 mx-auto rounded-full my-1.5" />
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#C9A961] font-bold">Verified Mentors</span>
            </div>
            <div className="space-y-1 group">
              <strong className="font-serif text-3.5xl sm:text-4xl font-bold block text-white tracking-tight group-hover:scale-105 transition-transform duration-300">25+</strong>
              <div className="w-8 h-0.5 bg-[#C9A961]/50 mx-auto rounded-full my-1.5" />
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#C9A961] font-bold">Countries Represented</span>
            </div>
            <div className="space-y-1 group">
              <strong className="font-serif text-3.5xl sm:text-4xl font-bold block text-white tracking-tight group-hover:scale-105 transition-transform duration-300">5</strong>
              <div className="w-8 h-0.5 bg-[#C9A961]/50 mx-auto rounded-full my-1.5" />
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#C9A961] font-bold">Conferences Hosted</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Mentors Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="mentor-spotlight">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 pb-4 border-b border-divider">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1F44]">Distinguished Scholar Spotlight</h2>
            <p className="text-xs text-gray-400 font-light mt-1">Confer with world-class faculty directors guiding advanced telemetry fields.</p>
          </div>
          <button
            onClick={() => onNavigate('mentorship', 'directory')}
            className="text-[#1a4a8a] text-xs font-semibold uppercase tracking-wider flex items-center space-x-1 hover:text-accent-gold"
          >
            <span>Search Full Directory</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEMBERS.filter(m => m.featured).slice(0, 3).map((mentor, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 80 }}
              whileHover={{ 
                y: -8, 
                borderColor: "rgba(201, 169, 97, 0.7)", 
                boxShadow: "0 15px 35px -5px rgba(201, 169, 97, 0.15), 0 10px 20px -6px rgba(201, 169, 97, 0.08)"
              }}
              key={mentor.id}
              onClick={() => onSelectMentor(mentor)}
              className="bg-white rounded-lg border-2 border-transparent hover:border-accent-gold/40 p-6 flex flex-col justify-between group cursor-pointer relative shadow-xs transition-colors duration-300"
            >
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-navy text-white font-serif font-bold flex items-center justify-center group-hover:bg-[#C9A961] group-hover:text-primary-navy transition-colors duration-300">
                    {mentor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-primary-navy leading-none group-hover:text-accent-gold transition-colors duration-300">{mentor.name}</h3>
                    <p className="text-[10px] text-gray-400 font-mono uppercase mt-1 leading-none">Council Mentor</p>
                  </div>
                </div>

                <div className="space-y-1 font-sans text-xs text-gray-500">
                  <p className="font-semibold text-gray-700 leading-tight">Affiliation: {mentor.affiliation}</p>
                  <p className="font-light text-[11px] flex items-center mt-1">
                    <MapPin className="w-3.5 h-3.5 text-accent-gold mr-1" />
                    <span>Location: {mentor.location}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-divider flex flex-wrap gap-1">
                {mentor.specializations.slice(0, 3).map((spec, i) => (
                  <span key={i} className="bg-neutral-warm/60 px-2 py-0.5 rounded text-[9px] text-[#1a4a8a]" id={`pop-spec-${mentor.id}-${i}`}>
                    {spec}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Main Focus (6 service tiles to showcase exact specialized Lucide icons) */}
      <section className="bg-neutral-warm/40 border-t border-b border-divider py-16" id="our-focus">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-navy">Our Specialized Technical Focus</h2>
            <p className="text-xs text-gray-500 font-light font-sans">Connecting tech, research methodology, and international peer indexing.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((serv, idx) => {
              // Map the icon dynamically based on its definition in data.ts
              const getServiceIconComponent = (key: string) => {
                switch (key) {
                  case 'Users': return <Users className="w-5 h-5" />;
                  case 'Presentation': return <Presentation className="w-5 h-5" />;
                  case 'BookOpen': return <BookOpen className="w-5 h-5" />;
                  case 'FileEdit': return <FileEdit className="w-5 h-5" />;
                  case 'Calendar': return <Calendar className="w-5 h-5" />;
                  case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
                  default: return <BookOpen className="w-5 h-5" />;
                }
              };

              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.08, type: "spring", stiffness: 90 }}
                  whileHover={{ 
                    y: -8, 
                    borderColor: "rgba(201, 169, 97, 0.45)", 
                    boxShadow: "0 15px 35px -5px rgba(201, 169, 97, 0.15), 0 10px 20px -6px rgba(201, 169, 97, 0.08)"
                  }}
                  key={idx}
                  onClick={() => {
                    if (serv.name === 'e-Learning') onNavigate('services', 'elearning');
                    else if (serv.name === 'Academic Modification') onNavigate('services', 'modification');
                    else onNavigate('services');
                  }}
                  className="bg-white p-6 rounded-lg border-2 border-transparent hover:border-accent-gold/40 cursor-pointer text-left flex flex-col justify-between group h-56 shadow-xs transition-colors duration-300"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded bg-primary-navy text-accent-gold flex items-center justify-center group-hover:bg-accent-gold group-hover:text-primary-navy transition-colors duration-300">
                      {getServiceIconComponent(serv.icon)}
                    </div>
                    <h3 className="font-serif text-base font-bold text-primary-navy leading-none">{serv.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">{serv.description}</p>
                  </div>

                  <span className="text-[11px] font-semibold text-[#1a4a8a] uppercase tracking-wide flex items-center pt-2 group-hover:text-accent-gold transition-colors duration-300">
                    <span>Explore program catalog</span>
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Sponsoring Partners Logos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" id="sponsoring-institutions">
        <div className="space-y-2 pb-4 border-b border-divider mb-8">
          <h3 className="font-serif font-bold text-xl text-primary-navy">Trusted Collaborating Partners</h3>
          <p className="text-xs text-gray-400 font-light">E-learning structures and peer reviews validated inside distinguished regional universities.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 opacity-80">
          {PARTNERS.map((partner, idx) => (
            <a
              key={idx}
              href={partner.url}
              target="_blank"
              rel="noreferrer"
              className="bg-white border text-gray-600 font-serif font-semibold text-xs py-3 px-5 rounded hover:border-[#1a4a8a] hover:text-[#1a4a8a] transition leading-none shadow-sm"
              id={`partner-logo-${idx}`}
            >
              {partner.name}
            </a>
          ))}
        </div>
      </section>

      {/* 7. Magazine Blogs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="blogs-grid">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 pb-4 border-b border-divider">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1F44]">The Editorial Blogs & News</h2>
            <p className="text-xs text-gray-400 font-light mt-1">Acquire insight into advanced datasets and paper review rounds guides.</p>
          </div>
          <button 
            onClick={() => onNavigate('services')} 
            className="text-primary-navy text-xs font-semibold uppercase tracking-wider flex items-center space-x-1 hover:text-accent-gold"
          >
            <span>Explore Syllabus Programs</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post, idx) => (
            <div key={idx} className="bg-white rounded-lg border overflow-hidden flex flex-col justify-between hover:shadow-xs transition">
              <div>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-40 object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-300"
                />
                <div className="p-4 space-y-2 text-left">
                  <span className="text-[10px] font-mono text-gray-400">{post.date}</span>
                  <h4 className="font-serif text-sm font-bold text-[#0A1F44] tracking-tight leading-snug line-clamp-2 hover:text-[#C9A961] transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              
              <div className="p-4 pt-0 text-left">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#1a4a8a] uppercase tracking-wider flex items-center hover:text-accent-gold"
                >
                  <span>Read Post</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Testimonials Section */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6" id="testimonials">
        <h3 className="font-serif italic text-2xl text-primary-navy">"Unbounded Peer Validation Outcomes"</h3>
        
        <div className="bg-white rounded-lg border p-6 sm:p-8 shadow-sm space-y-4 animate-fade-in">
          <p className="font-serif text-sm text-gray-700 leading-relaxed max-w-2xl mx-auto">
            "{testimonials[activeTestimonial].text}"
          </p>
          <div>
            <strong className="text-xs font-bold text-primary-navy">{testimonials[activeTestimonial].author}</strong>
            <p className="text-[10px] text-[#C9A961] uppercase tracking-wide font-mono mt-0.5">
              {testimonials[activeTestimonial].title} ({testimonials[activeTestimonial].location})
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestimonial(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                activeTestimonial === i ? 'bg-[#C9A961]' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title={`View testimonial ${i+1}`}
            ></button>
          ))}
        </div>
      </section>

    </div>
  );
}
