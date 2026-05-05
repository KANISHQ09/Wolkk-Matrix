import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Send, 
  Settings, 
  Database, 
  Layout, 
  PieChart, 
  Activity, 
  CheckCircle2, 
  Bot, 
  User, 
  RefreshCw, 
  LogOut,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Zap,
  Info,
  Clock,
  Sparkles,
  Search,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)] rotate-3">
      <div className="w-5 h-5 bg-[#0b0f1a] rotate-45 rounded-sm"></div>
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-black tracking-tighter uppercase italic leading-none">WOLKK</span>
      <span className="text-[10px] text-indigo-400 font-bold tracking-[0.2em] mt-1 uppercase">GCP Intelligence</span>
    </div>
  </div>
);

const TopBanner = () => (
  <div className="w-full bg-[oklch(0.13_0.05_270)] text-[10px] uppercase font-black tracking-[0.2em] text-white/40 px-4 py-3 text-center border-b border-white/5">
    Shift FinOps Left — Prevent cloud waste before every deployment
  </div>
);

const LandingNav = ({ onStart, onNav }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-8">
        <Logo />
        <nav className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
          <button onClick={() => onNav('product')} className="hover:text-white transition-colors">Product</button>
          <button onClick={() => onNav('pricing')} className="hover:text-white transition-colors">Pricing</button>
          <button onClick={() => onNav('resources')} className="hover:text-white transition-colors">Resources</button>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <button onClick={onStart} className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors px-6">Log in</button>
          <button onClick={onStart} className="bg-white text-brand-navy px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-brand-gray transition-all shadow-[0_10px_20px_rgba(255,255,255,0.1)] active:scale-95">Get Started</button>
        </div>
        
        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark border-b border-white/5 p-10 flex flex-col gap-8 animate-fade-in z-50">
          <nav className="flex flex-col gap-6 text-xs font-black uppercase tracking-widest text-white/40">
            <button onClick={() => { onNav('product'); setMobileMenuOpen(false); }}>Product</button>
            <button onClick={() => { onNav('pricing'); setMobileMenuOpen(false); }}>Pricing</button>
            <button onClick={() => { onNav('resources'); setMobileMenuOpen(false); }}>Resources</button>
          </nav>
          <div className="flex flex-col gap-4 pt-6 border-t border-white/5">
            <button onClick={onStart} className="text-xs font-black uppercase tracking-widest text-white py-4 bg-white/5 rounded-xl">Log in</button>
            <button onClick={onStart} className="text-xs font-black uppercase tracking-widest text-brand-navy py-4 bg-white rounded-xl">Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
};

