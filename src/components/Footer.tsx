import React, { useState } from 'react';
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, subPage?: string | null, extraId?: string | null) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsSubscribed, setNewsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-[#0A1F44] text-gray-300 pt-16 pb-12 border-t-2 border-accent-gold/40" id="premium-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Editorial Row containing quick pitch & newsletter form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#C9A961] rounded-sm flex items-center justify-center">
                <span className="font-serif font-bold text-[#0A1F44] text-base">R</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">RiTECHS</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A961]"></span>
            </div>
            
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-md">
              Research · Innovation · Technology · Solution. RiTECHS is a premier international academic research networking platform providing e-learning certification, global peer mentoring, and world-class cybersecurity and engineering.
            </p>

            <div className="pt-2 flex space-x-4">
              <a href="https://facebook.com/ritechs" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A961] hover:text-[#0A1F44] transition-colors">
                <span className="font-semibold text-xs text-inherit">F</span>
              </a>
              <a href="https://twitter.com/ritechsolution" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A961] hover:text-[#0A1F44] transition-colors">
                <span className="font-semibold text-xs text-inherit">Y</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A961] hover:text-[#0A1F44] transition-colors">
                <span className="font-semibold text-xs text-inherit">L</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A961] hover:text-[#0A1F44] transition-colors">
                <span className="font-semibold text-xs text-inherit">I</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white/5 p-6 rounded-lg border border-white/5 relative overflow-hidden">
              <div className="absolute right-0 top-0 -mr-6 -mt-6 w-24 h-24 bg-[#C9A961]/10 rounded-full blur-xl"></div>
              <h4 className="font-serif text-lg text-white mb-2 font-semibold">Join the Research Digest</h4>
              <p className="text-xs text-gray-400 font-light mb-4">Receive notification on call-for-papers, review rounds, and advanced training bootcamps directly in your inbox.</p>
              
              {newsSubscribed ? (
                <div className="bg-[#C9A961]/10 border border-[#C9A961] text-[#C9A961] px-4 py-3 rounded text-xs font-semibold flex items-center space-x-2 animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A961]" />
                  <span>Sovereign Subscription complete! Welcome to the RiTECHS network.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter academic email address"
                    className="flex-1 bg-[#0A1F44] border border-white/10 text-white placeholder-gray-500 rounded px-4 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#C9A961]"
                  />
                  <button
                    type="submit"
                    className="bg-[#C9A961] hover:bg-[#bda056] text-[#0A1F44] font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-all flex items-center space-x-1.5"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Directory Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs font-medium tracking-wide">
          
          <div className="space-y-4">
            <h5 className="uppercase text-[#C9A961] font-bold tracking-widest text-[10px]">For Mentees</h5>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <button onClick={() => onNavigate('mentorship')} className="hover:text-white transition">
                  Search Qualified Mentors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login', 'login-mentee')} className="hover:text-white transition">
                  Mentee Portal Sign In
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login', 'register-mentee')} className="hover:text-white transition">
                  Register as Candidate Mentee
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mentorship', 'benefits')} className="hover:text-white transition">
                  Benefits of Joining Us
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="uppercase text-[#C9A961] font-bold tracking-widest text-[10px]">For Mentors</h5>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <button onClick={() => onNavigate('mentorship', 'directory')} className="hover:text-white transition">
                  Mentorship Direct Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login', 'login-mentor')} className="hover:text-white transition">
                  Mentor Council Portal Sign In
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login', 'register-mentor')} className="hover:text-white transition">
                  Register as Research Mentor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mentorship', 'subscription')} className="hover:text-white transition">
                  Subscription Plans
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="uppercase text-[#C9A961] font-bold tracking-widest text-[10px]">Corporate Links</h5>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition">
                  Academic Landing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition">
                  Origin of RiTECHS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('conferences')} className="hover:text-white transition">
                  International Conferences
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home', 'blogs')} className="hover:text-white transition">
                  Editorial Magazines & News
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition">
                  General Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="uppercase text-[#C9A961] font-bold tracking-widest text-[10px]">International Offices</h5>
            <ul className="space-y-3 font-light text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#C9A961] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  153, Dunstall Avenue, Wolverhampton, West Midlands, WV6 0NG, United Kingdom
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#C9A961] shrink-0" />
                <span>+44 (0) 7825 310407</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#C9A961] shrink-0" />
                <span>info@ritechs.org</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Row copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 font-mono">
          <p>© 2026 RiTECHS. Research · Innovation · Technology · Solution. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button className="hover:text-white transition">Terms & Conditions</button>
            <span>·</span>
            <button className="hover:text-white transition">Data Protection Policy</button>
            <span>·</span>
            <button className="hover:text-white transition">Sitemap</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
