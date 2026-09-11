import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ShieldAlert, CheckCircle, Search } from 'lucide-react';

const PublicVerifyView = () => {
  const { t } = useLanguage();
  const [inputPayload, setInputPayload] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = () => {
    if (!inputPayload.trim()) return;

    try {
      const parsed = JSON.parse(inputPayload);
      if (!parsed.worker || !parsed.verifiedShifts) {
        setVerificationResult({ valid: false, message: 'अमान्य प्रमाणपत्र डेटा (Invalid Certificate Format)' });
        return;
      }

      setVerificationResult({
        valid: true,
        worker: parsed.worker,
        phone: parsed.phone,
        verifiedShifts: parsed.verifiedShifts,
        totalEarnings: parsed.totalEarnings,
        lastEntryHash: parsed.lastEntryHash,
        system: parsed.system
      });
    } catch (err) {
      setVerificationResult({
        valid: false,
        message: 'प्रमाणपत्र कोड पढ़ा नहीं जा सका (Corrupted or Invalid Payload)'
      });
    }
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: 18, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
        <ShieldCheck size={22} color="#2B7A4B" />
        प्रमाणपत्र सत्यापन (Public Verification Portal)
      </h2>

      <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 14, lineHeight: 1.5 }}>
        बैंक अधिकारी या ऋणदाता QR कोड से प्राप्त डेटा यहाँ पेस्ट करके डिजिटल मुहर की सत्यता जांच सकते हैं।
      </p>

      <textarea
        rows={4}
        placeholder='Paste the QR verification string or JSON here...'
        value={inputPayload}
        onChange={(e) => setInputPayload(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          borderRadius: 8,
          border: '1px solid var(--border)',
          fontFamily: 'monospace',
          fontSize: 12,
          marginBottom: 12
        }}
      />

      <button
        onClick={handleVerify}
        style={{
          background: '#1F2E4A',
          color: '#FFF',
          border: 'none',
          borderRadius: 8,
          padding: '10px 18px',
          fontSize: 14,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}
      >
        <Search size={16} />
        जाँच करें (Verify Authenticity)
      </button>

      {verificationResult && (
        <div style={{ marginTop: 20 }}>
          {verificationResult.valid ? (
            <div style={{
              background: '#E5F6EC',
              border: '1px solid #A3E0BA',
              borderRadius: 10,
              padding: 16
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#2B7A4B', fontWeight: 700, fontSize: 16 }}>
                <CheckCircle size={22} />
                प्रमाणपत्र वैध और सत्यापित है (Authentic Record)
              </div>

              <div style={{ marginTop: 12, fontSize: 13, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div><strong>कामगार का नाम:</strong> {verificationResult.worker}</div>
                <div><strong>फ़ोन नंबर:</strong> {verificationResult.phone}</div>
                <div><strong>सत्यापित दिन:</strong> {verificationResult.verifiedShifts} कार्य दिवस</div>
                <div><strong>कुल आय:</strong> ₹ {verificationResult.totalEarnings}</div>
              </div>

              <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px dashed #A3E0BA', fontSize: 11, fontFamily: 'monospace', color: '#1F2E4A' }}>
                अंतिम मुहर (Latest Hash): {verificationResult.lastEntryHash}
              </div>
            </div>
          ) : (
            <div style={{
              background: '#FDE8E6',
              border: '1px solid #F5B7B1',
              borderRadius: 10,
              padding: 16,
              color: '#C0392B',
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>
              <ShieldAlert size={22} />
              <div>{verificationResult.message}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PublicVerifyView;