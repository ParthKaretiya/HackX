import { z } from 'zod';

export type RiskCategory = "SAFE" | "SUSPICIOUS" | "DANGEROUS";

export interface ScanRequest {
    input: string;
    type: "link" | "text";
}

export interface ScanResult {
    riskCategory: RiskCategory;
    riskScore: number;
    explanation: string;
    triggers: string[];
    suggestions: string[];
}

export interface Scan extends ScanResult {
    id: string;
    userId: string;
    input: string;
    type: "link" | "text";
    createdAt: number;
}

export const ScanRequestSchema = z.object({
    input: z.string().min(1, "Input cannot be empty"),
    type: z.enum(["link", "text"]),
});
