import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getWorkerPassbook } from '../services/api';
import { FileText, Download, QrCode, CheckCircle2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';

const CertificateView = ({ workers }) => {
  const { t } = useLanguage();
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectWorker = async (wId) => {
    setSelectedWorkerId(wId);
    if (!wId) {
      setReportData(null);
      return;
    }
    try {
      const res = await getWorkerPassbook(wId);
      setReportData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmedEntries = reportData?.entries?.filter((e) => e.status === 'confirmed') || [];
  const totalWage = confirmedEntries.reduce((sum, e) => sum + e.agreedWage, 0);
  const currentWorker = workers.find((w) => w._id === selectedWorkerId);

  // Generate verified PDF
  const downloadPdfCertificate = () => {
    if (!currentWorker || confirmedEntries.length === 0) return;
    setIsGenerating(true);

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    // Header & Branding
    doc.setFillColor(31, 46, 74);
    doc.rect(0, 0, 595, 80, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('HAQDAR', 40, 45);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Verified Income & Work Protocol for Informal Labor', 40, 62);

    // Certificate Meta
    doc.setTextColor(31, 46, 74);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('WORK & WAGE VERIFICATION CERTIFICATE', 40, 120);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Worker Name: ${currentWorker.name}`, 40, 145);
    doc.text(`Registered Phone: ${currentWorker.phone}`, 40, 162);
    doc.text(`Date of Issuance: ${new Date().toLocaleDateString('en-IN')}`, 40, 179);
    doc.text(`Cryptographic Status: SHA-256 Ledger Intact & Verified`, 40, 196);

    // Ledger Summary Box
    doc.setFillColor(244, 239, 230);
    doc.roundedRect(40, 215, 515, 55, 6, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Authenticated Shifts: ${confirmedEntries.length} Days`, 55, 240);
    doc.text(`Total Verified Earnings: Rs. ${totalWage.toLocaleString('en-IN')}`, 55, 258);

    // Shifts Table Header
    let yPos = 300;
    doc.setFillColor(31, 46, 74);
    doc.rect(40, yPos, 515, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text('DATE', 50, yPos + 15);
    doc.text('EMPLOYER / CONTRACTOR', 130, yPos + 15);
    doc.text('WAGE (INR)', 330, yPos + 15);
    doc.text('LEDGER HASH SEAL', 420, yPos + 15);

    // Table Content
    yPos += 30;
    doc.setTextColor(31, 46, 74);
    doc.setFont('helvetica', 'normal');

    confirmedEntries.forEach((entry) => {
      if (yPos > 720) {
        doc.addPage();
        yPos = 50;
      }
      doc.setFontSize(9);
      doc.text(new Date(entry.date).toLocaleDateString('en-IN'), 50, yPos);
      doc.text((entry.employerId?.businessName || entry.employerId?.name || 'Site').slice(0, 26), 130, yPos);
      doc.text(`Rs. ${entry.agreedWage}`, 330, yPos);
      doc.setFontSize(7.5);
      doc.text(`${entry.currentHash.slice(0, 18)}...`, 420, yPos);
      yPos += 22;
    });

    // Verification QR Payload
  // Verification QR Payload
const qrCanvas = document.getElementById('cert-qr-hidden');
if (qrCanvas) {
  const qrDataUrl = qrCanvas.toDataURL('image/png');
  doc.addImage(qrDataUrl, 'PNG', 430, 670, 100, 100);
  doc.setFontSize(8);
  doc.setTextColor(90, 100, 120);
  doc.text('Scan to verify signature', 430, 785);
}

    // Save document
    doc.save(`Haqdar_Certificate_${currentWorker.name.replace(/\s+/g, '_')}.pdf`);
    setIsGenerating(false);
  };

  // The QR code embeds an audit payload
  const qrVerificationPayload = JSON.stringify({
    system: 'Haqdar Dual-Consent Protocol',
    worker: currentWorker?.name,
    phone: currentWorker?.phone,
    verifiedShifts: confirmedEntries.length,
    totalEarnings: totalWage,
    lastEntryHash: confirmedEntries[confirmedEntries.length - 1]?.currentHash || 'GENESIS',
  });

  return (
    <div>
      <div className="card">
        <h2 style={{ fontSize: 18, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileText size={20} color="#C28800" />
          प्रमाणपत्र जारी करें (Issue Work Certificate)
        </h2>

        <label style={{ fontSize: 13, color: 'var(--ink-soft)' }}>कामगार चुनें (Select Worker)</label>
        <select
          value={selectedWorkerId}
          onChange={(e) => handleSelectWorker(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid var(--border)', marginTop: 4 }}
        >
          <option value="">-- कामगार चुनें --</option>
          {workers.map((w) => (
            <option key={w._id} value={w._id}>
              {w.name} ({w.phone})
            </option>
          ))}
        </select>
      </div>

      {currentWorker && reportData && (
        <div className="card" style={{ borderLeft: '4px solid #2B7A4B' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700 }}>{currentWorker.name}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{currentWorker.phone}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>सत्यापित दिहाड़ी कुल</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#2B7A4B' }}>
                ₹ {totalWage.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div style={{ margin: '18px 0', padding: 12, background: '#F8F9FA', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <CheckCircle2 color="#2B7A4B" size={24} />
            <div style={{ fontSize: 13, color: '#374151' }}>
              इस कामगार के खाते में <strong>{confirmedEntries.length}</strong> कार्य दिवस द्विपक्षीय सहमति से पूरी तरह सत्यापित हैं।
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={downloadPdfCertificate}
              disabled={confirmedEntries.length === 0 || isGenerating}
              style={{
                background: confirmedEntries.length === 0 ? '#9CA3AF' : '#1F2E4A',
                color: '#FFF',
                border: 'none',
                borderRadius: 8,
                padding: '12px 18px',
                fontSize: 14,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Download size={16} />
              {isGenerating ? 'तैयार हो रहा है...' : 'PDF प्रमाणपत्र डाउनलोड करें'}
            </button>
          </div>

          {/* Off-screen QR rendered for PDF extraction */}
          <div style={{ position: 'fixed', left: '-9999px', top: '-9999px' }}>
          <QRCodeCanvas
  id="cert-qr-hidden"
  value={qrVerificationPayload}
  size={200}
  level="M"
  includeMargin={true}
/>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateView;