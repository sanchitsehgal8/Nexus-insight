import React, { useState } from 'react';
import { Activity, Anchor, Target, Zap, ShieldAlert, Cpu } from 'lucide-react';
import InputSection from './components/InputSection';
import MarketChart from './components/MarketChart';
import ScenarioCard from './components/ScenarioCard';
import { analyzeGeopolitics } from './services/geminiService';
import { AnalysisResult, LoadingState } from './types';

const App: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [region, setRegion] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [data, setData] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setLoadingState(LoadingState.LOADING);
    setData(null);
    try {
      const result = await analyzeGeopolitics(industry, region);
      setData(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] opacity-40 mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] opacity-40 mix-blend-screen"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 mb-6">
            <Cpu className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Nexus Insight Engine v1.0</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Geopolitical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Foresight</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Leverage advanced AI to simulate the convergence of market dynamics and geopolitical forces.
          </p>
        </div>

        {/* Input */}
        <InputSection 
          industry={industry} 
          setIndustry={setIndustry}
          region={region} 
          setRegion={setRegion}
          onAnalyze={handleAnalyze}
          isLoading={loadingState === LoadingState.LOADING}
        />

        {/* Loading State */}
        {loadingState === LoadingState.LOADING && (
          <div className="w-full max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center animate-pulse">
            <div className="h-4 bg-slate-800 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-slate-800 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-slate-800 rounded w-2/3 mx-auto"></div>
            <p className="mt-8 text-indigo-400 font-mono text-sm">Analyzing structured and unstructured data streams...</p>
          </div>
        )}

        {/* Error State */}
        {loadingState === LoadingState.ERROR && (
          <div className="w-full max-w-4xl mx-auto bg-rose-950/20 border border-rose-900 rounded-2xl p-8 text-center">
            <ShieldAlert className="h-12 w-12 text-rose-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">Analysis Interrupted</h3>
            <p className="text-rose-200 mt-2">Failed to generate strategic insight. Please check your API configuration or try different parameters.</p>
          </div>
        )}

        {/* Results */}
        {loadingState === LoadingState.SUCCESS && data && (
          <div className="w-full max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Executive Summary */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Target className="h-24 w-24 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-400" />
                Executive Summary
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed max-w-4xl">
                {data.executiveSummary}
              </p>
            </div>

            {/* Scenarios Grid */}
            <div>
              <h2 className="text-2xl font-light text-white mb-6">projected <span className="font-semibold text-white">Scenarios</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ScenarioCard scenario={data.scenarios[0]} type="optimistic" />
                <ScenarioCard scenario={data.scenarios[2]} type="realistic" />
                <ScenarioCard scenario={data.scenarios[1]} type="pessimistic" />
              </div>
            </div>

            {/* Main Content Grid: Chart & Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Chart Column */}
              <div className="lg:col-span-2">
                 <h2 className="text-2xl font-light text-white mb-6">market <span className="font-semibold text-white">Trajectory</span></h2>
                 <MarketChart data={data.marketData} />
              </div>

              {/* Lists Column */}
              <div className="space-y-6">
                
                {/* Opportunities */}
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    Strategic Opportunities
                  </h3>
                  <ul className="space-y-3">
                    {data.strategicOpportunities.map((opp, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400/50 shrink-0"></span>
                        {opp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risks */}
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-rose-400" />
                    Geopolitical Risks
                  </h3>
                  <ul className="space-y-3">
                    {data.geopoliticalRisks.map((risk, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400/50 shrink-0"></span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
            
            <div className="text-center pb-12 opacity-50">
               <span className="text-xs text-slate-600 font-mono">Generated by Nexus Insight Engine • Powered by Gemini 3 Flash</span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default App;