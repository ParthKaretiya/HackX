import { ScanResultData } from '@/types/scan';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini directly in the frontend for demo purposes
// @ts-ignore
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBoyq3AcTGP5bgeEIXjRIPKpbMZRhX-ZRI");
const scannerModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function getUserId() {
  const userStr = localStorage.getItem('AUTH_USER_KEY');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return user.uid || 'guest';
    } catch { }
  }
  return 'guest';
}

const safeDomains = [
  "google.com",
  "youtube.com",
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "linkedin.com",
  "wikipedia.org",
  "amazon.com",
  "microsoft.com",
  "apple.com",
  "github.com",
  "netflix.com"
];

function isSafeHost(hostname: string) {
  return safeDomains.some(d => hostname === d || hostname.endsWith('.' + d));
}

const systemInstructions = `
You are an advanced Next-Gen Cybersecurity API analyzing phishing, scams, and unsafe content.
Analyze the following input and return ONLY a valid JSON string.
DO NOT wrap the response in markdown blocks like \`\`\`json. DO NOT return any text outside of the JSON braces.

The JSON format must be EXACTLY:
{
  "riskCategory": "SAFE" | "SUSPICIOUS" | "DANGEROUS",
  "riskScore": number (0 to 100, 100 being extreme danger),
  "explanation": "Brief explanation of why this was flagged",
  "triggers": ["Specific trigger 1", "Specific trigger 2"],
  "suggestions": ["Action to take 1", "Action to take 2"]
}

Rules for riskCategory:
- SAFE = Normal content, highly trusted domains with no major scam hints.
- SUSPICIOUS = Unknown domains or slightly risky signals (e.g. slight urgency).
- DANGEROUS = Clear scam/phishing/attack patterns, fake apps, or dangerous urgency.
`;

async function genericGeminiScan(input: string, type: string): Promise<any> {
  const prompt = `
    ${systemInstructions}
    Type: ${type}
    Input:
    ${input}
  `;

  try {
    const result = await scannerModel.generateContent(prompt);
    const responseText = result.response.text().trim();
    // In case the AI still wraps with ```json [...] ``` 
    const cleanText = responseText.replace(/^```json/i, "").replace(/```$/i, "").trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      riskCategory: "SUSPICIOUS",
      riskScore: 50,
      explanation: "Our AI completely failed to analyze this exact payload due to a system block or format failure. Always verify manually.",
      triggers: ["MODEL_FAIL_ERROR"],
      suggestions: ["Do not trust this implicitly.", "Consult someone you trust or a cyber cell if money is involved."]
    };
  }
}

export async function scanLink(url: string): Promise<ScanResultData> {
  try {
    const parsedUrl = new URL(url);
    if (isSafeHost(parsedUrl.hostname)) {
      return {
        id: Math.random().toString(),
        safetyCategory: 'SAFE',
        truthCategory: 'LIKELY_SAFE',
        topic: 'general',
        type: 'link',
        reasons: ['Trusted Global Domain Verified'],
        recommendation: 'This site is intrinsically safe.',
        input: url,
        timestamp: new Date()
      };
    }
  } catch {
    // invalid url string
  }

  const data = await genericGeminiScan(url, 'URL Link');

  return {
    id: Math.random().toString(),
    safetyCategory: data.riskCategory,
    truthCategory: 'UNVERIFIED',
    topic: 'general',
    type: 'link',
    reasons: data.triggers || [],
    recommendation: data.explanation || '',
    input: url,
    timestamp: new Date()
  };
}

export async function scanContent(text: string): Promise<ScanResultData> {
  const data = await genericGeminiScan(text, 'Raw Text/Message Content');
  return {
    id: Math.random().toString(),
    safetyCategory: data.riskCategory,
    truthCategory: 'UNVERIFIED',
    topic: 'general',
    type: 'text',
    reasons: data.triggers || [],
    recommendation: data.explanation || '',
    input: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
    timestamp: new Date()
  };
}

export async function checkFileScan(file: File): Promise<ScanResultData> {
  const data = await genericGeminiScan(`File Uploaded: ${file.name}, Size: ${file.size}, Type: ${file.type}`, 'File Scan Mockup');
  return {
    id: Math.random().toString(),
    safetyCategory: data.riskCategory,
    truthCategory: 'UNVERIFIED',
    topic: 'general',
    type: 'news',
    reasons: data.triggers || [],
    recommendation: data.explanation || '',
    input: "[Image Uploaded]",
    timestamp: new Date()
  };
}

// Global Demo Local Data
export const mockRecentScans: ScanResultData[] = [
  {
    id: '1',
    safetyCategory: 'DANGEROUS',
    truthCategory: 'HIGH_RISK_CLAIM',
    topic: 'finance',
    type: 'link',
    reasons: ['Domain impersonation', 'Self-signed SSL', 'Suspicious tracking'],
    recommendation: 'Do not enter passwords or OTPs here.',
    input: 'https://secure-banklogin.xyz/verify',
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: '2',
    safetyCategory: 'SAFE',
    truthCategory: 'LIKELY_SAFE',
    topic: 'general',
    type: 'link',
    reasons: ['Verified source.', 'Known global company.'],
    recommendation: 'This site is verified as highly safe.',
    input: 'https://en.wikipedia.org/wiki/Phishing',
    timestamp: new Date(Date.now() - 1500000),
  }
];
