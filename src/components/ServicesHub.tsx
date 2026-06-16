import React, { useState, useRef, useEffect } from 'react';
import { SERVICES, COURSES } from '../data';
import { 
  Play, Pause, Award, GraduationCap, ArrowRight, BookOpen, Clock, Users, 
  Sparkles, AlertCircle, FileText, CheckCircle2, Volume2, Search, Settings, 
  Mail, Phone, FileSignature, Presentation, Layers, HelpCircle, Columns, 
  Layout, Image, Maximize2, Check, Download, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesHubProps {
  initialSub?: string | null;
}

export default function ServicesHub({ initialSub }: ServicesHubProps) {
  const [selectedTab, setSelectedTab] = useState<'services' | 'elearning' | 'modification' | 'posters'>(
    initialSub === 'elearning' || initialSub === 'training-partner' ? 'elearning' :
    initialSub === 'modification' ? 'modification' :
    initialSub === 'posters' ? 'posters' : 'services'
  );

  // e-learning states
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lectureProgress, setLectureProgress] = useState(35);
  const [userScore, setUserScore] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Synchronize playing state with standard HTML5 video API
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(e => {
          console.log("Play prevented:", e);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle chapter changes - reset stream states smoothly
  useEffect(() => {
    setIsPlaying(false);
    setLectureProgress(0);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentChapter, selectedCourse]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percentage = Math.round((videoRef.current.currentTime / videoRef.current.duration) * 100);
      setLectureProgress(isNaN(percentage) ? 0 : percentage);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setLectureProgress(100);
    setCourseCompleted(true);
    setUserScore(100); // Auto-unlock success certification when video finishes
  };

  // Modification Tool states
  const [inputTextForReview, setInputTextForReview] = useState("");
  const [isProofreading, setIsProofreading] = useState(false);
  const [reportResult, setReportResult] = useState<any | null>(null);

  // Active sub-service under Academic Modification section
  const [activeModSub, setActiveModSub] = useState<'editing' | 'proofreading' | 'formatting'>('editing');

  // Contact modal states
  const [contactSubject, setContactSubject] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);

  // Poster Section visual hover state
  const [focusPosterSection, setFocusPosterSection] = useState<string | null>(null);

  // Gallery interactive states
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const courseChapters = [
    { title: "Chapter 1: Core System Telemetry Protocols", desc: "Setting up testbeds, identifying frequency anomalies, and configuring hardware parameters." },
    { title: "Chapter 2: Cryptographic Handshakes on Distant Servers", desc: "Managing peer verification, certificate chains, and mitigating Side-Channel signals." },
    { title: "Chapter 3: Edge Computing Anomaly Vector Tracing", desc: "Using neural classifiers directly on resource-constrained microgrids." }
  ];

  // ITSS-IoE 2021 High Quality Gallery Images with descriptive contexts
  const galleryPhotos = [
    {
      id: 1,
      title: "Keynote Plenary Session",
      desc: "Distinguished scholars presenting cognitive edge computing frameworks under ITSS-IoE2021 tracks.",
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      tag: "Keynote"
    },
    {
      id: 2,
      title: "Roundtable Technical Evaluation",
      desc: "Peer discussions on IoT cybersecurity telemetry guidelines and author draft reviews.",
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
      tag: "Roundtable"
    },
    {
      id: 3,
      title: "Scientific Poster Exhibition",
      desc: "Scholars showcasing interactive class posters arranged in elegant multi-columns format.",
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      tag: "Posters"
    },
    {
      id: 4,
      title: "Young Researchers Award Ceremony",
      desc: "Celebrating independent scholars for exceptional dual-blind contribution ratings.",
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      tag: "Awards"
    },
    {
      id: 5,
      title: "International Collaborative Alliance",
      desc: "RiTECHS Directors coordinating virtual multi-lab agreements with Wolverhampton and Genoa advisors.",
      url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800",
      tag: "Networking"
    },
    {
      id: 6,
      title: "Parallel Session Presentation",
      desc: "Mentees detailing active packet inspections using neural network simulations.",
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      tag: "Presentations"
    }
  ];

  const handleRunProofread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTextForReview.trim()) return;

    setIsProofreading(true);
    setReportResult(null);

    setTimeout(() => {
      const text = inputTextForReview.toLowerCase();
      let passiveVoiceCount = (text.match(/\bis\b|\bwas\b|\bwere\b/g) || []).length;
      let complexityScore = text.length > 300 ? "Highly Scholarly" : "Basic/Medium Density";
      
      const suggestions = [];
      if (passiveVoiceCount > 2) {
        suggestions.push({
          original: "Active versus passive phrasing",
          fix: "Prefer 'We evaluated the telemetry data' instead of 'The telemetry data was evaluated'. This strengthens the editorial rhythm."
        });
      }
      if (!text.includes("specifically") && !text.includes("furthermore")) {
        suggestions.push({
          original: "Transitional gaps",
          fix: "Introduce scientific link-words like 'Furthermore', 'Consequently', or 'Specifically' to bind structural equations."
        });
      }
      if (text.includes("very") || text.includes("really")) {
        suggestions.push({
          original: "Inexact qualifiers",
          fix: "Avoid casual modifiers like 'very' or 'really'. Prefer 'exceedingly', 'remarkably', or state precise numerical limits instead."
        });
      }

      setReportResult({
        academicClarity: Math.min(100, Math.floor(75 + Math.random() * 20)),
        passiveGrammarWarnings: passiveVoiceCount,
        lexicalComplexity: complexityScore,
        suggestionsList: suggestions.length > 0 ? suggestions : [
          { original: "Flawless text structure", fix: "Excellent phrasing! Our review board flags no immediate errors. Plagiarism density clocks under 1%." }
        ]
      });
      setIsProofreading(false);
    }, 1500);
  };

  const handleQuizAnswer = (ans: string) => {
    setSelectedAnswer(ans);
    if (ans === "A dual-blind rigor panel double checking references prior to actual publisher submission.") {
      setUserScore(100);
      setCourseCompleted(true);
    } else {
      setUserScore(0);
    }
  };

  const handleOpenContact = (subjectStr: string) => {
    setContactSubject(subjectStr);
    setShowContactModal(true);
  };

  return (
    <div className="bg-neutral-warm min-h-screen text-text-body font-sans transition-all pb-16">
      
      {/* Premium Academic Solution Header Banner */}
      <section className="bg-[#0A1F44] text-[#FAFAF7] py-20 px-4 md:px-8 border-b-2 border-[#C9A961]/40 relative overflow-hidden" id="solutions-banner">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#C9A961] font-bold bg-white/5 py-1 px-3 rounded border border-white/10 inline-block">Technical Solutions & Learning</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Academic Services, Presentations & Training
          </h1>
          <p className="font-sans text-sm text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Enhance writing impact through editorial vetting, consult computer-supported poster schemas, or register for certified technical online courses.
          </p>

          {/* Elegant subtabs navigation panel */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            <button
              onClick={() => { setSelectedTab('services'); setSelectedCourse(null); }}
              className={`px-4 py-2 rounded text-[11px] font-semibold uppercase tracking-wider transition ${
                selectedTab === 'services' ? 'bg-[#C9A961] text-[#0A1F44] font-bold shadow' : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => { setSelectedTab('modification'); setSelectedCourse(null); }}
              className={`px-4 py-2 rounded text-[11px] font-semibold uppercase tracking-wider transition ${
                selectedTab === 'modification' ? 'bg-[#C9A961] text-[#0A1F44] font-bold shadow' : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Academic Modification
            </button>
            <button
              onClick={() => { setSelectedTab('posters'); setSelectedCourse(null); }}
              className={`px-4 py-2 rounded text-[11px] font-semibold uppercase tracking-wider transition ${
                selectedTab === 'posters' ? 'bg-[#C9A961] text-[#0A1F44] font-bold shadow' : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Poster Presentation
            </button>
            <button
              onClick={() => setSelectedTab('elearning')}
              className={`px-4 py-2 rounded text-[11px] font-semibold uppercase tracking-wider transition ${
                selectedTab === 'elearning' ? 'bg-[#C9A961] text-[#0A1F44] font-bold shadow' : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Training Center & Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Main Container Viewport */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="services-main-layout">
        
        {/* Tab 0: Overview (The Core 6 Services) */}
        {selectedTab === 'services' && (
          <div className="space-y-12 animate-fade-in text-center">
            <div className="max-w-2xl mx-auto space-y-2">
              <h2 className="font-serif text-3xl font-bold text-primary-navy">Our Specialized Technical Framework</h2>
              <p className="text-xs text-slate-500 font-light font-sans">Connecting candidates, veterans, and publication channels through a unified ecosystem.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((serv, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-divider shadow-xs hover:border-[#C9A961] hover:shadow-md transition duration-300 text-left flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded bg-[#0A1F44] text-[#C9A961] flex items-center justify-center group-hover:bg-[#C9A961] group-hover:text-[#0A1F44] transition-colors shadow-xs">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-primary-navy leading-none">{serv.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-light font-sans">{serv.description}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      if (serv.name === "Academic Modification") setSelectedTab('modification');
                      else if (serv.name === "e-Learning") setSelectedTab('elearning');
                      else if (serv.name === "Conference / Workshop") window.open(serv.url, '_blank');
                    }}
                    className="pt-4 border-t border-divider mt-6 flex items-center justify-between text-xs font-semibold text-[#1a4a8a] group-hover:text-accent-gold transition-colors w-full"
                  >
                    <span>Activate Service Portal</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 1: Academic Modification */}
        {selectedTab === 'modification' && (
          <div className="space-y-10 animate-fade-in text-left">
            
            {/* Introductory Explanation requested by user */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 rounded-2xl border border-divider shadow-xs">
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] font-bold bg-[#C9A961]/10 px-2 py-1 rounded">Editorial Vetting</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-primary-navy">
                  Academic Editorial & Clarity Experts
                </h2>
                <p className="text-xs text-gray-600 font-light font-sans leading-relaxed">
                  Clear, concise, and flawless writing is essential in all aspects of life, whether you are a student, professional, or creative writer. Editing your own work can be challenging, as errors can diminish the effectiveness of your message. However, our experts at RiTECHS Academic Modification Service are here to correct any mistakes in your text and ensure that your writing flows coherently and effortlessly.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button 
                    onClick={() => setActiveModSub('editing')} 
                    className={`px-3 py-1.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider transition ${
                      activeModSub === 'editing' ? 'bg-[#0A1F44] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Editing
                  </button>
                  <button 
                    onClick={() => setActiveModSub('proofreading')} 
                    className={`px-3 py-1.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider transition ${
                      activeModSub === 'proofreading' ? 'bg-[#0A1F44] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Proofreading
                  </button>
                  <button 
                    onClick={() => setActiveModSub('formatting')} 
                    className={`px-3 py-1.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider transition ${
                      activeModSub === 'formatting' ? 'bg-[#0A1F44] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Formatting
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-tr from-[#0A1F44] to-[#143d7c] p-6 rounded-xl text-white space-y-4 border border-accent-gold/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <FileSignature className="w-24 h-24" />
                </div>
                <h3 className="font-serif text-lg font-bold">Request Quick Editorial Vetting</h3>
                <p className="text-[11px] text-gray-300 font-sans font-light leading-relaxed">
                  Connect immediately with our university proofreaders for structured corrections of your draft dissertation, manuscript or thesis.
                </p>
                <button
                  onClick={() => handleOpenContact(`Academic Modification Vetting Request [${activeModSub.toUpperCase()}]`)}
                  className="w-full bg-[#C9A961] hover:bg-[#b0914e] text-[#0A1F44] py-2 text-xs font-bold uppercase tracking-wider rounded transition flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Connect with Experts</span>
                </button>
              </div>
            </div>

            {/* Active Sub Service Detailed Content Frame */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
              
              <div className="md:col-span-6 bg-white p-6 rounded-xl border border-divider shadow-xs space-y-4">
                <AnimatePresence mode="wait">
                  {activeModSub === 'editing' && (
                    <motion.div
                      key="editing-desc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 text-primary-navy">
                        <div className="w-8 h-8 rounded bg-[#1a4a8a]/10 flex items-center justify-center">
                          <Layers className="w-4 h-4 text-primary-navy" />
                        </div>
                        <h3 className="font-serif text-lg font-bold uppercase tracking-wide">Editing Service</h3>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-sans font-light">
                        The editing service will confirm that your writing has the optimal conclusive impact on your audience. In addition to proofreading your document for errors and inconsistencies, our editors focus on restructuring complex reasoning patterns, clarifying equations, and improving transitional pacing.
                      </p>
                      
                      <div className="bg-neutral-warm/40 p-4 rounded border border-divider/60 space-y-2.5">
                        <h4 className="text-[10px] font-mono uppercase tracking-wider text-accent-gold font-bold">Contact Directory</h4>
                        <p className="text-xs text-gray-600 font-sans font-semibold">
                          To find out more about editing your documents, please call:
                        </p>
                        <div className="space-y-1.5 text-xs font-mono">
                          <p className="flex items-center text-[#1a4a8a] font-bold">
                            <Users className="w-3.5 h-3.5 text-accent-gold mr-1.5 shrink-0" />
                            <span>Dr. Nadia Refat</span>
                          </p>
                          <a href="tel:+441234678910" className="flex items-center text-gray-650 hover:text-accent-gold transition">
                            <Phone className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
                            <span>+44 (0) 1234 678910</span>
                          </a>
                          <a href="mailto:nadia.refat@gmail.com?subject=RiTECHS Editing Inquiry" className="flex items-center text-gray-650 hover:text-accent-gold transition">
                            <Mail className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
                            <span>nadia.refat@gmail.com</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeModSub === 'proofreading' && (
                    <motion.div
                      key="proofreading-desc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 text-primary-navy">
                        <div className="w-8 h-8 rounded bg-[#1a4a8a]/10 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-[#1a4a8a]" />
                        </div>
                        <h3 className="font-serif text-lg font-bold uppercase tracking-wide">Proofreading Service</h3>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-sans font-light">
                        We will check over for misspellings, incorrect/missed punctuation, inconsistencies (textual and numerical) in your manuscript, thesis, statement, and creative work. Our meticulous review preserves your unique academic voice while making certain no typo compromises double-blind validation scores.
                      </p>

                      <div className="bg-neutral-warm/40 p-4 rounded border border-divider/60 space-y-2.5">
                        <h4 className="text-[10px] font-mono uppercase tracking-wider text-accent-gold font-bold">Contact Directory</h4>
                        <p className="text-xs text-gray-600 font-sans font-semibold">
                          To find out more about Proofreading your documents, please call:
                        </p>
                        <div className="space-y-1.5 text-xs font-mono">
                          <p className="flex items-center text-[#1a4a8a] font-bold">
                            <Users className="w-3.5 h-3.5 text-accent-gold mr-1.5 shrink-0" />
                            <span>Dr. Nadia Refat</span>
                          </p>
                          <a href="tel:+441234678910" className="flex items-center text-gray-650 hover:text-accent-gold transition">
                            <Phone className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
                            <span>+44 (0) 1234 678910</span>
                          </a>
                          <a href="mailto:nadia.refat@gmail.com?subject=RiTECHS Proofreading Inquiry" className="flex items-center text-gray-650 hover:text-accent-gold transition">
                            <Mail className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
                            <span>nadia.refat@gmail.com</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeModSub === 'formatting' && (
                    <motion.div
                      key="formatting-desc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 text-primary-navy">
                        <div className="w-8 h-8 rounded bg-[#1a4a8a]/10 flex items-center justify-center">
                          <Columns className="w-4 h-4 text-primary-navy" />
                        </div>
                        <h3 className="font-serif text-lg font-bold uppercase tracking-wide">Formatting Service</h3>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-sans font-light">
                        We will check over for misspellings, incorrect/missed punctuation, inconsistencies (textual and numerical) in your manuscript, thesis, statement, and creative work. Furthermore, we align your layout strictly with publisher requirements (Springer Lecture Notes, IEEE Transactions, or ACM Guidelines) including reference indexing and citation formatting.
                      </p>

                      <div className="bg-neutral-warm/40 p-4 rounded border border-divider/60 space-y-2.5">
                        <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#1a4a8a] font-bold">Contact Directory</h4>
                        <p className="text-xs text-gray-600 font-sans font-semibold">
                          To find out more about Formatting your documents, please call:
                        </p>
                        <div className="space-y-1.5 text-xs font-mono">
                          <p className="flex items-center text-[#1a4a8a] font-bold">
                            <Users className="w-3.5 h-3.5 text-accent-gold mr-1.5 shrink-0" />
                            <span>Dr. S M Nazmus Sadat</span>
                          </p>
                          <a href="tel:+441234678910" className="flex items-center text-gray-650 hover:text-accent-gold transition">
                            <Phone className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
                            <span>+44 (0) 1234 678910</span>
                          </a>
                          <a href="mailto:nazmus.sadat@gmail.com?subject=RiTECHS Formatting Inquiry" className="flex items-center text-gray-650 hover:text-accent-gold transition">
                            <Mail className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
                            <span>nazmus.sadat@gmail.com</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Interactive abstract stylistic checking tool */}
              <div className="md:col-span-6 bg-white p-6 rounded-xl border border-divider shadow-xs space-y-4">
                <div className="flex items-center space-x-2 text-primary-navy mb-1">
                  <Sparkles className="w-4 h-4 text-accent-gold" />
                  <h4 className="font-serif text-sm font-bold">Try Stylistic Mathematical Evaluation (Simulator)</h4>
                </div>
                
                <form onSubmit={handleRunProofread} className="space-y-3">
                  <textarea
                    rows={4}
                    required
                    value={inputTextForReview}
                    onChange={(e) => setInputTextForReview(e.target.value)}
                    placeholder="Paste draft paragraph to evaluate (e.g. 'Our technical protocols was simulated by us across nodes very really fast...')"
                    className="w-full bg-neutral-warm border border-divider rounded p-3 text-xs focus:outline-none focus:ring-1 focus:ring-accent-gold font-sans font-semibold"
                  />

                  {/* Drag and Drop Visual guideline */}
                  <div className="border-2 border-dashed border-divider rounded p-3.5 bg-neutral-warm/25 text-center cursor-pointer hover:bg-neutral-warm/50 transition">
                    <FileText className="w-5 h-5 text-gray-400 mx-auto" />
                    <p className="text-[10px] text-gray-700 font-bold mt-1">Simulate Full DOCX/PDF Upload</p>
                    <p className="text-[8px] text-gray-400">Drag files here to simulate structured Quality Vetting</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#0A1F44] text-white hover:bg-primary-navy-hover text-xs font-bold uppercase tracking-wider rounded transition flex items-center justify-center space-x-1.5"
                  >
                    <span>Analyze Sentence Structure</span>
                  </button>
                </form>

                {reportResult && (
                  <div className="border-t border-divider pt-3 space-y-3 animate-fade-in text-xs">
                    <div className="flex justify-between items-center text-xs font-serif font-bold text-primary-navy">
                      <span>Grammar Clarity: {reportResult.academicClarity}%</span>
                      <span className="text-[10px] font-mono font-bold text-accent-gold uppercase bg-accent-gold/15 px-2 py-0.5 rounded">
                        {reportResult.lexicalComplexity}
                      </span>
                    </div>
                    <div className="bg-neutral-warm/40 p-3 rounded font-sans text-xs text-gray-650 font-light max-h-[110px] overflow-y-auto space-y-2">
                      {reportResult.suggestionsList.map((sug: any, idx: number) => (
                        <div key={idx} className="border-b border-divider/40 pb-1.5 last:border-b-0">
                          <strong className="text-primary-navy block mb-0.5">{sug.original}</strong>
                          <p className="text-[11px] leading-tight text-gray-500">{sug.fix}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Poster Presentation */}
        {selectedTab === 'posters' && (
          <div className="space-y-10 animate-fade-in text-left">
            
            {/* Context Narrative */}
            <div className="bg-white p-8 rounded-2xl border border-divider shadow-xs space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] font-bold bg-[#C9A961]/10 px-2 py-1 rounded">Science Communication</span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-navy">
                Support & Vetting for Poster Presentations
              </h2>
              <p className="text-xs text-gray-600 font-light font-sans leading-relaxed">
                Academic Posters presentations are excellent ways to showcase the research you have produced in a class in front of an audience. When done correctly posters will effectively communicate your ideas to the audience using visuals. As the aim of these presentations is to demonstrate a summary of your research in a fixed amount of time, it becomes essential to highlight all the important aspects of your research while retaining the limits of the presentations. subject.
              </p>
            </div>

            {/* Poster Management columns */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-primary-navy text-center">How to Manage the Poster</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Tools card */}
                <div 
                  className="bg-white p-6 rounded-xl border border-divider shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  onMouseEnter={() => setFocusPosterSection('tools')}
                  onMouseLeave={() => setFocusPosterSection(null)}
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded bg-[#1a4a8a]/10 text-primary-navy flex items-center justify-center">
                      <Settings className="w-4 h-4 text-primary-navy" />
                    </div>
                    <h4 className="font-serif text-base font-bold text-primary-navy">01. Essential Tools</h4>
                    <p className="text-xs text-gray-500 font-light font-sans leading-relaxed">
                      Out of the various computer programs which can be used to create a poster, Photoshop, Microsoft Publisher and PowerPoint are most commonly used by students and researchers. As a poster needs a lot of editing, it is essential to choose the right tool to work with. Each of these media has their own strengths and weaknesses in terms of technical capabilities.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 mt-4 border-t pt-2 uppercase font-semibold">
                    Photoshop · Publisher · PPT
                  </div>
                </div>

                {/* Sections card */}
                <div 
                  className="bg-white p-6 rounded-xl border border-divider shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  onMouseEnter={() => setFocusPosterSection('sections')}
                  onMouseLeave={() => setFocusPosterSection(null)}
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded bg-[#1a4a8a]/10 text-[#C9A961] flex items-center justify-center">
                      <Columns className="w-4 h-4 text-[#C9A961]" />
                    </div>
                    <h4 className="font-serif text-base font-bold text-primary-navy">02. Structural Sections</h4>
                    <p className="text-xs text-gray-500 font-light font-sans leading-relaxed">
                      Before starting a poster, it is recommended to break down all the research information you want to present into different sections such as Summary, Introduction, Objectives, Theory, Results, and Conclusion, depending on the specifics of your research. Generally, an ideal poster will have four to eight such sections arranged in three or four columns. As posters are read from left to right and top to bottom, it is essential to lay out all the sections strategically so they can be read in order.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-[#1a4a8a] mt-4 border-t pt-2 uppercase font-semibold">
                    Read left-to-right, top-to-bottom
                  </div>
                </div>

                {/* Design card */}
                <div 
                  className="bg-white p-6 rounded-xl border border-divider shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  onMouseEnter={() => setFocusPosterSection('design')}
                  onMouseLeave={() => setFocusPosterSection(null)}
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded bg-[#1a4a8a]/10 text-primary-navy flex items-center justify-center">
                      <Layout className="w-4 h-4 text-primary-navy" />
                    </div>
                    <h4 className="font-serif text-base font-bold text-primary-navy">03. Simple Design</h4>
                    <p className="text-xs text-gray-500 font-light font-sans leading-relaxed">
                      Use a simple format for your poster which is easily readable. The background should be pure white or with a subtle gradient/pattern which does not distract the audience. Although universities recommend the ideal font size and style, the text used in your poster must be clear and easily readable. While making use of charts or graphics, care should be taken that they are easy to understand and free from unnecessary elements. The charts and graphs must be distributed evenly and kept equally sized.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-[#C9A961] mt-4 border-t pt-2 uppercase font-semibold text-right">
                    Pure white background
                  </div>
                </div>

              </div>
            </div>

            {/* Creative Column Visual Layout Indicator */}
            <div className="bg-white rounded-xl border p-6 shadow-xs border-divider space-y-4">
              <h4 className="font-serif text-sm font-bold text-primary-navy flex items-center">
                <Columns className="w-4 h-4 text-accent-gold mr-1.5" />
                <span>Responsive 3-Column Poster Layout Structure Schema</span>
              </h4>
              <p className="text-[11px] text-gray-400 font-sans font-light">Below is the recommended coordinate flow map. Mentees can hover elements to identify spatial sequence.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[10px]">
                {/* Col 1 */}
                <div className="space-y-3 bg-neutral-warm/25 p-3 rounded border border-divider/40">
                  <div className="font-bold text-primary-navy uppercase border-b pb-1">Column 1 (Left)</div>
                  <div className="bg-white p-3 border rounded text-center shadow-2xs hover:border-accent-gold transition">
                    <span className="block font-bold">Summary</span>
                    <span className="text-[9px] text-gray-400">Brief overview core targets</span>
                  </div>
                  <div className="bg-white p-3 border rounded text-center shadow-2xs hover:border-accent-gold transition">
                    <span className="block font-bold">Introduction</span>
                    <span className="text-[9px] text-gray-400">Context & state-of-the-art</span>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="space-y-3 bg-neutral-warm/25 p-3 rounded border border-divider/40">
                  <div className="font-bold text-[#1a4a8a] uppercase border-b pb-1">Column 2 (Center)</div>
                  <div className="bg-white p-3 border rounded text-center shadow-2xs hover:border-accent-gold transition">
                    <span className="block font-bold text-primary-navy">Objectives</span>
                    <span className="text-[9px] text-gray-400">Mathematical limits & formula</span>
                  </div>
                  <div className="bg-white p-3 border rounded text-center shadow-2xs hover:border-accent-gold transition">
                    <span className="block font-bold text-primary-navy">Theory</span>
                    <span className="text-[9px] text-gray-400">Validation parameters schema</span>
                  </div>
                </div>

                {/* Col 3 */}
                <div className="space-y-3 bg-neutral-warm/25 p-3 rounded border border-divider/40">
                  <div className="font-bold text-accent-gold uppercase border-b pb-1">Column 3 (Right)</div>
                  <div className="bg-white p-3 border rounded text-center shadow-2xs hover:border-accent-gold transition">
                    <span className="block font-bold text-[#1a4a8a]">Results</span>
                    <span className="text-[9px] text-gray-400">Telemetry graphics & charts</span>
                  </div>
                  <div className="bg-white p-3 border rounded text-center shadow-2xs hover:border-accent-gold transition">
                    <span className="block font-bold text-[#1a4a8a]">Conclusion</span>
                    <span className="text-[9px] text-gray-400">Conclusive impacts & roadmap</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What you get checks */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              
              <div className="md:col-span-6 bg-white p-6 sm:p-8 rounded-xl border border-divider shadow-xs space-y-4">
                <h4 className="font-serif text-lg font-bold text-primary-navy flex items-center">
                  <Award className="w-5 h-5 text-accent-gold mr-1.5" />
                  <span>Double-signed Poster Deliverables ("What you get")</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-serif font-bold text-primary-navy">No Plagiarism</p>
                      <p className="text-[10px] text-gray-400 font-sans leading-tight">Guaranteed 0% code copy/similarity metrics report</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-serif font-bold text-primary-navy">Editable Facilities</p>
                      <p className="text-[10px] text-gray-400 font-sans leading-tight">Delivery in fully scalable Photoshop, Publisher & PPT formats</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-serif font-bold text-primary-navy">Speech Notes Included</p>
                      <p className="text-[10px] text-gray-400 font-sans leading-tight">Detailed transcript cue notes for active Q&A defense hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-serif font-bold text-primary-navy">Quality Report</p>
                      <p className="text-[10px] text-gray-400 font-sans leading-tight">Peer reviewed layout evaluation and resolution checklist</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Poster Contact frame */}
              <div className="md:col-span-6 bg-[#0A1F44] text-[#FAFAF7] p-6 sm:p-8 rounded-xl border border-accent-gold/25 flex flex-col justify-between">
                <div className="space-y-3 font-sans">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] font-bold">Contact Person</span>
                  <h4 className="font-serif text-lg font-bold text-white">Nadia Refat Advisory Cell</h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    For Poster Presentation, find out more about Poster Presentation your documents, please call: Nadia Refat on +44 (0) 1234 678910 or send an email at nadia.refat@gmail.com
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                  <a 
                    href="tel:+441234678910"
                    className="flex-1 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-bold font-mono tracking-wider uppercase text-center border border-white/15 transition flex items-center justify-center space-x-1.5"
                  >
                    <Phone className="w-4 h-4 text-accent-gold" />
                    <span>Call Nadia Refat</span>
                  </a>
                  <a 
                    href="mailto:nadia.refat@gmail.com?subject=Poster Presentation Inquiry"
                    className="flex-1 py-2 sm:py-2.5 bg-[#C9A961] hover:bg-[#b0914e] text-[#0A1F44] rounded text-xs font-bold font-mono tracking-wider uppercase text-center transition flex items-center justify-center space-x-1.5"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email nadia.refat</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 3: Training (Course catalog + Interactive Player + ITSS-IoE2021 Gallery) */}
        {selectedTab === 'elearning' && (
          <div className="space-y-12 animate-fade-in text-left">
            
            {/* Context narrative from prompt */}
            <div className="bg-white p-8 rounded-2xl border border-divider shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] font-bold bg-[#C9A961]/10 px-2 py-1 rounded">Interactive Training Program</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-primary-navy">
                  Certified Technology Online Courses
                </h2>
                <div className="text-xs text-slate-500 font-light font-sans space-y-3 leading-relaxed">
                  <p>
                    The RiTECHS training delivers high-quality, peer-reviewed online courses on a variety of topics. There are many course hours in core and emerging technologies are delivered by the RiTECHS, offering professionals, professors, and students from academic institutions with a better method to learn.
                  </p>
                  <p>
                    Researchers may utilize the RiTECHS training to quickly remain up to date on the newest advancements in relevant technologies, increasing collaboration with other research teams. These courses were created by accredited specialists in a variety of engineering and research technologies.
                  </p>
                </div>
              </div>

              <div className="md:col-span-4 bg-neutral-warm p-5 border border-divider rounded-xl space-y-3">
                <div className="flex items-center space-x-1 font-serif text-xs font-bold text-primary-navy uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-accent-gold" />
                  <span>Program Advantages</span>
                </div>
                <ul className="space-y-2 text-[11px] font-sans text-gray-500">
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-600 mr-1 shrink-0" /> Double-signed PDF credits</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-600 mr-1 shrink-0" /> Accredited university teachers</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-600 mr-1 shrink-0" /> Live interactive micro-quizzes</li>
                </ul>
              </div>
            </div>

            {/* Course catalog player */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-primary-navy text-center border-b pb-4">
                Explore Core Courses Syllabus
              </h3>

              {!selectedCourse ? (
                /* Course Grid Catalog List */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {COURSES.map((course, idx) => (
                    <div key={idx} className="bg-white rounded-lg border shadow-sm p-6 flex flex-col justify-between h-64 hover:border-[#C9A961] transition">
                      <div className="space-y-3">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-accent-gold font-bold">{course.category}</span>
                          <span className="text-xs font-mono font-bold text-[#1a4a8a]">{course.price}</span>
                        </div>
                        <h4 className="font-serif text-lg font-bold text-primary-navy leading-snug">{course.title}</h4>
                        <p className="text-xs text-gray-500 leading-tight font-sans font-light">Instructor: {course.instructor}</p>
                        
                        <div className="mt-2 flex items-center space-x-4 text-[11px] text-gray-400 font-medium">
                          <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {course.duration}</span>
                          <span className="flex items-center"><Users className="w-3.5 h-3.5 mr-1" /> {course.subscribers} enrolled</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setCurrentChapter(0);
                          setIsPlaying(false);
                          setLectureProgress(35);
                          setUserScore(null);
                          setSelectedAnswer(null);
                          setCourseCompleted(false);
                        }}
                        className="w-full bg-[#0A1F44] hover:bg-primary-navy-hover text-white py-2 text-xs font-semibold uppercase tracking-wider rounded transition mt-4"
                      >
                        Launch Interactive Player
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                /* Stream player */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* Simulated Player */}
                    <div className="bg-[#1A1A2E] text-white rounded-lg border border-white/10 overflow-hidden relative shadow-lg">
                      <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] uppercase font-mono tracking-wider font-bold pointer-events-none">
                        {selectedCourse.category} · {courseChapters[currentChapter].title}
                      </div>

                      <div className="h-64 sm:h-[320px] w-full relative bg-black flex items-center justify-center">
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          src="/video%202.mp4"
                          playsInline
                          onTimeUpdate={handleTimeUpdate}
                          onEnded={handleVideoEnded}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            console.log("video 2.mp4 failed, playing webinar fallback video loop");
                            e.currentTarget.src = "https://assets.mixkit.co/videos/preview/mixkit-video-seminar-on-a-large-screen-40344-large.mp4";
                          }}
                        />

                        {!isPlaying && (
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 z-10 space-y-4">
                            <button
                              onClick={() => setIsPlaying(true)}
                              className="w-14 h-14 rounded-full bg-[#C9A961] text-[#0A1F44] flex items-center justify-center hover:scale-105 transition shadow-lg mx-auto cursor-pointer font-bold"
                            >
                              <Play className="w-6 h-6 fill-current ml-0.5" />
                            </button>
                            <p className="text-xs font-semibold text-white tracking-wider">Stream Paused. Press Play to watch the class lecture.</p>
                          </div>
                        )}

                        <div className="absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-xs px-4 py-2.5 flex items-center justify-between text-xs font-mono text-gray-300 z-20">
                          <div className="flex items-center space-x-3">
                            <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#C9A961] transition" title={isPlaying ? "Pause" : "Play"}>
                              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                            </button>
                            <span className="text-[10px]">Lecture Course: {selectedCourse.title}</span>
                          </div>
                          <span className="text-[10px] text-[#C9A961] font-bold">Progress: {lectureProgress}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Quiz panel */}
                    <div className="bg-white p-6 rounded-xl border-t-4 border-accent-gold shadow-sm space-y-4">
                      <h4 className="font-serif font-bold text-sm text-primary-navy">Chapter Vetting validation Task</h4>
                      <p className="text-xs text-gray-600 font-semibold">What is the core method used by our review board to ensure scholarly integrity?</p>
                      
                      <div className="space-y-2 text-xs">
                        <button
                          onClick={() => handleQuizAnswer("Mock reviews containing standard templates.")}
                          className={`w-full text-left p-3 border rounded-md transition ${
                            selectedAnswer === "Mock reviews containing standard templates." ? 'bg-red-50 border-red-250 text-red-800' : 'hover:bg-neutral-warm/30'
                          }`}
                        >
                          A. Simulated mock reviews containing standard templates.
                        </button>
                        <button
                          onClick={() => handleQuizAnswer("A dual-blind rigor panel double checking references prior to actual publisher submission.")}
                          className={`w-full text-left p-3 border rounded-md transition ${
                            selectedAnswer === "A dual-blind rigor panel double checking references prior to actual publisher submission." ? 'bg-emerald-50 border-emerald-250 text-emerald-900 border-l-4 font-bold border-emerald-500' : 'hover:bg-neutral-warm/30'
                          }`}
                        >
                          B. A dual-blind rigor panel double checking references prior to actual publisher submission.
                        </button>
                      </div>

                      {userScore === 100 && (
                        <div className="bg-emerald-50 border border-emerald-100 rounded p-4 text-xs text-emerald-900 font-medium animate-fade-in space-y-3">
                          <p>✓ Correct choice! Academic verification matches. Certificate of vocational achievement is unlocked!</p>
                          <div className="bg-white p-4 border rounded shadow-2xs text-left max-w-sm text-[10px] font-mono text-gray-600 space-y-1">
                            <p className="text-primary-navy font-bold uppercase border-b pb-1">Verified Credential: CERT-RIT-901B</p>
                            <p>Verify-Hash: 44F8B39B2A8C1004C992</p>
                            <p>Instructor: Prof. Dr. Md Arafatur Rahman</p>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                  <div className="lg:col-span-4 space-y-4">
                    <button 
                      onClick={() => setSelectedCourse(null)} 
                      className="w-full py-2 bg-gray-100 hover:bg-gray-250 transition rounded font-semibold text-xs text-center border text-gray-500 uppercase tracking-wider"
                    >
                      ← Back to Courses List
                    </button>

                    <div className="bg-white rounded-xl border shadow-xs overflow-hidden">
                      <div className="bg-[#0A1F44] text-white p-4">
                        <h4 className="font-serif text-sm font-bold">Chapters Playlist</h4>
                      </div>
                      <div className="divide-y divide-divider">
                        {courseChapters.map((ch, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setCurrentChapter(idx);
                              setIsPlaying(false);
                              setLectureProgress(idx === 0 ? 35 : idx === 1 ? 65 : 100);
                              setSelectedAnswer(null);
                              setUserScore(null);
                            }}
                            className={`w-full text-left p-3.5 transition text-xs font-serif ${
                              currentChapter === idx ? 'bg-[#C9A961]/10 border-l-4 border-[#C9A961] font-bold' : 'hover:bg-neutral-warm/50'
                            }`}
                          >
                            Chapter {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* **ITSS-IoE 2021 Gallery Gallery Grid** Requested by user */}
            <div className="space-y-6 pt-10 border-t border-divider">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] bg-white border border-[#C9A961]/40 px-2 py-0.5 rounded font-bold">Historic Showcase</span>
                <h3 className="font-serif text-2xl font-bold text-primary-navy uppercase tracking-tight">ITSS-IoE 2021 Virtual & Onsite Gallery</h3>
                <p className="text-xs text-slate-500 font-light font-sans">
                  Capturing prominent moments of the International Conference on Intelligent Technology, System and Service for Internet of Everything 2021.
                </p>
              </div>

              {/* Grid Layout of photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="itss-gallery-grid">
                {galleryPhotos.map((photo, idx) => (
                  <div 
                    key={photo.id}
                    className="bg-white rounded-xl border border-divider overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedPhoto(idx)}
                  >
                    <div className="h-48 bg-neutral-warm relative overflow-hidden">
                      <img 
                        src={photo.url} 
                        alt={photo.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-primary-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white/90 p-2 rounded-full text-primary-navy">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                      <span className="absolute top-3 left-3 bg-[#0A1F44] text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-mono font-bold">
                        {photo.tag}
                      </span>
                    </div>

                    <div className="p-4 space-y-1">
                      <h4 className="font-serif text-xs font-bold text-primary-navy group-hover:text-accent-gold transition-colors">{photo.title}</h4>
                      <p className="text-[11px] text-gray-500 font-sans leading-relaxed font-light line-clamp-2">{photo.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Direct Professional Inquiry popup Modal */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="absolute inset-0 bg-primary-navy/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl border shadow-xl w-full max-w-md relative z-10 overflow-hidden font-sans text-text-body"
            >
              <div className="bg-[#0A1F44] text-[#FAFAF7] p-5 border-b border-[#C9A961]/35 flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-base font-bold text-white">Direct Advisory Request</h3>
                  <p className="text-[10px] text-gray-300 font-mono">RiTECHS Solutions Hub Center</p>
                </div>
                <button 
                  onClick={() => setShowContactModal(false)} 
                  className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                >
                  Close
                </button>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Advisory proposal dispatched! Nadia Refat's team will review constraints and coordinate hours.");
                  setShowContactModal(false);
                }}
                className="p-5 space-y-4 text-xs font-semibold text-gray-700"
              >
                <div>
                  <label className="block mb-1">Inquiry Context Subject / Program</label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full bg-neutral-warm border border-divider rounded px-3 py-2 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Doctoral Candidate"
                      className="w-full bg-neutral-warm border border-divider rounded px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">University / Organization</label>
                    <input
                      type="text"
                      required
                      placeholder="Wolverhampton University"
                      className="w-full bg-neutral-warm border border-divider rounded px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Message or Manuscript abstract</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details of your research topics, citation formats and required milestones."
                    className="w-full bg-neutral-warm border border-divider rounded px-3 py-2 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0A1F44] text-white hover:bg-primary-navy uppercase font-bold tracking-wider text-xs rounded transition"
                >
                  Dispatch Proposal Vetting Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ITSS-IoE 2021 Gallery Image zoom Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-primary-navy/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-2xl overflow-hidden border shadow-2xl max-w-2xl w-full relative z-10 text-left font-sans text-text-body"
            >
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="bg-black/60 text-white hover:bg-black/80 rounded-full p-1.5 transition"
                  title="Close zoom"
                >
                  ✕
                </button>
              </div>

              <div className="h-72 sm:h-96 relative bg-neutral-warm">
                <img 
                  src={galleryPhotos[selectedPhoto].url} 
                  alt={galleryPhotos[selectedPhoto].title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 left-4 bg-accent-gold text-[#0A1F44] text-[10px] tracking-wider uppercase px-2.5 py-1 rounded font-mono font-bold">
                  {galleryPhotos[selectedPhoto].tag} · ITSS-IoE 2021
                </span>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-serif text-lg font-bold text-primary-navy">{galleryPhotos[selectedPhoto].title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">{galleryPhotos[selectedPhoto].desc}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
