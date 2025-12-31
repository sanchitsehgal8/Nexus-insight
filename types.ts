export interface ChartDataPoint {
  year: string;
  optimistic: number;
  realistic: number;
  pessimistic: number;
}

export interface Scenario {
  name: string;
  probability: string;
  description: string;
  keyTrigger: string;
}

export interface AnalysisResult {
  executiveSummary: string;
  scenarios: Scenario[];
  marketData: ChartDataPoint[];
  strategicOpportunities: string[];
  geopoliticalRisks: string[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}