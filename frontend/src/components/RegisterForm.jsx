import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { registerUser } from '../services/api';
import { UserPlus } from 'lucide-react';

const RegisterForm = ({ onUserAdded }) => {
  const { t } = useLanguage();
  const [role, setRole] = useState('worker');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    try {
      await registerUser({ name, phone, role, businessName });
      setMsg(role === 'worker' ? '✓ मज़दूर खाता बन गया!' : '✓ ठेकेदार खाता बन गया!');
      setName('');
      setPhone('');
      setBusinessName('');
      if (onUserAdded) onUserAdded();
    } catch (err) {
      setMsg('✗ ' + (err.response?.data?.message || 'Error creating account'));
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setRole('worker')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: 8,
            border: 'none',
            background: role === 'worker' ? '#1F2E4A' : '#E5E7EB',
            color: role === 'worker' ? '#FFF' : '#374151',
            fontWeight: 600,
            fontSize: 14
          }}
        >
          {t.worker}
        </button>
        <button
          type="button"
          onClick={() => setRole('employer')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: 8,
            border: 'none',
            background: role === 'employer' ? '#1F2E4A' : '#E5E7EB',
            color: role === 'employer' ? '#FFF' : '#374151',
            fontWeight: 600,
            fontSize: 14
          }}
        >
          {t.employer}
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={{ fontSize: 13, color: 'var(--ink-soft)', display: 'block', marginBottom: 4 }}>
            {role === 'worker' ? 'पूरा नाम (Worker Name)' : 'मालिक/ठेकेदार का नाम'}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="उदा. रमेश कुमार / Rekha Devi"
            style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid var(--border)' }}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, color: 'var(--ink-soft)', display: 'block', marginBottom: 4 }}>
            मोबाइल नंबर (Phone Number)
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 9876543210"
            style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid var(--border)' }}
          />
        </div>

        {role === 'employer' && (
          <div>
            <label style={{ fontSize: 13, color: 'var(--ink-soft)', display: 'block', marginBottom: 4 }}>
              फर्म या साइट का नाम (Business/Site)
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="उदा. शर्मा कंस्ट्रक्शन"
              style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid var(--border)' }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{
            background: '#C28800',
            color: '#FFF',
            border: 'none',
            borderRadius: 8,
            padding: '12px',
            fontSize: 15,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 6
          }}
        >
          <UserPlus size={18} />
          {t.register}
        </button>
      </form>

      {msg && (
        <div style={{ marginTop: 12, padding: '10px', borderRadius: 6, background: '#F3F4F6', fontSize: 13, fontWeight: 500 }}>
          {msg}
        </div>
      )}
    </div>
  );
};

export default RegisterForm;