import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Mail, Shield } from 'lucide-react';

export default function Company() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-900 text-slate-200 font-sans p-6 md:p-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[80%] h-[40%] bg-accent-purple opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <nav className="max-w-5xl mx-auto flex items-center mb-12 relative z-10">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </button>
      </nav>

      <main className="max-w-5xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-purple/30 bg-accent-purple/10 text-accent-purple text-xs font-bold mb-6 backdrop-blur-md uppercase tracking-wider">
          About Us
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Pioneering AI for <span className="text-gradient">Emerging Markets</span></h1>
        <p className="text-xl text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed">
          DW-FinBERT is a research-driven initiative focused on bringing institutional-grade quantitative sentiment analysis to the Zimbabwe Stock Exchange.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="glass-card p-8 rounded-3xl flex flex-col items-start border border-white/5">
            <div className="p-4 bg-brand-800 rounded-2xl mb-6 shadow-lg border border-white/10"><Users className="text-accent-blue" size={32} /></div>
            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Democratize access to advanced algorithmic trading insights for African markets that have historically lacked structured data infrastructure.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl flex flex-col items-start border border-white/5">
            <div className="p-4 bg-brand-800 rounded-2xl mb-6 shadow-lg border border-white/10"><Shield className="text-accent-neon" size={32} /></div>
            <h3 className="text-xl font-bold text-white mb-3">Core Values</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We prioritize scientific rigor, data integrity, and strict adherence to security best practices for institutional deployment.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl flex flex-col items-start border border-white/5">
            <div className="p-4 bg-brand-800 rounded-2xl mb-6 shadow-lg border border-white/10"><Mail className="text-accent-purple" size={32} /></div>
            <h3 className="text-xl font-bold text-white mb-3">Get in Touch</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Interested in integrating our API into your trading workflow or research? Send us a message.
            </p>
            <a href="mailto:contact@dw-finbert.co.zw" className="text-accent-blue font-semibold hover:underline mt-auto">contact@dwfinbert.co.zw</a>
          </div>
        </div>
      </main>
    </div>
  );
}
