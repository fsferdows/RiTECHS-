import React, { useState, useEffect } from 'react';
import { Conference } from '../types';
import { Calendar, MapPin, Users, BookOpen, Clock, ThumbsUp, Tag, Plus, CheckCircle, Award, Volume2, Target } from 'lucide-react';

interface ConferenceDetailProps {
  conference: Conference;
  onBack: () => void;
}

export default function ConferenceDetail({ conference, onBack }: ConferenceDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'dates' | 'speakers' | 'tracks' | 'submit' | 'register'>('overview');
  const [countdownString, setCountdownString] = useState("");
  
  // Submit manuscript form states
  const [paperTitle, setPaperTitle] = useState("");
  const [paperAuthor, setPaperAuthor] = useState("");
  const [paperEmail, setPaperEmail] = useState("");
  const [paperTrack, setPaperTrack] = useState("");
  const [paperAbstract, setPaperAbstract] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPaperInfo, setSubmittedPaperInfo] = useState<any | null>(null);

  // Register pass states
  const [tier, setTier] = useState<'author' | 'watcher' | 'student'>('author');
  const [institution, setInstitution] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [badgeId, setBadgeId] = useState("");

  const getTierPrice = () => {
    if (tier === 'author') return 350;
    if (tier === 'student') return 180;
    return 100;
  };

  // Compute countdown to closest deadline
  useEffect(() => {
    const calcCountdown = () => {
      const activeDeadlines = conference.deadlines.filter(d => new Date(d.date) >= new Date());
      if (activeDeadlines.length === 0) {
        setCountdownString("Conference Submissions Completed");
        return;
      }
      
      const targetDate = new Date(activeDeadlines[0].date);
      const now = new Date();
      const diffTime = targetDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setCountdownString(`${diffDays} Days Left for [${activeDeadlines[0].label}]`);
    };

    calcCountdown();
    const interval = setInterval(calcCountdown, 86400000);
    return () => clearInterval(interval);
  }, [conference]);

  const handleSubmitPaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperTitle || !paperAuthor || !paperEmail || !paperTrack || !paperAbstract) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const mockId = "RIT-" + conference.id + "-" + Math.floor(1000 + Math.random() * 9000);
      setSubmittedPaperInfo({
        paperId: mockId,
        title: paperTitle,
        track: paperTrack,
        author: paperAuthor,
        status: 'Under Peer Review',
        reviewScore: 'Pending',
        editorsOpinion: 'Your technical Abstract checks out. Dual-blind review assigns 2 regional evaluators. First round feedback scheduled.'
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleRegisterReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institution) return;
    const badgeNum = "BADGE-" + conference.id + "-" + Math.floor(100 + Math.random() * 900);
    setBadgeId(badgeNum);
    setIsPaid(true);
  };

  // Specific Tracks depending on Conference type
  const getTracks = () => {
    if (conference.id.includes("ICETCS")) {
      return [
        { name: "Intelligent Cyber Threat Telemetry", desc: "Covers honeynet tracking, deep packet metrics, and telemetry configurations." },
        { name: "Hardware Trust & Trojan Mitigation", desc: "Covers VLSI layout security, firmware encryption modes, and Side-Channel defenses." },
        { name: "Machine Learning in Active Threat Defense", desc: "Covers Generative Adversarial networks for packet generation, anomaly tracing, and edge nodes safety." },
        { name: "Human Factors & Social Engineering Security", desc: "Explores social engineering mechanics, user behavior, and policy defense models." }
      ];
    } else if (conference.id.includes("AIoT")) {
      return [
        { name: "Smart Photovoltaic Array Grid Control", desc: "Control systems and telemetry configurations for renewable smart grids." },
        { name: "Deep Neural Networks for Carbon Capture", desc: "Mathematical models and computational predictions for bioelectrochemical synthesis." },
        { name: "Edge AI for Battery Management Systems", desc: "Deep Learning engines on edge nodes to monitor charge timelines in Electric Vehicles." },
        { name: "Sovereign Biomass Generation Protocols", desc: "IoT networks for bio-reactors, temperature management, and bio-energy." }
      ];
    } else {
      return [
        { name: "Dynamic Resource Scheduling in 5G Networks", desc: "Algorithms for cognitive radios, spectrum mapping, and low latency bandwidth." },
        { name: "Architectures for Internet of Everything (IoE)", desc: "Mesh topologies, edge node computation, and secure machine-to-machine telemetry." },
        { name: "Smart Agriculture Sensors & Extenders", desc: "Sensory IoT devices monitoring soil chemistry, hydrology metrics, and automated harvest routes." },
        { name: "Data Management in Distributed Ledger topies", desc: "Cryptographic consensus models for highly distributed physical servers." }
      ];
    }
  };

  return (
    <div className="bg-neutral-warm min-h-screen text-text-body transition-all font-sans pb-16">
      
      {/* Editorial Title Banner */}
      <section className="bg-primary-navy text-neutral-warm py-16 px-4 md:px-8 border-b-2 border-accent-gold/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-5xl mx-auto space-y-4">
          <button 
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-accent-gold hover:text-white transition duration-200"
          >
            <span>← Back to Conferences</span>
          </button>
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 bg-[#1a4a8a]/20 text-[#dde3ef] border border-[#1a4a8a] text-[10px] font-mono uppercase font-semibold rounded">
              {conference.format} Edition
            </span>
            <span className="px-2.5 py-1 bg-accent-gold/20 text-[#C9A961] border border-accent-gold/20 text-[10px] font-mono uppercase font-semibold rounded">
              {conference.type === 'upcoming' ? 'Upcoming' : 'Proceedings Published'}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {conference.full_name}
          </h1>

          <p className="font-serif italic text-lg text-gray-300">
            Hosted in alliance with RiTECHS · {conference.name}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs text-gray-300 font-mono">
            <div className="flex items-center space-x-2 bg-white/5 px-4 py-3 rounded border border-white/5">
              <Calendar className="w-5 h-5 text-accent-gold shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold leading-none">Dates</p>
                <p className="font-medium text-white">{conference.dates.display}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-white/5 px-4 py-3 rounded border border-white/5">
              <MapPin className="w-5 h-5 text-accent-gold shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold leading-none">Location</p>
                <p className="font-medium text-white">{conference.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-white/5 px-4 py-3 rounded border border-white/5">
              <Clock className="w-5 h-5 text-accent-gold shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold leading-none">Submission Clock</p>
                <p className="font-medium text-accent-gold">{countdownString}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Navigation Bar */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="flex border-b border-divider overflow-x-auto scrollbar-none gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition ${
              activeTab === 'overview' ? 'border-accent-gold text-primary-navy font-bold' : 'border-transparent text-gray-500 hover:text-primary-navy'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('dates')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition ${
              activeTab === 'dates' ? 'border-accent-gold text-primary-navy font-bold' : 'border-transparent text-gray-500 hover:text-primary-navy'
            }`}
          >
            Important Deadlines
          </button>
          <button
            onClick={() => setActiveTab('speakers')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition ${
              activeTab === 'speakers' ? 'border-accent-gold text-primary-navy font-bold' : 'border-transparent text-gray-500 hover:text-primary-navy'
            }`}
          >
            Distinguished Board & Speakers
          </button>
          <button
            onClick={() => setActiveTab('tracks')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition ${
              activeTab === 'tracks' ? 'border-accent-gold text-primary-navy font-bold' : 'border-transparent text-gray-500 hover:text-primary-navy'
            }`}
          >
            Tracks & Scope
          </button>
          {conference.type === 'upcoming' && (
            <>
              <button
                onClick={() => setActiveTab('submit')}
                className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition ${
                  activeTab === 'submit' ? 'border-accent-gold text-primary-navy font-bold' : 'border-transparent text-gray-500 hover:text-primary-navy'
                }`}
              >
                Submit Abstract
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition ${
                  activeTab === 'register' ? 'border-accent-gold text-primary-navy font-bold' : 'border-transparent text-gray-500 hover:text-primary-navy'
                }`}
              >
                Reserve Seat (RIT Pass)
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Tab Views */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            
            {/* Left Narrative */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg border border-divider shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-primary-navy">Welcome Proposal Statement</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  {conference.name} coordinates senior cyber security researchers, energy model engineers, optimization algorithm creators, and master students globally. Guided by a dual-blind rigorous evaluation method, selected papers will appear in Springer series or High-tier indexes. We advocate for peer collaboration and hybrid interaction.
                </p>
                <div className="bg-neutral-warm/60 p-4 border-l-2 border-[#1a4a8a] text-xs text-gray-700">
                  <p className="font-semibold text-primary-navy mb-1 flex items-center">
                    <BookOpen className="w-4 h-4 mr-1 text-accent-gold" />
                    <span>Peer Review Compliance Code</span>
                  </p>
                  All papers submit to plagiarism screenings. Initial telemetry validation will check formatting, grammar, and database schema diagrams before releasing reviews.
                </div>
              </div>

              {/* Call for papers card */}
              <div className="bg-white p-6 rounded-lg border border-divider shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-semibold text-primary-navy flex items-center space-x-2">
                  <Award className="w-5 h-5 text-accent-gold" />
                  <span>Sponsoring Publications & Partners</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-neutral-warm/40 border border-divider rounded text-center text-xs font-bold text-[#1a4a8a]" id="pub-springer">
                    Springer LNCS Series
                  </div>
                  <div className="p-3 bg-neutral-warm/40 border border-divider rounded text-center text-xs font-bold text-[#1a4a8a]" id="pub-science-direct">
                    ScienceDirect
                  </div>
                  <div className="p-3 bg-neutral-warm/40 border border-divider rounded text-center text-xs font-bold text-[#1a4a8a]" id="pub-ieee">
                    IEEE Benelux Frame
                  </div>
                </div>
              </div>
            </div>

            {/* Right Quick Dates Panel */}
            <div className="space-y-6">
              <div className="bg-[#0A1F44] text-white p-6 rounded-lg border border-accent-gold/20 shadow-md">
                <h4 className="font-serif font-bold text-[#C9A961] text-base mb-4 uppercase tracking-wider pb-2 border-b border-white/10">Important Deadlines</h4>
                <div className="space-y-4">
                  {conference.deadlines.map((dl, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-gray-300">{dl.label}</span>
                      <span className="font-mono text-[#C9A961] bg-white/5 px-2.5 py-1 rounded border border-white/10">
                        {dl.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-divider shadow-sm">
                <h4 className="font-serif font-bold text-primary-navy text-sm mb-2">Academic Assembly Location</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <p className="font-semibold text-[#1a4a8a]">{conference.location}</p>
                  <p className="font-light">Physical and digital hybrid modules are routed through secure Zoom channels, enabling interactive slide deck shares.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Dates Tab */}
        {activeTab === 'dates' && (
          <div className="bg-white p-8 rounded-lg border border-divider shadow-sm animate-fade-in max-w-2xl mx-auto space-y-6">
            <h3 className="font-serif text-2xl font-bold text-primary-navy text-center">Rigorous Peer Review Milestones</h3>
            <p className="text-xs text-gray-500 font-light text-center">To ensure sufficient timing for journal revisions, authorship modifications, and layout reviews.</p>
            
            <div className="relative border-l-2 border-divider ml-4 space-y-8 mt-8">
              {conference.deadlines.map((dl, idx) => {
                const isPassed = new Date(dl.date) < new Date();
                return (
                  <div key={idx} className="relative pl-6">
                    <span className={`absolute -left-2 top-1.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center text-[10px] font-mono ${
                      isPassed ? 'bg-red-500 border-red-500 text-white' : 'bg-[#C9A961] border-[#C9A961] text-[#0A1F44]'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-neutral-warm/40 p-4 rounded border border-divider">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-primary-navy">{dl.label}</h4>
                        <p className="text-[10px] text-gray-500 font-light">Authors must comply with maximum page sizes and LaTeX guidelines.</p>
                      </div>
                      <span className={`mt-2 sm:mt-0 font-mono text-xs px-2.5 py-1 font-bold rounded ${
                        isPassed ? 'text-red-500 bg-red-100' : 'text-[#C9A961] bg-[#0A1F44]'
                      }`}>
                        {dl.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Speakers Tab */}
        {activeTab === 'speakers' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* General Chairs */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-primary-navy text-center mb-8">General Chair(s) of the Assembly</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {conference.general_chairs.map((chair, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg border border-divider shadow-sm flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center text-primary-navy text-base font-bold shrink-0">
                      {chair.split(" ").pop()?.charAt(0) || "C"}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-primary-navy text-sm leading-none">{chair}</h4>
                      <p className="text-[10px] text-[#C9A961] font-mono tracking-wider uppercase mt-1">General Committee Chair</p>
                      <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed">Directs editorial compliance and verifies reviewers scores before final publication recommendation.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keynote Speakers */}
            <div className="pt-8 border-t border-divider">
              <h3 className="font-serif text-2xl font-bold text-primary-navy text-center mb-8">Confirmed Keynote Speakers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {conference.keynote_speakers.map((speaker, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-divider text-center group hover:border-[#C9A961] transition">
                    <div className="w-16 h-16 rounded-full bg-primary-navy flex items-center justify-center mx-auto text-white text-lg font-serif font-semibold group-hover:bg-[#C9A961] group-hover:text-primary-navy transition-colors mb-3 shadow-inner">
                      {speaker.charAt(0)}
                    </div>
                    <span className="font-serif text-xs font-bold block text-primary-navy tracking-tight">{speaker}</span>
                    <span className="text-[9px] text-gray-400 uppercase font-mono block mt-1 tracking-wider">Distinguished Keynote</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tracks Tab */}
        {activeTab === 'tracks' && (
          <div className="animate-fade-in space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-2xl font-bold text-primary-navy">Call for Contributions: Active Scientific Tracks</h3>
              <p className="text-xs text-gray-500 font-light">We encourage peer authors to map their draft methodologies inside our designated sectors.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getTracks().map((track, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-divider shadow-sm hover:shadow-md transition">
                  <div className="flex items-center space-x-2 text-primary-navy mb-3">
                    <span className="w-6 h-6 rounded-full bg-accent-gold/20 flex items-center justify-center text-xs font-semibold text-primary-navy">{idx + 1}</span>
                    <h4 className="font-serif text-sm font-bold leading-none">{track.name}</h4>
                  </div>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">{track.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Tab */}
        {activeTab === 'submit' && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            {submittedPaperInfo ? (
              <div className="bg-white rounded-lg border-2 border-accent-gold p-8 shadow-md text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-primary-navy">Draft Registered Successfully</h3>
                  <p className="text-xs text-gray-500 font-mono">Assigned Handle: {submittedPaperInfo.paperId}</p>
                </div>

                <div className="bg-neutral-warm p-4 rounded text-xs text-left text-gray-700 space-y-3 font-mono border">
                  <p><strong>Manuscript:</strong> {submittedPaperInfo.title}</p>
                  <p><strong>Primary Contact:</strong> {submittedPaperInfo.author} ({paperEmail})</p>
                  <p><strong>Active Track:</strong> {submittedPaperInfo.track}</p>
                  <p><strong>Peer Status:</strong> <span className="text-accent-gold underline font-bold">{submittedPaperInfo.status}</span></p>
                  <div className="border-t border-divider pt-3 text-[11px] italic font-sans text-gray-500 leading-relaxed">
                    <strong>Editorial Review Notes:</strong> {submittedPaperInfo.editorsOpinion}
                  </div>
                </div>

                <div className="pt-2 flex justify-center space-x-3">
                  <button 
                    onClick={() => {
                      setSubmittedPaperInfo(null);
                      setPaperTitle("");
                      setPaperAbstract("");
                    }} 
                    className="px-5 py-2.5 border border-divider text-xs uppercase font-semibold text-gray-700 hover:bg-neutral-warm rounded"
                  >
                    Submit Another Manuscript
                  </button>
                  <button 
                    onClick={() => setActiveTab('overview')} 
                    className="px-5 py-2.5 bg-primary-navy text-white text-xs uppercase font-semibold hover:bg-primary-navy-hover rounded"
                  >
                    Return to Overview
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-divider p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-primary-navy">Manuscript Abstract Registration</h3>
                  <p className="text-xs text-gray-500 font-light mt-1">Submit your 250-word paper abstract. Dynamic validation checks track alignment before releasing peer reviewer handles.</p>
                </div>

                <form onSubmit={handleSubmitPaper} className="space-y-4 text-xs font-semibold">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Primary Author Full Name</label>
                      <input
                        type="text"
                        required
                        value={paperAuthor}
                        onChange={(e) => setPaperAuthor(e.target.value)}
                        placeholder="e.g., Dr. Jane Robinson"
                        className="w-full bg-neutral-warm/40 border border-divider rounded px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Author Correspondence Email</label>
                      <input
                        type="email"
                        required
                        value={paperEmail}
                        onChange={(e) => setPaperEmail(e.target.value)}
                        placeholder="e.g., jane.robinson@university.edu"
                        className="w-full bg-neutral-warm/40 border border-divider rounded px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Target Research Track</label>
                    <select
                      required
                      value={paperTrack}
                      onChange={(e) => setPaperTrack(e.target.value)}
                      className="w-full bg-neutral-warm border border-divider rounded px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                    >
                      <option value="">-- Choose a Track --</option>
                      {getTracks().map((tr, idx) => (
                        <option key={idx} value={tr.name}>{tr.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Manuscript Title</label>
                    <input
                      type="text"
                      required
                      value={paperTitle}
                      onChange={(e) => setPaperTitle(e.target.value)}
                      placeholder="e.g., Advancing IoT Security through Cognitive Edge Topology Metrics"
                      className="w-full bg-neutral-warm/40 border border-divider rounded px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold flex justify-between">
                      <span>Scientific Abstract (250 Words Max)</span>
                      <span className="font-mono text-gray-400 font-light">{paperAbstract.split(/\s+/).filter(Boolean).length} / 250 words</span>
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={paperAbstract}
                      onChange={(e) => setPaperAbstract(e.target.value)}
                      placeholder="Type or paste your research abstract text here, detailing background logic, exact materials/methods, results, and structural conclusions."
                      className="w-full bg-neutral-warm/40 border border-divider rounded px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    />
                  </div>

                  {/* Drag-and-drop placeholder matching Usability Pattern from System Prompt */}
                  <div className="border-2 border-dashed border-divider rounded-lg p-6 bg-neutral-warm/20 text-center space-y-2">
                    <BookOpen className="w-8 h-8 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-xs text-gray-700 font-semibold">Select Full Manuscript Draft (Optional)</p>
                      <p className="text-[10px] text-gray-400 font-light">Drag-and-drop PDF, DOCX file formats up to 12MB. LaTeX source folders can be zipped.</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0A1F44] hover:bg-primary-navy-hover text-[#C9A961] uppercase tracking-wider font-semibold py-3 rounded text-xs transition flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Compiling Metadata checks...</span>
                      </>
                    ) : (
                      <span>Submit Primary Abstract</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Register Tab */}
        {activeTab === 'register' && (
          <div className="animate-fade-in max-w-xl mx-auto">
            {isPaid ? (
              <div className="bg-[#0A1F44] text-neutral-warm rounded-lg border-2 border-accent-gold p-8 shadow-xl text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center mx-auto text-[#C9A961]">
                  <Award className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A961] font-bold">Registration Pass Guaranteed</span>
                  <h3 className="font-serif text-3xl font-bold tracking-tight text-white mb-1">RiTECHS Conference Assembly</h3>
                  <p className="text-xs text-[#C9A961] font-mono font-medium">{badgeId}</p>
                </div>

                <div className="border border-white/15 p-6 rounded-md text-left text-xs bg-white/5 space-y-3 font-mono">
                  <p className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Participant:</span>
                    <span className="font-bold text-white">{paperAuthor || 'Academic Scholar'}</span>
                  </p>
                  <p className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Insitution Affiliation:</span>
                    <span className="font-bold text-white max-w-[200px] text-right truncate">{institution}</span>
                  </p>
                  <p className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Registered Conference:</span>
                    <span className="font-bold text-white">{conference.name}</span>
                  </p>
                  <p className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Tier:</span>
                    <span className="font-bold text-[#C9A961] uppercase">{tier} Pass</span>
                  </p>
                  <p className="flex justify-between pt-2 text-[#C9A961]">
                    <span className="font-bold uppercase tracking-wide">Total Fee Settled:</span>
                    <span className="font-bold">£{getTierPrice()} GBP</span>
                  </p>
                </div>

                <p className="text-[10px] text-gray-400 font-light leading-relaxed">
                  *A copy of this digital entry token and high-resolution receipt invoice is dispatched to your registration email. Access links for sessions will unlock in your Workspace dashboard 48 hours prior.
                </p>

                <div className="flex justify-center space-x-3 pt-2">
                  <button 
                    onClick={() => {
                      setIsPaid(false);
                      setInstitution("");
                    }} 
                    className="px-5 py-2.5 border border-white/10 text-xs uppercase font-semibold hover:bg-white/5 rounded text-gray-300"
                  >
                    Adjust Tier
                  </button>
                  <button 
                    onClick={() => setActiveTab('overview')} 
                    className="px-5 py-2.5 bg-[#C9A961] text-[#0A1F44] text-xs uppercase font-semibold hover:bg-[#bda056] rounded"
                  >
                    View Overview
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg border border-divider shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-primary-navy">Select Registration Package</h3>
                  <p className="text-xs text-gray-500 font-light mt-1">Registered members are granted full access to physical presentations, workshop tea breaks, published digital proceedings, and certification.</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setTier('author')}
                    className={`p-4 border rounded-md text-center transition flex flex-col justify-between h-32 ${
                      tier === 'author' ? 'border-[#C9A961] bg-[#0A1F44]/5 text-primary-navy font-semibold ring-1 ring-[#C9A961]' : 'border-divider hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wide">Author Tier</span>
                    <span className="font-serif text-xl font-bold block mt-2 text-primary-navy">£350</span>
                    <span className="text-[9px] text-gray-400 block font-light leading-none">Paper published included</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTier('student')}
                    className={`p-4 border rounded-md text-center transition flex flex-col justify-between h-32 ${
                      tier === 'student' ? 'border-[#C9A961] bg-[#0A1F44]/5 text-primary-navy font-semibold ring-1 ring-[#C9A961]' : 'border-divider hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wide">Student Tier</span>
                    <span className="font-serif text-xl font-bold block mt-2 text-primary-navy">£180</span>
                    <span className="text-[9px] text-gray-400 block font-light leading-none">Valid ID verified</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTier('watcher')}
                    className={`p-4 border rounded-md text-center transition flex flex-col justify-between h-32 ${
                      tier === 'watcher' ? 'border-[#C9A961] bg-[#0A1F44]/5 text-primary-navy font-semibold ring-1 ring-[#C9A961]' : 'border-divider hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wide">Participant</span>
                    <span className="font-serif text-xl font-bold block mt-2 text-primary-navy">£100</span>
                    <span className="text-[9px] text-gray-400 block font-light leading-none">Watcher only pass</span>
                  </button>
                </div>

                <form onSubmit={handleRegisterReceipt} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Affiliated Academic Institution</label>
                    <input
                      type="text"
                      required
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g., University of Genoa, Italy"
                      className="w-full bg-neutral-warm/40 border border-divider rounded px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    />
                  </div>

                  <div className="p-4 bg-neutral-warm rounded border text-xs text-gray-600 space-y-1">
                    <p className="font-semibold text-primary-navy flex justify-between">
                      <span>Package Amount:</span>
                      <span>£{getTierPrice()} GBP</span>
                    </p>
                    <p className="text-[10px] text-gray-400 font-light">VAT & proceedings database access fees included. Free cancellation up to 14 days before start.</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0A1F44] hover:bg-primary-navy-hover text-white py-3 font-semibold uppercase tracking-wider text-xs rounded transition"
                  >
                    Generate Pass Token & Access
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

      </main>

    </div>
  );
}
