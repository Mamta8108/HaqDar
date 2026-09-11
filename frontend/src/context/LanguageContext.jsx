import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    brand: 'Haqdar',
    tagline: 'Our Work. Our Wage. Our Proof.',
    worker: 'Worker',
    employer: 'Employer',
    logWork: 'Log Workday',
    passbook: 'My Passbook',
    register: 'Register',
    confirmedDays: 'Confirmed Days',
    totalEarned: 'Total Earned',
    wagePerDay: 'Agreed Wage (₹)',
    workDate: 'Date of Work',
    note: 'Job Description (Optional)',
    submitEntry: 'Record on Ledger',
    confirmOtp: 'Enter Verification Code',
    voicePrompt: 'Listen Summary',
    tamperAlert: 'Mathematical Proof Verified (SHA-256 Intact)',
    tamperFail: 'Tampering Detected in Records!'
  },
  hi: {
    brand: 'हकदार',
    tagline: 'हमारा काम। हमारा दाम। हमारा प्रमाण।',
    worker: 'मज़दूर / कामगार',
    employer: 'ठेकेदार / मालिक',
    logWork: 'काम दर्ज करें',
    passbook: 'मेरी पासबुक',
    register: 'नया खाता',
    confirmedDays: 'सत्यापित दिन',
    totalEarned: 'कुल कमाई',
    wagePerDay: 'तय दिहाड़ी (₹)',
    workDate: 'काम की तारीख',
    note: 'काम का विवरण',
    submitEntry: 'खाते में जोड़ें',
    confirmOtp: 'ओटीपी सत्यापित करें',
    voicePrompt: 'आवाज़ में सुनें',
    tamperAlert: 'डिजिटल मुहर सुरक्षित है (कोई छेड़छाड़ नहीं)',
    tamperFail: 'रिकॉर्ड में छेड़छाड़ पाई गई!'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('hi'); // Default Hindi for accessibility

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);