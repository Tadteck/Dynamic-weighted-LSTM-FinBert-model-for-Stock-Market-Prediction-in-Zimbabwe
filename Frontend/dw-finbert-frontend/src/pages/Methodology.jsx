import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, GitMerge, Cpu } from 'lucide-react';

export default function Methodology() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-900 text-slate-200 font-sans p-6 md:p-12">
      <nav className="max-w-5xl mx-auto flex items-center mb-12">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </button>
      </nav>

      <main className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">DW-FinBERT <span className="text-accent-blue">Methodology</span></h1>
        <p className="text-xl text-slate-400 mb-12 border-b border-white/10 pb-8">
          A deep dive into our proprietary Dynamic Weighted Fusion architecture designed for the Zimbabwe Stock Exchange.
        </p>

        <div className="space-y-12">
          <section className="glass-card p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent-neon/20 rounded-xl"><BookOpen className="text-accent-neon" /></div>
              <h2 className="text-2xl font-bold text-white">1. FinBERT NLP Extraction</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We employ a fine-tuned Financial BERT model tailored to local news context. It maps phrases, unigrams, and macroeconomic entity signals from localized sources. It converts qualitative data (news tone, policy announcements) into heavily quantified multidimensional sentiment tensors ranging from -1 to 1.
            </p>
          </section>

          <section className="glass-card p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent-blue/20 rounded-xl"><Cpu className="text-accent-blue" /></div>
              <h2 className="text-2xl font-bold text-white">2. Deep LSTM Sequences</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Historical ZSE pricing is incredibly volatile. Standard simple moving averages fail here. We utilize Multi-layered Long Short-Term Memory (LSTM) networks capable of retaining dependencies over multiple economic cycles, identifying obscure seasonal patterns in liquidity and demand.
            </p>
          </section>

          <section className="glass-card p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent-purple/20 rounded-xl"><GitMerge className="text-accent-purple" /></div>
              <h2 className="text-2xl font-bold text-white">3. Dynamic Weighted Fusion (DWF)</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              This is our core intellectual property. Rather than simply adding sentiment to the LSTM output, our DWF gates evaluate the *significance* of news. If a high-impact policy shift occurs, the fusion gate dynamically increases the weight of the FinBERT outcome while dampening the LSTM historical trend, ensuring rapid adaptation to breaking macro conditions.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
