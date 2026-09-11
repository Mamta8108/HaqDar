import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, KeyRound, QrCode, Lock, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

const HomeView = ({ setActiveTab }) => {
  const { lang, t } = useLanguage();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Hero Banner with Worker Visual & Identity */}
      <div
        style={{
          position: 'relative',
          borderRadius: 16,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #101c33 0%, #1f2e4a 100%)',
          color: '#FFFFFF',
          padding: '28px 24px',
          boxShadow: '0 8px 24px rgba(31, 46, 74, 0.18)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          {/* Custom Modern Brand Logo */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #D4AF37 0%, #C28800 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(194, 136, 0, 0.35)',
            }}
          >
            <ShieldCheck color="#FFFFFF" size={32} strokeWidth={2.4} />
          </div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>
              {t.brand}
            </h1>
            <p style={{ margin: 0, color: '#FFD166', fontSize: 13, fontWeight: 600 }}>
              {lang === 'hi' ? 'श्रमिक सशक्तिकरण और वेतन सुरक्षा तंत्र' : 'Cryptographic Wage & Labor Proof Protocol'}
            </p>
          </div>
        </div>

        <p style={{ fontSize: 14, color: '#D6E0F5', lineHeight: 1.6, maxWidth: 540, marginBottom: 20 }}>
          {lang === 'hi'
            ? 'असंगठित क्षेत्र के कामगारों के लिए एक पारदर्शी डिजिटल बहीखाता। हर कार्य दिवस पर दोनों पक्षों की सहमति (OTP) और अपरिवर्तनीय SHA-256 सुरक्षा मुहर के साथ वेतन व श्रम का प्रमाणित रिकॉर्ड।'
            : 'An immutable proof-of-work protocol for informal daily-wage workers. Guaranteed by dual-party OTP consensus, SHA-256 ledger chaining, and verifiable income certificates.'}
        </p>

        {/* Hero Quick Action Buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            style={{
              background: '#C28800',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              padding: '10px 18px',
              fontSize: 14,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(194, 136, 0, 0.3)',
            }}
          >
            {lang === 'hi' ? 'नया खाता बनाएं' : 'Get Started (Register)'}
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('passbook')}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: 8,
              padding: '10px 18px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {lang === 'hi' ? 'मेरी पासबुक देखें' : 'View Passbook'}
          </button>
        </div>
      </div>

      {/* Hero Visual Card Representing Workers */}
      <div
        className="card"
        style={{
          display: 'flex',
          gap: 20,
          alignItems: 'center',
          background: '#FFFFFF',
          borderLeft: '5px solid #C28800',
          padding: 20,
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #FFF5DC 0%, #FEE8B6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid rgba(194, 136, 0, 0.3)',
          }}
        >
          {/* Stylized Hard Hat & Labor Graphic */}
          <span style={{ fontSize: 44 }} role="img" aria-label="Worker">👷</span>
        </div>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1F2E4A', marginBottom: 6 }}>
            {lang === 'hi' ? 'हमारा काम। हमारा दाम। हमारा प्रमाण।' : 'Our Work. Our Wage. Our Proof.'}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0 }}>
            {lang === 'hi'
              ? 'बिना किसी कागजी पर्ची या विवाद के, अपने हर दिन की मेहनत को सुरक्षित रखें और ऋण व सरकारी योजनाओं के लिए मान्य डिजिटल प्रमाणपत्र पाएं।'
              : 'Convert informal shifts into institutional income proof acceptable by microfinance lenders, banks, and welfare boards.'}
          </p>
        </div>
      </div>

      {/* Core Protocol Pillars (3 Features Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14 }}>
        <div className="card" style={{ margin: 0, padding: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#E5F6EC',
              color: '#2B7A4B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <KeyRound size={20} />
          </div>
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: '#1F2E4A' }}>
            {lang === 'hi' ? 'द्विपक्षीय OTP सहमति' : 'Dual-Party OTP'}
          </h4>
          <p style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.4, margin: 0 }}>
            {lang === 'hi'
              ? 'मज़दूर और ठेकेदार दोनों द्वारा स्वतंत्र OTP दर्ज करने पर ही शिफ्ट प्रमाणित होती है।'
              : 'Shifts lock only when both the worker and contractor confirm their respective OTPs.'}
          </p>
        </div>

        <div className="card" style={{ margin: 0, padding: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#FFF5DC',
              color: '#C28800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <Lock size={20} />
          </div>
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: '#1F2E4A' }}>
            {lang === 'hi' ? 'अपरिवर्तनीय SHA-256' : 'SHA-256 Tamper-Proof'}
          </h4>
          <p style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.4, margin: 0 }}>
            {lang === 'hi'
              ? 'प्रत्येक प्रविष्टि पिछली प्रविष्टि से गणितीय रूप से जुड़ी होती है। कोई भी तारीख या वेतन नहीं बदल सकता।'
              : 'Continuous hash-chain linking prevents retroactively altering wages or dates.'}
          </p>
        </div>

        <div className="card" style={{ margin: 0, padding: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#F0F4FF',
              color: '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <QrCode size={20} />
          </div>
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: '#1F2E4A' }}>
            {lang === 'hi' ? 'QR व PDF प्रमाणपत्र' : 'Verifiable Certificate'}
          </h4>
          <p style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.4, margin: 0 }}>
            {lang === 'hi'
              ? 'बैंकों और सरकारी कार्यालयों के लिए आधिकारिक मुहर युक्त आय प्रमाणपत्र डाउनलोड करें।'
              : 'Instant PDF export with embedded verification QR code for micro-loans.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;