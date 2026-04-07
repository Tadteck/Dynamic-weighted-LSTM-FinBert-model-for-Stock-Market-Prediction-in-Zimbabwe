import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, LineChart, Globe, Cpu, ArrowRight, Zap, Target, Search } from 'lucide-react';

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden font-sans bg-brand-900 text-slate-200">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-neon opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[50%] bg-accent-blue opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Navbar */}
      <nav className="w-full max-w-7xl flex justify-between items-center px-6 py-4 z-50 glass mt-6 rounded-2xl mx-4 sticky top-6 border-white/5 transition-all shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-accent-neon to-accent-blue p-2 rounded-xl text-black shadow-lg shadow-accent-neon/20">
            <LayoutDashboard size={22} className="text-brand-900" />
          </div>
          <span className="font-bold text-xl tracking-wide text-white">DW-FinBERT <span className="font-light opacity-80 text-sm">Pro</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
          <Link to="/dashboard" className="hover:text-accent-neon transition-colors">Platform</Link>
          <Link to="/methodology" className="hover:text-accent-neon transition-colors">Methodology</Link>
          <Link to="/zse-data" className="hover:text-accent-neon transition-colors">ZSE Data</Link>
          <Link to="/company" className="hover:text-accent-neon transition-colors">Company</Link>
        </div>
        <div className="flex gap-4 items-center">
          <button 
            onClick={() => navigate('/login')}
            className="hidden sm:block text-slate-300 hover:text-white px-3 py-2 text-sm font-semibold transition-all">
            Sign In
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-white hover:bg-slate-200 text-brand-900 px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Launch Platform
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="text-center mt-24 md:mt-32 px-6 max-w-5xl z-10 flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-neon/30 bg-accent-neon/10 text-accent-neon text-xs font-bold mb-8 backdrop-blur-md uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <span className="w-2 h-2 rounded-full bg-accent-neon animate-pulse shadow-[0_0_5px_#10b981]"></span>
          V 2.0 Live: Advanced ZSE Sentiment Routing
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-white mb-6 drop-shadow-lg">
          Intelligent Market <br className="hidden md:block" />
          <span className="text-gradient">Forecasting Engine</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mt-4 max-w-2xl mx-auto leading-relaxed">
          Harnessing Dynamic Weighted Fusion and leading NLP models to process Zimbabwe Stock Exchange sentiment, liquidity, and volatility data into actionable alpha.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-5 w-full sm:w-auto relative">
          <div className="absolute inset-0 bg-accent-neon blur-[40px] opacity-20 rounded-full"></div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="relative bg-white text-brand-900 px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-5px_rgba(255,255,255,0.8)] flex items-center justify-center gap-2 group">
            Go to Dashboard
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
          <Link to="/methodology" className="relative glass-card px-8 py-4 text-white text-lg font-semibold rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 hover:border-white/20">
            Read Whitepaper
          </Link>
        </div>
      </main>

      {/* Metrics Banner */}
      <div className="w-full max-w-6xl mt-24 mb-10 z-10 border-y border-white/5 bg-brand-900/50 backdrop-blur-sm py-8 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
          <div>
            <div className="text-4xl font-extrabold text-white mb-1">94%</div>
            <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Directional Accuracy</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-white mb-1">&lt; 2ms</div>
            <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Inference Latency</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-white mb-1">50K+</div>
            <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Articles Ingested</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-white mb-1 flex items-center justify-center">
               <Globe className="text-accent-blue mr-2" size={32} /> ZSE
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Market Specialization</div>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="w-full max-w-7xl px-6 py-20 z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Institutional-Grade Intelligence</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Built from the ground up to solve the unique challenges of emerging market liquidity and sentiment analysis on the ZSE.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LineChart className="text-accent-blue" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Predictive Accuracy</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Advanced sentiment weighting mitigates signal noise, significantly improving short-term forecast reliability over standard LSTM models.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-neon/20 to-accent-neon/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative">
              <ShieldCheck className="text-accent-neon relative z-10" size={28} />
              <div className="absolute inset-0 bg-accent-neon/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Enterprise Security</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              End-to-end encryption, strict role-based access, and robust JWT authentication secured for institutional research workflows.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-purple/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="text-accent-purple" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Dynamic Fusion Matrix</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Proprietary tensor layers integrate qualitative macro-economic sentiment directly into the quantitative pricing timeline blocks.
            </p>
          </div>
        </div>
      </div>

      {/* How it Works / Architecture */}
      <div className="w-full bg-brand-800/30 border-y border-white/5 py-24 z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded bg-accent-blue/10 text-accent-blue text-xs font-bold uppercase tracking-widest mb-4">The Pipeline</div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Continuous Signal <br/>Ingestion & Analysis</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We process hundreds of daily localized financial news articles, parse them through our FinBERT model, and fuse the output tensors with deep historical ZSE sequence layers for high-confidence predictions.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 bg-white/5 p-2 rounded-lg border border-white/10 h-min">
                  <Search className="text-accent-neon" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">1. Market Scanning</h4>
                  <p className="text-slate-400 text-sm mt-1">Automated crawlers ingest breaking news from major Zimbabwean outlets.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-white/5 p-2 rounded-lg border border-white/10 h-min">
                  <Zap className="text-accent-blue" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">2. FinBERT Extraction</h4>
                  <p className="text-slate-400 text-sm mt-1">Contextual NLP analyzes paragraph-level tone mapping entity sentiment.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-white/5 p-2 rounded-lg border border-white/10 h-min">
                  <Target className="text-accent-purple" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">3. Predictive Fusion</h4>
                  <p className="text-slate-400 text-sm mt-1">LSTMs merge sentiment weightings with raw OHLCV vectors.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Abstract Tech Illustration Base */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-neon/20 to-accent-purple/20 blur-[80px] rounded-full"></div>
            <div className="glass-card rounded-2xl p-8 border border-white/10 relative shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 blur-[50px] group-hover:bg-accent-blue/20 transition-all duration-700"></div>
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs font-mono text-slate-500">pipeline_exec.py</div>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <div className="text-slate-400"><span className="text-accent-purple">import</span> tensor_fusion <span className="text-accent-purple">as</span> tf</div>
                <div className="text-slate-400"><span className="text-accent-purple">import</span> zse_stream</div>
                <br/>
                <div className="text-slate-300">
                  <span className="text-accent-blue">def</span> <span className="text-green-400">run_analysis</span>(ticker="ECO.zw"):
                </div>
                <div className="pl-6 text-slate-400">
                  sentiment = zse_stream.get_latest(ticker)
                </div>
                <div className="pl-6 text-slate-400">
                  <span className="text-slate-500"># Apply FinBERT weighting</span>
                </div>
                <div className="pl-6 text-slate-400">
                  score = base_model.predict(sentiment)
                </div>
                <br/>
                <div className="pl-6 text-accent-neon bg-accent-neon/10 py-1 px-2 border-l-2 border-accent-neon">
                  &gt; SYNC: ZSE Data synchronized
                </div>
                <div className="pl-6 text-accent-neon bg-accent-neon/10 py-1 px-2 border-l-2 border-accent-neon mt-2">
                  &gt; OUT: Alpha calculated at +1.4%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="w-full max-w-5xl px-6 py-32 z-10 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-accent-blue/10 via-accent-neon/10 to-accent-purple/10 blur-[100px] rounded-[100%] pointer-events-none"></div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative">Ready to optimize your trading strategies?</h2>
        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto relative">Join professional analysts using DW-FinBERT to navigate the Zimbabwe Stock Exchange with predictive AI.</p>
        <button 
          onClick={() => navigate('/signup')}
          className="relative bg-gradient-to-r from-accent-neon to-accent-blue text-brand-900 px-10 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
          Create Free Account
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-brand-900/80 pt-16 pb-8 z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-tr from-accent-neon to-accent-blue p-1.5 rounded-lg text-black">
                <LayoutDashboard size={18} />
              </div>
              <span className="font-bold text-xl text-white">DW-FinBERT</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Pioneering deep learning and sentiment analysis for emerging African financial markets.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Product</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/dashboard" className="hover:text-accent-neon transition-colors">Platform</Link></li>
              <li><Link to="/zse-data" className="hover:text-accent-neon transition-colors">API Access</Link></li>
              <li><Link to="/methodology" className="hover:text-accent-neon transition-colors">Documentation</Link></li>
              <li><Link to="/company" className="hover:text-accent-neon transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal & Connect</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/company" className="hover:text-accent-neon transition-colors">Privacy Policy</Link></li>
              <li><Link to="/company" className="hover:text-accent-neon transition-colors">Terms of Service</Link></li>
              <li><Link to="/company" className="hover:text-accent-neon transition-colors">Contact Support</Link></li>
              <li><a href="#" className="hover:text-accent-neon transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm">© 2026 DW-FinBERT Project. All rights reserved.</p>
          <div className="text-slate-600 text-sm mt-4 md:mt-0 flex gap-4">
            <span>ZSE Data provided dynamically.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
