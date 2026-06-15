/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutPage from './components/AboutPage';
import ConferenceDetail from './components/ConferenceDetail';
import MentorshipHub from './components/MentorshipHub';
import ServicesHub from './components/ServicesHub';
import Dashboard from './components/Dashboard';
import ContactPage from './components/ContactPage';
import AuthPage from './components/AuthPage';
import AICopilotDock from './components/AICopilotDock';
import PublicationsPage from './components/PublicationsPage';
import EventsPage from './components/EventsPage';
import ArchivesPage from './components/ArchivesPage';
import { CONFERENCES } from './data';
import { Conference, Member } from './types';
import { Calendar, MapPin, ArrowRight, ShieldCheck, Award, BookOpen, Eye, X, ExternalLink, Columns } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const pageTransitionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: {
      duration: 0.22,
      ease: "easeInOut"
    }
  }
};

export default function App() {
  const [page, setPage] = useState<string>('home');
  const [subPage, setSubPage] = useState<string | null>(null);
  const [selectedConferenceId, setSelectedConferenceId] = useState<string | null>(null);
  const [selectedMentorForDrawer, setSelectedMentorForDrawer] = useState<Member | null>(null);

  // Conference Filter parameters
  const [confFilter, setConfFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [quickViewConference, setQuickViewConference] = useState<Conference | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (targetPage: string, targetSub: string | null = null, extraId: string | null = null) => {
    setPage(targetPage);
    setSubPage(targetSub);
    if (extraId) {
      setSelectedConferenceId(extraId);
    } else {
      setSelectedConferenceId(null);
    }
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterConferences = (filter: 'all' | 'upcoming' | 'past') => {
    setIsFiltering(true);
    setConfFilter(filter);
    setTimeout(() => {
      setIsFiltering(false);
    }, 450);
  };

  const handleCategorySelect = (category: string | null) => {
    setIsFiltering(true);
    setSelectedCategory(category);
    setTimeout(() => {
      setIsFiltering(false);
      if (gridRef.current) {
        gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  };

  const filteredConferences = CONFERENCES.filter(c => {
    const matchesFilter = confFilter === 'all' || c.type === confFilter;
    const matchesCategory = !selectedCategory || c.category === selectedCategory;
    return matchesFilter && matchesCategory;
  });

  const getDaysRemaining = (deadlineDate: string) => {
    // Current local baseline date of our reference set
    const baseDate = new Date("2026-06-15T00:00:00");
    const targetDate = new Date(deadlineDate + "T23:59:59");
    const diffTime = targetDate.getTime() - baseDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-warm text-text-body font-sans selection:bg-accent-gold/30 selection:text-primary-navy">
      
      {/* Header component */}
      <Header 
        currentPage={page} 
        onNavigate={handleNavigate} 
      />

      {/* Main Content Hub Router */}
      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div
              key="home"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransitionVariants}
            >
              <HomeView 
                onNavigate={handleNavigate}
                onSelectMentor={(mentor) => {
                  setSelectedMentorForDrawer(mentor);
                  handleNavigate('mentorship', 'directory');
                }} 
              />
            </motion.div>
          )}

          {page === 'about' && (
            <motion.div
              key={`about-${subPage || 'default'}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransitionVariants}
            >
              <AboutPage 
                initialSub={subPage} 
              />
            </motion.div>
          )}

          {page === 'conferences' && (
            <motion.div
              key={`conferences-${selectedConferenceId || 'list'}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransitionVariants}
            >
              {selectedConferenceId ? (
                <ConferenceDetail 
                  conference={CONFERENCES.find(c => c.id === selectedConferenceId)!}
                  onBack={() => {
                    setSelectedConferenceId(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ) : (
                <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
                  
                  {/* Conferences Hub Header */}
                  <div className="text-center max-w-2xl mx-auto space-y-4">
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A961] bg-primary-navy px-2.5 py-1 rounded font-bold">
                        International Forums
                      </span>
                      <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-primary-navy">
                        Academic Forums & Conference proceedings
                      </h1>
                      <p className="text-sm text-gray-500 font-light max-w-lg mx-auto">
                        Explore peer-vetted research, submission pathways, and publications indexed in leading scientific databases.
                      </p>
                    </div>

                    <div className="w-16 h-0.5 bg-[#C9A961]/40 mx-auto rounded-full" />

                    {/* Highly responsive layout-adaptive Filters Block */}
                    <div className="space-y-4 bg-white/50 backdrop-blur-xs p-4 rounded-xl border border-divider/40">
                      
                      {/* Timeline Sub-pills */}
                      <div className="flex flex-col space-y-2">
                        <span className="text-[9px] uppercase font-mono tracking-widest text-gray-400 font-bold">Timeline Filters</span>
                        <div id="conference-filter-tabs" className="flex flex-wrap justify-center gap-1.5 text-xs font-semibold">
                          <button
                            onClick={() => handleFilterConferences('all')}
                            className={`px-4.5 py-2 rounded-lg transition-all duration-200 cursor-pointer text-xs ${
                              confFilter === 'all' ? 'bg-[#0A1F44] text-[#FAFAF7] shadow-sm font-bold' : 'bg-white border text-gray-600 hover:text-primary-navy hover:border-[#C9A961]/40'
                            }`}
                          >
                            All Sessions ({CONFERENCES.length})
                          </button>
                          <button
                            onClick={() => handleFilterConferences('upcoming')}
                            className={`px-4.5 py-2 rounded-lg transition-all duration-200 cursor-pointer text-xs ${
                              confFilter === 'upcoming' ? 'bg-[#0A1F44] text-[#FAFAF7] shadow-sm font-bold' : 'bg-white border text-gray-600 hover:text-primary-navy hover:border-[#C9A961]/40'
                            }`}
                          >
                            Call for Papers ({CONFERENCES.filter(c => c.type === 'upcoming').length})
                          </button>
                          <button
                            onClick={() => handleFilterConferences('past')}
                            className={`px-4.5 py-2 rounded-lg transition-all duration-200 cursor-pointer text-xs ${
                              confFilter === 'past' ? 'bg-[#0A1F44] text-[#FAFAF7] shadow-sm font-bold' : 'bg-white border text-gray-600 hover:text-primary-navy hover:border-[#C9A961]/40'
                            }`}
                          >
                            Proceedings Volumes ({CONFERENCES.filter(c => c.type === 'past').length})
                          </button>
                        </div>
                      </div>

                      {/* Interactive Category filter badges */}
                      <div className="flex flex-col space-y-2 pt-2 border-t border-divider/40">
                        <span className="text-[9px] uppercase font-mono tracking-widest text-gray-400 font-bold">Research Field Filters</span>
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {[
                            { id: null, label: 'All Fields' },
                            { id: 'Cybersecurity', label: 'Cybersecurity' },
                            { id: 'AI-IoT', label: 'AI-IoT' },
                            { id: 'Renewable Energy', label: 'Renewable Energy' }
                          ].map((cat) => (
                            <button
                              key={cat.label}
                              onClick={() => handleCategorySelect(cat.id)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer flex items-center space-x-1 border ${
                                selectedCategory === cat.id
                                  ? 'bg-[#C9A961] text-[#0A1F44] border-[#C9A961] font-bold shadow-xs'
                                  : 'bg-white border-gray-200 text-gray-500 hover:text-primary-navy hover:border-[#C9A961]/40'
                              }`}
                            >
                              {cat.id === 'Cybersecurity' && '🔒 '}
                              {cat.id === 'AI-IoT' && '🤖 '}
                              {cat.id === 'Renewable Energy' && '🌱 '}
                              {cat.id === null && '🌐 '}
                              <span>{cat.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grid container with custom stagger animation */}
                  <motion.div 
                    ref={gridRef}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.05
                        }
                      }
                    }}
                    initial="hidden"
                    animate="visible"
                    key={`grid-${confFilter}-${selectedCategory || 'all'}`}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                  >
                    <AnimatePresence mode="popLayout">
                      {isFiltering ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.25 }}
                            key={`conf-skeleton-${idx}`}
                            className="bg-white rounded-lg border border-divider p-6 flex flex-col justify-between h-72 animate-pulse space-y-4 shadow-xs"
                          >
                            <div className="flex justify-between items-start">
                              <div className="w-1/3 h-3 bg-neutral-warm rounded"></div>
                              <div className="w-1/6 h-3.5 bg-neutral-warm rounded"></div>
                            </div>
                            <div className="space-y-2 mb-4 flex-grow pt-2">
                              <div className="w-5/6 h-5 bg-neutral-warm rounded"></div>
                              <div className="w-4/5 h-3 bg-neutral-warm/60 rounded"></div>
                              <div className="w-2/3 h-3 bg-neutral-warm/60 rounded"></div>
                            </div>
                            <div className="space-y-2 pt-3 border-t border-divider">
                              <div className="flex items-center space-x-2">
                                <div className="w-3.5 h-3.5 bg-[#C9A961]/10 rounded-full"></div>
                                <div className="w-1/2 h-3 bg-neutral-warm rounded"></div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-3.5 h-3.5 bg-[#C9A961]/10 rounded-full"></div>
                                <div className="w-2/3 h-3 bg-neutral-warm rounded"></div>
                              </div>
                            </div>
                            <div className="pt-4 flex justify-between items-center">
                              <div className="w-2/5 h-4 bg-neutral-warm rounded"></div>
                              <div className="w-4 h-4 bg-neutral-warm rounded-full"></div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        filteredConferences.map((conf, idx) => (
                          <motion.div
                            layout
                            variants={{
                              hidden: { opacity: 0, y: 35 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                  type: "spring",
                                  damping: 25,
                                  stiffness: 130
                                }
                              }
                            }}
                            key={conf.id}
                            className="relative"
                          >
                            {/* Separation bars */}
                            {idx >= 3 && (
                              <div className="absolute -top-6 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E6C785]/35 to-transparent hidden lg:block pointer-events-none" />
                            )}
                            {idx >= 2 && (
                              <div className="absolute -top-6 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E6C785]/35 to-transparent hidden md:block lg:hidden pointer-events-none" />
                            )}
                            {idx >= 1 && (
                              <div className="absolute -top-6 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E6C785]/35 to-transparent block md:hidden pointer-events-none" />
                            )}

                            <div
                              onClick={() => {
                                setSelectedConferenceId(conf.id);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="bg-white rounded-lg border-2 border-divider/60 hover:border-accent-gold p-6 flex flex-col justify-between group cursor-pointer relative h-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,169,97,0.25)] hover:scale-[1.02] luxury-hover-lift"
                            >
                              <div className="absolute top-4 right-4 bg-primary-navy text-neutral-warm text-[8px] uppercase font-mono tracking-wider font-bold px-2.5 py-0.5 rounded shadow-sm border border-accent-gold/25">
                                {conf.format}
                              </div>

                              <div className="space-y-4 text-left">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between pt-1">
                                    <span className="text-[10px] text-accent-gold font-mono tracking-wide font-bold">{conf.name}</span>
                                    
                                    {/* Clickable pill on card itself, scrolling/focusing on category click */}
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCategorySelect(conf.category);
                                      }}
                                      className="text-[9px] uppercase tracking-wider font-mono bg-[#0A1F44]/5 hover:bg-[#C9A961]/20 text-[#0A1F44] font-bold px-2.5 py-0.5 rounded-full cursor-pointer transition-all duration-200 border border-[#0A1F44]/10 hover:border-accent-gold flex items-center space-x-1"
                                      title={`Filter by ${conf.category}`}
                                    >
                                      {conf.category === 'Cybersecurity' && '🔒 '}
                                      {conf.category === 'AI-IoT' && '🤖 '}
                                      {conf.category === 'Renewable Energy' && '🌱 '}
                                      <span>{conf.category}</span>
                                    </button>
                                  </div>
                                  
                                  <h3 className="font-serif text-lg font-bold text-primary-navy leading-snug tracking-tight group-hover:text-accent-gold transition-colors">
                                    {conf.full_name}
                                  </h3>
                                </div>

                                <p className="text-xs text-gray-400 font-light leading-relaxed limit-lines">
                                  Double-blind evaluation criteria are applied to all submissions. In association with flagship peer-reviewed science journals.
                                </p>

                                <div className="space-y-2 text-xs font-mono text-gray-500 pt-2 border-t border-divider">
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-accent-gold shrink-0" />
                                    <span>{conf.dates.display}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-accent-gold shrink-0" />
                                    <span className="truncate">{conf.location}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Action controls with icon-rotating micro-interactions on Quick View */}
                              <div className="pt-4 border-t border-divider/50 mt-4 flex items-center justify-between">
                                <motion.button
                                  whileHover="hover"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setQuickViewConference(conf);
                                  }}
                                  className="px-2.5 py-1.5 rounded-md text-[10px] uppercase font-mono font-bold tracking-wider text-gray-500 hover:text-primary-navy hover:bg-[#C9A961]/10 border border-transparent hover:border-[#C9A961]/40 flex items-center space-x-1.5 transition duration-200 cursor-pointer"
                                  title="Compact overview"
                                >
                                  <motion.div
                                    variants={{
                                      hover: { 
                                        rotate: [0, 45, -45, 45, 0],
                                        scale: [1, 1.25, 1.25, 1] 
                                      }
                                    }}
                                    transition={{ 
                                      duration: 0.6,
                                      repeat: Infinity,
                                      repeatType: "reverse"
                                    }}
                                    className="shrink-0"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-accent-gold" />
                                  </motion.div>
                                  <span>Quick View</span>
                                </motion.button>
                                
                                <div className="flex items-center space-x-1 text-xs font-semibold text-[#1a4a8a] group-hover:text-accent-gold transition-colors pb-0.5 border-b border-transparent group-hover:border-accent-gold/40">
                                  <span>View Board & Tracks</span>
                                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </motion.div>

                </div>
              )}
            </motion.div>
          )}

          {page === 'mentorship' && (
            <motion.div
              key={`mentorship-${subPage || 'default'}-${selectedMentorForDrawer ? selectedMentorForDrawer.id : 'null'}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransitionVariants}
            >
              <MentorshipHub 
                initialSub={subPage} 
                initialProfile={selectedMentorForDrawer}
              />
            </motion.div>
          )}

          {page === 'services' && (
            <motion.div
              key={`services-${subPage || 'default'}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransitionVariants}
            >
              <ServicesHub 
                initialSub={subPage} 
              />
            </motion.div>
          )}

          {page === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransitionVariants}
            >
              <Dashboard 
                onNavigate={handleNavigate} 
              />
            </motion.div>
          )}

          {page === 'publications' && (
            <motion.div
              key="publications"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransitionVariants}
            >
              <PublicationsPage />
            </motion.div>
          )}

          {page === 'events' && (
            <motion.div
              key={`events-${subPage || 'default'}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransitionVariants}
            >
              <EventsPage initialSub={subPage} />
            </motion.div>
          )}

          {page === 'archives' && (
            <motion.div
              key="archives"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransitionVariants}
            >
              <ArchivesPage />
            </motion.div>
          )}

          {page === 'contact' && (
            <motion.div
              key="contact"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransitionVariants}
            >
              <ContactPage />
            </motion.div>
          )}

          {page === 'login' && (
            <motion.div
              key="login"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransitionVariants}
            >
              <AuthPage 
                initialSub={subPage} 
                onLoginSuccess={() => handleNavigate('dashboard')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer component */}
      <Footer 
        onNavigate={handleNavigate} 
      />

      {/* Quick View Modal Dialog Popup */}
      <AnimatePresence>
        {quickViewConference && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop slide-in/fade-in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewConference(null)}
              className="absolute inset-0 bg-primary-navy/40 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-[#FAFAF7] border-2 border-accent-gold/40 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[85vh]"
            >
              {/* Header Banner */}
              <div className="bg-[#0A1F44] text-white p-5 border-b border-accent-gold/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2.5">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-accent-gold bg-accent-gold/15 px-2 py-0.5 rounded border border-accent-gold/20">
                      {quickViewConference.format} Conference
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#FAFAF7]/75">
                      {quickViewConference.id}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold tracking-tight mt-1 text-[#FAFAF7]">
                    {quickViewConference.full_name}
                  </h3>
                </div>
                <button
                  onClick={() => setQuickViewConference(null)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition text-white cursor-pointer"
                  title="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content wrapper */}
              <div className="p-6 overflow-y-auto space-y-5 text-left text-xs">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Left Column: Details */}
                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider font-mono font-bold text-gray-400 mb-1">
                        Academic Venue & Location
                      </h4>
                      <p className="font-serif text-base text-primary-navy font-bold leading-tight">
                        {quickViewConference.location}
                      </p>
                      <div className="flex items-center space-x-2 text-xs font-semibold text-[#1a4a8a] mt-1">
                        <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                        <span>{quickViewConference.dates.display}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider font-mono font-bold text-gray-400 mb-1.5">
                        Scientific Review Standards
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed font-light">
                        All submissions undergo rigorous double-blind peer evaluation. Selected manuscripts are slated for publication in prestigious indexing systems and affiliate flagship science databases.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider font-mono font-bold text-gray-400 mb-2">
                        General Chairs
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {quickViewConference.general_chairs.map((chair, idx) => (
                          <span
                            key={idx}
                            className="bg-primary-navy/5 text-primary-navy text-[10px] font-semibold px-2 py-0.5 rounded border border-primary-navy/10"
                          >
                            🧑‍🏫 {chair}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Deadlines & Keynotes */}
                  <div className="md:col-span-5 space-y-4 border-t md:border-t-0 md:border-l border-divider pt-4 md:pt-0 md:pl-5">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider font-mono font-bold text-gray-400 mb-2">
                        Submissions Action Timeline
                      </h4>
                      <div className="space-y-2.5">
                        {quickViewConference.deadlines.map((deadline, idx) => {
                          const daysLeft = getDaysRemaining(deadline.date);
                          const isPast = daysLeft < 0;
                          return (
                            <div key={idx} className="p-2 bg-white rounded-lg border border-divider/45 flex flex-col space-y-1.5 hover:border-accent-gold/45 transition">
                              <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                                <span className={`font-semibold ${isPast ? 'text-gray-400 line-through' : 'text-primary-navy'}`}>
                                  {deadline.label}
                                </span>
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[9px] ${
                                    isPast
                                      ? 'bg-neutral-warm text-gray-400'
                                      : 'bg-accent-gold/15 text-[#C9A961] font-bold border border-accent-gold/25'
                                  }`}
                                >
                                  {deadline.date}
                                </span>
                              </div>
                              <div className="flex justify-end items-center text-[10px] font-mono">
                                {isPast ? (
                                  <span className="text-gray-400 text-[9px] flex items-center space-x-1 font-semibold">
                                    <span>⌛</span>
                                    <span>Opportunity Closed</span>
                                  </span>
                                ) : daysLeft === 0 ? (
                                  <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded text-[9px] font-bold animate-pulse flex items-center space-x-1 border border-red-200">
                                    <span>⚠️</span>
                                    <span>Due Today!</span>
                                  </span>
                                ) : daysLeft <= 7 ? (
                                  <span className="text-red-500 bg-red-50 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center space-x-1 border border-red-100">
                                    <span>🚨</span>
                                    <span>{daysLeft} days remaining (Urgent!)</span>
                                  </span>
                                ) : daysLeft <= 30 ? (
                                  <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center space-x-1 border border-amber-100 font-semibold">
                                    <span>⏳</span>
                                    <span>{daysLeft} days remaining</span>
                                  </span>
                                ) : (
                                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[9px] font-medium flex items-center space-x-1 border border-emerald-100 font-semibold">
                                    <span>🗓️</span>
                                    <span>{daysLeft} days remaining</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider font-mono font-bold text-gray-400 mb-2">
                        Speaker Highlights
                      </h4>
                      <div className="max-h-24 overflow-y-auto pr-1 space-y-1">
                        {quickViewConference.keynote_speakers.map((speaker, idx) => (
                          <div
                            key={idx}
                            className="text-[10px] font-medium text-gray-700 bg-white border border-divider/60 rounded px-2 py-0.5 flex items-center space-x-1 hover:border-accent-gold transition"
                          >
                            <span className="text-[#C9A961]">🎤</span>
                            <span className="truncate">{speaker}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="bg-neutral-warm p-4 border-t border-divider flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 justify-end text-[10px] font-bold uppercase tracking-widest">
                <a
                  href={quickViewConference.url}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="px-4 py-2 bg-white border text-gray-700 rounded-lg hover:border-accent-gold hover:text-primary-navy transition flex items-center justify-center space-x-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>External Site</span>
                </a>
                <button
                  onClick={() => {
                    setSelectedConferenceId(quickViewConference.id);
                    setQuickViewConference(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.1 bg-[#0A1F44] text-[#C9A961] hover:bg-primary-navy rounded-lg transition shadow flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Explore Tracks & Dates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium AI concierge co-pilot drawer */}
      <AICopilotDock 
        onSelectMentor={(mentor) => setSelectedMentorForDrawer(mentor)}
        onNavigateToMentors={() => handleNavigate('mentorship', 'directory')}
      />

    </div>
  );
}

