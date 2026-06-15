import React, { useState } from 'react';
import { Menu, X, ChevronDown, Sparkles, LogIn, Users, Search as SearchIcon, ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, subPage?: string | null, extraId?: string | null) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoErr, setLogoErr] = useState(false);

  const navigationItems = [
    { label: "Home", page: "home" },
    {
      label: "About",
      page: "about",
      children: [
        { label: "Mission & Vision", page: "about", sub: "mission" },
        { label: "Core Values", page: "about", sub: "corevalue" },
        { label: "Future Goals", page: "about", sub: "future-goal" },
        { label: "Procedure", page: "about", sub: "procedure" },
        { label: "Employees & Council", page: "about", sub: "employees" }
      ]
    },
    {
      label: "Membership",
      page: "mentorship",
      children: [
        { label: "Join Us → Mentor", page: "login", sub: "register-mentor" },
        { label: "Join Us → Mentee", page: "login", sub: "register-mentee" },
        { label: "Mentoring Directory", page: "mentorship", sub: "directory" },
        { label: "Why to Join RiTECHS", page: "mentorship", sub: "why-join" },
        { label: "Benefits", page: "mentorship", sub: "benefits" },
        { label: "Subscription Tiers", page: "mentorship", sub: "subscription" }
      ]
    },
    { label: "Conference", page: "conferences" },
    {
      label: "Publication",
      page: "publications",
      children: [
        { label: "8 Publishing Disciplines", page: "publications", sub: "disciplines" },
        { label: "Conference Proceedings", page: "publications", sub: "procedia" },
        { label: "Procedia Proposals", page: "publications", sub: "proposals" }
      ]
    },
    {
      label: "Event",
      page: "events",
      children: [
        { label: "Academic Seminars", page: "events", sub: "seminar" },
        { label: "Support Boot Camps", page: "events", sub: "bootcamp" },
        { label: "Research Adda", page: "events", sub: "adda" },
        { label: "Cyber4Me Initiative", page: "events", sub: "cyber4me" }
      ]
    },
    {
      label: "Solutions",
      page: "services",
      children: [
        { label: "Academic Modification", page: "services", sub: "modification" },
        { label: "Poster Presentations", page: "services", sub: "posters" }
      ]
    },
    {
      label: "Training",
      page: "services",
      sub: "elearning",
      children: [
        { label: "e-Learning Center", page: "services", sub: "elearning" },
        { label: "Training Partner Program", page: "services", sub: "training-partner" }
      ]
    },
    { label: "Archives", page: "archives" },
    { label: "Search", page: "search" }
  ];

  // Dynamic search results helper inside modal
  const searchablePages = [
    { label: "About RiTECHS", page: "about", cat: "About Us" },
    { label: "Mission, Vision & Strategy", page: "about", sub: "mission", cat: "About Us" },
    { label: "Strategic Values (Integrity, Advocacy)", page: "about", sub: "corevalue", cat: "About Us" },
    { label: "Strategic Goals and Labs by 2028", page: "about", sub: "future-goal", cat: "About Us" },
    { label: "Corporate Steps Matching Procedure", page: "about", sub: "procedure", cat: "About Us" },
    { label: "Staff Employees and Directors Directory", page: "about", sub: "employees", cat: "About Us" },
    { label: "Membership Benefits & Registration", page: "mentorship", cat: "Membership" },
    { label: "Scholars & Mentor Directory Search", page: "mentorship", sub: "directory", cat: "Membership" },
    { label: "Subscription Pricing Tiers Guide", page: "mentorship", sub: "subscription", cat: "Membership" },
    { label: "Active Conferences (ICETCS, ITSS-IoE, AIoT)", page: "conferences", cat: "Conferences" },
    { label: "Scientific Disciplines & Proceedings Outlets", page: "publications", cat: "Publications" },
    { label: "Procedia Publishing Proposals Fast-form", page: "publications", sub: "proposals", cat: "Publications" },
    { label: "Wolverhampton Review Paper Seminars", page: "events", sub: "seminar", cat: "Events" },
    { label: "Support Boot Camps & CV Office Hours", page: "events", sub: "bootcamp", cat: "Events" },
    { label: "Research Adda Live Chats Index", page: "events", sub: "adda", cat: "Events" },
    { label: "Cyber4Me (DSIT-Funded Program)", page: "events", sub: "cyber4me", cat: "Events" },
    { label: "Academic English Modification", page: "services", sub: "modification", cat: "Solutions" },
    { label: "e-Learning Catalog & Certified Lectures", page: "services", sub: "elearning", cat: "Training" },
    { label: "Past Conference Volumes Archives", page: "archives", cat: "Archives" }
  ];

  const searchResults = searchQuery
    ? searchablePages.filter(p => p.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : searchablePages.slice(0, 5);

  return (
    <header className="sticky top-0 z-50 bg-neutral-warm/95 backdrop-blur-md border-b border-divider transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Frame */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
            id="brand-logo"
          >
            <div className="w-10 h-10 bg-[#0A1F44] rounded flex items-center justify-center border border-[#C9A961]/40 shadow-sm overflow-hidden transition-transform group-hover:scale-105">
              {!logoErr ? (
                <img 
                  src="/logo.png" 
                  alt="RiTECHS Logo" 
                  className="w-full h-full object-cover" 
                  onError={() => setLogoErr(true)}
                />
              ) : (
                <span className="font-serif font-bold text-[#C9A961] text-base">R</span>
              )}
            </div>
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-primary-navy transition-colors group-hover:text-primary-navy-hover">RiTECHS</span>
                <span className="h-1 w-1 rounded-full bg-accent-gold"></span>
              </div>
              <p className="text-[9px] uppercase font-mono tracking-widest text-[#C9A961] font-semibold leading-none mt-0.5">Learn and Grow</p>
            </div>
          </div>

          {/* Core Desktop Navigation Link Cluster */}
          <nav className="hidden xl:flex xl:space-x-0.5 2xl:space-x-1 font-semibold" id="desktop-nav">
            {navigationItems.map((item, index) => {
              const isSearch = item.page === 'search';
              const isPageActive = currentPage === item.page;

              return (
                <div
                  key={index}
                  className="relative group py-2"
                  onMouseEnter={() => !isSearch && setActiveDropdown(item.label)}
                  onMouseLeave={() => !isSearch && setActiveDropdown(null)}
                >
                  <button
                    onClick={() => {
                      if (isSearch) {
                        setIsSearchOpen(true);
                      } else {
                        onNavigate(item.page, item.sub || null);
                      }
                    }}
                    className={`px-1.5 2xl:px-2.5 py-1.5 rounded text-[10px] 2xl:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 flex items-center space-x-0.5 ${
                      isSearch 
                        ? 'text-accent-gold hover:text-primary-navy hover:bg-accent-gold/10 font-bold border border-accent-gold/50 rounded-md px-2 ml-1.5'
                        : isPageActive 
                          ? 'text-primary-navy font-bold bg-[#1a4a8a]/5'
                          : 'text-[#4A5568] hover:text-primary-navy hover:bg-neutral-warm/80'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.children && <ChevronDown className="w-3 h-3 opacity-60" />}
                  </button>

                  {/* Submenu Dropdown Container */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute left-0 mt-1 w-56 rounded-lg shadow-xl bg-white border border-divider py-1.5 z-50 animate-fade-in-down">
                      <div className="absolute top-0 left-6 -mt-1.5 w-3 h-3 bg-white rotate-45 border-t border-l border-divider"></div>
                      {item.children.map((child, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => {
                            onNavigate(child.page, child.sub, null);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2 text-[11px] font-semibold text-gray-700 hover:bg-neutral-warm hover:text-primary-navy border-l-2 border-transparent hover:border-accent-gold transition-all"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Stack */}
          <div className="hidden xl:flex items-center space-x-2 2xl:space-x-2.5 shrink-0" id="right-actions">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center space-x-1 text-[10px] 2xl:text-[11px] uppercase font-semibold tracking-wider px-2 2xl:px-3 py-2 rounded-md transition-all ${
                currentPage === 'dashboard'
                  ? 'bg-primary-navy/10 text-primary-navy font-bold'
                  : 'text-gray-600 hover:text-primary-navy hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4 text-accent-gold" />
              <span>Workspace</span>
            </button>
            
            <button
              onClick={() => onNavigate('login')}
              className="px-3 2xl:px-4 py-2 bg-gradient-to-br from-[#0A1F44] to-[#143d7c] text-white border border-accent-gold/20 hover:border-accent-gold/60 text-[10px] 2xl:text-[11px] font-bold uppercase tracking-wider rounded transition-all flex items-center space-x-1.5 shadow-sm shrink-0"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Portal Access</span>
            </button>
          </div>

          {/* Hamburger Mobile Menu Toggle */}
          <div className="xl:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-primary-navy hover:bg-gray-100 rounded-md"
              title="Search"
            >
              <SearchIcon className="w-4 h-4 text-accent-gold" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-navy hover:text-accent-gold hover:bg-gray-100 focus:outline-none"
              id="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-b border-divider overflow-hidden"
          >
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
              {navigationItems.map((item, idx) => {
                const isSearch = item.page === 'search';
                return (
                  <div key={idx} className="block">
                    <button
                      onClick={() => {
                        if (isSearch) {
                          setMobileMenuOpen(false);
                          setIsSearchOpen(true);
                        } else if (!item.children) {
                          onNavigate(item.page, item.sub || null);
                          setMobileMenuOpen(false);
                        } else {
                          setActiveDropdown(activeDropdown === item.label ? null : item.label);
                        }
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider flex justify-between items-center ${
                        isSearch ? 'text-accent-gold bg-primary-navy/5 font-bold border-l-2 border-accent-gold' : 'text-gray-800 hover:bg-neutral-warm'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.children && <ChevronDown className="w-4 h-4 transform transition-transform duration-200" />}
                    </button>

                    {item.children && activeDropdown === item.label && (
                      <div className="pl-6 space-y-1 bg-neutral-warm/50 py-1 rounded-md">
                        {item.children.map((child, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => {
                              onNavigate(child.page, child.sub, null);
                              setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-xs font-semibold text-gray-600 hover:text-primary-navy transition"
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              
              <div className="pt-4 pb-2 border-t border-divider flex flex-col space-y-2 px-3">
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2 border border-divider rounded-md text-xs font-semibold uppercase tracking-wider text-gray-700 bg-neutral-warm"
                >
                  <Users className="w-4 h-4 text-accent-gold" />
                  <span>My Workspace</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-md text-xs font-bold uppercase tracking-wider bg-[#0A1F44] text-[#FAFAF7]"
                >
                  Portal Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Interactive Search Modal Drawer */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-primary-navy/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              className="bg-white border text-text-body rounded-2xl w-full max-w-xl shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-4 border-b border-divider flex items-center space-x-3 bg-neutral-warm/40">
                <SearchIcon className="w-5 h-5 text-accent-gold shrink-0" />
                <input
                  type="text"
                  placeholder="Type to search RiTECHS pages, services, other programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-xs font-sans text-primary-navy focus:outline-none focus:ring-0 placeholder-gray-400 font-semibold"
                  autoFocus
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 text-gray-400 hover:text-[#0A1F44] hover:bg-neutral-warm rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[300px] overflow-y-auto divide-y divide-divider">
                {searchResults.length > 0 ? (
                  searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onNavigate(result.page, result.sub || null);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left px-5 py-3.5 hover:bg-[#1a4a8a]/5 flex justify-between items-center transition group cursor-pointer"
                    >
                      <div className="space-y-0.5 text-xs">
                        <span className="text-[9px] uppercase font-mono bg-[#1a4a8a]/5 text-[#1a4a8a] px-2 py-0.5 rounded font-bold">{result.cat}</span>
                        <h4 className="font-serif font-bold text-primary-navy mt-1 group-hover:text-accent-gold transition-colors">{result.label}</h4>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#C9A961] group-hover:translate-x-1 transition" />
                    </button>
                  ))
                ) : (
                  <div className="text-center py-10 text-xs text-gray-400 font-sans">
                    No results found matching your lookup. Please try alternative tags.
                  </div>
                )}
              </div>

              {/* Modal footer credit */}
              <div className="p-3 bg-neutral-warm/20 text-center text-[10px] text-gray-400 border-t font-mono">
                RiTECHS Indexing Engine · Press ESC to escape
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </header>
  );
}
