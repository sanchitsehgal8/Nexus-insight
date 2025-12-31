import React from 'react';
import { Search, Globe, Briefcase } from 'lucide-react';

interface InputSectionProps {
  industry: string;
  setIndustry: (val: string) => void;
  region: string;
  setRegion: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  industry,
  setIndustry,
  region,
  setRegion,
  onAnalyze,
  isLoading
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-light text-white mb-6 tracking-tight">
          Define <span className="text-indigo-400 font-semibold">Strategic Parameters</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Industry Input */}
          <div className="relative group">
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 ml-1">
              Industry / Sector
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-indigo-500" />
              </div>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Semiconductors, Green Hydrogen, Fintech"
                className="w-full bg-slate-950/80 border border-slate-700 text-white pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-slate-600 outline-none"
              />
            </div>
          </div>

          {/* Region Input */}
          <div className="relative group">
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 ml-1">
              Geopolitical Region
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-emerald-500" />
              </div>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. Taiwan Strait, EU-Russia Border, MENA"
                className="w-full bg-slate-950/80 border border-slate-700 text-white pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder-slate-600 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onAnalyze}
            disabled={isLoading || !industry || !region}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-white shadow-lg transition-all duration-300
              ${isLoading || !industry || !region 
                ? 'bg-slate-800 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/25 active:scale-95'}
            `}
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
                <span>Synthesizing Intelligence...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Generate Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSection;