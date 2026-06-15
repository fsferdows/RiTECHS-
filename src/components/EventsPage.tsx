import React, { useState } from 'react';
import { Calendar, MapPin, Users, Ticket, Award, BookOpen, Clock, ShieldAlert, Sparkles, Code, Play, HelpCircle, Flame, CheckCircle, Search, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EventsPageProps {
  initialSub?: string | null;
}

export default function EventsPage({ initialSub }: EventsPageProps) {
  const [activeSubTab, setActiveSubTab] = useState<'seminar' | 'bootcamp' | 'adda' | 'cyber4me'>(
    initialSub === 'seminar' ? 'seminar' :
    initialSub === 'bootcamp' ? 'bootcamp' :
    initialSub === 'adda' ? 'adda' :
    initialSub === 'cyber4me' ? 'cyber4me' : 'seminar'
  );

  // Registration States
  const [ticketModal, setTicketModal] = useState<any | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [registeredTickets, setRegisteredTickets] = useState<string[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleBookTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail) return;
    setIsRegistering(true);

    setTimeout(() => {
      const generatedCode = "TICKET-" + activeSubTab.toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000);
      setRegisteredTickets(prev => [...prev, generatedCode]);
      setTicketModal(prev => ({
        ...prev,
        code: generatedCode,
        attendee: userName,
        email: userEmail
      }));
      setIsRegistering(false);
    }, 1500);
  };

  const purposesOfSeminars = [
    { title: "Professional Orientation", desc: "Assisting graduate scholars in identifying suitable fields of investigation and framing successful titles for their master/PhD dissertations." },
    { title: "Academic Skills Development", desc: "Enhancing analytical research compilation, paper preparation speeds, source vetting, and mathematical equation formatting." },
    { title: "Project Engagement", desc: "Actively involving students in live high-scale project research and development (R&D) initiatives for strategic government bodies." },
    { title: "Publishing Opportunities", desc: "Providing dedicated guidance with native English peer reviewers to publish scholarly review papers in high-tier databases successfully." },
    { title: "Information Management", desc: "Teaching students how to gather, index, categorize, and cross-reference research datasets systematically to compile technical reports." },
    { title: "Workflow Familiarization", desc: "Introducing students to professional standards and working workflows inside public administration, research grids, and government bodies." }
  ];

  const cyber4meActivities = [
    {
      title: "College Roadshows",
      fee: "Free Entry",
      format: "Face to Face",
      schedule: "Conducted at 5 FE Colleges in the West Midlands",
      desc: "Delivering foundational Cyber Security 101 courses to introduce participants to central defense structures, software scanning, and defensive tactics to protect personal data."
    },
    {
      title: "Online Training for Students",
      fee: "Free Certification",
      format: "Online Session",
      schedule: "28th March 2024 | 9:30 AM - 1:00 PM GMT",
      desc: "Comprehensive security training for 100-150 students from FE colleges and universities in the Black Country. Covers cybersecurity essentials, GDPR compliance codes, and information security management."
    },
    {
      title: "Cyber Hackathon and CTF Competition",
      fee: "Free Entry",
      format: "To be announced",
      schedule: "Inter-collegiate Tournament",
      desc: "Organizing an immersive hands-on Hackathon and Capture the Flag (CTF) tournament, challenging college and university students to trace back malicious threats in safe server environments."
    },
    {
      title: "Cyber Escape Room",
      fee: "Free Entry",
      format: "To be announced",
      schedule: "Immersive Gamified Lab",
      desc: "An immersive security awareness setup where teams decode active network anomalies, decipher cryptographic riddles, and learn to patch cyber vulnerabilities in real-time."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.4 }}
      className="bg-neutral-warm min-h-screen text-text-body font-sans pb-16"
    >
      {/* Editorial Page Title Screen */}
      <section className="bg-[#0A1F44] text-[#FAFAF7] py-16 px-4 md:px-8 border-b border-[#C9A961]/40 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/banner_5.png" 
            alt="Events Banner" 
            className="w-full h-full object-cover opacity-25"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/95 via-[#0A1F44]/80 to-[#0A1F44]/65 mt-0" />
        </div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#C9A961] font-semibold">Scholarly Integration Panel</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Events, Seminars, Bootcamps & Cyber4Me
          </h1>
          <p className="text-sm text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Register for professional seminars, join supportive boot camps with active mentoring office hours, or take part in funded computer security projects.
          </p>

          {/* Sub Navigation Switcher */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveSubTab('seminar')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                activeSubTab === 'seminar' ? 'bg-[#C9A961] text-[#0A1F44]' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Academic Seminars
            </button>
            <button
              onClick={() => setActiveSubTab('bootcamp')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                activeSubTab === 'bootcamp' ? 'bg-[#C9A961] text-[#0A1F44]' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Support Boot Camps
            </button>
            <button
              onClick={() => setActiveSubTab('adda')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                activeSubTab === 'adda' ? 'bg-[#C9A961] text-[#0A1F44]' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Research Adda
            </button>
            <button
              onClick={() => setActiveSubTab('cyber4me')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                activeSubTab === 'cyber4me' ? 'bg-[#C9A961] text-[#0A1F44]' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Cyber4Me (Funded Project)
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* 1. Academic Seminars Tab content */}
        {activeSubTab === 'seminar' && (
          <div className="space-y-12 animate-fade-in">
            {/* Context Narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="inline-flex items-center space-x-1 border border-accent-gold/40 bg-accent-gold/10 px-2.5 py-1 rounded text-[9px] uppercase font-mono font-bold tracking-widest text-[#C9A961]">
                  <Award className="w-3.5 h-3.5 mr-1 text-[#C9A961]" />
                  <span>Syllabus Integration</span>
                </span>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-navy">
                  Rigorous Curriculum Research Seminars
                </h2>
                <p className="text-xs text-gray-500 font-light font-sans leading-relaxed">
                  Our research seminars are an essential cornerstone of the RiTECHS educational map. Each program is meticulously engineered to equip upcoming postgraduates, research candidates, and software designers with advanced methodologies, publication guidelines, and enterprise-scale formatting workflows.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {purposesOfSeminars.map((p, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border border-divider shadow-xs space-y-1 hover:border-[#C9A961] transition">
                      <h4 className="font-serif text-xs font-bold text-primary-navy">{p.title}</h4>
                      <p className="text-[10px] text-gray-500 font-light font-sans leading-normal">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seminar active ticket card */}
              <div className="space-y-6">
                <div className="bg-[#0A1F44] text-white rounded-xl border border-accent-gold/30 p-6 sm:p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#C9A961] text-[#0A1F44] text-[8px] font-mono font-bold tracking-widest px-3 py-1 uppercase rounded-bl">
                    Featured Seminar
                  </div>

                  <div className="space-y-4">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-accent-gold font-bold">Wolverhampton University Link</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAFAF7] leading-tight">
                      How to Publish Review Papers in High Impact Journals
                    </h3>
                    <p className="text-xs text-gray-300 font-sans font-light leading-relaxed">
                      Learn the exact roadmap to layout high-impact survey drafts, catalog references systematically, and write dual-blind review rebuttal documentation successfully. Keynote Speaker: **Dr. Arafatur Rahman**, Senior Lecturer at University of Wolverhampton, UK.
                    </p>

                    <div className="border-t border-b border-white/5 py-4 space-y-2 text-xs font-mono text-gray-300">
                      <p className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-accent-gold shrink-0" />
                        <span>Venue: Wolverhampton, United Kingdom (UK)</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-accent-gold shrink-0" />
                        <span>Date: February 1-3, 2027</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-accent-gold shrink-0" />
                        <span>Time: 9:00 AM - 1:00 PM EST</span>
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <span className="text-[9px] text-gray-400 font-mono font-bold block leading-none">Admission Fee</span>
                        <strong className="text-base text-accent-gold font-mono">$30 USD Single Seat</strong>
                      </div>
                      <button
                        onClick={() => setTicketModal({ title: "How to Publish Review Papers Seminar", fee: "$30 USD" })}
                        className="bg-accent-gold hover:bg-[#bda056] text-primary-navy font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded transition flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>Register Seat</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Support Boot Camps Tab content */}
        {activeSubTab === 'bootcamp' && (
          <div className="space-y-12 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                  alt="Bootcamp Team"
                  className="rounded-xl border border-divider shadow-md object-cover h-[350px] w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary-navy text-accent-gold p-6 rounded-lg border border-accent-gold/30 shadow-lg text-center hidden sm:block max-w-[200px]">
                  <strong className="text-2xl font-serif text-white block">24/7</strong>
                  <span className="text-[9px] uppercase font-mono tracking-widest leading-tight block mt-1">Virtual Office Hours Vetted</span>
                </div>
              </div>

              <div className="space-y-6">
                <span className="inline-flex items-center space-x-1 border border-accent-gold/40 bg-accent-gold/10 px-2.5 py-1 rounded text-[9px] uppercase font-mono font-bold tracking-widest text-[#C9A961]">
                  <Sparkles className="w-3.5 h-3.5 text-accent-gold mr-1" />
                  <span>Scholarly Support Systems</span>
                </span>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-navy">
                  RiTECHS Scholarly Boot Camps
                </h2>
                <p className="text-xs text-gray-500 font-light font-sans leading-relaxed">
                  We are deeply committed to providing thorough, extensive backing to our scholars from the exact moment they register and carrying forward post-graduation. We recognize that compiling high-impact datasets or framing mathematical thesis chapters is challenging. 
                </p>

                <div className="bg-white p-5 rounded-lg border shadow-sm space-y-4">
                  <h4 className="font-serif font-bold text-xs uppercase text-[#1a4a8a] tracking-wide">Academic & Career Features Included:</h4>
                  
                  <div className="space-y-3 font-sans text-xs text-gray-600">
                    <div className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-[#C9A961] rounded-full mt-1.5 flex-shrink-0"></span>
                      <div>
                        <strong>Virtual Office Hours:</strong> Receive personalized help and formula reviews directly from university professors, peer experts, and senior mentors inside team chats.
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-[#C9A961] rounded-full mt-1.5 flex-shrink-0"></span>
                      <div>
                        <strong>Resume & CV Tuning:</strong> Specialized sessions to shape and frame candidate scholar CVs for prestigious European/UK master and PhD admissions.
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-[#C9A961] rounded-full mt-1.5 flex-shrink-0"></span>
                      <div>
                        <strong>Interview Simulation Guides:</strong> Active mockup defenses to train researchers to state thesis results, hardware testbed parameters, and data configurations clearly.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setTicketModal({ title: "Scholar Career Boot Camp Admission", fee: "Free to Members" })}
                    className="bg-primary-navy hover:bg-[#113166] text-white text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded transition flex items-center space-x-2 cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-accent-gold" />
                    <span>Apply for Academic Boot Camp Slot</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Research Adda Tab content */}
        {activeSubTab === 'adda' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="font-serif text-3xl font-bold text-primary-navy">Research Adda: Scholarly Chat Sessions</h2>
              <p className="text-xs text-gray-400 font-light font-sans">
                Participate in active research chat forums to gain immediate insight into trending thesis topics, UGC Care lists, and reviewer expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Benefits List */}
              <div className="lg:col-span-7 bg-white rounded-xl border p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
                <div className="space-y-4 text-xs">
                  <h3 className="font-serif font-bold text-base text-primary-navy">Primary Benefits of Participating</h3>
                  <p className="text-gray-500 font-light font-sans">
                    Can't make it to the live stream session? Every registered scholar receives high-definition link access to full video logs, transcript summaries, and reference folders.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-start space-x-2.5">
                      <CheckCircle className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-primary-navy block">Paper Formulation</strong>
                        <span>Compile professional and scholarly journal drafts easily.</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <CheckCircle className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-primary-navy block font-semibold">Publish Vetting</strong>
                        <span>Master guidelines to publish in top-tier science databases.</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <CheckCircle className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-primary-navy block">UGC Care Journals</strong>
                        <span>Verify paid, unpaid, and free UGC Care registers quickly.</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <CheckCircle className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-primary-navy block">Scopus Database indexes</strong>
                        <span>Identify trusted Scopus indexed avenues securely.</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <CheckCircle className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-primary-navy block">WoS / SCI Lists</strong>
                        <span>Gain insights into high-impact Web of Science structures.</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <CheckCircle className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-primary-navy block font-semibold">IEEE, ACM & DBLP</strong>
                        <span>Syllabus analysis of Computer Science publishers guidelines.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-divider text-gray-400 text-[10px] italic">
                  *Includes up-to-date syllabus updates on national UGC NET and CSIR NET eligibility exams structure.
                </div>
              </div>

              {/* Right session registration */}
              <div className="lg:col-span-5 bg-[#0A1F44] text-[#FAFAF7] rounded-xl border border-accent-gold/20 p-6 sm:p-8 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-accent-gold font-bold">Upcoming session</span>
                  <h3 className="font-serif text-lg font-bold text-white leading-tight">UGC Care & Scopus Scientific Indexing Strategies</h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Interactive chat meeting covering Scopus journal tracking systems, avoiding duplicate paper scams, and targeting gratis publishing channels.
                  </p>

                  <div className="border-t border-b border-white/5 py-4 space-y-2 text-xs font-mono text-[#dde3ef]">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-accent-gold" />
                      <span>Next Thursday, 4:00 PM - 5:30 PM GMT</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-accent-gold" />
                      <span>Platform: Secure Interactive Zoom Room</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setTicketModal({ title: "UGC Care & Scopus Scientific Indexing Chat", fee: "Free Access" })}
                  className="w-full bg-[#C9A961] hover:bg-[#bda056] text-[#0A1F44] py-2.5 text-xs font-bold uppercase tracking-wider rounded transition mt-6 cursor-pointer"
                >
                  Receive Zoom link & Handouts
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. Cyber4Me Initiative Tab content */}
        {activeSubTab === 'cyber4me' && (
          <div className="space-y-12 animate-fade-in">
            {/* Context Header with Funders DSIT */}
            <div className="bg-[#0A1F44] text-[#FAFAF7] rounded-xl border border-accent-gold/30 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="max-w-3xl space-y-4 relative z-10 text-left">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#0A1F44] bg-[#C9A961] py-1 px-3.5 rounded font-bold">
                    Gov Funded Project
                  </span>
                  <span className="text-[10px] text-gray-300 font-mono font-bold">
                    Department for Science, Innovation and Technology (DSIT)
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Cyber4Me: Fostering Resilient Young Tech Talents
                </h3>

                <p className="text-xs text-gray-300 font-sans font-light leading-relaxed">
                  The **Cyber4Me** initiative is a transformative program organized by the **University of Wolverhampton** and funded by the UK **Department for Science, Innovation and Technology**. Specially engineered for young adults aged 16-20, the project delivers fundamental cybersecurity disciplines, hands-on server defense exercises, and practical compliance parameters across modern technology industries.
                </p>

                <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-gray-300">
                  <span className="bg-white/5 py-1 px-3 border border-white/5 rounded">🏫 FE College Roadshows Vetted</span>
                  <span className="bg-white/5 py-1 px-3 border border-white/5 rounded">🎮 Immersive Cyber Escape events</span>
                  <span className="bg-white/5 py-1 px-3 border border-white/5 rounded">🏆 Secure CTF Tournaments Available</span>
                </div>
              </div>
            </div>

            {/* List of 4 activities */}
            <section className="space-y-6">
              <div className="text-left">
                <h4 className="font-serif text-xl font-bold text-[#0A1F44]">Active Cyber4Me Program Tracks</h4>
                <p className="text-xs text-gray-400 font-light font-sans mt-0.5">Explore each of the four modules providing cybersecurity excellence.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cyber4meActivities.map((act, idx) => (
                  <div key={idx} className="bg-white rounded-lg border p-6 flex flex-col justify-between hover:border-accent-gold transition-all group shadow-xs">
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-accent-gold font-bold">Track 0{idx + 1}</span>
                        <span className="text-[10px] font-semibold text-[#1a4a8a] bg-[#1a4a8a]/5 px-2.5 py-0.5 rounded font-mono">{act.fee}</span>
                      </div>
                      
                      <h4 className="font-serif text-base font-bold text-primary-navy leading-tight group-hover:text-accent-gold transition-colors">{act.title}</h4>
                      <p className="text-xs text-gray-500 font-light leading-relaxed font-sans">{act.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-divider flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-[10px] font-mono text-gray-400">
                      <p className="flex items-center font-semibold text-gray-700">
                        <MapPin className="w-3.5 h-3.5 text-accent-gold mr-1" />
                        <span>{act.format}</span>
                      </p>
                      <p className="flex items-center text-gray-500">
                        <Calendar className="w-3.5 h-3.5 text-accent-gold mr-1" />
                        <span>{act.schedule}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

      </div>

      {/* Ticket Booking Interactive Modal Drawer */}
      <AnimatePresence>
        {ticketModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTicketModal(null)}
              className="absolute inset-0 bg-primary-navy/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#FAFAF7] border-2 border-accent-gold/40 rounded-2xl w-full max-w-md p-6 relative z-10 shadow-2xl space-y-6 text-left"
            >
              {ticketModal.code ? (
                // SUCCESS STATE TICKET DETAILS
                <div className="space-y-6 animate-fade-in text-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-600 font-bold">Admission Verified</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary-navy">{ticketModal.title}</h3>
                    <p className="font-mono text-xs text-accent-gold font-bold">{ticketModal.code}</p>
                  </div>

                  <div className="bg-[#0A1F44] text-[#FAFAF7] p-5 rounded-md text-left text-xs font-mono space-y-3.5 border border-accent-gold/30">
                    <p className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Attendee:</span>
                      <span className="font-bold text-white">{ticketModal.attendee}</span>
                    </p>
                    <p className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Email:</span>
                      <span className="font-bold text-white">{ticketModal.email}</span>
                    </p>
                    <p className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Fee Standard:</span>
                      <span className="font-bold text-[#C9A961]">{ticketModal.fee}</span>
                    </p>
                    <p className="flex justify-between pt-1">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-emerald-400 font-bold">Confirmed Seat</span>
                    </p>
                  </div>

                  <button
                    onClick={() => setTicketModal(null)}
                    className="w-full bg-[#0A1F44] hover:bg-primary-navy-hover text-white py-2.5 text-xs font-semibold uppercase tracking-wider rounded transition"
                  >
                    Finish Registration
                  </button>
                </div>
              ) : (
                // UNREGISTERED INPUT STATE FORM
                <form onSubmit={handleBookTicket} className="space-y-4">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-primary-navy">{ticketModal.title}</h4>
                    <p className="text-xs text-gray-500 font-light mt-0.5">Please provide details to reserve your digital entry pass and obtain access credentials.</p>
                  </div>

                  <div className="space-y-3 font-semibold text-xs">
                    <div>
                      <label className="block text-gray-700 mb-1">Scholar Full Name</label>
                      <input
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="e.g., Nafees Zaman"
                        className="w-full bg-neutral-warm border border-divider rounded px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#C9A961]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Correspondence Email</label>
                      <input
                        type="email"
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="e.g., nafees.zaman@girona.edu"
                        className="w-full bg-neutral-warm border border-divider rounded px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#C9A961]"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-accent-gold/10 rounded border text-[10px] text-gray-600 font-sans leading-relaxed">
                    *The admission pass for <strong>{ticketModal.title}</strong> valued at <strong>{ticketModal.fee}</strong> will be saved to your dashboard. Access parameters dispatch to primary email.
                  </div>

                  <div className="flex justify-end space-x-2 pt-2 text-[10px] font-bold uppercase tracking-widest">
                    <button
                      type="button"
                      onClick={() => setTicketModal(null)}
                      className="px-4 py-2 bg-white border text-gray-600 hover:bg-gray-100 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isRegistering}
                      className="px-5 py-2 bg-[#0A1F44] text-[#C9A961] hover:bg-primary-navy rounded shadow flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      {isRegistering ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-[#C9A961] border-t-transparent rounded-full animate-spin"></span>
                          <span>Booking...</span>
                        </>
                      ) : (
                        <span>Verify Reserve</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
