import React, { useState, useMemo, useEffect } from 'react';
import { MEMBERS } from '../data';
import { Member } from '../types';
import { Search, Filter, Sparkles, MapPin, Award, BookOpen, Clock, ThumbsUp, ChevronDown, CheckCircle, BrainCircuit, Send, MessageSquare } from 'lucide-react';

interface MentorshipHubProps {
  initialSub?: string | null;
  initialProfile?: Member | null;
}

export default function MentorshipHub({ initialSub, initialProfile }: MentorshipHubProps) {
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<'all' | 'mentor' | 'mentee'>(
    initialSub === 'directory' ? 'mentor' : 'all'
  );
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  // Multi-step sub-views matching navigation
  const [currentView, setCurrentView] = useState<'directory' | 'why-join' | 'benefits' | 'subscription'>(
    initialSub === 'why-join' ? 'why-join' :
    initialSub === 'benefits' ? 'benefits' :
    initialSub === 'subscription' ? 'subscription' : 'directory'
  );

  // AI Assistant Concierge states
  const [conciergeAbstract, setConciergeAbstract] = useState("");
  const [conciergeDomain, setConciergeDomain] = useState("");
  const [matchedMentorsList, setMatchedMentorsList] = useState<any[]>([]);
  const [isConsolidating, setIsConsolidating] = useState(false);
  
  // Selected Profile state for drawer layout
  const [selectedProfile, setSelectedProfile] = useState<Member | null>(initialProfile || null);

  useEffect(() => {
    if (initialProfile) {
      setSelectedProfile(initialProfile);
      setCurrentView('directory');
    }
  }, [initialProfile]);
  const [connectionRequested, setConnectionRequested] = useState(false);
  const [messageText, setMessageText] = useState("");

  const specializationsList = useMemo(() => {
    const list = new Set<string>();
    MEMBERS.forEach(m => m.specializations.forEach(s => list.add(s)));
    return Array.from(list);
  }, []);

  // Filtered members selector
  const filteredMembers = useMemo(() => {
    return MEMBERS.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.affiliation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'all' || member.type === selectedType;
      
      const matchesSpecialization = selectedSpecialization === 'all' || 
        member.specializations.some(s => s.toLowerCase() === selectedSpecialization.toLowerCase());

      return matchesSearch && matchesType && matchesSpecialization;
    });
  }, [searchTerm, selectedType, selectedSpecialization]);

  // AI abstract matching algo
  const handleAIMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conciergeAbstract) return;

    setIsConsolidating(true);
    setMatchedMentorsList([]);

    setTimeout(() => {
      const text = conciergeAbstract.toLowerCase() + " " + conciergeDomain.toLowerCase();
      
      // Calculate scores based on keyword occurrences
      const scored = MEMBERS
        .filter(m => m.type === 'mentor')
        .map(mentor => {
          let score = 10; // base score
          const tags = mentor.specializations;
          
          tags.forEach(tag => {
            const splitTag = tag.toLowerCase().split(" ");
            splitTag.forEach(word => {
              if (text.includes(word) && word.length > 3) {
                score += 30;
              }
            });
          });

          // Affiliation overlap
          if (text.includes(mentor.affiliation.toLowerCase())) {
            score += 20;
          }

          // Randomize minor factors
          score += (mentor.id % 7) * 2;

          return {
            mentor,
            score: Math.min(score, 99), // cap at 99%
            matchedSpecializations: tags.filter(tag => {
              return tag.toLowerCase().split(" ").some(word => text.includes(word) && word.length > 3);
            })
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      setMatchedMentorsList(scored);
      setIsConsolidating(false);
    }, 1500);
  };

  const submitConnectionRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setConnectionRequested(true);
    setTimeout(() => {
      setConnectionRequested(false);
      setSelectedProfile(null);
      setMessageText("");
    }, 4000);
  };

  return (
    <div className="bg-neutral-warm min-h-screen text-text-body font-sans transition-all">
      
      {/* Editorial Title Header */}
      <section className="bg-[#0A1F44] text-[#FAFAF7] py-16 px-4 md:px-8 border-b border-[#C9A961]/40 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 bottom-0 opacity-15 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#C9A961] font-semibold">Join the Elite Directory</p>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white leading-tight">
            The RiTECHS Global Mentorship Network
          </h1>
          <p className="text-sm text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Unifying 170+ senior lecturers, certified technology investigators, PhD candidate scholars, and industrial engineering researchers across 25 represented countries.
          </p>

          <div className="flex justify-center space-x-2 pt-2 text-xs">
            <button
              onClick={() => setCurrentView('directory')}
              className={`px-4 py-2 rounded font-semibold uppercase tracking-wider transition ${
                currentView === 'directory' ? 'bg-[#C9A961] text-[#0A1F44]' : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Directory Search
            </button>
            <button
              onClick={() => setCurrentView('why-join')}
              className={`px-4 py-2 rounded font-semibold uppercase tracking-wider transition ${
                currentView === 'why-join' ? 'bg-[#C9A961] text-[#0A1F44]' : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Why Join?
            </button>
            <button
              onClick={() => setCurrentView('benefits')}
              className={`px-4 py-2 rounded font-semibold uppercase tracking-wider transition ${
                currentView === 'benefits' ? 'bg-[#C9A961] text-[#0A1F44]' : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Benefits
            </button>
            <button
              onClick={() => setCurrentView('subscription')}
              className={`px-4 py-2 rounded font-semibold uppercase tracking-wider transition ${
                currentView === 'subscription' ? 'bg-[#C9A961] text-[#0A1F44]' : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Subscriptions
            </button>
          </div>
        </div>
      </section>

      {/* Main container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="membership-content">
        
        {/* Why Join Platform Profile */}
        {currentView === 'why-join' && (
          <div className="space-y-12 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-accent-gold bg-primary-navy/10 px-2.5 py-1 rounded">Global Scholarship Expansion</span>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0A1F44]">Why Establish Connection via RiTECHS?</h2>
                <p className="text-sm font-light text-gray-600 leading-relaxed">
                  Many promising engineers, postgraduate candidates, and researchers across Nigeria, Bangladesh, Iraq, and Southeast Asia have groundbreaking concepts but lack immediate access to native English peer reviewers, advanced computing telemetry labs, or direct submission recommendations for Springer, IEEE, and Wiley series. 
                </p>
                <p className="text-sm font-light text-gray-600 leading-relaxed">
                  RiTECHS closes this distance. Our designated council coordinates digital advisory desks where early-stage draft manuscripts are polished until they command immediate recognition from top-tier journals.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4 text-xs font-semibold">
                  <div className="p-4 bg-white border rounded">
                    <strong className="text-xl font-serif text-[#0A1F44] block">92%</strong>
                    Acceptance rate on high-impact journal submissions of peer program graduates.
                  </div>
                  <div className="p-4 bg-white border rounded">
                    <strong className="text-xl font-serif text-[#C9A961] block">48 Hours</strong>
                    Average initial abstract feedback from matched mentors.
                  </div>
                </div>
              </div>

              <div>
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                  alt="Coaching"
                  className="rounded-2xl border border-divider shadow-md max-h-[400px] object-cover w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Benefits Panel */}
        {currentView === 'benefits' && (
          <div className="animate-fade-in space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-navy">Unsurpassed Membership Privileges</h2>
              <p className="text-xs text-gray-500 font-light mt-1">Unlock technical telemetry resources, high-level review pools, and certified training certifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm space-y-3">
                <div className="w-10 h-10 rounded bg-[#0A1F44] flex items-center justify-center text-accent-gold">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-primary-navy">Sovereign Peer Certification</h3>
                <p className="text-xs font-light text-gray-500 leading-relaxed">Graduates from the Bootcamp and Seminar programs secure double-signed certificates issued by board directors at University of Wolverhampton and partners.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border shadow-sm space-y-3">
                <div className="w-10 h-10 rounded bg-[#0A1F44] flex items-center justify-center text-accent-gold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-primary-navy">Pre-Submission Peer Scans</h3>
                <p className="text-xs font-light text-gray-500 leading-relaxed">Submit your manuscript draft once free per quarter for complete dual-blind technical assessment before dispatching to actual publisher channels.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border shadow-sm space-y-3">
                <div className="w-10 h-10 rounded bg-[#0A1F44] flex items-center justify-center text-accent-gold">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-primary-navy">Assembly Slashes</h3>
                <p className="text-xs font-light text-gray-500 leading-relaxed font-sans">Receive 40% fee reduction on ICETCS, ITSS-IoE, and AIoT-RSE upcoming conference seats during active enrollment cycles.</p>
              </div>
            </div>
          </div>
        )}

        {/* Subscription pricing tiers */}
        {currentView === 'subscription' && (
          <div className="animate-fade-in space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0A1F44]">Academic Subscription Structures</h2>
              <p className="text-xs text-gray-500 font-light mt-1">Support the academic ecosystem while amplifying your publishing footprint internationally.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Mentee pricing */}
              <div className="bg-white rounded-lg border border-divider overflow-hidden p-6 hover:shadow-md transition">
                <span className="text-[9px] uppercase font-mono tracking-widest text-gray-400 font-bold block mb-1">For Students & Mentees</span>
                <h3 className="font-serif text-xl font-bold text-primary-navy">Graduate Fellowship</h3>
                <p className="text-xs text-gray-500 font-light mt-1">Ideal for MSc, PhD candidates aiming for high-impact reviewer guidance.</p>
                <div className="my-6">
                  <span className="font-serif text-4xl font-bold text-[#0A1F44]">£15</span>
                  <span className="text-gray-400 font-mono text-xs">/month</span>
                </div>
                <ul className="text-xs text-gray-600 font-medium space-y-2.5 pb-6 border-b border-divider">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Dynamic Matchmaking with 2 Mentors</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Free Access to Editorial Seminars</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>1 Manuscript Formatting Scan / Year</span>
                  </li>
                </ul>
                <button className="w-full mt-6 py-2.5 rounded border border-[#0A1F44] text-[11px] uppercase tracking-wider font-semibold hover:bg-[#0A1F44] hover:text-white transition">
                  Activate Fellowship
                </button>
              </div>

              {/* Mentors pricing (free but verified) */}
              <div className="bg-[#0A1F44] text-[#FAFAF7] rounded-lg border-2 border-accent-gold p-6 relative">
                <div className="absolute top-4 right-4 bg-accent-gold text-[#0A1F44] font-mono font-bold text-[8px] uppercase px-2 py-0.5 rounded shadow">
                  Verified Only
                </div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-accent-gold font-bold block mb-1">Verified Mentors Counsel</span>
                <h3 className="font-serif text-xl font-bold text-white">Distinguished Mentor</h3>
                <p className="text-xs text-gray-300 font-light mt-1">Reserved exclusively for verified Assistant Professors, lecturers & scientists with publication credits.</p>
                <div className="my-6">
                  <span className="font-serif text-4xl font-bold text-white">Free</span>
                  <span className="text-[#C9A961] font-mono text-xs"> / board invite</span>
                </div>
                <ul className="text-xs text-gray-300 font-medium space-y-2.5 pb-6 border-b border-white/10">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Board presence on Global Directory</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Keynote speaker invite candidacy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Manage regional conference chairs</span>
                  </li>
                </ul>
                <button className="w-full mt-6 py-2.5 rounded bg-accent-gold text-[#0A1F44] text-[11px] uppercase tracking-wider font-semibold hover:bg-white transition">
                  Submit Credentials
                </button>
              </div>

              {/* Corporate pricing */}
              <div className="bg-white rounded-lg border border-divider overflow-hidden p-6 hover:shadow-md transition">
                <span className="text-[9px] uppercase font-mono tracking-widest text-gray-400 font-bold block mb-1">For Labs & partners</span>
                <h3 className="font-serif text-xl font-bold text-primary-navy">Sponsoring Institution</h3>
                <p className="text-xs text-gray-500 font-light mt-1">For universities, research institutes, and cybersecurity startup agencies.</p>
                <div className="my-6">
                  <span className="font-serif text-4xl font-bold text-[#0A1F44]">£199</span>
                  <span className="text-gray-400 font-mono text-xs">/annual</span>
                </div>
                <ul className="text-xs text-gray-600 font-medium space-y-2.5 pb-6 border-b border-divider">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Partner Logo placement in footer carousel</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>10 Student Conference vouchers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Unlimited abstract plagiarism screenings</span>
                  </li>
                </ul>
                <button className="w-full mt-6 py-2.5 rounded border border-[#0A1F44] text-[11px] uppercase tracking-wider font-semibold hover:bg-[#0A1F44] hover:text-white transition">
                  Partner with Us
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Directory Search Interface */}
        {currentView === 'directory' && (
          <div className="space-y-10 animate-fade-in">
            
            {/* Split page with Matchmaking concierge on top */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-accent-gold/40 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 bottom-0 -mb-12 -mr-12 w-48 h-48 bg-[#C9A961]/5 rounded-full blur-2xl"></div>
              
              <div className="max-w-3xl">
                <div className="flex items-center space-x-2 mb-2 text-[#0A1F44]">
                  <BrainCircuit className="w-5 h-5 text-accent-gold animate-bounce" />
                  <span className="text-[10px] uppercase font-mono tracking-widest bg-[#C9A961]/10 px-2 py-0.5 rounded font-bold text-[#C9A961]">
                    Intelligent Advisor Concierge
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A1F44]">Need Mentor Recommendations?</h3>
                <p className="text-xs text-gray-500 font-light mt-1">Our dynamic semantic scanner evaluates specializations and coordinates to discover your ideal referee matches. Paste your candidate thesis title or abstract draft.</p>
              </div>

              <form onSubmit={handleAIMatch} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      required
                      placeholder="Enter research title or general theme (e.g. Cognitive dynamic algorithms, cybersecurity on edge nodes)"
                      value={conciergeAbstract}
                      onChange={(e) => setConciergeAbstract(e.target.value)}
                      className="w-full bg-neutral-warm border border-divider rounded px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    />
                  </div>
                  <div>
                    <select
                      required
                      value={conciergeDomain}
                      onChange={(e) => setConciergeDomain(e.target.value)}
                      className="w-full bg-neutral-warm border border-divider rounded px-4 py-3 text-xs font-semibold focus:outline-none"
                    >
                      <option value="">-- Targeted Domain --</option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="iot">Internet of Everything / Wireless</option>
                      <option value="machine-learning">Machine Learning & Data Mining</option>
                      <option value="bio-energy">Bio-Energy & Bio-Reactors</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isConsolidating}
                  className="bg-[#0A1F44] hover:bg-primary-navy-hover text-[#C9A961] uppercase tracking-wider text-xs font-bold px-6 py-3 rounded transition flex items-center space-x-2"
                >
                  {isConsolidating ? (
                    <>
                      <span className="w-4 h-4 border-2 border-accent-gold border-t-transparent rounded-full animate-spin"></span>
                      <span>Scanning 170+ Reviewer Profiles...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Scan & Suggest Ideal Mentors</span>
                    </>
                  )}
                </button>
              </form>

              {/* Matchmaking Output */}
              {matchedMentorsList.length > 0 && (
                <div className="mt-8 pt-6 border-t border-divider animate-slide-up space-y-4">
                  <h4 className="font-serif text-sm font-bold text-primary-navy flex items-center space-x-1">
                    <span>Top 3 Matched Mentors</span>
                    <span className="text-[10px] uppercase font-mono font-normal text-gray-400">(Calculated based on overlap metrics)</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {matchedMentorsList.map((match, i) => (
                      <div key={i} className="bg-neutral-warm/40 border border-[#C9A961] rounded-lg p-5 flex flex-col justify-between relative">
                        <div className="absolute top-4 right-4 text-xs font-mono font-bold text-[#C9A961]">
                          Score: {match.score}%
                        </div>
                        <div className="space-y-2">
                          <span className="text-[9px] uppercase font-mono tracking-wider bg-[#0A1F44] text-white px-2 py-0.5 rounded font-bold">Match Rank {i+1}</span>
                          <h5 className="font-serif text-base font-bold text-primary-navy leading-none mt-2">{match.mentor.name}</h5>
                          <p className="text-[10px] text-gray-500 font-semibold leading-tight">{match.mentor.title} at {match.mentor.affiliation}</p>
                          <p className="text-[11px] text-gray-400 flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-[#C9A961]" />
                            <span>Location: {match.mentor.location}</span>
                          </p>
                        </div>

                        {/* Match tag items */}
                        <div className="mt-4 pt-3 border-t border-divider space-y-2">
                          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Intersection tags:</p>
                          <div className="flex flex-wrap gap-1">
                            {match.mentor.specializations.map((spec: string, idx: number) => (
                              <span key={idx} className="bg-white px-2 py-0.5 rounded text-[9px] text-[#1a4a8a] border border-[#1a4a8a]/20">
                                {spec}
                              </span>
                            ))}
                          </div>
                          
                          <button
                            onClick={() => {
                              setSelectedProfile(match.mentor);
                              setConnectionRequested(false);
                            }}
                            className="w-full mt-3 bg-white text-primary-navy border border-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition py-2 text-xs font-semibold uppercase tracking-wider rounded"
                          >
                            Send Request
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Faceted Directory search controls */}
            <div className="bg-white rounded-lg border border-divider p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Faceted Network Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name, university affiliation, or country..."
                      className="w-full bg-neutral-warm border border-divider rounded pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none"
                    />
                    <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Network Category</label>
                  <select
                    value={selectedType}
                    onChange={(e: any) => setSelectedType(e.target.value)}
                    className="w-full bg-neutral-warm border border-divider rounded px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value="all">Mented & Mentor Board</option>
                    <option value="mentor">Verified Mentors Board</option>
                    <option value="mentee">Registered Candidates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Specialization Focus</label>
                  <select
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="w-full bg-neutral-warm border border-divider rounded px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value="all">All Specialties</option>
                    {specializationsList.map((spec, i) => (
                      <option key={i} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

              </div>
              
              <div className="mt-4 flex justify-between items-center text-[10px] text-gray-400 font-mono">
                <span>Displaying {filteredMembers.length} Scholars match criteria</span>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("all");
                    setSelectedSpecialization("all");
                  }} 
                  className="hover:text-primary-navy underline"
                >
                  Reset Facets
                </button>
              </div>
            </div>

            {/* Members Showcase grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member, idx) => (
                <div
                  key={member.id}
                  onClick={() => {
                    setSelectedProfile(member);
                    setConnectionRequested(false);
                  }}
                  className="bg-white rounded-lg border border-divider hover:border-[#C9A961] hover:shadow-md transition duration-300 p-6 flex flex-col justify-between group cursor-pointer relative"
                >
                  {member.featured && (
                    <span className="absolute top-4 right-4 bg-accent-gold/15 text-[#C9A961] border border-accent-gold/20 px-2 py-0.5 rounded text-[8px] uppercase font-mono font-bold">
                      Premium Board
                    </span>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary-navy flex items-center justify-center text-white text-sm font-serif font-bold group-hover:bg-[#C9A961] group-hover:text-primary-navy transition-colors">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-primary-navy leading-none group-hover:text-accent-gold transition-colors">{member.name}</h4>
                        <p className="text-[10px] text-gray-400 font-medium mt-1 leading-none uppercase">{member.type}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-gray-500">
                      <p className="font-semibold text-gray-700 leading-tight">Affiliation: {member.affiliation}</p>
                      {member.title && <p className="font-light">Title: {member.title}</p>}
                      <p className="text-[11px] text-gray-400 flex items-center">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A961] mr-1" />
                        <span>Registered Location: {member.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-divider flex flex-wrap gap-1">
                    {member.specializations.length > 0 ? (
                      member.specializations.map((spec, i) => (
                        <span key={i} className="px-2 py-0.5 bg-neutral-warm/60 border rounded text-[9px] text-[#1a4a8a]" id={`spec-tag-${member.id}-${i}`}>
                          {spec}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-gray-400 italic">Core Cybersecurity & Engineering sciences</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* Profile Sidebar overlay Drawer */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto relative flex flex-col justify-between border-l border-[#C9A961]/40 animate-slide-left">
            
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-[#0A1F44] text-white flex items-center justify-center font-serif text-xl font-bold">
                  {selectedProfile.name.charAt(0)}
                </div>
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="p-1 px-2.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
                >
                  Close ×
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono bg-accent-gold/10 text-primary-navy px-2 py-0.5 rounded font-bold">
                  {selectedProfile.type} COUNCIL BOARD
                </span>
                <h3 className="font-serif text-2xl font-bold text-primary-navy">{selectedProfile.name}</h3>
                {selectedProfile.title && <p className="text-xs text-gray-500 uppercase tracking-wider">{selectedProfile.title}</p>}
              </div>

              <div className="bg-neutral-warm/60 p-4 border rounded space-y-3 text-xs leading-relaxed">
                <p><strong>Primary Affiliation:</strong> {selectedProfile.affiliation}</p>
                <p><strong>Geographical Hub:</strong> {selectedProfile.location}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-sm font-bold text-primary-navy uppercase tracking-wider">Academic Focus Areas</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProfile.specializations.length === 0 ? (
                    <span className="bg-[#1a4a8a]/5 text-[#1a4a8a] text-[10px] px-2.5 py-1 rounded border border-divider">
                      High-integrity Telemetry system analysis, physical security models, smart IoT controllers.
                    </span>
                  ) : (
                    selectedProfile.specializations.map((spec, i) => (
                      <span key={i} className="bg-[#1a4a8a]/5 text-[#1a4a8a] text-[10px] px-2.5 py-1 rounded border border-divider">
                        {spec}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Verified badges */}
              <div className="bg-amber-50 rounded p-4 border border-amber-200 text-xs text-amber-900 space-y-1 font-sans">
                <p className="font-semibold flex items-center space-x-1">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Verified RiTECHS Authority</span>
                </p>
                <p className="font-light text-amber-800 text-[11px]">This reviewer desk complies with standard dual-blind peer protocols. All drafts are protected under strict intellectual licensing treaties.</p>
              </div>
            </div>

            {/* Interactive mentor request form */}
            <div className="border-t border-divider pt-6 mt-8 space-y-4">
              {connectionRequested ? (
                <div className="bg-accent-gold/10 border border-accent-gold text-primary-navy text-xs px-4 py-3 rounded font-semibold text-center animate-pulse">
                  Connection Request Dispatched! Let's wait for verification.
                </div>
              ) : (
                <form onSubmit={submitConnectionRequest} className="space-y-3 text-xs">
                  <label className="block text-gray-700 font-semibold uppercase text-[10px] tracking-wider">Leave a proposal note (Optional)</label>
                  <textarea
                    rows={4}
                    required
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Hello. I am a researcher looking for publication review support on a smart telemetry layout paper..."
                    className="w-full bg-neutral-warm border border-divider rounded px-3 py-2 text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#0A1F44] hover:bg-primary-navy-hover text-[#C9A961] font-semibold uppercase tracking-wider py-2.5 rounded text-xs transition flex items-center justify-center space-x-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Deliver Advisor Invite</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
