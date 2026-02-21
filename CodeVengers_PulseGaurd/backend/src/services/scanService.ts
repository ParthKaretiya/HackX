import { scannerModel } from "./geminiClient";
import { ScanResult, RiskCategory } from "../types/scan";

const systemInstructions = `
You are a cyber safety risk engine designed to protect Indian users and families (including Tier-2/Tier-3 cities).
Your output must be in simple English, clear, and non-technical.

You will receive either a URL (link) or a message text.
You must:
1. Detect scam/phishing/fraud patterns (e.g., OTP, KYC, lottery, fake bank, money urgency).
2. Consider that some domains are more trusted (e.g., amazon.in, flipkart.com, onlinesbi.sbi, uidai.gov.in) but never blindly trust any site if the context or structure is suspicious.

Analyze the given input and return a JSON object with exactly this schema:
{
  "riskCategory": "SAFE" | "SUSPICIOUS" | "DANGEROUS",
  "riskScore": number (0-100, where higher is more dangerous),
  "explanation": "A very detailed, large paragraph (at least 6-8 sentences) explaining exactly what the threat is, how it works, what the attackers are trying to do, and why the user should be careful. Make it highly descriptive and educational so the user fully understands the risk.",
  "triggers": ["array of 1-4 short phrases that made you think this"],
  "suggestions": ["array of 1-3 short pieces of safety advice for the user"]
}

Rules for riskCategory:
- SAFE = Normal content, highly trusted domains with no major scam hints.
- SUSPICIOUS = Unknown domains or slightly risky signals (e.g. slight urgency).
- DANGEROUS = Clear scam/phishing/attack patterns, fake apps, or dangerous urgency.

Important:
- Answer ONLY with valid JSON. Do NOT wrap it in markdown block quotes like \`\`\`json. 
- Do NOT output any extra text.
`;

export async function analyzeRiskWithGemini(input: string, type: "link" | "text"): Promise<ScanResult> {
    const prompt = `
    ${systemInstructions}

    Here is the input to analyze.
    Type: ${type}
    Input:
    ${input}
  `;

    try {
        const result = await scannerModel.generateContent(prompt);
        const responseText = result.response.text().trim();

        // Attempt to strip potential markdown formatting if the model still adds it
        const cleanText = responseText.replace(/^```json/i, "").replace(/```$/i, "").trim();

        const parsed = JSON.parse(cleanText);

        // Basic validation
        const riskCategory = ["SAFE", "SUSPICIOUS", "DANGEROUS"].includes(parsed.riskCategory)
            ? parsed.riskCategory as RiskCategory
            : "SUSPICIOUS";

        const riskScore = Math.max(0, Math.min(100, Number(parsed.riskScore) || 50));
        const explanation = typeof parsed.explanation === "string" ? parsed.explanation : "We could not fully analyze this content.";
        const triggers = Array.isArray(parsed.triggers) ? parsed.triggers : [];
        const suggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];

        return {
            riskCategory,
            riskScore,
            explanation,
            triggers,
            suggestions,
        };
    } catch (error) {
        console.error("Gemini analysis error:", error);
        // Returning fallback result instead of crashing
        return {
            riskCategory: "SUSPICIOUS",
            riskScore: 50,
            explanation: "We could not fully analyze this content. Please be cautious. This could be a potential threat or just an error in our automated scanning system. If this is a link, avoid downloading attachments or submitting personal information. Always verify information directly with the official source.",
            triggers: ["MODEL_PARSE_ERROR"],
            suggestions: ["Do not share OTP or passwords.", "Verify this link with your bank or service provider."]
        };
    }
}
