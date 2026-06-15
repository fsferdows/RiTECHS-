import React, { useState } from 'react';
import { BookOpen, Users, Clock, Award, FileText, CheckCircle2, MessageSquare, AlertCircle, RefreshCw, Send } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string, subPage?: string | null, extraId?: string | null) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'papers' | 'courses' | 'credentials'>('papers');
  const [refreshedState, setRefreshedState] = useState(false);

  // Simulated submitted manuscripts
  const submittedPapers = [
    {
      id: "RIT-ICETCS-4921",
      title: "Active Threat Mitigation and Side-Channel Entropy in Decentralised Nodes",
      track: "Cybersecurity & Hardware Threat",
      status: "Resubmit with minor adjustments",
      score: "82/100",
      reviewers: [
        { name: "Reviewer #1", opinion: "Methodology is statistically complete. However, abstract requires passive structures to be modified into active voice." },
        { name: "Reviewer #2", opinion: "The experimental telemetry diagrams are robustly configured. Add bibliography entries for Springer LNCS citations." }
      ]
    },
    {
      id: "RIT-IoE-3091",
      title: "Edge Dynamic Allocation Topologies for Photovoltaic Microgrid arrays",
      track: "Internet of Everything",
      status: "Under Double-Blind Peer Review",
      score: "Review Pending",
      reviewers: [
        { name: "Reviewer #1", opinion: "Assessing mathematical convergence limits. Preliminary analysis is favorable." }
      ]
    }
  ];

  return (
    <div className="bg-neutral-warm min-h-screen text-text-body font-sans transition-all pb-12">
      
      {/* Workspace Banner */}
      <section className="bg-primary-navy text-neutral-warm py-12 px-4 md:px-8 border-b-2 border-accent-gold/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A961] font-semibold bg-white/5 px-2.5 py-1 rounded">Secure Academic Workspace</span>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-white leading-none">Scholar Portal Dashboard</h1>
            <p className="text-xs text-gray-300 font-light font-sans">Control panel for peer reviewers, active certifications, and submitted abstracts.</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setRefreshedState(true);
                setTimeout(() => setRefreshedState(false), 1000);
              }}
              className="bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition text-gray-300"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-accent-gold ${refreshedState ? 'animate-spin' : ''}`} />
              <span>Refresh Metrics</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main View Area */}
      <main className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Hand Navigation Rail */}
        <div className="md:col-span-3 space-y-4">
          <div className="bg-white rounded-lg border shadow-sm p-4 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary-navy text-white font-serif font-bold text-lg flex items-center justify-center mx-auto shadow-inner">
              AS
            </div>
            <div>
              <h4 className="font-serif font-bold text-primary-navy text-base leading-none">Academic Scholar</h4>
              <p className="text-[10px] text-gray-400 font-mono tracking-wide uppercase mt-1">Research Fellow</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm overflow-hidden text-xs font-semibold">
            <button
              onClick={() => setActiveTab('papers')}
              className={`w-full text-left px-4 py-3 border-l-4 transition flex justify-between items-center ${
                activeTab === 'papers' ? 'bg-[#C9A961]/10 border-[#C9A961] text-primary-navy' : 'border-transparent text-gray-500 hover:bg-neutral-warm'
              }`}
            >
              <span>Paper Referees Desk</span>
              <FileText className="w-4 h-4 text-accent-gold" />
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full text-left px-4 py-3 border-l-4 transition flex justify-between items-center ${
                activeTab === 'courses' ? 'bg-[#C9A961]/10 border-[#C9A961] text-primary-navy' : 'border-transparent text-gray-500 hover:bg-neutral-warm'
              }`}
            >
              <span>Active e-Learning syllabus</span>
              <BookOpen className="w-4 h-4 text-accent-gold" />
            </button>

            <button
              onClick={() => setActiveTab('credentials')}
              className={`w-full text-left px-4 py-3 border-l-4 transition flex justify-between items-center ${
                activeTab === 'credentials' ? 'bg-[#C9A961]/10 border-[#C9A961] text-primary-navy' : 'border-transparent text-gray-500 hover:bg-neutral-warm'
              }`}
            >
              <span>Sovereign Credentials</span>
              <Award className="w-4 h-4 text-accent-gold" />
            </button>
          </div>
        </div>

        {/* Right Hand content panels */}
        <div className="md:col-span-9 space-y-6">
          
          {activeTab === 'papers' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-lg font-bold text-primary-navy">Manuscript Peer-Review Tracker</h3>
                  <p className="text-[11px] text-gray-500 font-light mt-0.5">Tracking status scores assigned by our global dual-blind reviewers council.</p>
                </div>
                <button
                  onClick={() => onNavigate('conferences')}
                  className="bg-[#0A1F44] hover:bg-primary-navy-hover text-[#C9A961] text-[10px] uppercase font-bold px-3 py-2 rounded transition"
                >
                  Submit Abstract
                </button>
              </div>

              {submittedPapers.map((paper, idx) => (
                <div key={idx} className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
                  <div className="flex justify-between items-start flex-wrap gap-2 pb-3 border-b">
                    <div>
                      <span className="text-[9px] font-mono uppercase bg-neutral-warm border text-gray-500 px-2.5 py-0.5 rounded">
                        ID: {paper.id}
                      </span>
                      <h4 className="font-serif text-base font-bold text-primary-navy mt-1 leading-snug">{paper.title}</h4>
                      <p className="text-[10px] text-gray-400 font-medium">Mapped Track: {paper.track}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono tracking-wide block font-semibold text-accent-gold font-mono uppercase pt-1">
                        {paper.status}
                      </span>
                      <span className="text-xs font-bold text-gray-600 block font-mono mt-0.5">
                        Peer Score: {paper.score}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-[11px] font-bold text-[#1a4a8a] uppercase tracking-wider flex items-center space-x-1.5">
                      <MessageSquare className="w-4 h-4 text-accent-gold" />
                      <span>Individual Reviewers Feedback</span>
                    </h5>
                    
                    <div className="divide-y divide-divider">
                      {paper.reviewers.map((rev, rIdx) => (
                        <div key={rIdx} className="py-2 text-xs">
                          <strong className="text-primary-navy text-[11px] block">{rev.name}</strong>
                          <p className="text-gray-500 font-light leading-relaxed italic">"{rev.opinion}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-lg font-bold text-primary-navy">Enrolled e-Learning Programs</h3>
                <p className="text-[11px] text-gray-500 font-light mt-0.5">Your active training courses. Complete chapter validation quizzes to earn credentials.</p>
              </div>

              {/* Dynamic enrolled course track card */}
              <div className="bg-white rounded-lg border shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono uppercase bg-[#1a4a8a]/10 text-[#1a4a8a] px-2.5 py-0.5 rounded font-bold">
                    Cybersec & IoT Course Track
                  </span>
                  <h4 className="font-serif text-base font-bold text-primary-navy">Frontier Cyber Defence Operational Training</h4>
                  <p className="text-xs text-gray-400 font-light leading-none">Verified Syllabus under Prof. Dr. Kim-Kwang Raymond Choo</p>
                  
                  {/* progress layout */}
                  <div className="pt-2 flex items-center space-x-3 text-xs text-gray-600">
                    <div className="w-32 bg-gray-100 h-1.5 rounded-full overflow-hidden relative">
                      <div className="bg-accent-gold h-full absolute left-0 top-0 w-1/3"></div>
                    </div>
                    <span>Chapter 1/3 (35% Completed)</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('services', 'elearning')}
                  className="bg-primary-navy text-white text-xs uppercase font-semibold hover:bg-primary-navy-hover py-2.5 px-5 rounded transition"
                >
                  Resume Lectures player
                </button>
              </div>
            </div>
          )}

          {activeTab === 'credentials' && (
            <div className="space-y-6 animate-fade-in text-center py-10 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#C9A961]/15 text-[#C9A961] flex items-center justify-center mx-auto">
                <Award className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-primary-navy">No Published Credentials Yet</h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Graduation validation metrics verify quiz completions automatically. Head into eLearning and complete active quizzes to unlock certification files immediately.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('services', 'elearning')}
                  className="bg-[#0A1F44] hover:bg-primary-navy-hover text-[#C9A961] text-xs font-semibold py-2.5 px-6 rounded uppercase tracking-wider transition"
                >
                  Configure Syllabus
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
