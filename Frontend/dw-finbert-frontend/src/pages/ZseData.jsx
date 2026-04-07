import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Database, Activity, RefreshCw } from 'lucide-react';

export default function ZseData() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-900 text-slate-200 font-sans p-6 md:p-12">
      <nav className="max-w-5xl mx-auto flex items-center mb-12">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </button>
      </nav>

      <main className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">ZSE <span className="text-accent-neon">Data Pipelines</span></h1>
        <p className="text-xl text-slate-400 mb-12 border-b border-white/10 pb-8">
          Reliable, low-latency market ingestion specific to the Zimbabwe financial ecosystem.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="glass-card p-8 rounded-3xl col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent-neon/20 rounded-xl"><Database className="text-accent-neon" /></div>
              <h2 className="text-2xl font-bold text-white">Source Integrity</h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              DW-FinBERT aggregates pricing and sentiment data exclusively from highly vetted sources. We track core equities listed on the Zimbabwe Stock Exchange using an API gateway bridging proprietary quantitative endpoints with local media RSS crawlers.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="px-3 py-1 bg-brand-800 border border-white/10 rounded text-sm text-slate-300 font-mono">The Herald</span>
              <span className="px-3 py-1 bg-brand-800 border border-white/10 rounded text-sm text-slate-300 font-mono">NewsDay</span>
              <span className="px-3 py-1 bg-brand-800 border border-white/10 rounded text-sm text-slate-300 font-mono">Chronicle</span>
              <span className="px-3 py-1 bg-brand-800 border border-white/10 rounded text-sm text-slate-300 font-mono">Standard</span>
            </div>
          </section>

          <section className="glass-card p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent-blue/20 rounded-xl"><RefreshCw className="text-accent-blue" /></div>
              <h2 className="text-xl font-bold text-white">Synchronization Rates</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Price tick data is synchronized asynchronously with the end-of-day market closure. However, news sentiment is actively crawled every 15 minutes to guarantee that our DWF gate predictions capture momentum *before* the market reacts the next day.
            </p>
          </section>

          <section className="glass-card p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent-purple/20 rounded-xl"><Activity className="text-accent-purple" /></div>
              <h2 className="text-xl font-bold text-white">Data Cleansing</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Missing values and localized exchange anomalies are smoothed using robust interpolation and MinMax scaling before passing through the FinBERT model to prevent hallucinated sentiment spikes.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
