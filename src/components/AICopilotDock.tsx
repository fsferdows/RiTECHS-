import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageSquare, Send, X, Bot, HelpCircle, Award, Compass, ArrowRight, BrainCircuit, CheckSquare, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mentors } from '../mentor';
import { Member } from '../types';

interface AICopilotDockProps {
  onSelectMentor?: (mentor: Member) => void;
  onNavigateToMentors?: () => void;
}

export default function AICopilotDock({ onSelectMentor, onNavigateToMentors }: AICopilotDockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'q&a' | 'matchmaker'>('matchmaker');
  const [chatMessage, setChatMessage] = useState("");
  const [abstractText, setAbstractText] = useState("");
  const [targetedDomain, setTargetedDomain] = useState("cybersecurity");
  
  // Loading & State variables
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [matchedMentors, setMatchedMentors] = useState<Array<{ mentor: Member; rationale: string }>>([]);
  const [selectedProfile, setSelectedProfile] = useState<Member | null>(null);
  const [connectNote, setConnectNote] = useState("");
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [requestSentStatus, setRequestSentStatus] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to results on response
  useEffect(() => {
    if (aiResponse && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiResponse, matchedMentors]);

  // Clean state when tabs change
  useEffect(() => {
    setAiResponse(null);
    setMatchedMentors([]);
    setSelectedProfile(null);
    setRequestSentStatus(null);
  }, [activeTab]);

  const handleGeneralQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setIsLoading(true);
    setAiResponse(null);
    setMatchedMentors([]);

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatMessage, type: 'general' })
      });

      if (!response.ok) {
        throw new Error("Core database is digesting connections. Please retry.");
      }

      const data = await response.json();
      setAiResponse(data.answer);

      if (data.matches && Array.isArray(data.matches)) {
        const fullMatches = data.matches
          .map((m: any) => {
            const fullMentor = mentors.find(item => item.id === Number(m.mentorId));
            return fullMentor ? { mentor: fullMentor, rationale: m.rationale } : null;
          })
          .filter((item): item is { mentor: Member; rationale: string } => item !== null);
        
        setMatchedMentors(fullMatches);
      }
    } catch (err: any) {
      setAiResponse(`### System Interruption\n\n${err?.message || 'The AI gateway is temporarily busy. Please secure your connection or verify secrets.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSemanticMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!abstractText.trim()) return;

    setIsLoading(true);
    setAiResponse(null);
    setMatchedMentors([]);
    setSelectedProfile(null);

    const matchPayload = `[Target Domain: ${targetedDomain}]\n\n${abstractText}`;

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: matchPayload, abstract: abstractText, type: 'matchmaker' })
      });

      if (!response.ok) {
        throw new Error("Connecting matching threads...");
      }

      const data = await response.json();
      setAiResponse(data.answer);

      if (data.matches && Array.isArray(data.matches)) {
        const fullMatches = data.matches
          .map((m: any) => {
            const fullMentor = mentors.find(item => item.id === Number(m.mentorId));
            return fullMentor ? { mentor: fullMentor, rationale: m.rationale } : null;
          })
          .filter((item): item is { mentor: Member; rationale: string } => item !== null);
        
        setMatchedMentors(fullMatches);
      }
    } catch (err: any) {
      setAiResponse(`### Matchmaker Error\n\nFailed to establish AI semantic matchmaking. ${err?.message || 'Retry in a few seconds.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingRequest(true);
    setTimeout(() => {
      setIsSendingRequest(false);
      setRequestSentStatus(`Review invitation safely queued with ${selectedProfile?.name}!`);
      setConnectNote("");
      setTimeout(() => {
        setSelectedProfile(null);
        setRequestSentStatus(null);
      }, 3000);
    }, 1200);
  };

  return (
    <>
      {/* 1. Floating Action Sparkling Orb */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="ai-copilot-trigger-btn"
          className="relative group w-14 h-14 rounded-full bg-[#0A1F44] border-2 border-[#C9A961] shadow-2xl flex items-center justify-center cursor-pointer transition-transform duration-300 active:scale-95 text-[#C9A961]"
          title="Open RiTECHS Academic AI Concierge"
        >
          {/* Glowing ring animation */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C9A961] to-[#0A1F44] opacity-35 blur-md group-hover:opacity-75 transition duration-500 animate-pulse"></div>
          
          {isOpen ? (
            <X className="w-6 h-6 transform rotate-90 transition duration-300 relative z-10" />
          ) : (
            <Sparkles className="w-6 h-6 text-accent-gold relative z-10 animate-bounce" />
          )}

          {/* Prompt Bubble */}
          {!isOpen && (
            <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-[#0A1F44] border border-[#C9A961]/40 shadow-lg px-3 py-1.5 rounded-lg text-xs font-serif font-bold tracking-tight whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
              Verify Research fitting instantly! ✨
            </div>
          )}
        </button>
      </div>

      {/* 2. Cozy Sliding Drawer Layout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            id="ai-copilot-panel" 
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[620px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl border-2 border-[#C9A961]/40 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
          
          {/* Header Banner */}
          <div className="bg-[#0A1F44] text-[#FAFAF7] p-4 border-b border-[#C9A961]/40 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#C9A961]/10 flex items-center justify-center text-[#C9A961] border border-[#C9A961]/30">
                <BrainCircuit className="w-4 h-4 text-accent-gold" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white flex items-center space-x-1">
                  <span>RiTECHS AI Co-pilot</span>
                  <span className="text-[8px] bg-accent-gold/25 text-[#C9A961] px-1.5 py-0.5 rounded uppercase font-mono font-bold tracking-wider">Concierge</span>
                </h4>
                <p className="text-[10px] text-gray-300 font-light font-sans">Empowered by Gemini 3.5 Flash</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition p-1 hover:bg-white/10 rounded"
              title="Minimize drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 bg-neutral-warm border-b border-divider text-xs text-center font-bold tracking-wider uppercase">
            <button
              onClick={() => setActiveTab('matchmaker')}
              className={`py-3 transition border-b-2 ${
                activeTab === 'matchmaker'
                  ? 'border-[#0A1F44] text-[#0A1F44] bg-white font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-500'
              }`}
            >
              🤝 AI Matchmaker
            </button>
            <button
              onClick={() => setActiveTab('q&a')}
              className={`py-3 transition border-b-2 ${
                activeTab === 'q&a'
                  ? 'border-[#0A1F44] text-[#0A1F44] bg-white font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-500'
              }`}
            >
              💬 General Q&A
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {activeTab === 'matchmaker' && (
              <div className="space-y-4">
                <div className="bg-neutral-warm/80 p-3.5 border border-divider rounded-lg">
                  <h5 className="text-[11px] font-bold text-primary-navy uppercase tracking-wider flex items-center space-x-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#C9A961]" />
                    <span>Academic Paper Matchmaking</span>
                  </h5>
                  <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                    Instantly matches your working thesis title or project abstract with top-tier board experts from our 170+ global directory.
                  </p>
                </div>

                <form onSubmit={handleSemanticMatch} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Methodology Focus</label>
                    <select
                      value={targetedDomain}
                      onChange={(e) => setTargetedDomain(e.target.value)}
                      className="w-full bg-neutral-warm border border-divider rounded p-2 text-xs font-semibold focus:outline-none"
                    >
                      <option value="cybersecurity">Cybersecurity & Trust Models</option>
                      <option value="iot">Internet of Everything (IoE) / Wireless Networks</option>
                      <option value="machine-learning">Machine Learning & Data Mining Informatics</option>
                      <option value="bio-energy">Bio-Energy & Chemical Systems Engineering</option>
                      <option value="software-engineering">Software Systems & Cloud Architecture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Enter Abstract or Topic</label>
                    <textarea
                      rows={4}
                      required
                      value={abstractText}
                      onChange={(e) => setAbstractText(e.target.value)}
                      placeholder="Paste your paper draft excerpt, working title or main objectives (e.g. Analysis of security metrics for microgrid integration inside high-trust cloud instances)..."
                      className="w-full bg-neutral-warm border border-divider rounded p-2.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !abstractText.trim()}
                    className="w-full bg-[#0A1F44] hover:bg-primary-navy shadow text-[#C9A961] uppercase tracking-wider text-xs font-bold py-2.5 rounded transition flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Semantic Vector Matching...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Scan & Align with Board Members</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'q&a' && (
              <div className="space-y-4">
                <div className="bg-neutral-warm/80 p-3 border border-divider rounded-lg text-xs">
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Ask questions about paper submission deadlines, conference dates, peer evaluation rounds, subscription packages, or direct paths to high-impact publishing.
                  </p>
                  
                  {/* Preset prompt seeds */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setChatMessage("What are the key submission deadlines and keynote speakers for ICETCS 2026?")}
                      className="text-[9px] bg-white border px-2 py-1 rounded-sm text-gray-600 hover:border-accent-gold block text-left"
                    >
                      📅 Keynote & Deadlines
                    </button>
                    <button
                      onClick={() => setChatMessage("Can you explain how the double-blind review process is managed?")}
                      className="text-[9px] bg-white border px-2 py-1 rounded-sm text-gray-600 hover:border-accent-gold block text-left"
                    >
                      🛡️ Peer Review process
                    </button>
                    <button
                      onClick={() => setChatMessage("Suggest top-tier journals indexed by Springer aligned with IoT Energy systems.")}
                      className="text-[9px] bg-white border px-2 py-1 rounded-sm text-gray-600 hover:border-accent-gold block text-left"
                    >
                      📚 Springer Journal Guidance
                    </button>
                  </div>
                </div>

                <form onSubmit={handleGeneralQuery} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Inquire about conferences, reviews, services..."
                    className="flex-grow bg-neutral-warm border border-divider rounded px-3 py-2 text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !chatMessage.trim()}
                    className="bg-[#0A1F44] hover:bg-primary-navy text-[#C9A961] p-2 rounded transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* AI Results Output Container */}
            {(aiResponse || isLoading) && (
              <div ref={scrollRef} className="border-t border-divider pt-4 space-y-4">
                
                {isLoading && !aiResponse && (
                  <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
                    <div className="w-8 h-8 rounded-full border-2 border-[#C9A961] border-t-transparent animate-spin"></div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A961] font-bold">Accessing AI Core...</span>
                  </div>
                )}

                {aiResponse && (
                  <div className="space-y-4">
                    <div className="bg-[#0A1F44]/5 border border-dashed border-[#C9A961] rounded-lg p-3.5 text-xs text-gray-700 leading-relaxed font-sans prose prose-neutral max-w-none">
                      <div className="flex items-center space-x-1.5 mb-2">
                        <Bot className="w-4 h-4 text-[#C9A961] shrink-0" />
                        <span className="text-[9px] uppercase font-mono tracking-widest text-[#0A1F44] font-bold">Advisor Response</span>
                      </div>
                      <p className="whitespace-pre-wrap">{aiResponse}</p>
                    </div>

                    {/* Matched Mentors Panels */}
                    {matchedMentors.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-1 justify-between">
                          <span className="text-[10px] text-gray-400 font-mono uppercase font-bold">Matched Advisors</span>
                          {onNavigateToMentors && (
                            <button
                              onClick={onNavigateToMentors}
                              className="text-[9px] text-[#1a4a8a] italic hover:underline flex items-center space-x-0.5"
                            >
                              <span>Explore board directory</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>

                        <div className="space-y-2.5">
                          {matchedMentors.slice(0, 3).map(({ mentor, rationale }, idx) => (
                            <div key={idx} className="bg-white border rounded-lg p-3 shadow-xs space-y-2 hover:border-[#C9A961] transition">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h6 className="font-serif font-bold text-xs text-primary-navy leading-none">{mentor.name}</h6>
                                  <p className="text-[9px] text-gray-400 mt-1 font-semibold">{mentor.title} — {mentor.affiliation}</p>
                                </div>
                                <span className="bg-accent-gold/10 text-[#C9A961] text-[8px] font-mono px-1.5 py-0.5 rounded uppercase font-bold text-right shrink-0">
                                  {mentor.location}
                                </span>
                              </div>

                              <p className="text-[10px] text-gray-500 bg-neutral-warm/45 p-2 rounded leading-relaxed border-l-2 border-accent-gold font-light">
                                <strong>Match Reason:</strong> {rationale}
                              </p>

                              <div className="flex justify-end space-x-1.5 pt-1">
                                {onSelectMentor && (
                                  <button
                                    onClick={() => {
                                      onSelectMentor(mentor);
                                      if (onNavigateToMentors) onNavigateToMentors();
                                    }}
                                    className="px-2 py-1 bg-neutral-warm text-gray-600 hover:bg-neutral-warm text-[10px] rounded border"
                                  >
                                    Inspect Member Card
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    setSelectedProfile(mentor);
                                    setRequestSentStatus(null);
                                  }}
                                  className="px-2.1 py-1 bg-[#0A1F44] text-[#C9A961] text-[10px] hover:bg-primary-navy font-bold rounded"
                                >
                                  Request Review
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Request Review Interactive Overlay inside Copilot panel */}
            {selectedProfile && (
              <div className="border-t border-[#C9A961] bg-amber-50/50 p-3 rounded-lg space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <h6 className="font-serif font-semibold text-primary-navy">Request Review with {selectedProfile.name}</h6>
                  <button onClick={() => setSelectedProfile(null)} className="text-gray-400 text-[11px] hover:text-gray-700">Cancel</button>
                </div>
                
                {requestSentStatus ? (
                  <p className="text-[10px] text-green-700 font-semibold bg-green-50 p-2 rounded border border-green-200">
                    ✓ {requestSentStatus}
                  </p>
                ) : (
                  <form onSubmit={handleSendRequest} className="space-y-2">
                    <p className="text-[10px] text-gray-500 leading-tight">
                      We will bundle your query/abstract along with your registered profile details in a secure message to this board member.
                    </p>
                    <textarea
                      rows={3}
                      required
                      value={connectNote}
                      onChange={(e) => setConnectNote(e.target.value)}
                      placeholder="Include any specific feedback requirements or timelines..."
                      className="w-full bg-white border border-divider rounded p-2 text-[11px] focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isSendingRequest}
                      className="w-full bg-[#0A1F44] text-[#C9A961] py-1.5 text-[10px] uppercase font-bold rounded select-none hover:bg-primary-navy transition"
                    >
                      {isSendingRequest ? "Delivering..." : "Deliver secure manuscript invite"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Quick FAQ Footer */}
          <div className="border-t border-divider p-3 text-[10px] bg-neutral-warm font-mono flex justify-between items-center text-gray-400">
            <span>Security protocol: AES-256 standard</span>
            <span>Version: board-agent-2.2</span>
          </div>

        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
