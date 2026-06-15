import React, { useState } from 'react';
import { CONFERENCES } from '../data';
import { FileText, Database, Shield, Radio, Search, Calendar, MapPin, Award, ChevronRight, PlayCircle, Eye, Download, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ArchivesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Disciplines');
  const [paperModal, setPaperModal] = useState<any | null>(null);

  // Filter past conferences
  const pastConfs = CONFERENCES.filter(c => c.type === 'past');

  // Multi-discipline search dataset
  const archivePapers = [
    {
      title: "Active Packet Inspection with Generative Adversarial Networks (GANs)",
      authors: "Nafees Zaman, Dr. Nadia Refat",
      journal: "Proceeding of International Conference on Emerging Trends in Cybersecurity (ICETCS 2025)",
      doi: "10.1007/978-3-031-12345-6_12",
      downloads: 412,
      topic: "Computer Science",
      pages: "124-138",
      abstract: "This paper proposes a state-of-the-art framework leveraging Generative Adversarial Networks (GANs) on edge node routers to active packet telemetry configurations. By training generative routers on deep package headers, we validate defense layers against complex side-channel Trojan attacks."
    },
    {
      title: "Autonomous Battery Routing for Multi-Array EV Grids",
      authors: "Dr. S M Nazmus Sadat, Prof. AJAEGBU",
      journal: "Journal of Sustainable AI-IoT Technologies for Renewable Energy (AIoT-RSE 2025)",
      doi: "10.1016/j.procedia.2025.04.101",
      downloads: 320,
      topic: "Engineering & Technology",
      pages: "90-104",
      abstract: "Sustainable smart battery networks suffer from uneven discharge rates. This study presents a peer-vetted autonomous scheduling protocol relying on deep reinforcement weight vectors to align charge intervals, showing 14.8% power retention improvements."
    },
    {
      title: "Distributed Ledger Integrity inside Public Multi-Core Databases",
      authors: "Prof. Dr. Kim-Kwang Raymond Choo, Adnan Sami",
      journal: "ITSS-IoE 2025 Conference Proceedings - Science Park Wolverhampton",
      doi: "10.1109/ITSS-IoE.2025.987654",
      downloads: 512,
      topic: "Computer Science",
      pages: "15-28",
      abstract: "Public administration registries require bulletproof audit pipelines. We outline a decentralized telemetry layout allowing edge routers to store cross-signed blocks, ensuring audit compliance under high-congestion networks."
    },
    {
      title: "Genetics Modification Models and Biocatalysis Scaling Parameters",
      authors: "Prof. Dr. Arafatur Rahman, Dr. Nadia Refat",
      journal: "RiTECHS Scientific Biological Studies Series",
      doi: "10.1007/s11274-025-54321-y",
      downloads: 189,
      topic: "Biological Science",
      pages: "201-215",
      abstract: "An investigation into bio-reactors temperature configurations and micro-catalytic synthesis pipelines. Results identify precise mathematical ratios for enzyme scaling in high-congestion bio-energy storage rigs."
    }
  ];

  // Past Webinar logs
  const archivedWebinars = [
    {
      title: "Formatting LaTeX Thesis Drafts for Springer Publications",
      speaker: "Dr. Nadia Refat",
      duration: "45 Mins Training",
      category: "Academic Solutions",
      views: "1.2k views"
    },
    {
      title: "Building Compliant GDPR Telemetries on Cloud Databases",
      speaker: "Dr. S M Nazmus Sadat",
      duration: "1 Hour Lecture",
      category: "Cybersecurity Essentials",
      views: "890 views"
    }
  ];

  const filteredPapers = archivePapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          paper.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          paper.journal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === 'All Disciplines' || paper.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.4 }}
      className="bg-neutral-warm min-h-screen text-text-body font-sans pb-16"
    >
      {/* Editorial Page Header Banner */}
      <section className="bg-primary-navy text-[#FAFAF7] py-16 px-4 md:px-8 border-b-2 border-[#C9A961]/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] font-bold bg-white/5 py-1 px-3 rounded border border-white/10">Scholarly Library Archives</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Proceedings Archives & Repositories
          </h1>
          <p className="text-sm text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Acquire full-text PDF documents, track original DOIs, and access original session webinar materials under previous academic years.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

        {/* 1. Past Conference proceedings Index */}
        <section className="space-y-6">
          <div className="border-b border-divider pb-4">
            <h3 className="font-serif text-2xl font-bold text-primary-navy">Indexed Historical Volumes</h3>
            <p className="text-xs text-gray-400 font-light">Explore original assemblies hosted under previous cycles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastConfs.map((c) => (
              <div key={c.id} className="bg-white rounded-xl border p-6 flex flex-col justify-between group hover:border-[#C9A961] hover:shadow-md transition">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-[#C9A961] font-bold">{c.name} (Past Volume)</span>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold uppercase">Published in Springer</span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-primary-navy group-hover:text-accent-gold transition-colors">{c.full_name}</h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono text-gray-500 pt-2 border-t border-b border-divider/40 py-3">
                    <p className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-[#C9A961]" />
                      <span>{c.location}</span>
                    </p>
                    <p className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[#C9A961]" />
                      <span>{c.dates.display}</span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 mt-2">
                  <span className="text-[10px] text-gray-400 font-sans">General Chairs: {c.general_chairs.slice(0, 2).join(' & ')}</span>
                  <a
                    href="https://link.springer.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#1a4a8a] hover:text-accent-gold uppercase tracking-wider flex items-center"
                  >
                    <span>Springlink proceeds</span>
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Full-Text Scholarly Search & Filter */}
        <section className="bg-white rounded-2xl border p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-divider pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-primary-navy">Abstract Searching Engine</h3>
              <p className="text-xs text-gray-400 font-light font-sans">Look up real paper indexes, view abstract chapters, and read CrossRef DOIs.</p>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="bg-neutral-warm border border-divider rounded-md px-3 py-1.5 text-xs text-primary-navy focus:outline-none"
              >
                <option value="All Disciplines">All Disciplines</option>
                <option value="Computer Science">Computer Science & Cybersecurity</option>
                <option value="Engineering & Technology">Engineering & Technology</option>
                <option value="Biological Science">Biological Science</option>
              </select>

              <div className="relative flex-1 md:w-64 min-w-[200px]">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter manuscripts, authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-neutral-warm border border-divider rounded-md pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-accent-gold"
                />
              </div>
            </div>
          </div>

          {/* List of filtered paper results */}
          <div className="divide-y divide-divider">
            {filteredPapers.length > 0 ? (
              filteredPapers.map((paper, idx) => (
                <div key={idx} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="space-y-1.5 text-left max-w-3xl">
                    <span className="text-[9px] font-mono uppercase bg-[#1a4a8a]/5 text-[#1a4a8a] px-2 py-0.5 rounded font-bold">{paper.topic}</span>
                    <h4 className="font-serif text-base font-bold text-primary-navy hover:text-accent-gold transition-colors cursor-pointer" onClick={() => setPaperModal(paper)}>{paper.title}</h4>
                    <p className="text-xs text-gray-400 font-sans">By {paper.authors}</p>
                    <p className="text-[11px] text-gray-500 font-mono">Published: {paper.journal} (Pages {paper.pages})</p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                    <span className="text-[10px] text-gray-400 font-mono shrink-0">{paper.downloads} downloads</span>
                    <button
                      onClick={() => setPaperModal(paper)}
                      className="bg-[#0A1F44] hover:bg-primary-navy text-accent-gold text-xs font-semibold py-1.5 px-3 rounded uppercase tracking-wider flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Abstract</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-gray-400">
                No archived papers matched your lookup. Please try alternative keywords.
              </div>
            )}
          </div>
        </section>

        {/* 3. Archived Video Lecture webinars */}
        <section className="space-y-6">
          <div className="border-b border-divider pb-4 text-left">
            <h3 className="font-serif text-2xl font-bold text-primary-navy">Original Webinar Logs</h3>
            <p className="text-xs text-gray-400 font-light">Watch recorded training guides from university lecturer mentors.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {archivedWebinars.map((web, idx) => (
              <div key={idx} className="bg-white rounded-xl border p-5 flex items-center space-x-4 hover:border-accent-gold transition">
                <PlayCircle className="w-12 h-12 text-[#C9A961] shrink-0" />
                <div className="text-left space-y-1">
                  <span className="text-[8px] font-mono uppercase text-[#1a4a8a] bg-[#1a4a8a]/5 px-2 py-0.5 rounded font-bold">{web.category}</span>
                  <h4 className="font-serif text-sm font-bold text-primary-navy leading-snug">{web.title}</h4>
                  <p className="text-xs text-gray-500 font-light leading-none">Delivered by {web.speaker} · {web.duration}</p>
                  <p className="text-[10px] text-gray-400 font-mono">{web.views}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Abstract display Modal */}
      <AnimatePresence>
        {paperModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPaperModal(null)}
              className="absolute inset-0 bg-primary-navy/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FAFAF7] border-2 border-accent-gold/40 rounded-2xl w-full max-w-2xl p-6 sm:p-8 relative z-10 shadow-2xl space-y-6 text-left"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-accent-gold font-bold">{paperModal.topic} Volume Paper</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary-navy">{paperModal.title}</h3>
                <p className="text-xs text-gray-500 font-sans">Authors: {paperModal.authors}</p>
              </div>

              <div className="bg-white p-5 rounded border text-xs text-gray-600 leading-relaxed font-sans space-y-3 shadow-inner max-h-[220px] overflow-y-auto">
                <p className="font-serif font-bold text-primary-navy text-[13px]">Abstract Overview:</p>
                <p className="font-light">{paperModal.abstract}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-neutral-warm p-4 rounded border">
                <div>
                  <p className="text-[9px] text-gray-400 font-bold leading-none">Original Index DOI:</p>
                  <p className="font-medium text-[#1a4a8a] mt-1 underline truncate">{paperModal.doi}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 font-bold leading-none">Academic Outlet:</p>
                  <p className="font-medium text-gray-700 mt-1 truncate">{paperModal.journal}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-divider">
                <span className="font-mono text-gray-400">{paperModal.pages} Pages Document</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPaperModal(null)}
                    className="px-4 py-2 border text-gray-600 hover:bg-gray-100 rounded text-xs uppercase"
                  >
                    Close
                  </button>
                  <a
                    href="https://link.springer.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-primary-navy text-[#C9A961] hover:bg-primary-navy-hover rounded text-xs uppercase flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
