import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { logWorkday } from '../services/api';
import { Calendar, CheckCircle } from 'lucide-react';

const WorkLogger = ({ workers, employers, onEntryLogged }) => {
  const { t } = useLanguage();
  const [workerId, setWorkerId] = useState('');
  const [employerId, setEmployerId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [wage, setWage] = useState('');
  const [note, setNote] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleLog = async (e) => {
    e.preventDefault();
    if (!workerId || !employerId || !wage) return;

    try {
      const res = await logWorkday({
        workerId,
        employerId,
        date,
        agreedWage: wage,
        workDescription: note
      });
      setStatusMsg(`✓ काम दर्ज हुआ! दोनों पक्षों को OTP जारी किए गए।`);
      setWage('');
      setNote('');
      if (onEntryLogged) onEntryLogged();
    } catch (err) {
      setStatusMsg('✗ ' + (err.response?.data?.message || 'Failed to log'));
    }
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: 18, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Calendar size={20} color="#C28800" />
        {t.logWork}
      </h2>

      <form onSubmit={handleLog} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{t.worker}</label>
          <select
            required
            value={workerId}
            onChange={(e) => setWorkerId(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid var(--border)' }}
          >
            <option value="">-- कामगार चुनें --</option>
            {workers.map((w) => (
              <option key={w._id} value={w._id}>{w.name} ({w.phone})</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{t.employer}</label>
          <select
            required
            value={employerId}
            onChange={(e) => setEmployerId(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid var(--border)' }}
          >
            <option value="">-- ठेकेदार/मालिक चुनें --</option>
            {employers.map((e) => (
              <option key={e._id} value={e._id}>{e.name} - {e.businessName || 'General'}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{t.workDate}</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: '100%', padding: '9px', borderRadius: 6, border: '1px solid var(--border)' }}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{t.wagePerDay}</label>
            <input
              type="number"
              required
              placeholder="₹ 600"
              value={wage}
              onChange={(e) => setWage(e.target.value)}
              style={{ width: '100%', padding: '9px', borderRadius: 6, border: '1px solid var(--border)' }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{t.note}</label>
          <input
            type="text"
            placeholder="उदा. प्लास्टर कार्य, पूरा दिन"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ width: '100%', padding: '9px', borderRadius: 6, border: '1px solid var(--border)' }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: '#1F2E4A',
            color: '#FFF',
            border: 'none',
            borderRadius: 8,
            padding: '12px',
            fontSize: 15,
            fontWeight: 600,
            marginTop: 6
          }}
        >
          {t.submitEntry}
        </button>
      </form>

      {statusMsg && (
        <div style={{ marginTop: 12, padding: '10px', borderRadius: 6, background: '#E5F6EC', color: '#2B7A4B', fontSize: 13 }}>
          {statusMsg}
        </div>
      )}
    </div>
  );
};

export default WorkLogger;