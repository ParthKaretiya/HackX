import { ScanResultData } from '@/types/scan';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

async function fetchFromBackend(endpoint: string, options: RequestInit = {}) {
  const userId = getUserId();
  const headers = {
    'Content-Type': 'application/json',
    'x-user-id': userId,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function scanLink(url: string): Promise<ScanResultData> {
  const data = await fetchFromBackend('/scan', {
    method: 'POST',
    body: JSON.stringify({ input: url, type: 'link' }),
  });

  return {
    id: data._id,
    safetyCategory: data.riskCategory,
    truthCategory: 'UNVERIFIED',
    topic: 'general',
    type: 'link',
    reasons: data.triggers || [],
    recommendation: data.explanation || '',
    input: url,
    timestamp: new Date(data.createdAt)
  };
}

export async function scanContent(text: string): Promise<ScanResultData> {
  const data = await fetchFromBackend('/scan', {
    method: 'POST',
    body: JSON.stringify({ input: text, type: 'text' }),
  });

  return {
    id: data._id,
    safetyCategory: data.riskCategory,
    truthCategory: 'UNVERIFIED',
    topic: 'general',
    type: 'text',
    reasons: data.triggers || [],
    recommendation: data.explanation || '',
    input: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
    timestamp: new Date(data.createdAt)
  };
}

export async function checkFileScan(file: File): Promise<ScanResultData> {
  // For now, mocking image scan since backend doesn't handle multipart yet
  // But we can send the filename and size as text to analyze
  const data = await fetchFromBackend('/scan', {
    method: 'POST',
    body: JSON.stringify({ 
      input: `Image File: ${file.name}, Size: ${file.size} bytes`, 
      type: 'text' 
    }),
  });

  return {
    id: data._id,
    safetyCategory: data.riskCategory,
    truthCategory: 'UNVERIFIED',
    topic: 'general',
    type: 'news',
    reasons: data.triggers || [],
    recommendation: data.explanation || '',
    input: "[Image Uploaded]",
    timestamp: new Date(data.createdAt)
  };
}

// Parent/Child API calls
export async function getParentKey() {
  return fetchFromBackend('/parent/key');
}

export async function getChildren() {
  return fetchFromBackend('/parent/children');
}

export async function getParentScans() {
  return fetchFromBackend('/parent/scans');
}

export async function linkChildToParent(parentKey: string) {
  return fetchFromBackend('/child/link', {
    method: 'POST',
    body: JSON.stringify({ parentKey }),
  });
}

export async function getSafetyStatus() {
  return fetchFromBackend('/safety-status');
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
