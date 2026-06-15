import React, { useState } from 'react';
import { BookOpen, Award, FileText, ChevronRight, HelpCircle, CheckCircle, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PublicationsPage() {
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [organizerName, setOrganizerName] = useState('');
  const [confName, setConfName] = useState('');
  const [publisherIntent, setPublisherIntent] = useState('Elsevier Procedia');
  const [estimatePapers, setEstimatePapers] = useState('20 - 50');

  const disciplines = [
    {
      title: "Biological Science",
      desc: "Delving into biosystem dynamics, pioneering genetics advancements, bio-catalysis, bio-reactors, and ecological sustainability standards.",
      tag: "Elsevier Affiliate",
      color: "from-teal-600/10 to-teal-800/5 border-teal-500/20"
    },
    {
      title: "Computer Science & Cybersecurity",
      desc: "Pioneering state-of-the-art frameworks in AI, machine-vetted intelligence, cognitive radio grids, trust configurations, and secure online social structures.",
      tag: "IEEE & Springer Index",
      color: "from-blue-600/10 to-blue-800/5 border-blue-500/20"
    },
    {
      title: "Economics, Finance & Industry",
      desc: "Providing rigorous computational insights into national economic policies, modern banking ecosystems, industrial development scales, and fintech architectures.",
      tag: "Springer Publishing",
      color: "from-amber-600/10 to-amber-800/5 border-amber-500/20"
    },
    {
      title: "Engineering & Technology",
      desc: "Architecting innovative solutions for energy-critical industries, sustainable smart battery monitoring, structural telemetry, and high-tech manufacturing.",
      tag: "IEEE Flagship",
      color: "from-indigo-600/10 to-indigo-800/5 border-indigo-500/20"
    },
    {
      title: "Health & Social Care",
      desc: "Addressing frontier challenges in smart healthcare delivery systems, epidemiology tracking, public health protocols, and diagnostic medical telemetry.",
      tag: "Elsevier Affiliate",
      color: "from-emerald-600/10 to-emerald-800/5 border-emerald-500/20"
    },
    {
      title: "Information Science",
      desc: "Investigating distributed big data management, information architecture, enterprise systems security, and blockchain database transparency.",
      tag: "ACM Indexed",
      color: "from-sky-600/10 to-sky-800/5 border-sky-500/20"
    },
    {
      title: "Language & Literature",
      desc: "Enhancing global understanding in computational linguistics, scholarly communication codes, and native English editorial modification structures.",
      tag: "Scopus Vetted",
      color: "from-purple-600/10 to-purple-800/5 border-purple-500/20"
    },
    {
      title: "Mathematics & Statistics",
      desc: "Applying rigorous statistical modeling, graph theory algorithms, and predictive neural network optimization weights to solve physical world challenges.",
      tag: "Springer LNCS",
      color: "from-rose-600/10 to-rose-800/5 border-rose-500/20"
    }
  ];

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizerName || !confName) return;
    setProposalSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="bg-neutral-warm min-h-screen text-text-body font-sans pb-16"
    >
      {/* Premium Hero Title */}
      <section className="bg-primary-navy text-neutral-warm py-20 px-4 md:px-8 relative overflow-hidden border-b border-accent-gold/50">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#C9A961] font-bold bg-white/5 py-1 px-3 rounded border border-white/10">Scholarly Indexed Outlet</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            High Impact International Publications
          </h1>
          <p className="font-sans text-sm text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            At RiTECHS, our publications span a robust spectrum of disciplines, advancing scientific inquiry in both academia and enterprise. We collaborate with world-leading publishers including **IEEE**, **Elsevier**, and **Springer** to guarantee prestigiousindexing footprint.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Disciplines Grid */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-serif text-3xl font-bold text-primary-navy">Our 8 Publishing Disciplines</h2>
            <p className="text-xs text-gray-400 font-light font-sans">Connecting peer-vetted papers with rigorous international databases.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disciplines.map((disp, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-xl border p-6 flex flex-col justify-between group hover:border-[#C9A961] hover:shadow-lg transition-all duration-300 h-64 bg-gradient-to-br ${disp.color}`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <BookOpen className="w-5 h-5 text-accent-gold" />
                    <span className="text-[8px] font-mono uppercase tracking-widest bg-primary-navy text-neutral-warm px-2 py-0.5 rounded font-bold">{disp.tag}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-primary-navy leading-tight mt-2 group-hover:text-accent-gold transition-colors">{disp.title}</h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed font-sans">{disp.desc}</p>
                </div>
                
                <span className="text-[10px] uppercase font-mono font-bold text-primary-navy flex items-center group-hover:text-[#C9A961] transition-colors pt-2 select-none border-t border-divider/40">
                  <span>View indexes</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Conference Proceedings & Procedia Info Box */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8 border-t border-divider">
          
          {/* Left Description Box */}
          <div className="lg:col-span-7 bg-white rounded-2xl border p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center space-x-1 border border-accent-gold/40 bg-accent-gold/10 px-2.5 py-1 rounded text-[9px] uppercase font-mono font-bold tracking-widest text-[#C9A961]">
                <Award className="w-3 h-3 text-accent-gold mr-1" />
                <span>Publish with RiTECHS</span>
              </span>
              <h2 className="font-serif text-3xl font-bold text-primary-navy tracking-tight leading-tight">
                Publishing Your Conference Proceedings
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed font-sans font-light">
                Do you coordinate an upcoming international symposium, university workshop, or expert forum? Partner with the **RiTECHS Editorial Council** to publish high-quality, peer-reviewed academic proceedings on our **Procedia Page**. 
              </p>
              <div className="bg-neutral-warm/40 p-5 rounded border-l-4 border-accent-gold text-xs space-y-3">
                <p className="font-semibold text-primary-navy">Why Choose RiTECHS Procedia Layout?</p>
                <ul className="space-y-2 text-gray-600 font-light font-sans">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-accent-gold rounded-full"></span>
                    <span>Guaranteed DOIs mapped on CrossRef for every accepted paper.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-accent-gold rounded-full"></span>
                    <span>Flexible support for LaTeX and DOCX template formats.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-accent-gold rounded-full"></span>
                    <span>Automatic publication feed routing directly to Google Scholar.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-divider flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-500 gap-4">
              <div>
                <p className="font-semibold text-primary-navy">Contact Proceedings Unit:</p>
                <p className="font-light font-mono">proceedings@ritechs.org | +44 (0) 7825 310407</p>
              </div>
              <span className="text-[10px] text-gray-400 italic">IEEE Benelux & Elsevier affiliate guidelines strictly applied.</span>
            </div>
          </div>

          {/* Right Action proposals Terminal Form */}
          <div className="lg:col-span-5 bg-[#0A1F44] text-[#FAFAF7] rounded-2xl border border-accent-gold/30 p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -tr-y-4 tr-x-4 w-32 h-32 bg-[#C9A961]/10 rounded-full blur-2xl pointer-events-none"></div>
            
            {proposalSubmitted ? (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-5 py-8 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-accent-gold/20 text-[#C9A961] flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-white">Proposal Draft Received</h3>
                  <p className="text-xs text-gray-300 font-light">The RiTECHS Council Board will review your Estimations within 3 business days.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded p-4 text-xs font-mono text-left w-full text-gray-300">
                  <p className="border-b border-white/5 pb-1.5"><strong>Symposium:</strong> {confName}</p>
                  <p className="border-b border-white/5 py-1.5"><strong>Representative:</strong> {organizerName}</p>
                  <p className="border-b border-white/5 py-1.5"><strong>Target Series:</strong> {publisherIntent}</p>
                  <p className="pt-1.5"><strong>Estimated Papers:</strong> {estimatePapers}</p>
                </div>
                <button
                  onClick={() => setProposalSubmitted(false)}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider py-2 px-6 rounded transition"
                >
                  Edit parameters
                </button>
              </div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-accent-gold font-bold">Fast Vetting Gateway</span>
                  <h3 className="font-serif text-lg font-bold text-white tracking-tight">Submit Procedia Proposal</h3>
                </div>

                <div className="space-y-3 font-semibold text-text-muted">
                  <div>
                    <label className="block text-gray-300 mb-1 text-[11px]">Primary Organizer Name</label>
                    <input
                      type="text"
                      required
                      value={organizerName}
                      onChange={(e) => setOrganizerName(e.target.value)}
                      placeholder="e.g., Prof. AJAEGBU"
                      className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-xs font-medium focus:outline-none focus:border-accent-gold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1 text-[11px]">Symposium/Conference Full Title</label>
                    <input
                      type="text"
                      required
                      value={confName}
                      onChange={(e) => setConfName(e.target.value)}
                      placeholder="e.g., ITSS-IoE 2026 Proceedings"
                      className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-xs font-medium focus:outline-none focus:border-accent-gold text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 mb-1 text-[11px]">Publisher Intent</label>
                      <select
                        value={publisherIntent}
                        onChange={(e) => setPublisherIntent(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 hover:border-accent-gold rounded px-2.5 py-2 text-xs font-medium focus:outline-none text-white select-dark"
                      >
                        <option value="Elsevier Procedia" className="bg-primary-navy text-white">Elsevier Procedia</option>
                        <option value="IEEE Xplore Frame" className="bg-primary-navy text-white">IEEE Xplore Frame</option>
                        <option value="Springer LNCS" className="bg-primary-navy text-white">Springer LNCS</option>
                        <option value="Sovereign RiTECHS" className="bg-primary-navy text-white">Sovereign RiTECHS</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1 text-[11px]">Estimated Papers</label>
                      <select
                        value={estimatePapers}
                        onChange={(e) => setEstimatePapers(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 hover:border-accent-gold rounded px-2.5 py-2 text-xs font-medium focus:outline-none text-white lg:text-slate-100 select-dark"
                      >
                        <option value="10 - 20" className="bg-primary-navy text-white">10 - 20 Papers</option>
                        <option value="20 - 50" className="bg-primary-navy text-white">20 - 50 Papers</option>
                        <option value="50 - 100" className="bg-primary-navy text-white">50 - 100 Papers</option>
                        <option value="Over 100" className="bg-primary-navy text-white">Over 100 Papers</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded border border-white/10 text-[10px] text-gray-400 font-sans leading-relaxed">
                  *By submitting, you declare the papers will comply with standard plagiarism filters (under 15%) and dual-blind review structures.
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-gold hover:bg-[#bda056] text-primary-navy py-2.5 rounded font-bold uppercase tracking-wider text-xs transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Pricing Request</span>
                </button>
              </form>
            )}
          </div>

        </section>

      </div>
    </motion.div>
  );
}
