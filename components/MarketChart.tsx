import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartDataPoint } from '../types';

interface MarketChartProps {
  data: ChartDataPoint[];
}

const MarketChart: React.FC<MarketChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[400px] bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">5-Year Market Projections (Index)</h3>
        <span className="text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded">Base: 100</span>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
          <XAxis 
            dataKey="year" 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              borderColor: '#334155', 
              color: '#f8fafc',
              borderRadius: '8px'
            }}
            itemStyle={{ fontSize: '13px' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          
          <Line 
            type="monotone" 
            dataKey="optimistic" 
            name="Optimistic" 
            stroke="#10b981" 
            strokeWidth={3} 
            dot={{ r: 4, strokeWidth: 0, fill: '#10b981' }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="realistic" 
            name="Baseline" 
            stroke="#6366f1" 
            strokeWidth={3} 
            dot={{ r: 4, strokeWidth: 0, fill: '#6366f1' }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="pessimistic" 
            name="Pessimistic" 
            stroke="#f43f5e" 
            strokeWidth={3} 
            dot={{ r: 4, strokeWidth: 0, fill: '#f43f5e' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;