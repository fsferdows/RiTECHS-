import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form entries
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [scholarDomain, setScholarDomain] = useState("");
  const [message, setMessage] = useState("");
  const [sendingState, setSendingState] = useState(false);
  const [hasSent, setHasSent] = useState(false);

  const faqsList = [
    {
      q: "What types of publication structures does RiTECHS handle?",
      a: "Our reviewers guide high-quality drafts toward Springer Lecture Notes in Computer Science (LNCS), Elsevier ScienceDirect journals, Wiley chapters, and IEEE conference frameworks. Each manuscript submits to rigorous plagiarism screenings first."
    },
    {
      q: "Can I register as both a Mentor and a Mentee?",
      a: "No. Role segregation maintains academic rigor. Certified Mentors are verified professors/scientists, while Mentees are postgraduates or candidate authors who submit abstract drafts for review."
    },
    {
      q: "Are the eLearning program credits transferable?",
      a: "Yes. All vocational training certificates feature double-sign authorization codes from academic block leaders (such as University of Wolverhampton UK). Vouchsafe keys are directly reviewable by third-party boards."
    },
    {
      q: "How does the abstract dynamic matching concierge work?",
      a: "Our AI model maps the structural semantics of your abstract text against the published bibliography metrics of our 50+ list of verified board mentors, discovering perfect matches instantly."
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !emailAddress || !message) return;

    setSendingState(true);
    setTimeout(() => {
      setSendingState(false);
      setHasSent(true);
      setTimeout(() => {
        setFullName("");
        setEmailAddress("");
        setScholarDomain("");
        setMessage("");
        setHasSent(false);
      }, 4000);
    }, 1500);
  };

  return (
    <div className="bg-neutral-warm min-h-screen text-text-body font-sans transition-all pb-12">
      
      {/* Title Header Banner */}
      <section className="bg-[#0A1F44] text-[#FAFAF7] py-16 px-4 md:px-8 border-b border-[#C9A961]/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#C9A961] font-semibold">Communicate with Us</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Connect with the RiTECHS Council
          </h1>
          <p className="text-sm text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Have questions about conference registration, e-learning certificate vouchers, or manuscript modification? Our offices respond inside 24 hours.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="contact-content">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Coordinates & FAQ */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Address blocks */}
            <div className="bg-white rounded-lg border p-6 shadow-sm space-y-4 text-xs font-semibold">
              <h3 className="font-serif text-lg font-bold text-primary-navy">International Headquarters</h3>
              
              <div className="space-y-3 font-light text-gray-600">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4.5 h-4.5 text-accent-gold shrink-0 mt-0.5" />
                  <span className="leading-relaxed">153, Dunstall Avenue, Wolverhampton, West Midlands, WV6 0NG, United Kingdom</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4.5 h-4.5 text-accent-gold shrink-0" />
                  <span>+44 (0) 7825 310407</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4.5 h-4.5 text-accent-gold shrink-0" />
                  <span>info@ritechs.org</span>
                </div>
              </div>
            </div>

            {/* Academic FAQ Panel */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-primary-navy flex items-center space-x-1.5 px-1">
                <HelpCircle className="w-5 h-5 text-accent-gold" />
                <span>Frequently Answered Inquiries</span>
              </h3>

              <div className="space-y-2.5">
                {faqsList.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded border overflow-hidden shadow-xs">
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full text-left px-4 py-3 flex justify-between items-center text-xs font-bold text-primary-navy hover:bg-neutral-warm/40 transition"
                    >
                      <span>{faq.q}</span>
                      {activeFaq === idx ? <ChevronUp className="w-4 h-4 text-accent-gold" /> : <ChevronDown className="w-4 h-4 text-accent-gold" />}
                    </button>
                    {activeFaq === idx && (
                      <div className="px-4 pb-4 pt-1 text-xs text-gray-500 font-light leading-relaxed border-t bg-neutral-warm/10">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Feedback Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border shadow-sm space-y-6">
            
            <div>
              <h3 className="font-serif text-xl font-bold text-primary-navy">Drop Our Secretariat a Message</h3>
              <p className="text-xs text-gray-400 font-light mt-1">Fill out the general request form and specify your peer review ID or syllabus certificate number if applicable.</p>
            </div>

            {hasSent ? (
              <div className="bg-[#C9A961]/10 border border-[#C9A961] text-primary-navy p-6 rounded-lg text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-accent-gold mx-auto" />
                <h4 className="font-serif font-bold text-base">Inquiry Dispatched Successfully</h4>
                <p className="text-xs font-light text-gray-600">Thank you, {fullName || 'scholar'}. Our secretariat team has queued your credentials and will report back inside 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4 text-xs font-semibold">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Dr. Arafatur Rahman"
                      className="w-full bg-neutral-warm/40 border border-divider rounded px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Scholar Correspondence Email</label>
                    <input
                      type="email"
                      required
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="e.g., info@ritechs.org"
                      className="w-full bg-neutral-warm/40 border border-divider rounded px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Inquiry Category</label>
                  <select
                    value={scholarDomain}
                    onChange={(e) => setScholarDomain(e.target.value)}
                    className="w-full bg-neutral-warm border border-divider rounded px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value="general">General Inquiries / Partnerships</option>
                    <option value="conference">Conference registration & passes</option>
                    <option value="elearning">eLearning & Syllabus course certifications</option>
                    <option value="proofreading">Academic Modification & Plagiarism checks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Detailed Message</label>
                  <textarea
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your request layout here, including dates or paper titles..."
                    className="w-full bg-neutral-warm/40 border border-divider rounded px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent-gold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sendingState}
                  className="w-full bg-[#0A1F44] hover:bg-primary-navy-hover text-[#C9A961] py-3 rounded uppercase font-bold tracking-wider text-xs transition flex items-center justify-center space-x-2"
                >
                  {sendingState ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Enqueuing secretariat desk...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Deliver Technical Inquiry</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}
