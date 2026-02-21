import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

// Fast, cost-efficient model for scanning text and URLs
export const scannerModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
