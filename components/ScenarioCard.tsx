import React from 'react';
import { Scenario } from '../types';
import { TrendingUp, AlertTriangle, MinusCircle } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
  type: 'optimistic' | 'realistic' | 'pessimistic';
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, type }) => {
  const getStyles = () => {
    switch (type) {
      case 'optimistic':
        return {
          icon: <TrendingUp className="h-6 w-6 text-emerald-400" />,
          border: 'border-emerald-900/50',
          bg: 'bg-emerald-950/10',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        };
      case 'pessimistic':
        return {
          icon: <AlertTriangle className="h-6 w-6 text-rose-400" />,
          border: 'border-rose-900/50',
          bg: 'bg-rose-950/10',
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
        };
      default:
        return {
          icon: <MinusCircle className="h-6 w-6 text-indigo-400" />,
          border: 'border-indigo-900/50',
          bg: 'bg-indigo-950/10',
          badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`relative p-6 rounded-2xl border ${styles.border} ${styles.bg} backdrop-blur-sm transition-all hover:-translate-y-1 duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-950/50 rounded-lg border border-slate-800">
          {styles.icon}
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${styles.badge} uppercase tracking-wide`}>
          {scenario.probability} Prob.
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{scenario.name}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 min-h-[60px]">
        {scenario.description}
      </p>

      <div className="pt-4 border-t border-slate-800/50">
        <span className="text-xs text-slate-500 uppercase font-medium">Catalyst Event</span>
        <p className="text-slate-300 text-sm mt-1">{scenario.keyTrigger}</p>
      </div>
    </div>
  );
};

export default ScenarioCard;