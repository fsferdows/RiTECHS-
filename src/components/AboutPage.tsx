import React, { useState } from 'react';
import { Target, Shield, Rocket, Users, Milestone, Award, CheckCircle, Heart, HeartHandshake, Eye, BookOpen, GraduationCap, Flame, Building } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutPageProps {
  initialSub?: string | null;
}

export default function AboutPage({ initialSub }: AboutPageProps) {
  const [activeTab, setActiveTab] = useState<'mission' | 'values' | 'goals' | 'procedure' | 'employees'>(
    initialSub === 'corevalue' ? 'values' :
    initialSub === 'future-goal' ? 'goals' :
    initialSub === 'procedure' ? 'procedure' :
    initialSub === 'employees' ? 'employees' : 'mission'
  );

  // Core Corporate Values updated with exact user values
  const coreValues = [
    {
      title: "Integrity",
      icon: Shield,
      desc: "We build our core on academic honesty, peer transparency, rigorous dual-blind vetting, and genuine, peer-reviewed evaluation frameworks."
    },
    {
      title: "Research Advocacy",
      icon: Target,
      desc: "Celebrating independent scientific discovery, supporting postgraduates, and pushing boundaries of telemetry, Cybersecurity, and renewable energy."
    },
    {
      title: "Service to Society",
      icon: HeartHandshake,
      desc: "Making elite engineering resources, certified academic guidance, and cyber resilience expertise open and accessible to communities globally."
    },
    {
      title: "Dependability",
      icon: CheckCircle,
      desc: "Consistently executing peer evaluations, double-signed certifications, and journal proceedings matching in a reliable and pristine manner."
    }
  ];

  // Future Goals updated with exact user details
  const futureGoals = [
    {
      title: "Encourage Global Innovation",
      desc: "Establish multi-lab physical node classrooms (Genoa, Italy and Babcock, Nigeria) by 2028 to spur collaborative, cross-border research pipelines.",
      icon: Rocket
    },
    {
      title: "Increase Public Awareness",
      desc: "Drive regional Cyber4Me college roadshows, cyber escape rooms, and hands-on CTF tournaments to bridge technical and digital training divides.",
      icon: Eye
    },
    {
      title: "Promote Lifelong Learning",
      desc: "Offer highly indexed, open-source digital e-learning courses and virtual developer mentoring office hours inside our unified training hubs.",
      icon: BookOpen
    },
    {
      title: "Facilitate Career Advancement",
      desc: "Coach postgraduates, tune resume structures, and run mock dissertation defenses to elevate CV admission rates inside prestigious European and UK academies.",
      icon: GraduationCap
    },
    {
      title: "Inspire & Engage Communities",
      desc: "Create local chapters, organize collaborative 'Research Addas', and celebrate independent scholars to unify local cybersecurity innovators.",
      icon: Flame
    }
  ];

  // Procedure 8 steps
  const matchingSteps = [
    { nr: "01", title: "Identify Prospective Mentors & Mentees", desc: "Systematically profile candidates of advanced science faculties (Wolverhampton, Genoa) based on exact technical research interest alignment." },
    { nr: "02", title: "Establish Reliable Communication Channels", desc: "Provision secure chat rooms, coordinate collaborative whiteboard canvases, and configure virtual calendar notifications." },
    { nr: "03", title: "Organize Collaborative Research Projects", desc: "Pair scholars to co-author deep survey-reviews, setting milestones, software parameters, and dataset telemetry configurations." },
    { nr: "04", title: "Offer Rich Educational Resources", desc: "Grant master-class database credentials, peer paper references, and LaTeX thesis layout guides." },
    { nr: "05", title: "Host Immersive Events & Boot Camps", desc: "Launch academic seminars, career coaching networks, mock defense chambers, and interactive hackathons." },
    { nr: "06", title: "Provide Scholarships & Funding", desc: "Connect outstanding young cyber talents with funded initiatives (e.g., Department for Science, Innovation and Technology grants)." },
    { nr: "07", title: "Gather Feedback & Assess Progress", desc: "Review dual-blind evaluation outcomes, paper submission deadlines, and coordinate revisions schedules." },
    { nr: "08", title: "Strengthen Connections & Networking", desc: "Integrate candidates with the Global Editorial Council board, unlocking lifelong publishing opportunities and direct referrals." }
  ];

  // Employees list provided by the user
  const employeesList = [
    {
      name: "Dr. Nadia Refat",
      role: "Director of Operations",
      period: "2021 - Present",
      credential: "Doctor of Philosophy in Educational Infrastructure & Quality Vetting",
      bio: "Directs peer mentorship workflows, coordinates editorial modification channels, and leads university level partnerships with the University of Wolverhampton.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Dr. S M Nazmus Sadat",
      role: "Eminent Council Mentor",
      period: "2022 - Present",
      credential: "Postdoctoral Specialist in Cybersecurity Essentials & Smart IoT Telemetry",
      bio: "Guides young scholars through complex hardware trust Trojans, side-channel attacks defense structures, and active cloud data security.",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Nafees Zaman",
      role: "Registered Council Mentee",
      period: "2021 - Present",
      credential: "PhD Scholar at Universitat de Girona, Spain",
      bio: "Published research co-author on Active Packet Inspection with GAN models. Actively guides juniors through e-learning platform development.",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
    }
  ];

  // Original Council board members (Founders / Advisors)
  const foundingBoard = [
    {
      name: "Prof. Dr. Md Arafatur Rahman",
      role: "Founder & Chief Executive Officer",
      credential: "Senior Academician, University of Wolverhampton, United Kingdom",
      bio: "Founding chair of ICETCS. Over 150+ highly indexed Springer and IEEE papers. Leading world-authority on Cognitive Radio Systems, smart vehicle routing, and IoT cybersecurity.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Prof. Dr. Kim-Kwang Raymond Choo",
      role: "Chief Scientific Advisor & Advisory Trustee",
      credential: "IEEE Fellow, Cloud Computing Security Authority, UTSA",
      bio: "Directs cybersecurity proceedings, validates reviewer allocation metrics, and oversees advisory board compliance criteria globally.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="bg-neutral-warm min-h-screen text-text-body font-sans pb-16"
    >
      
      {/* Premium Corporate Hero Banner */}
      <section className="bg-[#0A1F44] text-[#FAFAF7] py-20 px-4 md:px-8 relative overflow-hidden border-b-2 border-[#C9A961]/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#C9A961] font-bold bg-white/5 py-1 px-3 rounded border border-white/10 inline-block">The Academic Guild</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Scientific Excellence & Organizational Integrity
          </h1>
          <p className="font-sans text-sm text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            RiTECHS connects doctoral candidates, distinguished professors, and industry leaders through a unified, structured ecosystem designed to nurture talent and validate high-impact papers.
          </p>
        </div>
      </section>

      {/* Sub Navigation Tabs Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex border-b border-divider overflow-x-auto scrollbar-none gap-2">
          <button
            onClick={() => setActiveTab('mission')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'mission' ? 'border-[#C9A961] text-primary-navy font-bold' : 'border-transparent text-gray-500 hover:text-primary-navy'
            }`}
          >
            Mission & Vision
          </button>
          <button
            onClick={() => setActiveTab('values')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'values' ? 'border-[#C9A961] text-primary-navy font-bold' : 'border-transparent text-gray-500 hover:text-primary-navy'
            }`}
          >
            Core Values
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'goals' ? 'border-[#C9A961] text-primary-navy font-bold' : 'border-transparent text-gray-500 hover:text-primary-navy'
            }`}
          >
            Future Goals
          </button>
          <button
            onClick={() => setActiveTab('procedure')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'procedure' ? 'border-[#C9A961] text-primary-navy font-bold' : 'border-transparent text-gray-500 hover:text-primary-navy'
            }`}
          >
            Matching Procedure
          </button>
          <button
            onClick={() => setActiveTab('employees')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'employees' ? 'border-[#C9A961] text-primary-navy font-bold' : 'border-transparent text-gray-500 hover:text-primary-navy'
            }`}
          >
            Employees & Council Board
          </button>
        </div>
      </div>

      {/* Main Tab Content Frame */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Tab 1: Mission & Vision */}
        {activeTab === 'mission' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in text-left">
            <div className="space-y-6">
              <span className="inline-flex items-center space-x-1 border border-accent-gold/40 bg-accent-gold/10 px-2.5 py-1 rounded text-[9px] uppercase font-mono font-bold tracking-widest text-[#C9A961]">
                <Target className="w-3.5 h-3.5 text-accent-[#C9A961] mr-1" />
                <span>Our Strategic Roadmap</span>
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-navy leading-tight">
                Empowering Scholarly Minds to Transcend Boundaries
              </h2>
              <p className="text-xs text-gray-500 font-light font-sans leading-relaxed">
                Our vision is to build a boundless digital and physical infrastructure where next-generation cybersecurity specialists, renewable energy innovators, and scientific writers learn, collaborate, and expand the borders of knowledge.
              </p>
              
              <div className="border-l-4 border-accent-gold pl-4 italic text-xs text-gray-600 font-serif leading-relaxed">
                "Our mission is to establish sustainable, highly vetted mentoring structures that pair early-stage graduates with elite global specialists, producing research papers with flawless publishing credibility inside high-tier indexes."
              </div>

              <div className="bg-white p-5 rounded-lg border shadow-xs space-y-3">
                <p className="font-serif font-bold text-xs uppercase text-[#1a4a8a] tracking-wide">Key Regional Centers:</p>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-gray-600">
                  <div className="p-3 bg-neutral-warm/40 border border-divider/60 rounded">
                    <p className="font-bold text-primary-navy">University of Genoa</p>
                    <p className="text-[10px] text-gray-400 mt-1">Genoa, Liguria, Italy</p>
                  </div>
                  <div className="p-3 bg-neutral-warm/40 border border-divider/60 rounded">
                    <p className="font-bold text-primary-navy">Science Park</p>
                    <p className="text-[10px] text-gray-400 mt-1">Wolverhampton, UK</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[#C9A961]/10 rounded-2xl transform rotate-3 scale-99"></div>
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800"
                alt="Academic Lab Environment"
                className="relative rounded-2xl border border-divider shadow-md object-cover h-[450px] w-full"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Core Values */}
        {activeTab === 'values' && (
          <div className="space-y-10 animate-fade-in text-left">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-navy">The Four Pillars of Action</h2>
              <p className="text-xs text-gray-400 font-light font-sans">Every training module, peer reviewer assignment, and academic proceeding we support reflects these values.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-divider shadow-xs hover:border-[#C9A961] hover:shadow-lg transition-all duration-300 group">
                    <div className="w-10 h-10 rounded bg-[#0A1F44] flex items-center justify-center text-[#C9A961] mb-4 group-hover:bg-[#C9A961] group-hover:text-[#0A1F44] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-primary-navy mb-2 group-hover:text-accent-gold transition-colors">{val.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-light font-sans">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Future Goals */}
        {activeTab === 'goals' && (
          <div className="space-y-10 animate-fade-in text-left">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-navy">The Road Ahead</h2>
              <p className="text-xs text-gray-400 font-light font-sans">Strategic targets guiding our institutional expansions and technology pipelines through 2028.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {futureGoals.map((goal, idx) => {
                const Icon = goal.icon;
                return (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-divider shadow-xs hover:border-accent-gold hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a4a8a]/10 text-[#1a4a8a] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-serif text-sm font-bold text-primary-navy leading-snug">{goal.title}</h4>
                      <p className="text-xs text-gray-500 font-light leading-relaxed font-sans">{goal.desc}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-divider/50 text-[9px] font-mono uppercase font-bold text-[#1a4a8a]">
                      Target Milestone
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Procedure (Matching steps & Out goals) */}
        {activeTab === 'procedure' && (
          <div className="space-y-16 animate-fade-in text-left">
            {/* Matching steps */}
            <div className="space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="font-serif text-3xl font-bold text-primary-navy">Our 8-Step Matching Procedure</h2>
                <p className="text-xs text-gray-400 font-light font-sans">The precise operational pipeline that transforms coordinate drafts into final published articles.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {matchingSteps.map((step, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-divider shadow-xs space-y-3 hover:border-accent-gold transition-all">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-accent-gold bg-accent-gold/10 py-0.5 px-2 rounded-full">{step.nr}</span>
                      <Milestone className="w-4 h-4 text-gray-300" />
                    </div>
                    <h4 className="font-serif text-sm font-bold text-primary-navy leading-snug">{step.title}</h4>
                    <p className="text-xs text-gray-500 font-light font-sans leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-divider">
              <div className="bg-[#0A1F44] text-[#FAFAF7] p-6 sm:p-8 rounded-2xl border border-accent-gold/20 space-y-4">
                <div className="w-10 h-10 rounded-full bg-accent-gold/20 text-accent-gold flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">Target Output Goals for Mentors</h3>
                <ul className="space-y-3 text-xs text-gray-300 font-sans font-light leading-relaxed">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                    <span>Develop and refine supportive academic coaching and thesis advisory skills.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                    <span>Expand professional global review networks and gain recognition as general session chairs.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                    <span>Support scientific diversity, publishing opportunities, and digital equity among young researchers.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-divider shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-full bg-primary-navy/10 text-primary-navy flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-navy" />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary-navy">Target Output Goals for Mentees</h3>
                <ul className="space-y-3 text-xs text-gray-500 font-sans font-light leading-relaxed">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                    <span>Acquire advanced technical cybersecurity, database schema routing, and testing capabilities.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                    <span>Build secure, structured citation habits and conform drafts strictly with Springer/IEEE standards.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                    <span>Publish peer-vetted papers in prestigious, highly-indexed databases successfully.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Employees & Council */}
        {activeTab === 'employees' && (
          <div className="space-y-16 animate-fade-in text-left">
            {/* Employees Section */}
            <div className="space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-navy">Our Strategic Staff Leaders</h2>
                <p className="text-xs text-gray-400 font-light font-sans">Meet the high-performing academic specialists and directors steering daily operations.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {employeesList.map((emp, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-divider overflow-hidden shadow-xs hover:shadow-md transition">
                    <div className="h-56 bg-[#0A1F44] relative">
                      <img
                        src={emp.photo}
                        alt={emp.name}
                        className="w-full h-full object-cover grayscale mix-blend-overlay hover:grayscale-0 transition-all duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-accent-gold text-[#0A1F44] px-2.5 py-0.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider">
                        {emp.period}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-primary-navy leading-none">{emp.name}</h3>
                        <p className="text-[10px] text-accent-gold font-mono tracking-wider uppercase mt-1.5 font-bold">{emp.role}</p>
                      </div>

                      <p className="text-xs font-semibold text-gray-500 font-sans leading-tight border-b border-divider/40 pb-2">{emp.credential}</p>
                      <p className="text-xs text-gray-600 font-sans font-light leading-relaxed">{emp.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Founding board / Advisors */}
            <div className="pt-10 border-t border-divider space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h3 className="font-serif text-2xl font-bold text-primary-navy flex items-center justify-center space-x-1">
                  <Building className="w-5 h-5 text-accent-gold mr-1" />
                  <span>Founders & Steering Trustees</span>
                </h3>
                <p className="text-xs text-gray-400 font-sans">Eminently published university scholars responsible for the high operational standards of RiTECHS.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {foundingBoard.map((board, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-divider p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 hover:shadow-sm transition">
                    <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-accent-gold/20 shadow-inner bg-primary-navy">
                      <img
                        src={board.photo}
                        alt={board.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div>
                        <h4 className="font-serif text-base font-bold text-primary-navy leading-none">{board.name}</h4>
                        <p className="text-[10px] text-accent-gold font-mono uppercase tracking-wider mt-1 font-bold">{board.role}</p>
                      </div>
                      <p className="text-[11px] font-semibold text-gray-500 leading-snug">{board.credential}</p>
                      <p className="text-xs text-gray-600 font-sans font-light leading-relaxed">{board.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

    </motion.div>
  );
}
