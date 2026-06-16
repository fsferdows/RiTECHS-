import React, { useState, useEffect } from 'react';
import { Conference } from '../types';
import { 
  Calendar, MapPin, Users, BookOpen, Clock, ThumbsUp, Tag, Plus, 
  CheckCircle, Award, Volume2, Target, ExternalLink, FileText, Check, 
  Search, Lock, Shield, Cpu, Layers, Globe, ChevronRight, Info, Phone, 
  Mail, FileDown, X 
} from 'lucide-react';

interface ConferenceDetailProps {
  conference: Conference;
  onBack: () => void;
}

export default function ConferenceDetail({ conference, onBack }: ConferenceDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'dates' | 'speakers' | 'tracks' | 'submit' | 'register'>('overview');
  const [countdownString, setCountdownString] = useState("");
  const [selectedTrackTab, setSelectedTrackTab] = useState<number>(0);
  const [trackSearchQuery, setTrackSearchQuery] = useState("");
  
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
  const [isEarlyBird, setIsEarlyBird] = useState(true);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Expanded FAQs/Details Accordion
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const getTierPrice = () => {
    if (isEarlyBird) {
      if (tier === 'author') return 400; // EUR Local / Overseas Early Bird
      if (tier === 'student') return 400;
      return 400;
    } else {
      if (tier === 'author') return 450; // EUR Regular
      if (tier === 'student') return 450;
      return 450;
    }
  };

  // Compute countdown to closest deadline
  useEffect(() => {
    const calcCountdown = () => {
      const activeDeadlines = conference.deadlines.filter(d => new Date(d.date) >= new Date());
      if (activeDeadlines.length === 0) {
        setCountdownString("Submissions officially closed");
        return;
      }
      
      const targetDate = new Date(activeDeadlines[0].date);
      const now = new Date();
      const diffTime = targetDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setCountdownString(`${diffDays} Days Remaining for [${activeDeadlines[0].label}]`);
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
        status: 'Initial Verification',
        reviewScore: 'Awaiting Peer Dispatch',
        editorsOpinion: 'First-level telemetry check completed. The plagiarism threshold is verified at under 10%. Dual-blind assign is routing this to 2 technical program members.'
      });
      setIsSubmitting(false);
    }, 1800);
  };

  const handleRegisterReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institution) return;
    const badgeNum = "REG-" + conference.id + "-" + Math.floor(1000 + Math.random() * 9000);
    setBadgeId(badgeNum);
    setIsPaid(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 4000);
  };

  // 10-step formatting guidelines for Springer LNCS proceedings
  const paperStructureSteps = [
    { title: "Title Design", desc: "Must clearly map the core scientific problem, the proposed solution model, and target domain." },
    { title: "Structured Abstract", desc: "Maximum 250 words briefly highlighting context, clear objective, exact methodology, core results, and academic or societal impact." },
    { title: "Background / Introduction", desc: "Introduce theoretical context, state the problem with validated metrics, pinpoint research gaps, and list main contributions." },
    { title: "Related Work", desc: "Analyze minimum 10 recent peer-indexed publications. Outline specific ways your model out-performs existing state-of-the-art frameworks." },
    { title: "Materials & Methodology", desc: "A comprehensive description of research pipelines, system block diagrams, algorithm equations, and experimental setups." },
    { title: "Results & Discussion", desc: "Illustrate findings with high-quality tables and graphs. Explicitly interpret mathematical variations and limit conditions." },
    { title: "Conclusion", desc: "Summarize the major thesis outcomes, outline limitations, and present recommended next-stage trajectories." },
    { title: "Academic References", desc: "Minimum 15 recent citations (within index pools like IEEE, Elsevier, Springer). At least 60% must be within the last five years." },
    { title: "Manuscript Format", desc: "Strictly adhere to the Microsoft Word/LaTeX Springer LNEE standard format. Approximately 15 pages." },
    { title: "Similarity / Plagiarism Threshold", desc: "Must not exceed 10% similarity index (excluding bibliography). Block similarity or AI-written prose is strictly filtered." }
  ];

  // Specific Tracks depending on Conference type
  const getTracksData = () => {
    if (conference.id.includes("ICETCS")) {
      return [
        {
          num: 1,
          name: "Cyber Security and Network Space Challenges and Solutions",
          topics: [
            "Advanced Hacking defenses", "Malicious Phishing mitigation models", "Supply Chain Cybersecurity Risks",
            "Man-in-the-Middle active interception blocking", "DNS Tunneling detection analytics", "Ransomware payload sandboxing",
            "Strategic Threat Intelligence frameworks", "Operational & Tactical threat actors profiling", "Preventing SQL injection via compile-time verification",
            "Sniffing and Spoofing tracebacks", "Database Exposure mitigation tools", "Expert Support systems in Cybersecurity"
          ]
        },
        {
          num: 2,
          name: "Cyber Security Challenges for Connected / Autonomous Vehicles and Mobility Transport",
          topics: [
            "Intelligent Transportation Systems (ITS) vulnerabilities", "Automatic License Plate Recognition security",
            "Digital network control systems in public tunnels", "Passenger announcement system spoofing safeguards",
            "Guideway Intrusion Detection Systems (GIDS)", "CCTV data encryption and edge access limits",
            "Sensors saturation and Jamming countermeasures", "GPS/GNSS spoofing countermeasures", "CANbus spoofing mitigation"
          ]
        },
        {
          num: 3,
          name: "Cloud Security, Architecture and Its Future",
          topics: [
            "Misconfigurations audit utilities", "Broken Access Control tracking", "Disaster Recovery hot-standby automation",
            "Domain Hijacking proactive safeguards", "Cryptographic key inventory control", "Continuous logging & anomaly warning",
            "Insecure developer credentials rotation", "Publicly accessible storage leak scanners", "Serverless cloud cold-start safety"
          ]
        },
        {
          num: 4,
          name: "Blockchain Architecture, Theories and Distributed Ledger Protection",
          topics: [
            "Mathematical theories of distributed consensus", "Scalability, decentralization & safety trade-offs",
            "Fault tolerance protocols & crash-recovery", "Smart Contract formal verification", "Performance optimization models",
            "New blockchain parallel architecture designs", "Private & Consortium ledgers security", "Tokenomics cryptography validation"
          ]
        },
        {
          num: 5,
          name: "Securing the Connected World: IoT Ecosystem Cybersecurity",
          topics: [
            "IoT hardware authentication models", "Cyber-Physical systems physical-layer spoofing", "IoT Supply Chain tracing",
            "Cyber resilience in smart agricultural devices", "Crowdsensing telemetry data preservation", "Edge & Fog compute access limits",
            "Securing 5G/6G mobile cellular IoT landscapes", "Game Theory algorithms for IoT attacker isolation", "Industry 4.0 industrial system safety"
          ]
        },
        {
          num: 6,
          name: "Cybersecurity for Space Systems and Satellite Infrastructure",
          topics: [
            "Satellite ground segment telemetry encryption", "LEO, MEO and GEO constellation trust models",
            "Anti-jamming models in high-altitude links", "Space-based IoT networks physical protection",
            "Deep space inter-satellite protocol verification", "Quantum-resistant cryptography for satellite systems",
            "Zero-Trust frameworks for ground stations integration", "Digital twin simulators for spacecraft threat telemetry"
          ]
        },
        {
          num: 7,
          name: "CyberVehiCare: Vehicular Resilience, Health Tracking and Intelligent V2X Monitoring",
          topics: [
            "Cyber-Physical Vehicular Health Monitoring Systems (CP-VHMS)", "AI/ML anomaly telemetry in Automotive Ethernet and CAN",
            "Intrusion Detection and Prevention (IDS/IPS) for in-vehicle backbones", "Secure Over-the-Air (OTA) firmware update models",
            "Edge-powered vehicular predictive maintenance", "Joint safety & cyber security co-design (ISO 21434, UNECE WP.29)",
            "Distributed ledger databases for accident logging", "Secure V2X communication (5G, 6G-enabled ITS)"
          ]
        },
        {
          num: 8,
          name: "Hardware Security, Trojans and Supply-Chain Trust Verification",
          topics: [
            "Hardware Trojans identification models", "Physically Unclonable Functions (PUF) circuit design",
            "Side-channel analysis countermeasures on silicon", "Reverse engineering preventative layouts",
            "Automotive Microcontroller security frameworks", "Large Language Models for automated hardware security layout checks",
            "Embedded cryptography accelerators and hardware testing and debug ports protection"
          ]
        }
      ];
    } else if (conference.id.includes("AIoT")) {
      return [
        {
          num: 1,
          name: "Smart Photovoltaic Array Grid Control Systems",
          topics: ["Control systems and telemetry configurations for renewable smart grids.", "Maximum power point tracking safety"]
        },
        {
          num: 2,
          name: "Deep Neural Networks for Carbon Capture",
          topics: ["Mathematical models for bioelectrochemical synthesis", "Neural predictions of carbon capture speeds"]
        },
        {
          num: 3,
          name: "Edge AI for Battery Management Systems",
          topics: ["Deep Learning engine implementation on edge nodes", "Predictive battery degradation tracking"]
        },
        {
          num: 4,
          name: "Sovereign Biomass Generation Protocols",
          topics: ["IoT networks for bioreactor ambient monitoring", "Sovereign energy ledger validation"]
        }
      ];
    } else {
      return [
        {
          num: 1,
          name: "Dynamic Resource Scheduling in 5G Networks",
          topics: ["Cognitive radio channel optimization", "Resource allocations under dense mesh layouts", "Network slicing parameters protection"]
        },
        {
          num: 2,
          name: "Architectures for Internet of Everything (IoE)",
          topics: ["Mesh topologies design", "Edge node decentralized orchestration", "M2M telemetry security check"]
        },
        {
          num: 3,
          name: "Smart Agriculture Sensors & Extenders",
          topics: ["Soil chemistry sensor validation", "Hydrology metrics telemetry networks", "Automated drone harvest paths safety"]
        },
        {
          num: 4,
          name: "Data Management in Distributed Ledger Systems",
          topics: ["Cryptographic consensus models", "Micro-transaction database storage optimization", "Identity protection in physical grids"]
        }
      ];
    }
  };

  const tracks = getTracksData();

  // Filter tracks by query
  const filteredTracks = tracks.filter(t => {
    const term = trackSearchQuery.toLowerCase();
    return t.name.toLowerCase().includes(term) || t.topics.some(topic => topic.toLowerCase().includes(term));
  });

  return (
    <div className="bg-neutral-warm min-h-screen text-text-body transition-all font-sans pb-16">
      
      {/* 1. Epic Editorial Header Banner with Animated Gradient & Background */}
      <section className="bg-[#0A1F44] text-[#FAFAF7] py-16 md:py-20 px-4 md:px-8 border-b-2 border-[#C9A961]/40 relative overflow-hidden">
        {/* Dynamic visual graphics cover */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/banner_4.png" 
            alt="Cybersecurity Network Background" 
            className="w-full h-full object-cover opacity-15 mix-blend-overlay"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1250";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44] via-[#0A1F44]/90 to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-5 relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-[#C9A961] hover:text-white transition duration-200 group bg-white/5 px-3 py-1.5 rounded border border-white/10"
          >
            <span>← Return to Boards</span>
          </button>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-[#C9A961]/10 text-[#C9A961] border border-[#C9A961]/30 text-[9px] font-mono uppercase font-bold rounded tracking-wider">
              {conference.format} Conference Edition
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono uppercase font-bold rounded tracking-wider">
              {conference.type === 'upcoming' ? 'Call For Papers (Active)' : 'Published Volume'}
            </span>
            {conference.id === 'ICETCS2026' && (
              <span className="px-2.5 py-1 bg-blue-500/15 text-blue-300 border border-blue-500/20 text-[9px] font-mono uppercase font-bold rounded tracking-wider">
                LNEE Springer Series
              </span>
            )}
          </div>

          <div className="space-y-2">
            <span className="text-gray-400 font-mono text-[10px] uppercase tracking-widest font-bold">Acronym: {conference.id}</span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {conference.full_name}
            </h1>
          </div>

          <p className="font-serif italic text-base sm:text-lg text-gray-300 max-w-3xl">
            Sponsored by RiTECHS. All papers accepted will be released in the Scopus-indexed <span className="text-[#C9A961] underline font-sans font-semibold">Springer LNEE (Lecture Notes in Electrical Engineering)</span> proceedings library, subject to approval filters.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs text-gray-200 font-mono">
            <div className="flex items-center space-x-2.5 bg-white/5 backdrop-blur-xs px-4 py-3 rounded-xl border border-white/10">
              <Calendar className="w-5 h-5 text-[#C9A961] shrink-0" />
              <div>
                <p className="text-[9px] uppercase text-gray-500 font-bold leading-none">Assembly Dates</p>
                <p className="font-medium text-white mt-1">{conference.dates.display}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 bg-white/5 backdrop-blur-xs px-4 py-3 rounded-xl border border-white/10">
              <MapPin className="w-5 h-5 text-[#C9A961] shrink-0" />
              <div>
                <p className="text-[9px] uppercase text-gray-500 font-bold leading-none">Geographical Spot</p>
                <p className="font-medium text-white mt-1">{conference.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 bg-white/5 backdrop-blur-xs px-4 py-3 rounded-xl border border-white/10">
              <Clock className="w-5 h-5 text-[#C9A961] shrink-0" />
              <div>
                <p className="text-[9px] uppercase text-gray-500 font-bold leading-none">Submissions Clock</p>
                <p className="font-medium text-[#C9A961] mt-1">{countdownString}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 bg-[#C9A961]/10 px-4 py-3 rounded-xl border border-[#C9A961]/30">
              <Award className="w-5 h-5 text-[#C9A961] shrink-0 animate-pulse" />
              <div>
                <p className="text-[9px] uppercase text-[#C9A961] font-bold leading-none">Peer Review Model</p>
                <p className="font-medium text-white mt-1">Rigorous Dual-Blind</p>
              </div>
            </div>
          </div>

          {/* Quick PDF & link resources bar */}
          <div className="pt-4 flex flex-wrap gap-2.5 text-xs text-gray-300">
            <a 
              href="https://ritechs.org/uploads/1779448778.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-white/10 hover:bg-[#C9A961] hover:text-[#0A1F44] transition-all px-3 py-1.5 rounded font-mono font-bold leading-none"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>CFP Brochure PDF</span>
            </a>
            <a 
              href="https://www.springer.com/gp/authors-editors/conference-proceedings/conference-proceedings-guidelines" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 transition-all px-3 py-1.5 rounded font-mono leading-none"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Springer MS Templates</span>
            </a>
            <a 
              href="https://cmt3.research.microsoft.com/ICETCS2026/Submission/Index" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-[#C9A961]/20 hover:bg-[#C9A961]/35 text-[#C9A961] border border-[#C9A961]/30 transition-all px-3 py-1.5 rounded font-mono font-bold leading-none"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Microsoft CMT Portal</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Premium Tabbed Navigation - Layout Adaptive Sticky Bar */}
      <div className="bg-white border-b border-divider sticky top-[72px] z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex border-b border-transparent overflow-x-auto scrollbar-none gap-1 py-1">
            {[
              { id: 'overview', label: 'Overview & Objective', icon: Info },
              { id: 'tracks', label: 'Technical Tracks', icon: Cpu },
              { id: 'dates', label: 'Milestones & Dates', icon: Calendar },
              { id: 'speakers', label: 'Committee & Board', icon: Users },
              { id: 'submit', label: 'Paper Submit Guide', icon: FileText },
              { id: 'register', label: 'Pass Reservation', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setTimeout(() => {
                      document.getElementById("primary-target-stage")?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                  }}
                  className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all flex items-center space-x-2 cursor-pointer ${
                    activeTab === tab.id 
                      ? 'border-[#C9A961] text-[#0A1F44] font-extrabold bg-[#0A1F44]/5 rounded-t-lg' 
                      : 'border-transparent text-gray-500 hover:text-[#0A1F44] hover:bg-gray-100/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#C9A961]' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div id="primary-target-stage" className="h-4"></div>

      {/* 3. Main Views Container */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        
        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left narrative content */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Objective Statement card */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-divider/60 shadow-sm space-y-5">
                  <h3 className="font-serif text-2xl font-bold text-[#0A1F44] border-b pb-3 border-[#C9A961]/20 flex items-center">
                    <Target className="w-6 h-6 mr-2 text-[#C9A961]" />
                    <span>Conference Core Objective</span>
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-light font-sans text-justify">
                    The primary objective of the <strong className="text-[#0A1F44] font-semibold">3rd International Conference on Emerging Trends in Cybersecurity (ICETCS 2026)</strong> is to provide a global hybrid interface for senior researchers, academicians, industry professionals, and policymakers to converge, share validated insights, and collaboratively evaluate the latest developments in threat mitigations.
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed font-light font-sans text-justify">
                    This conference aims to facilitate intensive peer reviews on cutting-edge software sandboxes, IoT device security, and autonomous vehicle telemetry safety. By establishing rigorous dual-blind vetting and fostering multi-disciplinary dialogue, the assembly strives to enhance academia–industry trust, design high-quality cybersecurity structures, and bolster resilience across national space, cloud, and hardware supply chains.
                  </p>
                  
                  <div className="bg-[#0A1F44]/5 p-4 rounded-xl border border-[#0A1F44]/10 text-xs text-gray-700">
                    <h5 className="font-bold text-[#0A1F44] mb-1.5 flex items-center font-serif">
                      <Lock className="w-4 h-4 mr-1.5 text-[#C9A961]" />
                      <span>Plagiarism & Ethics Vetting Code</span>
                    </h5>
                    <p className="font-light leading-relaxed">
                      All submitted manuscript drafts must report original, previously unpublished research. Initial automated plagiarism screenings are mandatory, and papers exhibiting a similarity index above 10% (excluding bibliography) are instantly rejected before reviewer assignment.
                    </p>
                  </div>
                </div>

                {/* Sponsoring Journals & Scopus Index Library info */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-divider/60 shadow-sm space-y-5">
                  <h3 className="font-serif text-xl font-bold text-[#0A1F44] flex items-center">
                    <Award className="w-5 h-5 mr-2 text-[#C9A961]" />
                    <span>Springer Proceedings & Recommended Journals</span>
                  </h3>
                  
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    Accepted papers will be compiled into the <strong className="font-semibold text-primary-navy">Lecture Notes in Electrical Engineering (LNEE) series by Springer</strong>, submitted directly for Scopus indexing. In addition, highly ranked extended manuscripts will receive recommendations for possible fast-tracked submissions to the following journals:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "International Journal of Information Privacy, Security and Integrity",
                      "EAI Endorsed Transactions on Internet of Things",
                      "Computers (MDPI Scientific Index)",
                      "International Journal of Software Engineering and Computer Systems",
                      "Journal of Network and Computer Applications (Elsevier)",
                      "Vehicular Communications (Highly Indexed Journal)"
                    ].map((j, idx) => (
                      <div key={idx} className="p-3 bg-neutral-warm/40 border border-divider rounded-xl text-left hover:border-[#C9A961]/40 transition group">
                        <span className="text-[10px] font-mono text-[#C9A961] font-bold block mb-1">JOURNAL RECOMMENDATION 0{idx+1}</span>
                        <p className="text-[11px] font-serif font-bold text-[#0A1F44] group-hover:text-[#C9A961] transition-colors leading-tight">{j}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call for Participation Details */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#C9A961]/25 shadow-2xs space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#0A1F44] flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-[#C9A961]" />
                    <span>Invitation for Dynamic Submissions</span>
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    We welcome comprehensive papers, workshop layouts, special session tutorials, and hardware platform demo registrations. Active tracks welcome papers in Ubiquitous intelligence, blockchain security, space communications cryptography, and AI-enabled diagnostics.
                  </p>
                  <p className="text-xs text-gray-600 font-light">
                    Approved technical reports will receive presentation sessions under the guidance of our track supervisors. We encourage active research groups, PhD applicants, and hardware engineers to review submission processes early.
                  </p>
                </div>

              </div>

              {/* Right side widgets */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Core Event Sponsors Logos Group */}
                <div className="bg-white p-6 rounded-2xl border border-divider/60 shadow-sm space-y-4 text-center">
                  <h4 className="font-serif font-bold text-[#0A1F44] text-xs uppercase tracking-widest border-b pb-2">Associate Institutions</h4>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <a 
                      href="https://unige.it/en" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-3 bg-neutral-warm border border-divider rounded-xl hover:shadow-xs transition text-center flex flex-col justify-center items-center h-20"
                    >
                      <span className="text-[10px] font-bold text-[#0A1F44] uppercase leading-tight font-serif">University of Genoa</span>
                      <span className="text-[8px] text-[#C9A961] mt-1 font-mono">Genoa, Italy</span>
                    </a>

                    <a 
                      href="https://www.wlv.ac.uk/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-3 bg-neutral-warm border border-divider rounded-xl hover:shadow-xs transition text-center flex flex-col justify-center items-center h-20"
                    >
                      <span className="text-[10px] font-bold text-[#0A1F44] uppercase leading-tight font-serif">Wolverhampton University</span>
                      <span className="text-[8px] text-[#C9A961] mt-1 font-mono">United Kingdom</span>
                    </a>

                    <a 
                      href="https://www.cardiff.ac.uk/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-3 bg-neutral-warm border border-divider rounded-xl hover:shadow-xs transition text-center flex flex-col justify-center items-center h-20"
                    >
                      <span className="text-[10px] font-bold text-[#0A1F44] uppercase leading-tight font-serif">Cardiff University</span>
                      <span className="text-[8px] text-[#C9A961] mt-1 font-mono">Wales, UK</span>
                    </a>

                    <a 
                      href="https://www.airfieldsecurity.it/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-3 bg-neutral-warm border border-divider rounded-xl hover:shadow-xs transition text-center flex flex-col justify-center items-center h-20"
                    >
                      <span className="text-[10px] font-bold text-[#0A1F44] uppercase leading-tight font-serif">Airfield Security IT</span>
                      <span className="text-[8px] text-[#C9A961] mt-1 font-mono">Rome, Italy</span>
                    </a>
                  </div>
                  <p className="text-[10px] text-gray-400 font-mono italic">Logos linked to official universities domains.</p>
                </div>

                {/* Free Workshop Card */}
                <div className="bg-[#0A1F44] text-white p-6 rounded-2xl border border-[#C9A961]/35 shadow-md space-y-4">
                  <span className="text-[8px] font-mono uppercase bg-[#C9A961]/20 text-[#C9A961] px-2 py-0.5 rounded font-bold border border-[#C9A961]/30">Complimentary Entry</span>
                  <h4 className="font-serif font-bold text-white text-base">"How to Write a Quality Conference Paper"</h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    A dedicated publishing workshop organized by the editorial committee. Covers Springer formatting, LaTeX style tricks, similarity metrics, and responses to reviewer letters.
                  </p>
                  <button 
                    onClick={() => setActiveTab('submit')}
                    className="w-full text-center py-2.5 bg-[#C9A961] hover:bg-white text-[#0A1F44] text-xs font-bold uppercase rounded-lg transition"
                  >
                    Review Guidelines
                  </button>
                </div>

                {/* Direct CMT Link Box */}
                <div className="bg-white p-6 rounded-2xl border border-divider/60 shadow-sm space-y-3">
                  <h4 className="font-serif text-xs font-bold text-primary-navy uppercase tracking-widest">CMT Peer Review System</h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    Microsoft CMT handles our dual-blind review process. This platform is utilized at zero charge, supported by Microsoft Azure Cloud services and development engineers.
                  </p>
                  <a 
                    href="https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2FICETCS2026%2FSubmission%2FIndex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-between text-xs font-bold text-[#C9A961] hover:text-[#0A1F44] pointer transition pt-2 border-t"
                  >
                    <span>Log in Microsoft CMT Portal</span>
                    <ExternalLink className="w-4 h-4 text-accent-gold" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ================= TECHNICAL TRACKS TAB ================= */}
        {activeTab === 'tracks' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] bg-[#0A1F44]/5 px-2 py-1 rounded font-bold">Research Mapping</span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-navy">Call for Submissions: Scientific Tracks</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                We accept technical papers within the designated domains below. Check subtopics to ensure precise layout alignment and proper keyword assignments during Microsoft CMT upload.
              </p>
            </div>

            {/* Live Search Filter */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input 
                type="text" 
                placeholder="Search subtopics, e.g., Saturation, GPS, IoT, Trojan..." 
                value={trackSearchQuery}
                onChange={(e) => setTrackSearchQuery(e.target.value)}
                className="w-full bg-white border border-divider/70 rounded-full pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A961]"
              />
              {trackSearchQuery && (
                <button 
                  onClick={() => setTrackSearchQuery("")} 
                  className="absolute right-3 top-3 bg-gray-150 p-1 rounded-full text-gray-500 hover:text-[#0A1F44]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
              
              {/* Left Selector List */}
              <div className="lg:col-span-4 space-y-2">
                <p className="text-[10px] font-mono uppercase text-gray-400 font-bold tracking-wider leading-none mb-2">Track Directory</p>
                <div className="flex flex-col gap-1.5">
                  {filteredTracks.map((tr, idx) => (
                    <button
                      key={tr.num}
                      onClick={() => setSelectedTrackTab(idx)}
                      className={`text-left p-4 rounded-xl text-xs transition duration-200 border cursor-pointer ${
                        selectedTrackTab === idx 
                          ? 'border-[#C9A961] bg-[#0A1F44] text-[#FAFAF7]' 
                          : 'border-divider bg-white text-gray-600 hover:bg-neutral-warm/60'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${selectedTrackTab === idx ? 'bg-[#C9A961] text-[#0A1F44]' : 'bg-gray-150 text-gray-600'}`}>T0{tr.num}</span>
                        <span className="font-serif font-bold leading-tight">{tr.name}</span>
                      </div>
                    </button>
                  ))}
                  {filteredTracks.length === 0 && (
                    <p className="text-xs text-gray-400 italic text-center py-6">No matching sub-topics found. Try a different search term.</p>
                  )}
                </div>
              </div>

              {/* Right Details Grid */}
              <div className="lg:col-span-8">
                {filteredTracks[selectedTrackTab] ? (
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#C9A961]/20 shadow-sm space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#C9A961] uppercase tracking-wider font-bold">Track 0{filteredTracks[selectedTrackTab].num} - Active Scope</span>
                      <h4 className="font-serif text-xl font-bold text-[#0A1F44]">{filteredTracks[selectedTrackTab].name}</h4>
                    </div>

                    <div className="border-t border-divider pt-4 space-y-4">
                      <p className="text-xs text-gray-500 font-semibold mb-2">Technical domains and keywords targeted:</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {filteredTracks[selectedTrackTab].topics.map((item, keyIdx) => (
                          <div key={keyIdx} className="flex items-start space-x-2 text-xs bg-neutral-warm/40 p-3 rounded-lg border border-divider/40">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700 leading-tight font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#C9A961]/5 p-4 rounded-xl text-xs space-y-2 border border-[#C9A961]/20">
                      <p className="font-serif font-bold text-[#0A1F44]">Instructions for Track Submission:</p>
                      <p className="font-light text-gray-600 leading-relaxed">
                        Prepare technical drafts strictly following Springer formatting guidelines. Ensure that all author details are removed in the initial draft for double-blind reviews.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-2xl border text-center text-gray-400 italic">
                    Select a technical track from the left menu to view detailed subtopics and active submission scopes.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ================= MILESTONES & DATES TAB ================= */}
        {activeTab === 'dates' && (
          <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
            <div className="text-center space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] bg-[#0A1F44]/5 px-2 py-1 rounded font-bold">Timeline Agenda</span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-navy">Review Milestones</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                These deadlines are set to guarantee sufficient duration for structural reviews, manuscript corrections, and Springer formatting checks before publication.
              </p>
            </div>

            <div className="relative border-l-2 border-divider/80 ml-4 space-y-8 mt-10">
              {conference.deadlines.map((dl, idx) => {
                const targetDate = new Date(dl.date);
                const isPassed = targetDate < new Date();
                return (
                  <div key={idx} className="relative pl-8">
                    {/* Floating circle tag */}
                    <span className={`absolute -left-3.5 top-1.5 w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-mono font-bold leading-none ${
                      isPassed ? 'bg-gray-400 border-gray-400 text-white shadow-xs' : 'bg-[#0A1F44] border-[#C9A961] text-[#C9A961] shadow-md animate-pulse'
                    }`}>
                      0{idx + 1}
                    </span>
                    
                    <div className="bg-white p-5 rounded-2xl border border-divider/60 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center hover:border-[#C9A961]/40 transition gap-4">
                      <div className="space-y-1">
                        <span className={`text-[9px] font-mono uppercase tracking-wider font-bold ${isPassed ? 'text-gray-400' : 'text-[#C9A961]'}`}>
                          {isPassed ? "Complete" : "Action Required"}
                        </span>
                        <h4 className="font-serif text-base font-bold text-primary-navy">{dl.label} Deadline</h4>
                        <p className="text-[11px] text-gray-500 font-light leading-relaxed mt-1">
                          {idx === 0 && "Technical draft upload strictly handled through Microsoft CMT Portal before 23:59 GMT."}
                          {idx === 1 && "Completion of initial peer scores. Authors notified of required adjustments."}
                          {idx === 2 && "Final verified draft with similarity clearances submitted for compilation."}
                          {idx === 3 && "Registration forms must be settled to guarantee Springer printing slots."}
                        </p>
                      </div>
                      
                      <div className="shrink-0 text-right">
                        <span className={`font-mono text-xs px-3.5 py-1.5 font-bold rounded-lg border inline-block ${
                          isPassed ? 'text-gray-500 bg-gray-100 border-gray-200' : 'text-[#C9A961] bg-[#0A1F44] border-transparent shadow shadow-neutral-navy'
                        }`}>
                          {dl.date}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center text-xs text-emerald-800 font-medium">
              <span className="font-serif font-bold">Conference Date: 12-Oct-2026 to 13-Oct-2026</span> · Sessions hosted in dual formats (onsite at University of Genoa and virtually via secure Zoom).
            </div>
          </div>
        )}

        {/* ================= COMMITTEE & SPEAKERS TAB ================= */}
        {activeTab === 'speakers' && (
          <div className="space-y-12 animate-fade-in">
            
            {/* Core Keynote list with bios */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] bg-[#0A1F44]/5 px-2 py-0.5 rounded font-bold">Distinguished Speakers</span>
                <h3 className="font-serif text-2xl font-bold text-primary-navy">Keynote Industry Speakers</h3>
                <p className="text-xs text-gray-500 font-light max-w-lg mx-auto">
                  Confirmed professional academic leaders and investment programme directors presenting during our sessions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Emma Fadlon", org: "Innovate UK Business Connect, UK", role: "Investment Projects Lead & Programme Director, CyberASAP", desc: "Expert on commercializing academic research assets and venture creation structures." },
                  { name: "Giulio Ferro", org: "University of Genoa", role: "Tenure Track Researcher", desc: "Specializes in high-capacity threat telemetry databases and hardware layout models." },
                  { name: "Hendrik Wöhrle", org: "University of Duisburg-Essen, Germany", role: "Professor", desc: "Dual appointed at Fraunhofer Institute for Microelectronic Circuits and Systems. Embedded design specialist." },
                  { name: "Imed Ben Dhaou", org: "University of Turku, Finland", role: "Professor of Computing", desc: "Authority on mathematical optimizations inside cognitive network grids and low-power IoT circuits." },
                  { name: "Luigi Coppolino", org: "University Parthenope - Naples", role: "Professor of Security", desc: "Leading researcher on continuous tracking systems and cloud sandboxing models." },
                  { name: "Mario Marchese", org: "University of Genoa, Italy", role: "Professor & General Chair", desc: "Expert on deep space inter-satellite networks encryption and ground segment resilience." },
                  { name: "Matteo Repetto", org: "CNR/IMATI", role: "Head Researcher", desc: "Specialist on continuous telemetry streaming and virtual private clouds perimeter security." },
                  { name: "Paul Wooderson", org: "HORIBA MIRA, UK", role: "Chief Engineer (Cybersecurity)", desc: "Global authority on connected and autonomous vehicles validation standards and CANbus security." }
                ].map((sp, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-divider/60 hover:border-[#C9A961] transition group shadow-2xs flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#0A1F44] text-[#C9A961] flex items-center justify-center text-lg font-serif font-bold group-hover:bg-[#C9A961] group-hover:text-[#0A1F44] transition-colors shadow-inner">
                        {sp.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-extrabold text-[#0A1F44] leading-tight block">{sp.name}</h4>
                        <p className="text-[10px] text-[#C9A961] font-mono uppercase tracking-wider mt-0.5 font-bold leading-none">{sp.role}</p>
                        <p className="text-[10px] text-gray-400 font-mono mt-1 font-medium">{sp.org}</p>
                      </div>
                      <p className="text-[11px] text-gray-500 font-light font-sans leading-relaxed text-justify mt-2 pt-2 border-t border-gray-100">{sp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Organising Committee Lists */}
            <div className="pt-8 border-t border-divider/60 space-y-6">
              <div className="text-center space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]">Editorial Governance</span>
                <h3 className="font-serif text-2xl font-bold text-primary-navy">Organising Committee</h3>
                <p className="text-xs text-gray-500 font-light max-w-lg mx-auto">
                  Our academic board coordinates peer review compliance, layout standards, and Springer proceedings compilation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Patrons Card */}
                <div className="bg-white p-5 rounded-xl border border-divider/60 shadow-3xs space-y-3">
                  <h5 className="font-serif font-bold text-xs uppercase tracking-widest text-[#C9A961] border-b pb-1">Patrons</h5>
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-bold text-primary-navy">Prof. Dr. Prashant Pillai</p>
                      <p className="text-[9px] text-gray-400 font-light leading-none mt-0.5">University of Wolverhampton, UK</p>
                    </div>
                    <div className="border-t pt-2">
                      <p className="font-bold text-primary-navy">Prof. Dr. Mohammed Atiquzzaman</p>
                      <p className="text-[9px] text-gray-400 font-light leading-none mt-0.5">University of Oklahoma, USA</p>
                    </div>
                  </div>
                </div>

                {/* Chairs Card */}
                <div className="bg-white p-5 rounded-xl border border-divider/60 shadow-3xs space-y-3">
                  <h5 className="font-serif font-bold text-xs uppercase tracking-widest text-[#C9A961] border-b pb-1">General Chairs</h5>
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-bold text-primary-navy">Prof. Mario Marchese</p>
                      <p className="text-[9px] text-gray-400 font-light leading-none mt-0.5">General Chair · University of Genoa</p>
                    </div>
                    <div className="border-t pt-2">
                      <p className="font-bold text-primary-navy">Prof. Dr. Arafatur Rahman</p>
                      <p className="text-[9px] text-gray-400 font-light leading-none mt-0.5">Executive General Chair · Wolverhampton</p>
                    </div>
                  </div>
                </div>

                {/* Chairs Group Card */}
                <div className="bg-white p-5 rounded-xl border border-divider/60 shadow-3xs space-y-3">
                  <h5 className="font-serif font-bold text-xs uppercase tracking-widest text-[#C9A961] border-b pb-1">Publicity & Program</h5>
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-bold text-primary-navy">Prof. Dr. Raymond Choo</p>
                      <p className="text-[9px] text-gray-400 font-light leading-none mt-0.5">Texas at San Antonio, USA</p>
                    </div>
                    <div className="pt-1.5 border-t">
                      <p className="font-bold text-primary-navy">Prof. Fabio Patrone</p>
                      <p className="text-[9px] text-gray-400 font-light leading-none mt-0.5">University of Genoa, Italy</p>
                    </div>
                    <div className="pt-1.5 border-t">
                      <p className="font-bold text-primary-navy">Dr. Giovanni Gaggero</p>
                      <p className="text-[9px] text-gray-400 font-light leading-none mt-0.5">Publicity Co-Chair · Genoa</p>
                    </div>
                  </div>
                </div>

                {/* Technical Program Committee (TPC) */}
                <div className="bg-white p-5 rounded-xl border border-divider/60 shadow-3xs space-y-3">
                  <h5 className="font-serif font-bold text-xs uppercase tracking-widest text-[#C9A961] border-b pb-1">Advisory Committee</h5>
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-bold text-primary-navy">Sabira Khatun</p>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5">RiTECHS President</p>
                    </div>
                    <div className="border-t pt-1.5">
                      <p className="font-bold text-primary-navy">Md Rafiqul Islam</p>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5">IIU Malaysia Specialist</p>
                    </div>
                    <div className="border-t pt-1.5">
                      <p className="font-bold text-primary-navy">Naveen Chilamkurt</p>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5">La Trobe, Australia</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* TPC Roster Expansion Drawer */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-divider/60 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-serif font-bold text-sm text-[#0A1F44]">Technical Program Committee (TPC) Members</h4>
                  <button 
                    onClick={() => setExpandedSection(expandedSection === 'tpc' ? null : 'tpc')}
                    className="text-xs font-bold text-[#C9A961] hover:underline"
                  >
                    {expandedSection === 'tpc' ? "Collapse TPC Directory" : "View Full 40+ Roster"}
                  </button>
                </div>
                
                {expandedSection === 'tpc' && (
                  <div className="pt-4 border-t border-dashed grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-[11px] text-gray-600 animate-fade-in">
                    <div><strong>Dr. S M Nazmus Sadat</strong> (Uttara Univ)</div>
                    <div><strong>Dr. Muhammad Kamran Naeem</strong> (Northampton)</div>
                    <div><strong>Dr. Zeeshan Ahmad</strong> (Wolverhampton)</div>
                    <div><strong>Dr. Hai Tao</strong> (Baoji Univ, China)</div>
                    <div><strong>Dr. Manimuthu</strong> (Aston Univ, UK)</div>
                    <div><strong>Dr. Nour Moustafa</strong> (UNSW, Australia)</div>
                    <div><strong>Dr. A. Taufiq Asyhari</strong> (Monash Univ)</div>
                    <div><strong>Dr. Xiaokang Wang</strong> (St. Francis Xavier)</div>
                    <div><strong>Dr. Mohammad Saedi</strong> (City St George)</div>
                    <div><strong>Dr. Rashed Al Amin</strong> (Siegen, Germany)</div>
                    <div><strong>Dr. Ahmad Firdaus bin Zainal</strong> (UMP)</div>
                    <div><strong>Dr. Celia Shahnaz</strong> (BUET, Bangladesh)</div>
                    <div><strong>Prof. Lounis Chermak</strong> (Birkbeck, London)</div>
                    <div><strong>Prof. Paul Yoo</strong> (Birkbeck College)</div>
                    <div><strong>Prof. B.K. Kaushik</strong> (IIT Roorkee, India)</div>
                    <div><strong>Prof. Mohd Faizal bin Ab Razak</strong> (UMP)</div>
                    <div><strong>Dr. Abdul Ghani</strong> (De Montfort, UK)</div>
                    <div><strong>Dr. Faisal Saeed</strong> (Birmingham City)</div>
                    <div><strong>Dr. Junaid Arshad</strong> (Birmingham City)</div>
                    <div><strong>Dr. J. Uddin</strong> (Cardiff Metropolitan)</div>
                  </div>
                )}
                <p className="text-[10px] text-gray-400 font-mono">The TPC coordinates double-blind code assignments. Evaluated drafts are moderated before publishing.</p>
              </div>

            </div>
          </div>
        )}

        {/* ================= PAPER SUBMISSION TAB ================= */}
        {activeTab === 'submit' && (
          <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
            
            {/* Split layout: guidelines & form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Guidelines checklist */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-[#0A1F44] text-[#FAFAF7] p-6 sm:p-8 rounded-2xl border border-[#C9A961]/35 shadow-md">
                  <span className="text-[8px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded font-bold border border-white/5">Springer standard LNEE</span>
                  <h3 className="font-serif text-xl font-bold text-white mt-2">Preparation of Manuscript Guide</h3>
                  <p className="text-xs text-justify text-gray-300 font-light mt-1.5 leading-relaxed">
                    Manuscripts for Springer proceedings must strictly adhere to formatting guidelines. A summary of the 10 critical submission milestones is shown under our index layout below:
                  </p>

                  <div className="space-y-3.5 mt-6 font-sans">
                    {paperStructureSteps.map((step, idx) => (
                      <div key={idx} className="text-xs">
                        <button 
                          type="button"
                          onClick={() => setExpandedSection(expandedSection === `prep-${idx}` ? null : `prep-${idx}`)}
                          className="w-full text-left font-bold text-gray-200 hover:text-[#C9A961] flex items-center justify-between"
                        >
                          <span>{idx + 1}. {step.title}</span>
                          <span className="text-[9px] font-mono font-medium text-[#C9A961] underline">
                            {expandedSection === `prep-${idx}` ? "Close" : "Expand"}
                          </span>
                        </button>
                        {expandedSection === `prep-${idx}` && (
                          <p className="pt-1 text-[11px] font-light text-gray-300 pl-4">{step.desc}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4 mt-4">
                    <p className="text-[11px] text-gray-400 font-mono">
                      In exceptional cases, contact the Publication Chair to request a maximum page extension. Approved expansions will incur small processing surcharges.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submission registration form */}
              <div className="lg:col-span-6 space-y-6">
                {submittedPaperInfo ? (
                  <div className="bg-white rounded-2xl border-2 border-[#C9A961]/50 p-6 sm:p-8 shadow-md text-center space-y-6">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl font-bold text-[#0A1F44]">Draft Registered Successfully</h3>
                      <p className="text-[10px] text-gray-500 font-mono">Receipt Reference: {submittedPaperInfo.paperId}</p>
                    </div>

                    <div className="bg-neutral-warm/60 p-4 rounded-xl text-left text-xs font-mono border space-y-3">
                      <p className="border-b pb-1"><strong>Title:</strong> {submittedPaperInfo.title}</p>
                      <p className="border-b pb-1"><strong>Contact Scholar:</strong> {submittedPaperInfo.author} ({paperEmail})</p>
                      <p className="border-b pb-1"><strong>Vetting Sector:</strong> {submittedPaperInfo.track}</p>
                      <p className="border-b pb-1"><strong>Double-Blind Status:</strong> <span className="text-emerald-600 font-bold">{submittedPaperInfo.status}</span></p>
                      <div className="pt-2 text-[10px] leading-relaxed font-sans text-gray-500 italic">
                        <strong>Editorial review notes:</strong> {submittedPaperInfo.editorsOpinion}
                      </div>
                    </div>

                    <div className="pt-3 flex gap-2 justify-center">
                      <button 
                        onClick={() => {
                          setSubmittedPaperInfo(null);
                          setPaperTitle("");
                          setPaperAbstract("");
                        }} 
                        className="px-4 py-2 border border-divider text-xs font-bold uppercase hover:bg-neutral-warm rounded-md text-gray-600"
                      >
                        Submit Another Abstract
                      </button>
                      <button 
                        onClick={() => setActiveTab('overview')} 
                        className="px-4 py-2 bg-[#0A1F44] text-white text-xs font-bold uppercase hover:bg-primary-navy rounded-md"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-divider/60 p-6 sm:p-8 shadow-sm space-y-5">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#0A1F44]">Manuscript Abstract Vetting Registry</h3>
                      <p className="text-xs text-gray-500 font-light mt-1">Submit your abstract below to initiate formatting verification, title mapping, plagiarism evaluation, and CMT routing.</p>
                    </div>

                    <form onSubmit={handleSubmitPaper} className="space-y-4 text-xs font-semibold">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-600 mb-1 leading-none">Primary Correspondence Author</label>
                          <input
                            type="text"
                            required
                            value={paperAuthor}
                            onChange={(e) => setPaperAuthor(e.target.value)}
                            placeholder="e.g., Prof. Dr. Md Arafatur Rahman"
                            className="w-full bg-neutral-warm border border-divider rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9A961] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-600 mb-1 leading-none">Contact Email Address</label>
                          <input
                            type="email"
                            required
                            value={paperEmail}
                            onChange={(e) => setPaperEmail(e.target.value)}
                            placeholder="e.g., contact@ritechs.com"
                            className="w-full bg-neutral-warm border border-divider rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9A961] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-600 mb-1 leading-none">Target Vetting Track</label>
                        <select
                          required
                          value={paperTrack}
                          onChange={(e) => setPaperTrack(e.target.value)}
                          className="w-full bg-neutral-warm border border-divider rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9A961] focus:outline-none"
                        >
                          <option value="">-- Choose target scientific track --</option>
                          {tracks.map((tr, idx) => (
                            <option key={idx} value={tr.name}>Track {tr.num}: {tr.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-600 mb-1 leading-none">Manuscript Title</label>
                        <input
                          type="text"
                          required
                          value={paperTitle}
                          onChange={(e) => setPaperTitle(e.target.value)}
                          placeholder="e.g., Advancing Connected and Autonomous Vehicles Cyber resilience via Edge-AI telemetry"
                          className="w-full bg-neutral-warm border border-divider rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9A961] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 mb-1 text-xs justify-between flex">
                          <span>Abstract Vetting Content</span>
                          <span className="font-mono text-gray-400 font-light">{paperAbstract.split(/\s+/).filter(Boolean).length} / 250 words</span>
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={paperAbstract}
                          onChange={(e) => setPaperAbstract(e.target.value)}
                          placeholder="Type or paste your research abstract text here..."
                          className="w-full bg-neutral-warm border border-divider rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9A961] focus:outline-none font-light leading-relaxed"
                        />
                      </div>

                      <div className="border-2 border-dashed border-divider rounded-xl p-4 bg-neutral-warm/20 text-center space-y-1.5 hover:bg-[#C9A961]/5 transition cursor-pointer">
                        <BookOpen className="w-6 h-6 text-gray-400 mx-auto" />
                        <p className="text-[11px] text-gray-700 font-bold leading-none">Manuscript PDF File Upload (Optional)</p>
                        <p className="text-[9px] text-gray-400 font-light">Drag-and-drop draft up to 12MB. Double-blind rule applies.</p>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-[#0A1F44] hover:bg-[#bda056] hover:text-[#0A1F44] text-[#C9A961] font-bold uppercase rounded-lg tracking-wider text-xs transition"
                      >
                        {isSubmitting ? "Processing formatting validation..." : "Publish abstract for reviewer routing"}
                      </button>
                    </form>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ================= REGISTER & FEES TAB ================= */}
        {activeTab === 'register' && (
          <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] bg-[#0A1F44]/5 px-2 py-0.5 rounded font-bold">Secure Vetting Tickets</span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-navy">Register & Reserve Seat</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Choose the appropriate package tier. Fees are settled in EUR and grant complete assembly certifications, proceedings database access, and presentation passes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Checkout tiers selection */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Early bird vs regular selection pills */}
                <div className="bg-white p-4 rounded-xl border border-divider/60 shadow-3xs flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-650 font-serif">Select Billing Category:</span>
                  <div className="flex bg-neutral-warm p-1 rounded-lg border text-xs font-semibold font-mono">
                    <button 
                      type="button" 
                      onClick={() => setIsEarlyBird(true)}
                      className={`px-3 py-1.5 rounded transition ${isEarlyBird ? 'bg-[#0A1F44] text-[#FAFAF7] font-bold' : 'text-gray-500 hover:text-primary-navy'}`}
                    >
                      Early Bird (400 EUR)
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsEarlyBird(false)}
                      className={`px-3 py-1.5 rounded transition ${!isEarlyBird ? 'bg-[#0A1F44] text-[#FAFAF7] font-bold' : 'text-gray-500 hover:text-primary-navy'}`}
                    >
                      Regular Rate (450 EUR)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'author', name: 'Author Presenter', desc: 'LNEE springer pages' },
                    { id: 'student', name: 'Student Scholar', desc: 'Valid academic ID check' },
                    { id: 'watcher', name: 'Observer Watcher', desc: 'Workshop certifications' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setTier(p.id as any)}
                      className={`p-4 border rounded-xl text-center transition flex flex-col justify-between h-36 cursor-pointer ${
                        tier === p.id 
                          ? 'border-[#C9A961] bg-[#0A1F44]/5 text-[#0A1F44] font-semibold ring-1 ring-[#0A1F44]/30' 
                          : 'border-divider bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold leading-none block text-gray-400">0{tier === p.id ? "1" : "2"} Package</span>
                      <span className="font-serif text-sm font-extrabold block mt-2 text-[#0A1F44] leading-tight">{p.name}</span>
                      <span className="font-mono text-xl font-bold block mt-1 text-[#C9A961]">{isEarlyBird ? "EUR 400" : "EUR 450"}</span>
                      <span className="text-[8px] text-gray-400 block font-light leading-none pt-2 border-t mt-2">{p.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Secure Eventbrite Tickets directly fallback embed */}
                <div className="bg-[#0A1F44] text-neutral-warm p-6 rounded-2xl border border-[#C9A961]/25 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FAFAF7_1px,transparent_1px)] [background-size:12px_12px]" />
                  <div className="relative z-10 space-y-3.5">
                    <h4 className="font-serif font-bold text-base text-[#C9A961] flex items-center">
                      <Lock className="w-4 h-4 mr-1.5" />
                      <span>Eventbrite External Checkout Interface</span>
                    </h4>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      For rapid overseas credit card settling, utilize the secure Eventbrite transactional engine. This ensures compliant invoicing and direct calendar token dispatches.
                    </p>
                    
                    <a 
                      href="//eventbrite.com/tickets-external?eid=18432753863&ref=etckt" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-between bg-white text-[#0A1F44] hover:bg-[#C9A961] transition font-bold text-xs uppercase px-4 py-3 rounded-xl shadow-md text-center"
                    >
                      <span>Secure Eventbrite Passage Checkout</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Internal registry settle */}
              <div className="lg:col-span-6">
                {isPaid ? (
                  <div className="bg-[#0A1F44] text-neutral-warm rounded-2xl border-2 border-[#C9A961] p-6 sm:p-8 text-center space-y-6 shadow-xl">
                    <div className="w-14 h-14 rounded-full bg-[#C9A961]/25 flex items-center justify-center mx-auto text-[#C9A961]">
                      <Award className="w-8 h-8 font-bold" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A961] font-bold">Pass Guaranteed Ledger</span>
                      <h3 className="font-serif text-2xl font-bold tracking-tight text-white">{conference.id} Entry Access</h3>
                      <p className="text-xs text-[#C9A961] font-mono">{badgeId}</p>
                    </div>

                    <div className="border border-white/20 p-5 rounded-xl text-left text-xs bg-white/5 space-y-2.5 font-mono">
                      <p className="flex justify-between border-b border-white/10 pb-1.5">
                        <span className="text-gray-400">Correspondent:</span>
                        <span className="font-bold text-white uppercase">{paperAuthor || 'Academic Scholar'}</span>
                      </p>
                      <p className="flex justify-between border-b border-white/10 pb-1.5">
                        <span className="text-gray-400">Institution:</span>
                        <span className="font-bold text-white truncate max-w-[170px]">{institution}</span>
                      </p>
                      <p className="flex justify-between border-b border-white/10 pb-1.5">
                        <span className="text-gray-400">Registration Tier:</span>
                        <span className="font-bold text-[#C9A961] uppercase">{tier} Level</span>
                      </p>
                      <p className="flex justify-between pt-1.5 text-white">
                        <span className="font-bold">Total Fees Settled:</span>
                        <span className="font-bold text-[#C9A961]">EUR {getTierPrice()}</span>
                      </p>
                    </div>

                    <p className="text-[9px] text-gray-400 font-light font-sans text-justify">
                      *A confirmation code and official invoice receipt is dispatched to your correspondence email. Secure webinar credentials will unlock inside your Workspace dashboard 48 hours prior to start.
                    </p>

                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={() => {
                          setIsPaid(false);
                          setInstitution("");
                        }}
                        className="px-4 py-2 bg-white/15 text-white hover:bg-white/25 rounded-lg text-xs font-bold uppercase transition"
                      >
                        Adjust Tier
                      </button>
                      <button 
                        onClick={() => setActiveTab('overview')}
                        className="px-4 py-2 bg-[#C9A961] hover:bg-white text-[#0A1F44] transition rounded-lg text-xs font-bold uppercase"
                      >
                        Proceed To Overview
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-divider/60 shadow-sm space-y-5">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#0A1F44]">Academic Institution Pass Details</h3>
                      <p className="text-xs text-gray-500 font-light mt-1">Please supply your verified academic or organization credentials. This information is printed on the formal index certificate.</p>
                    </div>

                    <form onSubmit={handleRegisterReceipt} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1 leading-none font-serif">Academic Institution Affiliation</label>
                        <input
                          type="text"
                          required
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="e.g., University of Genoa, Genoa, Italy"
                          className="w-full bg-neutral-warm border border-divider rounded-lg px-3 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-[#C9A961] focus:outline-none"
                        />
                      </div>

                      <div className="p-4 bg-neutral-warm/60 border rounded-xl text-xs space-y-2 font-mono">
                        <p className="font-semibold text-primary-navy flex justify-between leading-none">
                          <span>Billing category total:</span>
                          <span className="text-[#C9A961] font-bold">EUR {getTierPrice()}</span>
                        </p>
                        <p className="text-[10px] text-gray-400 font-light font-sans leading-normal">
                          Includes Springer LNCS publisher database registry, digital workshop key, dynamic certifications, coffee tea breaks, and VAT. Standard cancellations are free up to 14 days prior.
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#0A1F44] hover:bg-primary-navy hover:text-white text-white font-extrabold uppercase rounded-lg tracking-wider text-xs transition"
                      >
                        Generate Pass Token
                      </button>
                    </form>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </main>

      {/* 4. Active Contact Us Form Section with Luxurious Styling */}
      <section className="bg-neutral-warm border-t border-divider py-16 px-4 md:px-8 mt-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-5 space-y-5 text-left">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] bg-[#0A1F44]/5 px-2.5 py-1 rounded font-bold inline-block">Direct Advisory Support</span>
            <h3 className="font-serif text-2xl font-bold text-primary-navy">Have a technical manuscript inquiry?</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light font-sans text-justify">
              For formatting exceptions, late abstracts routing, or details on regional student grants, submit an electronic request form.
            </p>
            <div className="space-y-3 pt-3 text-xs text-gray-600 font-mono">
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C9A961]" />
                <span>Redirected to: arafatur.rahman@ieee.org</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-[#C9A961]" />
                <span>RiTECHS Solutions Center Hub</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-divider/60 shadow-sm">
            {contactSuccess ? (
              <div className="space-y-4 text-center py-6 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#0A1F44]">Inquiry Received</h4>
                <p className="text-xs text-gray-500 font-light">
                  A representative of the RiTECHS editorial or publicity chair team will follow up on your manuscript query shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-semibold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-650 mb-1 leading-none">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Type Your Name..."
                      className="w-full bg-neutral-warm border border-divider rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9A961] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-650 mb-1 leading-none">Correspondence Email</label>
                    <input 
                      type="email" 
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Type Your Email..."
                      className="w-full bg-neutral-warm border border-divider rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9A961] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-650 mb-1 leading-none">Academic Inquiry Subject</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g., Track Validation / LaTeX Style templates / Co-author Registration"
                    className="w-full bg-neutral-warm border border-divider rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-650 mb-1 leading-none">Message or Manuscript abstract</label>
                  <textarea 
                    rows={4} 
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Type Your Message..."
                    className="w-full bg-neutral-warm border border-divider rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9A961] focus:outline-none font-light leading-relaxed"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-[#0A1F44] hover:bg-primary-navy hover:text-white text-white font-extrabold uppercase rounded-lg tracking-wider text-xs transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
