export type SafetyCategory = 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';
export type TruthCategory = 'LIKELY_SAFE' | 'UNVERIFIED' | 'HIGH_RISK_CLAIM';
export type ScanTopic = 'health' | 'finance' | 'general' | 'other';
export type ScanType = 'link' | 'message' | 'news';

export interface ScanResultData {
  id: string;
  safetyCategory: SafetyCategory;
  truthCategory: TruthCategory;
  topic: ScanTopic;
  type: ScanType;
  reasons: string[];
  recommendation: string;
  domainInfo?: {
    domain: string;
    age: string;
  };
  input: string;
  timestamp: Date;
}
