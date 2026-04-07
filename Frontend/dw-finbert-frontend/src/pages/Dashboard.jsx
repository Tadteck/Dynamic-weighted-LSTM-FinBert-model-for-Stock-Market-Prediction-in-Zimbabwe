import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStocks, fetchNews, fetchPredictions } from '../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine, ComposedChart } from 'recharts';
import { MapPin, MessageSquare, Menu, Settings, Plus, LayoutDashboard, Search, Bell } from 'lucide-react';

const MOCK_CHART_DATA = [
  { time: 'Jan 12', price: 100, forecast: null },
  { time: 'Jan 15', price: 105, forecast: null },
  { time: 'Jan 18', price: 101, forecast: null },
  { time: 'Jan 21', price: 110, forecast: null },
  { time: 'Jan 24', price: 108, forecast: null },
  { time: 'Jan P', price: 115, forecast: null },
  { time: 'Forecast', price: 112, forecast: 112 },
  { time: 'Vour', price: null, forecast: 118 },
  { time: 'Fonalt', price: null, forecast: 125 },
  { time: 'End', price: null, forecast: 125 }
];

const MOCK_NEWS = [
  { id: 1, source: 'The Herald', text: 'Econet reports strong Q3 revenue amidst policy shifts', sentiment: 'Positive', impact: '+0.7%' },
  { id: 2, source: 'NewsAPI', text: 'Delta beverages affected by supply chain disruptions', sentiment: 'Negative', impact: '-0.3%' },
  { id: 3, source: 'Local Media', text: 'Market stable despite global tech sell-offs', sentiment: 'Neutral', impact: '0.0%' },
  { id: 4, source: 'ZSE Bulletin', text: 'New policy shifts favor agro-industrial sector', sentiment: 'Highly Positive', impact: '+1.2%' },
  { id: 5, source: 'The Herald', text: 'Mining indexes dip amidst global trends', sentiment: 'Negative', impact: '-0.8%' }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 rounded-lg border border-white/10 shadow-2xl">
        <p className="text-slate-300 text-xs mb-1 font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="text-white">{entry.name}:</span>
            <span style={{ color: entry.color }}>{entry.value} ZiG</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [news, setNews] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [chartData, setChartData] = useState(MOCK_CHART_DATA);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [stocksData, newsData, predsData] = await Promise.all([
      fetchStocks(),
      fetchNews(),
      fetchPredictions()
    ]);
    
    // Fallback Mock News
    if (Array.isArray(newsData) && newsData.length > 0) {
      setNews(newsData.map(n => {
        let sentimentLabel = "Neutral";
        if (n.sentiment_score > 0.4) sentimentLabel = "Highly Positive";
        else if (n.sentiment_score > 0.05) sentimentLabel = "Positive";
        else if (n.sentiment_score < -0.4) sentimentLabel = "Highly Negative";
        else if (n.sentiment_score < -0.05) sentimentLabel = "Negative";
        
        let impactVal = (n.sentiment_score * 5.5).toFixed(1);
        let impact = impactVal > 0 ? `+${impactVal}%` : `${impactVal}%`;
        if (n.sentiment_score === 0 || impactVal === "0.0") impact = "0.0%";

        return {
          id: n.id,
          source: n.source || 'Zim Media',
          text: n.headline,
          sentiment: sentimentLabel,
          impact: impact
        };
      }));
    } else {
      setNews(MOCK_NEWS);
    }

    if (Array.isArray(predsData) && predsData.length > 0) {
      setPredictions(predsData);
      if (!selectedSymbol) setSelectedSymbol(predsData[0].stock_symbol);
    } else {
      const fallbackPredictions = [
        { stock_symbol: 'ZSE:DLTA.zw', name: 'Delta Corp', lstm_prediction: 24.50, sentiment_score: 0.82, final_prediction: 25.80 },
        { stock_symbol: 'ZSE:ECO.zw', name: 'Econet Wireless', lstm_prediction: 128.50, sentiment_score: 0.65, final_prediction: 130.20 },
        { stock_symbol: 'ZSE:INN.zw', name: 'Innscor Africa', lstm_prediction: 45.00, sentiment_score: -0.42, final_prediction: 43.10 },
        { stock_symbol: 'ZSE:NMB.zw', name: 'NMB Bank', lstm_prediction: 12.30, sentiment_score: 0.15, final_prediction: 12.80 },
        { stock_symbol: 'ZSE:CBZ.zw', name: 'CBZ Holdings', lstm_prediction: 110.00, sentiment_score: 0.75, final_prediction: 115.50 }
      ];
      setPredictions(fallbackPredictions);
      if (!selectedSymbol) setSelectedSymbol(fallbackPredictions[0].stock_symbol);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000); 
    return () => clearInterval(interval);
  }, [selectedSymbol]);

  const activePrediction = predictions.find(p => p.stock_symbol === selectedSymbol) || (predictions.length > 0 ? predictions[0] : null);

  return (
    <div className="min-h-screen bg-brand-900 text-slate-200 font-sans relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-[20%] w-[500px] h-[500px] bg-accent-neon opacity-10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent-blue opacity-[0.07] blur-[150px] rounded-full pointer-events-none"></div>

      {/* Dark Top Navigation Bar */}
      <nav className="glass border-b border-white/5 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-accent-neon to-accent-blue p-2 rounded-xl text-black shadow-lg shadow-accent-neon/20">
             <LayoutDashboard size={20} className="text-brand-900" />
          </div>
          <span className="text-xl font-bold tracking-wide text-white">DW-FinBERT <span className="font-light opacity-80 text-sm">Terminal</span></span>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="hidden md:flex bg-white/5 border border-white/10 rounded-full px-4 py-1.5 items-center gap-2">
             <Search size={14} className="text-slate-400" />
             <input type="text" placeholder="Search SYMBOL..." className="bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none w-32" />
           </div>
           
           <div className="flex items-center gap-4 text-slate-400">
             <button className="hover:text-accent-neon transition-colors relative">
               <Bell size={20} />
               <span className="absolute top-0 right-0 w-2 h-2 bg-accent-neon rounded-full animate-pulse"></span>
             </button>
             <button className="hover:text-white transition-colors"><Settings size={20} /></button>
             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple border border-white/20"></div>
           </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6 relative z-10">
        
        {/* Top Feature Card */}
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          {/* Subtle line glow at top */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-neon/50 to-transparent"></div>
          
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-3">
              <h1 className="text-2xl font-bold text-white tracking-tight">Active Asset Focus</h1>
              <div className="relative">
                <select 
                  value={selectedSymbol || ''}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  className="appearance-none bg-brand-800 border border-white/10 text-white text-lg font-bold rounded-xl focus:ring-2 focus:ring-accent-neon/50 focus:border-accent-neon block pl-4 pr-10 py-2 cursor-pointer outline-none hover:bg-white/5 transition-all shadow-lg"
                >
                  {predictions.map((p, idx) => (
                    <option key={idx} value={p.stock_symbol}>
                      {p.name || p.stock_symbol.split(':')[1] || p.stock_symbol} ({p.stock_symbol})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Plus size={16} className="rotate-45" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Target Price Block */}
            <div className="bg-brand-900/80 rounded-2xl p-6 border border-white/5 shadow-[0_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent-neon/10 rounded-full blur-3xl group-hover:bg-accent-neon/20 transition-all duration-500"></div>
               <div className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Target Breakout (EOD)</div>
               <div className="text-4xl font-extrabold text-white flex items-baseline gap-2 mb-2">
                 {parseFloat(activePrediction?.final_prediction || 25.80).toFixed(2)}
                 <span className="text-lg font-medium text-slate-500">ZiG</span>
               </div>
               <div className="inline-flex px-2 py-1 bg-accent-neon/20 text-accent-neon text-xs font-bold rounded-md">
                 {(activePrediction?.final_prediction - activePrediction?.lstm_prediction > 0) ? '+' : '-'}{Math.abs(((activePrediction?.final_prediction - activePrediction?.lstm_prediction) / activePrediction?.lstm_prediction) * 100 || 4.2).toFixed(1)}% vs Base
               </div>
            </div>

            {/* Sentiment Index */}
            <div className="p-6 border-l border-white/5 hidden md:block">
               <div className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Signal Weight</div>
               <div className="text-3xl font-bold text-white">{parseFloat(activePrediction?.sentiment_score || 0.82).toFixed(2)}</div>
               <div className="mt-3 w-full bg-brand-900 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-gradient-to-r from-accent-blue to-accent-neon h-full w-[82%]"></div>
               </div>
               <div className="text-xs font-medium text-accent-neon mt-2 uppercase">{activePrediction?.sentiment_score > 0.5 ? 'Strong Bullish' : (activePrediction?.sentiment_score > 0 ? 'Bullish' : 'Bearish')}</div>
            </div>

            {/* Confidence */}
            <div className="p-6 border-l border-white/5 hidden md:block">
               <div className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">System Match</div>
               <div className="text-3xl font-bold text-white">92.4%</div>
               <div className="mt-3 w-full bg-brand-900 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-accent-neon h-full w-[92%]"></div>
               </div>
               <div className="text-xs font-medium text-slate-400 mt-2 uppercase">High Conviction</div>
            </div>

            {/* Volatility */}
            <div className="p-6 border-l border-white/5 hidden md:block">
               <div className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Volatility Index</div>
               <div className="text-3xl font-bold text-white">15.2</div>
               <div className="mt-3 flex gap-1">
                 <div className="flex-1 h-1.5 bg-accent-neon rounded-full"></div>
                 <div className="flex-1 h-1.5 bg-accent-neon rounded-full"></div>
                 <div className="flex-1 h-1.5 bg-brand-900 rounded-full"></div>
                 <div className="flex-1 h-1.5 bg-brand-900 rounded-full"></div>
               </div>
               <div className="text-xs font-medium text-slate-400 mt-2 uppercase w-full flex justify-between">
                 <span>Low</span> <span className="w-2 h-2 rounded-full bg-accent-neon shadow-[0_0_8px_#10b981]"></span>
               </div>
            </div>
          </div>
        </div>

        {/* Middle Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Column */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 relative">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-lg font-bold text-white">Price Trajectory & DWF Overlay</h2>
               <div className="flex gap-2">
                 <button className="px-3 py-1 text-xs font-semibold bg-white/10 rounded-md hover:bg-white/20 transition-colors">1D</button>
                 <button className="px-3 py-1 text-xs font-semibold bg-accent-neon/20 text-accent-neon rounded-md">1W</button>
                 <button className="px-3 py-1 text-xs font-semibold bg-white/10 rounded-md hover:bg-white/20 transition-colors">1M</button>
               </div>
             </div>
             
             <div className="h-80 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorHistory" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(v) => `${v}`} />
                    <Tooltip content={<CustomTooltip />} />
                    
                    <ReferenceLine x="Forecast" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" label={{ position: 'top', value: 'Prediction Horizon', fill: '#94a3b8', fontSize: 11, fontWeight: 600, dy: -10 }} />
                    
                    {/* Historical Area */}
                    <Area type="monotone" name="Base Line" dataKey="price" stroke="#3b82f6" strokeWidth={2} fill="url(#colorHistory)" connectNulls={false} isAnimationActive={false} />
                    {/* Forecast Area */}
                    <Area type="monotone" name="DWF Adjusted" dataKey="forecast" stroke="#10b981" strokeWidth={3} fill="url(#colorForecast)" style={{ filter: "url(#glow)" }} connectNulls={false} isAnimationActive={false} />
                  </ComposedChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Logic Panels */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></span>
                    DWF Logic Gates
                  </h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-2 uppercase flex justify-between">
                      <span>Sentiment Bias</span>
                      <span className="text-accent-neon">82%</span>
                    </div>
                    <div className="h-1.5 w-full bg-brand-900 rounded-full flex overflow-hidden">
                      <div className="h-full bg-accent-neon w-[82%] relative">
                        <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50 blur-sm pointer-events-none"></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-2 uppercase flex justify-between">
                      <span>Historical Weight</span>
                      <span className="text-accent-blue">65%</span>
                    </div>
                    <div className="h-1.5 w-full bg-brand-900 rounded-full flex overflow-hidden">
                      <div className="h-full bg-accent-blue w-[65%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-2 uppercase flex justify-between">
                      <span>Market Noise Filter</span>
                      <span className="text-accent-purple">40%</span>
                    </div>
                    <div className="h-1.5 w-full bg-brand-900 rounded-full flex overflow-hidden">
                      <div className="h-full bg-accent-purple w-[40%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">XAI Extraction</h3>
                <p className="text-xs leading-relaxed text-slate-400 font-medium bg-brand-900/50 p-3 rounded-lg border border-white/5">
                  {activePrediction?.explanation || "Model strongly biases recent bullish policy sentiments. Divergence from LSTM baseline is driven by an influx of positive news items overriding short-term historical volatility."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="glass-card rounded-2xl p-6 mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Sentiment Ingestion Stream</h2>
              <button className="text-sm text-accent-neon hover:text-white transition-colors">View Deep Dive</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="pb-4 font-semibold px-4 w-12">Tick</th>
                    <th className="pb-4 font-semibold px-4">Entity Source</th>
                    <th className="pb-4 font-semibold px-4">Extracted Intelligence</th>
                    <th className="pb-4 font-semibold px-4">Pol.</th>
                    <th className="pb-4 font-semibold px-4 text-right">Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {news.map((n, i) => (
                    <tr key={n.id || i} className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="py-4 px-4 text-slate-500 font-mono text-xs">{String(i + 1).padStart(2, '0')}</td>
                      <td className="py-4 px-4 font-semibold text-slate-300 text-sm whitespace-nowrap">{n.source}</td>
                      <td className="py-4 px-4 text-slate-400 text-sm">{n.text}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                          ${n.sentiment.includes('Positive') ? 'bg-accent-neon/10 text-accent-neon border border-accent-neon/20' : 
                           n.sentiment.includes('Negative') ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                           'bg-slate-500/10 text-slate-400 border border-slate-500/20'}`}>
                          {n.sentiment.replace('Highly', 'H.')}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-bold text-sm">
                        <span className={n.impact.includes('+') ? 'text-accent-neon' : n.impact.includes('-') ? 'text-red-400' : 'text-slate-500'}>
                          {n.impact}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>

      </div>
    </div>
  );
}
