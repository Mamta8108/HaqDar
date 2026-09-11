import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Languages, Home } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { lang, toggleLang, t } = useLanguage();

  const navItems = [
    { id: 'home', label: lang === 'hi' ? 'मुख्य पृष्ठ' : 'Home' },
    { id: 'register', label: lang === 'hi' ? 'खाता' : 'Register' },
    { id: 'log', label: lang === 'hi' ? 'काम दर्ज' : 'Log Work' },
    { id: 'passbook', label: lang === 'hi' ? 'पासबुक' : 'Passbook' },
    { id: 'cert', label: lang === 'hi' ? 'प्रमाणपत्र' : 'Certificate' },
    { id: 'verify', label: lang === 'hi' ? 'जाँच' : 'Verify' },
  ];

  return (
    <header
      style={{
        background: '#1F2E4A',
        color: '#FFFFFF',
        padding: '10px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            onClick={() => setActiveTab('home')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #D4AF37 0%, #C28800 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(194, 136, 0, 0.4)',
              }}
            >
              <ShieldCheck color="#FFFFFF" size={24} strokeWidth={2.4} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.2 }}>
                {t.brand}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: '#B7C2DD',
                  letterSpacing: '0.02em',
                }}
              >
                {t.tagline}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleLang}
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 20,
              padding: '5px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <Languages size={14} />
            {lang === 'hi' ? 'English' : 'हिन्दी'}
          </button>
        </div>

        {/* Tab Navigation Pill Bar */}
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.06)',
            padding: 4,
            borderRadius: 10,
            gap: 4,
          }}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  flex: 1,
                  background: isActive ? '#C28800' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#B7C2DD',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 2px',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 12,
                  textAlign: 'center',
                  transition: 'all 0.15s ease-in-out',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;