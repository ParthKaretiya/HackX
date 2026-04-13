import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "PulseGuard",
      "home": "Home",
      "scanner": "Scanner",
      "history": "History",
      "family": "Family",
      "cyber_cell": "Cyber Cell",
      "profile": "Profile",
      "login": "Login",
      "logout": "Logout",
      "scan_now": "Scan Now",
      "hero_title": "Absolute Security.",
      "hero_subtitle": "Zero Anxiety.",
      "hero_desc": "Deploy deep-layer neural analysis on any URL, message, or screenshot. Extract the truth instantaneously.",
      "safety_score": "Safety Score",
      "recent_scans": "Recent Scans",
      "risk_safe": "Safe",
      "risk_suspicious": "Suspicious",
      "risk_dangerous": "Dangerous",
    }
  },
  hi: {
    translation: {
      "app_name": "पल्सगार्ड",
      "home": "मुख्य पृष्ठ",
      "scanner": "स्कैनर",
      "history": "इतिहास",
      "family": "परिवार",
      "cyber_cell": "साइबर सेल",
      "profile": "प्रोफ़ाइल",
      "login": "लॉगिन",
      "logout": "लॉगआउट",
      "scan_now": "अभी स्कैन करें",
      "hero_title": "पूर्ण सुरक्षा।",
      "hero_subtitle": "शून्य चिंता।",
      "hero_desc": "किसी भी यूआरएल, संदेश या स्क्रीनशॉट पर गहरी तंत्रिका विश्लेषण तैनात करें। सच्चाई को तुरंत निकालें।",
      "safety_score": "सुरक्षा स्कोर",
      "recent_scans": "हाल के स्कैन",
      "risk_safe": "सुरक्षित",
      "risk_suspicious": "संदिग्ध",
      "risk_dangerous": "खतरनाक",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
