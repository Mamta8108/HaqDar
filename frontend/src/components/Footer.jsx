import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Heart, Lock, CheckCircle2 } from 'lucide-react';

const Footer = ({ setActiveTab }) => {
  const { lang, t } = useLanguage();

  return (
    <footer
      style={{
        marginTop: 48,
        background: '#F1F3F7',
        color: '#4A5568',
        borderTop: '1px solid #DCE2EC',
        padding: '30px 16px 20px 16px',
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        {/* Brand & Links Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 18,
          }}
        >
          {/* Brand & Socials */}
          <div style={{ maxWidth: 340 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: '#C28800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck color="#FFFFFF" size={15} strokeWidth={2.4} />
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#1F2E4A' }}>{t.brand}</span>
            </div>

            <p style={{ fontSize: 12, lineHeight: 1.5, color: '#64748B', margin: 0 }}>
              {lang === 'hi'
                ? 'असंगठित श्रमिकों के कार्य और पारिश्रमिक का क्रिप्टोग्राफ़िक सत्यापन तंत्र।'
                : 'Cryptographic consensus and wage verification protocol for informal labor.'}
            </p>

            {/* Small Compact Social Link Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  color: '#4A5568',
                  textDecoration: 'none',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 4,
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  transition: 'background 0.15s ease',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                GitHub
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  color: '#9D174D',
                  textDecoration: 'none',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 4,
                  border: '1px solid #FBCFE8',
                  background: '#FDF2F8',
                  transition: 'background 0.15s ease',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#C28800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {lang === 'hi' ? 'नेविगेशन' : 'Navigation'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, fontSize: 12 }}>
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                style={{ background: 'none', border: 'none', color: '#4A5568', padding: 0, textAlign: 'left', cursor: 'pointer', fontWeight: 500 }}
              >
                {lang === 'hi' ? '• मुख्य पृष्ठ' : '• Home'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                style={{ background: 'none', border: 'none', color: '#4A5568', padding: 0, textAlign: 'left', cursor: 'pointer', fontWeight: 500 }}
              >
                {lang === 'hi' ? '• खाता पंजीकरण' : '• Register'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('passbook')}
                style={{ background: 'none', border: 'none', color: '#4A5568', padding: 0, textAlign: 'left', cursor: 'pointer', fontWeight: 500 }}
              >
                {lang === 'hi' ? '• पासबुक' : '• Passbook'}
              </button>
            </div>
          </div>
        </div>

        {/* Security Badge in Light Slate/Gray */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #DCE2EC',
            borderRadius: 6,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 6,
            fontSize: 11,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#334155' }}>
            <Lock size={12} color="#C28800" />
            <span>SHA-256 Ledger Chaining & Dual OTP Handshake</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#16A34A', fontWeight: 600 }}>
            <CheckCircle2 size={12} />
            <span>Active</span>
          </div>
        </div>

        {/* Bottom Credits */}
        <div
          style={{
            borderTop: '1px solid #DCE2EC',
            paddingTop: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 6,
            fontSize: 11,
            color: '#8A99AD',
          }}
        >
          <div>© 2026 Haqdar. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>Labor Dignity & Empowerment</span>
            <Heart size={11} color="#EF4444" fill="#EF4444" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;