const HeroCard = () => {
  const [saved, setSaved] = useState(0);
  useEffect(() => {
    const target = 5130400;
    let start = 0;
    const t = setInterval(() => {
      start += Math.ceil((target - start) / 12);
      setSaved(start);
      if (start >= target) clearInterval(t);
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass-card rounded-[2.5rem] p-10 border-white/5 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -z-10"></div>
      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/30 mb-8">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        github.com/wolkk-infra/prod
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <div>
          <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-3">Cost estimate</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-5xl font-black tracking-tighter">$51,035</span>
            <span className="text-white/20 text-xs font-bold uppercase">/mo</span>
          </div>
          <div className="text-rose-400 text-[10px] font-black uppercase tracking-widest mt-2">+18% Anomalous</div>
        </div>
        <div>
          <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-3">Cost saved</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-5xl font-black tracking-tighter tabular-nums">${saved.toLocaleString()}</span>
            <span className="text-white/20 text-xs font-bold uppercase">/yr</span>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        {[
          { msg: "Scale instances", hash: "d83425", change: "$14,240", pct: "+18%", color: "text-rose-400" },
          { msg: "Redundant disk", hash: "c074e5", change: "$12,417", pct: "-42%", color: "text-emerald-400" },
        ].map((r) => (
          <div key={r.hash} className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-all gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Layout size={18} className="text-indigo-400" />
              </div>
              <div>
                <div className="text-sm font-black uppercase tracking-tight">{r.msg}</div>
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">⎇ {r.hash} · CI/CD Check</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-black tracking-tight">{r.change}</div>
              <div className={`${r.color} text-[10px] font-black uppercase tracking-widest`}>{r.pct}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LandingPage = ({ onStart, onNav, onDemo }) => (
  <div className="min-h-screen bg-[#05070a] text-white selection:bg-indigo-500/30 overflow-x-hidden">
    <TopBanner />
    <LandingNav onStart={onStart} onNav={onNav} />
    
    {/* Hero Section */}
    <section className="relative px-10 pt-16 pb-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[150px] -z-10 rounded-full"></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
        <div>
          <h1 className="text-5xl md:text-8xl font-black leading-[1.05] tracking-tighter uppercase italic py-8 px-4 md:px-20 -mx-4 md:-mx-20">
            SHIFT<br />
            <span className="block bg-gradient-to-r from-white via-indigo-400 to-indigo-600 bg-clip-text text-transparent pr-4 md:pr-20 -mr-4 md:-mr-20">FINOPS</span>
            LEFT
          </h1>
          <p className="mt-10 text-lg text-brand-gray font-medium max-w-lg leading-relaxed">
            Infrastructure cost governance for modern engineering teams. Prevent cloud waste and budget overruns before they hit your bill.
          </p>
          <div className="mt-12 flex flex-wrap gap-5">
            <button onClick={onStart} className="bg-white text-brand-navy px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-gray transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95">
              Get Started Free
            </button>
            <button onClick={onDemo} className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95">
              View Demo
            </button>
          </div>
        </div>
        <HeroCard />
      </div>
    </section>

    {/* Logo Cloud */}
    <section className="py-16 border-y border-white/5 bg-brand-navy/30 overflow-hidden">
      <div className="flex gap-20 animate-scroll whitespace-nowrap">
        {["GCP", "AWS", "AZURE", "TERRAFORM", "KUBERNETES", "PULUMI", "CI/CD", "FINOPS"].map((l, i) => (
          <div key={i} className="text-3xl font-black text-white/80 tracking-[0.3em] italic uppercase">{l}</div>
        ))}
        {["GCP", "AWS", "AZURE", "TERRAFORM", "KUBERNETES", "PULUMI", "CI/CD", "FINOPS"].map((l, i) => (
          <div key={i+"-2"} className="text-3xl font-black text-white/80 tracking-[0.3em] italic uppercase">{l}</div>
        ))}
      </div>
    </section>

    {/* Stats Section */}
    <section id="product" className="py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6">Cloud waste is <span className="text-indigo-500 italic">Everywhere</span></h2>
        <p className="text-brand-gray text-lg max-w-2xl mx-auto font-medium">30% of cloud resources are wasted. Shift your cost management to where engineering happens.</p>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {[
          { n: "69%", t: "of enterprises overrun their cloud budget", color: "text-indigo-400" },
          { n: "30%", t: "of cloud resources are wasted annually", color: "text-rose-400" },
        ].map(s => (
          <div key={s.n} className="glass-card rounded-[3rem] p-8 md:p-16 border-white/5 relative overflow-hidden group">
            <div className="text-6xl md:text-8xl font-black tracking-tighter mb-6 group-hover:scale-110 transition-transform duration-500">{s.n}</div>
            <div className="text-brand-gray text-xl font-medium">{s.t}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Founders & Team Section */}
    <section id="team" className="py-32 px-6 md:px-10 border-t border-white/5 bg-[#05070a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-20">
          {/* Left: Founders */}
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase italic mb-12">About Team Matrix</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
              {[
                { n: "Kanishq Singh Negi", t: "Founder & CEO", icon: User },
                { n: "Madhavan Singh Parihar", t: "Head of Product & Design", icon: Sparkles },
                { n: "Muiz Khan", t: "Head of Growth & Strategy", icon: Zap },
                { n: "Milind Thorat", t: "AI & Data Lead", icon: Bot }
              ].map(f => (
                <div key={f.n} className="glass-card rounded-2xl p-4 border-white/5 group hover:bg-white/5 transition-all">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-white/5 flex items-center justify-center text-white/10 group-hover:text-indigo-500/30 transition-colors">
                    <f.icon size={32} />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white mb-1 line-clamp-2 min-h-[30px]">{f.n}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/30">{f.t}</div>
                </div>
              ))}
            </div>
            <div className="space-y-8 text-brand-gray text-sm font-medium leading-relaxed max-w-2xl">
              <div className="space-y-4">
                <p>Team Matrix is a product-driven technology team focused on building intelligent, scalable, and user-centric digital solutions.</p>
                <p>Founded by a group of builders with strong expertise in full stack development, AI systems, product design, and growth strategy, Team Matrix operates at the intersection of innovation and real-world impact.</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-white font-black uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
                  <Sparkles size={14} className="text-indigo-400" />
                  The Philosophy
                </p>
                <p className="italic text-lg font-black tracking-tight text-indigo-400">"Build fast, solve real problems, and ship products that matter."</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-white font-black uppercase tracking-widest text-xs">🚀 Wolkk — Our First Product (2026)</h3>
                <p>Wolkk is the flagship product by Team Matrix, built to solve real-world challenges using AI and intelligent automation.</p>
                <p>Designed as a smart, scalable platform, Wolkk helps users navigate complex systems with ease, delivering faster, smarter, and more efficient outcomes.</p>
              </div>
            </div>
          </div>

          {/* Right: Team Stats */}
          <div className="lg:pt-24">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic mb-12 lg:hidden">Team</h2>
            <div className="space-y-12 mb-16">
              {[
                { icon: Database, t: "Expertise in full stack development, AI systems, and product design" },
                { icon: Sparkles, t: "Built with modern tech: React, Node.js, Python, and Cloud platforms" },
                { icon: ShieldCheck, t: "Focus on speed, usability, and scalability in every product" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 shrink-0">
                    <item.icon size={20} />
                  </div>
                  <p className="text-sm font-bold text-white/60 leading-relaxed pt-1">{item.t}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card rounded-3xl p-8 border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Database size={40} />
                </div>
                <div className="text-4xl font-black tracking-tighter mb-4 italic">10%</div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 leading-loose">
                  of Fortune 2000<br />uses Wolkk
                </div>
              </div>
              <div className="glass-card rounded-3xl p-8 border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Zap size={40} />
                </div>
                <div className="text-4xl font-black tracking-tighter mb-4 italic">12k</div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 leading-loose">
                  GitHub Stars<br />& Community
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-24 md:py-40 px-6 md:px-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-600/5 to-transparent"></div>
      <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-12 relative z-10 italic">Ready to optimize?</h2>
      <button onClick={onStart} className="relative z-10 bg-white text-brand-navy px-10 md:px-16 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-[0.3em] hover:bg-brand-gray transition-all shadow-[0_30px_60px_rgba(255,255,255,0.1)] active:scale-95">
        Deploy Wolkk Now
      </button>
    </section>

    <footer className="py-20 px-10 border-t border-white/5 bg-brand-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <Logo />
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Docs</a>
          <a href="#" className="hover:text-white">Github</a>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/10">© 2026 Matrix FinOps Inc.</p>
      </div>
    </footer>
  </div>
);

const ProductPage = ({ onBack }) => (
  <div className="min-h-screen bg-[#05070a] text-white selection:bg-indigo-500/30 overflow-x-hidden">
    <TopBanner />
    <header className="max-w-7xl mx-auto flex items-center justify-between px-10 py-8 relative z-50">
      <div className="cursor-pointer" onClick={onBack}><Logo /></div>
      <button onClick={onBack} className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Back to Home</button>
    </header>
    
    <section className="py-32 px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic mb-10">Intelligence <span className="text-indigo-500">First</span></h1>
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-xl text-brand-gray leading-relaxed mb-10 font-medium">Wolkk is the only FinOps platform that sits directly in your CI/CD pipeline, catching cost spikes before they reach production.</p>
            <div className="space-y-8">
              {[
                { title: "Anomaly Detection", desc: "Real-time identification of unusual spending patterns using proprietary ML models.", icon: AlertTriangle },
                { title: "Forecast Engine", desc: "Predict your end-of-month bill with 98.4% accuracy based on historical trends.", icon: TrendingUp },
                { title: "BigQuery Integration", desc: "Zero-latency connection to your GCP billing export tables.", icon: Database }
              ].map(f => (
                <div key={f.title} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 shrink-0">
                    <f.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-tight mb-2">{f.title}</h3>
                    <p className="text-sm text-brand-gray font-medium">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-[3rem] p-8 md:p-12 border-white/5 relative overflow-hidden group shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent"></div>
             
             {/* Report Header */}
             <div className="flex items-center gap-3 mb-10">
               <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400">
                 Intelligence Engine
               </div>
               <div className="h-1 w-1 rounded-full bg-white/20"></div>
               <div className="text-[9px] text-white/20 font-mono tracking-widest uppercase italic">Node-ID: BQ-AGNT-01</div>
             </div>

             {/* Report Content */}
             <div className="space-y-8 relative z-10">
                <div>
                   <p className="text-sm md:text-base font-medium text-white/60 mb-2">Your total spend for last month (May 2026) was:</p>
                   <h2 className="text-4xl md:text-5xl font-black text-indigo-400 tracking-tighter">$27,614.78 USD</h2>
                </div>

                <div className="space-y-4">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Summary by Top Projects:</p>
                   <div className="space-y-3">
                      {[
                        { n: "data-pipeline-prod", v: "$10,245.33" },
                        { n: "analytics-warehouse", v: "$8,732.41" },
                        { n: "ml-platform", v: "$5,274.85" },
                        { n: "dev-tools", v: "$3,362.19" }
                      ].map(p => (
                        <div key={p.n} className="flex justify-between items-center text-sm font-medium">
                           <div className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-indigo-400/40"></div>
                              <span className="text-white/60">{p.n}</span>
                           </div>
                           <span className="font-bold tabular-nums">{p.v}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Report Footer */}
             <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                <div className="flex items-center gap-2">
                   <Clock size={12} />
                   Period: May 1 – May 31, 2026 (UTC)
                </div>
                <div className="flex items-center gap-2">
                   <Database size={12} />
                   Currency: USD
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const PricingPage = ({ onBack }) => {
  const [activeTier, setActiveTier] = useState('Cloud');
  
  const tiers = [
    { 
      name: "Wolkk CI/CD", 
      price: "Free", 
      tagline: "Sign up free",
      features: ["Terraform, CloudFormation, CDK", "GH, GL, Azure DevOps", "1000 free runs/mo", "Slack Community"],
      btn: "Sign up free"
    },
    { 
      name: "Starter", 
      price: "$250", 
      tagline: "Best for more estimates",
      features: ["Everything in CI/CD", "Email support", "10,000 runs/mo"],
      btn: "Purchase now"
    },
    { 
      name: "Cloud", 
      price: "$1,000", 
      tagline: "Best for FinOps teams",
      features: ["Everything in Starter", "10 admin & dev seats", "FinOps policies", "Cost Guardrails", "Visibility dashboards"],
      btn: "Start trial"
    },
    { 
      name: "Enterprise", 
      price: "Contact", 
      tagline: "Advanced security & compliance",
      features: ["Everything in Cloud", "GH & GL Enterprise", "Complex security", "SKU price overrides", "SSO & SAML", "Enterprise support"],
      btn: "Contact us"
    }
  ];

  return (
    <div className="min-h-screen bg-[#05070a] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      <TopBanner />
      <header className="max-w-7xl mx-auto flex items-center justify-between px-10 py-8 relative z-50">
        <div className="cursor-pointer" onClick={onBack}><Logo /></div>
        <button onClick={onBack} className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Back to Home</button>
      </header>

      <section className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-6">Built for <span className="text-indigo-500">Growth</span></h1>
          <p className="text-brand-gray text-lg max-w-2xl mx-auto">Scale your FinOps from individual developers to global enterprises.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1400px] mx-auto items-start">
          {tiers.map(p => {
            const isHighlighted = activeTier === p.name;
            return (
              <div 
                key={p.name} 
                onClick={() => setActiveTier(p.name)}
                className={`glass-card rounded-[2.5rem] p-8 md:p-10 border-white/5 flex flex-col relative group overflow-hidden cursor-pointer transition-all duration-500 ${isHighlighted ? 'ring-2 ring-indigo-500/50 scale-105 z-10 shadow-[0_30px_60px_rgba(79,70,229,0.1)]' : 'hover:bg-white/[0.02] opacity-80 hover:opacity-100'}`}
              >
                {isHighlighted && <div className="absolute top-0 inset-x-0 h-2 bg-indigo-500 animate-pulse"></div>}
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{p.name}</div>
                <div className="text-4xl font-black tracking-tighter mb-4">{p.price}{p.price !== 'Free' && p.price !== 'Contact' && <span className="text-xs text-white/20 uppercase tracking-widest ml-1">/mo</span>}</div>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-8 min-h-[20px]">{p.tagline}</p>
                
                <div className="space-y-4 mb-10 flex-1">
                  {p.features.map(f => (
                    <div key={f} className="flex gap-3 text-[11px] font-bold text-brand-gray leading-tight">
                      <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-indigo-400 shrink-0">
                        <CheckCircle2 size={10} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                
                <button className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${isHighlighted ? 'bg-white text-brand-navy shadow-[0_10px_20px_rgba(255,255,255,0.1)]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>
                  {p.btn}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const ResourcesPage = ({ onBack }) => (
  <div className="min-h-screen bg-[#05070a] text-white selection:bg-indigo-500/30 overflow-x-hidden">
    <TopBanner />
    <header className="max-w-7xl mx-auto flex items-center justify-between px-10 py-8 relative z-50">
      <div className="cursor-pointer" onClick={onBack}><Logo /></div>
      <button onClick={onBack} className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Back to Home</button>
    </header>

    <section className="py-32 px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic mb-16 text-center">Hub <span className="text-indigo-500">& Docs</span></h1>
        <div className="grid md:grid-cols-2 gap-10">
           {[
             { t: "Documentation", d: "Detailed integration guides for GCP and Terraform.", icon: Database },
             { t: "Community Slack", d: "Join 5,000+ FinOps engineers sharing best practices.", icon: Bot },
             { t: "API Reference", d: "Build custom automation on top of Wolkk's AI engine.", icon: Sparkles },
             { t: "Success Stories", d: "See how companies like Netflix saved 30% on GCP.", icon: ShieldCheck }
           ].map(r => (
             <div key={r.t} className="glass-card rounded-[2.5rem] p-10 border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                 <r.icon size={24} />
               </div>
               <h3 className="text-xl font-black uppercase tracking-tight mb-3">{r.t}</h3>
               <p className="text-brand-gray font-medium text-sm leading-relaxed">{r.d}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  </div>
);

const App = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      content: "Welcome to your GCP Cost Intelligence Suite. I've initialized the session. To begin optimizing your cloud spend, please verify your Project ID and Billing Table in the configuration panel." 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    projectId: '',
    billingTable: ''
  });
  const [showConfig, setShowConfig] = useState(false);
  const [sessionId] = useState(() => `sess-${Math.random().toString(36).substr(2, 9)}`);
  const [activeView, setActiveView] = useState('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQueries = [
    "What was my total spend for last month?",
    "Show me a breakdown of costs by service for 202604",
    "Which project had the highest billing in the current month?",
    "Are there any cost anomalies I should be aware of?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    document.title = activeView === 'landing' ? 'Wolkk — Shift FinOps Left' : 'Wolkk Dashboard';
  }, [activeView]);

  useEffect(() => {
    const createSession = async () => {
      try {
        await axios.post(`http://localhost:8005/apps/gcp_cost_agent/users/asus-user/sessions/${sessionId}`);
        console.log('Session created:', sessionId);
      } catch (error) {
        console.error('Error creating session:', error);
      }
    };
    createSession();
  }, [sessionId]);

  const handleSend = async (e, forcedQuery = null) => {
    if (e) e.preventDefault();
    const queryToProcess = forcedQuery || input;
    if (!queryToProcess.trim() || loading) return;

    const userMessage = queryToProcess.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    const fullPrompt = `[GCP Project: ${config.projectId}, Billing Table: ${config.billingTable}] User query: ${userMessage}`;

    try {
      const response = await axios.post('http://localhost:8005/run', {
        appName: 'gcp_cost_agent',
        userId: 'asus-user',
        sessionId: sessionId,
        newMessage: {
          role: 'user',
          parts: [{ text: fullPrompt }]
        }
      });

      const data = response.data;
      console.log('ADK Response Data:', data);

      if (data.error) {
        setMessages(prev => [...prev, { role: 'bot', content: `System Alert: ${data.error}` }]);
        setLoading(false);
        return;
      }

      const events = Array.isArray(data) ? data : [data];
      const botTextParts = [];
      
      events.forEach(event => {
        if (event.content && event.content.parts) {
          event.content.parts.forEach(part => {
            if (part.text) {
              botTextParts.push(part.text);
            }
          });
        }
      });

      const botResponse = botTextParts.join('\n\n') || "Response finalized with no textual output.";
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error('Error calling agent:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "Operational failure. Please ensure the ADK Core is active on port 8005." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (activeView === 'landing') {
    return (
      <>
        <LandingPage 
          onStart={() => {
            setActiveView('dashboard');
            setShowConfig(true);
          }} 
          onNav={(v) => setActiveView(v)} 
          onDemo={() => setShowDemo(true)}
        />
        {showDemo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in"
              onClick={() => setShowDemo(false)}
            ></div>
            <div className="relative w-full max-w-5xl aspect-video glass-card rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] animate-scale-in">
               <button 
                onClick={() => setShowDemo(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all z-10 border border-white/10"
               >
                 <X size={20} />
               </button>
               <iframe 
                src="https://drive.google.com/file/d/1j65346wz_PoUjVk0FrPXH6iLAL2nMVeS/preview" 
                className="w-full h-full"
                allow="autoplay"
               ></iframe>
            </div>
          </div>
        )}
      </>
    );
  }

  if (activeView === 'product') return <ProductPage onBack={() => setActiveView('landing')} />;
  if (activeView === 'pricing') return <PricingPage onBack={() => setActiveView('landing')} />;
  if (activeView === 'resources') return <ResourcesPage onBack={() => setActiveView('landing')} />;

  return (
    <div className="flex h-screen bg-brand-dark text-white overflow-hidden font-sans selection:bg-indigo-500/30 flex-col md:flex-row">
      {/* Mobile Dashboard Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#080b14] z-50">
        <Logo />
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-brand-gray hover:text-white transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Pro Design */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 w-72 border-r border-white/5 flex flex-col bg-[#080b14] z-[60] transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 pb-10 flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)] rotate-3">
            <div className="w-5 h-5 bg-brand-navy rotate-45 rounded-sm"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase italic leading-none">WOLKK</span>
            <span className="text-[10px] text-indigo-400 font-bold tracking-[0.2em] mt-1 uppercase">GCP Intelligence</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] uppercase font-black tracking-widest text-white/20 mb-4 ml-4">Workspace</div>
          <button 
            id="nav-ai-assistant"
            onClick={() => { setActiveView('dashboard'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all border group brand-shadow ${activeView === 'dashboard' ? 'bg-indigo-600/10 text-indigo-400 border-indigo-600/20' : 'text-brand-gray hover:text-white hover:bg-white/5 border-transparent'}`}
          >
            <div className="flex items-center gap-3">
              <Bot size={18} />
              AI Assistant
            </div>
            {activeView === 'dashboard' && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>}
          </button>
          
          <button 
            id="nav-cost-analytics"
            onClick={() => { setActiveView('analytics'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all border group brand-shadow ${activeView === 'analytics' ? 'bg-indigo-600/10 text-indigo-400 border-indigo-600/20' : 'text-brand-gray hover:text-white hover:bg-white/5 border-transparent'}`}
          >
            <div className="flex items-center gap-3">
              <Activity size={18} />
              Cost Analytics
            </div>
            {activeView === 'analytics' && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>}
          </button>

          <button 
            id="nav-anomalies"
            onClick={() => { setActiveView('anomalies'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all border group brand-shadow ${activeView === 'anomalies' ? 'bg-indigo-600/10 text-orange-400 border-indigo-600/20' : 'text-brand-gray hover:text-white hover:bg-white/5 border-transparent'}`}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle size={18} className={activeView !== 'anomalies' ? "group-hover:text-orange-400 transition-colors" : ""} />
              Anomalies
            </div>
            {activeView === 'anomalies' && <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>}
          </button>

          <div className="pt-8 pb-4">
             <div className="text-[10px] uppercase font-black tracking-widest text-white/20 mb-4 ml-4">Settings</div>
             <button 
                id="nav-config"
                onClick={() => { setShowConfig(!showConfig); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium text-sm transition-all ${showConfig ? 'text-white bg-white/5 border border-white/10' : 'text-brand-gray hover:text-white hover:bg-white/5'}`}
              >
                <Settings size={18} className={showConfig ? "text-indigo-400" : ""} />
                Cloud Config
              </button>
          </div>
        </nav>

        <div className="p-6 mt-auto border-t border-white/5 bg-brand-dark/50">
          <div 
            onClick={() => { setActiveView('landing'); setIsSidebarOpen(false); }}
            className="flex items-center gap-4 p-3 rounded-2xl glass-card border-white/5 cursor-pointer hover:bg-white/5 transition-all group/profile"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-brand-pink flex items-center justify-center text-xs font-black shadow-lg">
              AS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">User</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[9px] text-brand-gray uppercase tracking-widest font-bold">Authenticate</p>
              </div>
            </div>
            <LogOut 
              id="logout-button"
              size={16} 
              className="text-brand-gray group-hover/profile:text-brand-pink transition-colors" 
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('landing');
                setIsSidebarOpen(false);
              }}
            />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative bg-[#05070a] overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-brand-navy/30 backdrop-blur-3xl sticky top-0 z-30">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black tracking-tight gradient-text uppercase">
                {activeView === 'dashboard' ? 'Cost Intelligence Agent' : activeView === 'analytics' ? 'Cost Analytics Center' : 'Cost Anomalies'}
              </h2>
            </div>
            <p className="text-[10px] text-brand-gray mt-1 font-medium tracking-wide">
              {activeView === 'dashboard' ? 'Real-time BigQuery Analytics & Cost Avoidance' : activeView === 'analytics' ? 'Advanced Financial Visualization & Forecasting' : 'AI-Driven Cost Spike Detection & Alerts'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setShowConfig(true)}
                className="bg-white text-brand-navy hover:bg-brand-gray px-6 py-2.5 rounded-xl font-black text-xs transition-all shadow-[0_10px_20px_rgba(255,255,255,0.1)] active:scale-95 uppercase tracking-widest"
              >
                Add Account
             </button>
          </div>
        </header>

        {/* Dynamic View Content */}
        {activeView === 'analytics' && (
          <div className="flex-1 overflow-y-auto px-6 md:px-10 pt-6 md:pt-10 pb-10 space-y-6 md:space-y-10">
             {/* Stats Cards Section */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { label: 'Projected Spend', value: '$12,450.00', icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-400/10', trend: '+4.2%' },
                  { label: 'Active Anomalies', value: '0 Detected', icon: AlertTriangle, color: 'text-emerald-400', bg: 'bg-emerald-400/10', trend: 'Healthy' },
                  { label: 'Optimized Savings', value: '$842.15', icon: Zap, color: 'text-brand-pink', bg: 'bg-brand-pink/10', trend: 'Current Month' }
                ].map((stat, i) => (
                  <div key={i} className="glass-card glass-card-hover rounded-[2rem] p-6 md:p-8 transition-all group cursor-pointer border-white/5 shadow-2xl">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <div className={`w-12 h-12 md:w-14 md:h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                        <stat.icon size={stat.icon === Zap ? 24 : 28} />
                      </div>
                      <div className="text-[10px] font-black bg-white/5 px-3 py-1.5 rounded-lg text-brand-gray uppercase tracking-tighter border border-white/5">{stat.trend}</div>
                    </div>
                    <p className="text-xs text-brand-gray font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                    <h4 className="text-2xl md:text-3xl font-black tabular-nums tracking-tighter">{stat.value}</h4>
                  </div>
                ))}
             </div>

             {/* Additional Analytics Content */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="glass-card rounded-[2.5rem] p-10 border-white/5 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8">
                      <PieChart size={24} className="text-indigo-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                   </div>
                   <h3 className="text-lg font-black uppercase tracking-tight mb-2">Spend Distribution</h3>
                   <p className="text-xs text-brand-gray mb-8">Service-level cost allocation for the current billing cycle</p>
                   <div className="space-y-4">
                      {[
                        { name: 'Compute Engine', value: 45, color: 'bg-indigo-500' },
                        { name: 'Cloud Storage', value: 25, color: 'bg-brand-pink' },
                        { name: 'BigQuery', value: 15, color: 'bg-emerald-500' },
                        { name: 'Other Services', value: 15, color: 'bg-white/10' }
                      ].map((item, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                              <span>{item.name}</span>
                              <span className="text-white/40">{item.value}%</span>
                           </div>
                           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="glass-card rounded-[2.5rem] p-10 border-white/5 relative overflow-hidden flex flex-col justify-center items-center text-center">
                   <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/20">
                      <TrendingUp size={40} />
                   </div>
                   <h3 className="text-lg font-black uppercase tracking-tight mb-2">Growth Analysis</h3>
                   <p className="text-xs text-brand-gray max-w-[250px]">Your cloud spend has increased by 12% compared to last quarter. AI suggests enabling CUD for Compute instances.</p>
                   <button className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">View Full Report</button>
                </div>
             </div>
          </div>
        )}

        {activeView === 'anomalies' && (
          <div className="flex-1 overflow-y-auto px-10 pt-10 pb-10 space-y-10">
             <div className="glass-card rounded-[2.5rem] p-10 border-white/5 relative overflow-hidden">
                <h3 className="text-lg font-black uppercase tracking-tight mb-2 text-orange-400">Detected Anomalies</h3>
                <p className="text-xs text-brand-gray mb-8">AI-driven cost spike detection and alerts for your infrastructure.</p>
                
                <div className="space-y-4">
                   <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                            <AlertTriangle size={24} />
                         </div>
                         <div>
                            <h4 className="font-bold text-sm uppercase tracking-wide text-white">Unusual Compute Spend</h4>
                            <p className="text-xs text-brand-gray mt-1">Project: {config.projectId} • Region: us-central1</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="font-black text-lg text-orange-400">+$342.50</div>
                         <div className="text-[10px] uppercase font-bold text-brand-gray mt-1">Last 24h</div>
                      </div>
                   </div>

                   <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center justify-between opacity-50 hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                            <CheckCircle2 size={24} />
                         </div>
                         <div>
                            <h4 className="font-bold text-sm uppercase tracking-wide text-white/60">Cloud SQL Storage Optimized</h4>
                            <p className="text-xs text-white/40 mt-1">Project: {config.projectId} • Resolved automatically</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="font-black text-lg text-emerald-500">-$120.00</div>
                         <div className="text-[10px] uppercase font-bold text-brand-gray mt-1">Last week</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeView === 'dashboard' && (
          <>
            {/* Chat Feed */}
            <div className="flex-1 overflow-y-auto px-10 space-y-10 py-10 scroll-smooth">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 md:gap-6 animate-fade-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'bot' && (
                <div className="hidden md:flex w-12 h-12 rounded-2xl glass-card items-center justify-center text-indigo-400 shrink-0 shadow-2xl relative">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-50"></div>
                  <Bot size={24} className="relative z-10" />
                </div>
              )}
              <div className={`max-w-[90%] md:max-w-3xl px-6 md:px-8 py-5 md:py-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none border-indigo-500/50 relative overflow-hidden' 
                  : 'glass-card text-brand-gray rounded-tl-none border-white/10 leading-relaxed font-medium'
              }`}>
                {msg.role === 'user' && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] -z-10 rotate-45 translate-x-10 -translate-y-10"></div>
                )}
                {msg.role === 'bot' && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400">
                      Intelligence Engine
                    </div>
                    <div className="h-1 w-1 rounded-full bg-white/20"></div>
                    <div className="text-[9px] text-white/20 font-mono tracking-widest uppercase italic">Node-ID: BQ-AGNT-01</div>
                  </div>
                )}
                <div className="whitespace-pre-wrap text-[15px] leading-relaxed tracking-wide">{msg.content}</div>
                {msg.role === 'bot' && i === 0 && (
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {suggestedQueries.map((query, j) => (
                      <button 
                        key={j}
                        onClick={() => handleSend(null, query)}
                        className="text-left text-[11px] font-bold p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all flex items-center justify-between group"
                      >
                        <span className="truncate pr-2">{query}</span>
                        <ChevronRight size={14} className="text-white/20 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-[0_15px_30px_rgba(79,70,229,0.3)] border border-indigo-400/50">
                  <User size={24} />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-6 justify-start">
               <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-indigo-400 shrink-0 relative animate-pulse">
                  <Bot size={24} />
               </div>
               <div className="px-8 py-6 rounded-[2.5rem] glass-card rounded-tl-none flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-400/60 animate-pulse">Analyzing BigQuery Stream...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Dock */}
        <div className="px-6 md:px-10 pb-6 md:pb-10 pt-4">
          <form onSubmit={handleSend} className="max-w-5xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-brand-pink to-brand-blue rounded-[2.5rem] blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-500" />
            <div className="relative glass-card rounded-[1.5rem] md:rounded-[2.2rem] p-2 flex items-center border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
              <div className="hidden md:flex items-center gap-4 pl-6 text-brand-gray">
                <Sparkles size={22} className="text-indigo-400" />
                <div className="h-6 w-px bg-white/10"></div>
              </div>
              <input 
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about project costs..."
                className="flex-1 bg-transparent border-none px-4 md:px-6 py-4 md:py-6 text-sm md:text-[15px] focus:outline-none focus:ring-0 placeholder:text-brand-gray/40 font-medium"
              />
              <button 
                id="chat-send"
                type="submit" 
                disabled={loading || !input.trim()}
                className="w-12 h-12 md:w-16 md:h-16 bg-white text-brand-navy rounded-xl md:rounded-[1.8rem] flex items-center justify-center hover:bg-brand-gray transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn active:scale-90"
              >
                {loading ? <RefreshCw size={20} className="animate-spin" /> : <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />}
              </button>
            </div>
          </form>
          <div className="hidden md:flex justify-center gap-10 mt-8 text-[9px] font-black uppercase tracking-[0.4em] text-white/10">
            <div className="flex items-center gap-2 group cursor-pointer hover:text-white/30 transition-colors">
              <Clock size={12} />
              <span>Real-time Sync</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer hover:text-white/30 transition-colors">
              <ShieldCheck size={12} />
              <span>SECURE ADC</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer hover:text-white/30 transition-colors">
              <Search size={12} />
              <span>BQ-SQL ENGINE</span>
            </div>
          </div>
        </div>
        </>
        )}

        {/* Config Flyout - Centered Modal */}
        {showConfig && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-[#05070a]/80 backdrop-blur-sm"
              onClick={() => setShowConfig(false)}
            ></div>
            <div className="relative w-full max-w-[450px] glass-card rounded-[2.5rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] border border-white/10 backdrop-blur-[40px] animate-scale-in ring-1 ring-white/10">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Settings size={20} />
                </div>
                <div>
                  <h3 className="font-black text-lg tracking-tight uppercase">System Config</h3>
                  <p className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Global Environment</p>
                </div>
              </div>
              <button onClick={() => setShowConfig(false)} className="text-brand-gray hover:text-white transition-all bg-white/5 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10">✕</button>
            </div>
            
            <div className="space-y-8">
              <div className="group">
                <label className="block text-[10px] uppercase font-black tracking-widest text-brand-gray mb-3 ml-1">GCP Project ID</label>
                <div className="relative">
                  <Database size={16} className="absolute left-5 top-4 text-brand-gray group-focus-within:text-indigo-400 transition-colors" />
                  <input 
                    type="text"
                    value={config.projectId}
                    onChange={(e) => setConfig({...config, projectId: e.target.value})}
                    className="w-full bg-brand-dark/30 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm font-mono focus:outline-none focus:border-indigo-500/40 focus:bg-brand-dark/60 transition-all placeholder:text-white/10"
                    placeholder="Enter Project ID"
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-[10px] uppercase font-black tracking-widest text-brand-gray mb-3 ml-1">Billing Export URI</label>
                <div className="relative">
                  <Activity size={16} className="absolute left-5 top-4 text-brand-gray group-focus-within:text-indigo-400 transition-colors" />
                  <input 
                    type="text"
                    value={config.billingTable}
                    onChange={(e) => setConfig({...config, billingTable: e.target.value})}
                    className="w-full bg-brand-dark/30 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm font-mono focus:outline-none focus:border-indigo-500/40 focus:bg-brand-dark/60 transition-all placeholder:text-white/10"
                    placeholder="project.dataset.table"
                  />
                </div>
              </div>

              <div className="bg-indigo-500/5 rounded-2xl p-6 border border-indigo-500/10 space-y-4">
                <div className="flex items-center gap-3">
                  <Info size={16} className="text-indigo-400" />
                  <span className="text-[10px] uppercase font-black tracking-widest text-white/60">Deployment Health</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-brand-gray">ADC Credentials</span>
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 size={12} /> Valid</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-brand-gray">BigQuery Access</span>
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 size={12} /> Verified</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  console.log('Synchronizing configuration for:', config.projectId);
                  setShowConfig(false);
                }} 
                className="w-full bg-white text-brand-navy hover:bg-brand-gray font-black py-5 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all shadow-2xl active:scale-95"
              >
                Sync Configuration
              </button>
            </div>
          </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
