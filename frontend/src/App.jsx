import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import RegisterForm from './components/RegisterForm';
import WorkLogger from './components/WorkLogger';
import PassbookView from './components/PassbookView';
import CertificateView from './components/CertificateView';
import PublicVerifyView from './components/PublicVerifyView';
import Footer from './components/Footer';
import { getWorkers, getEmployers } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [workers, setWorkers] = useState([]);
  const [employers, setEmployers] = useState([]);

  const loadUsers = async () => {
    try {
      const [wRes, eRes] = await Promise.all([getWorkers(), getEmployers()]);
      setWorkers(wRes.data.workers || []);
      setEmployers(eRes.data.employers || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container" style={{ marginTop: 16, flex: 1 }}>
        {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'register' && <RegisterForm onUserAdded={loadUsers} />}
        {activeTab === 'log' && (
          <WorkLogger workers={workers} employers={employers} onEntryLogged={loadUsers} />
        )}
        {activeTab === 'passbook' && <PassbookView workers={workers} />}
        {activeTab === 'cert' && <CertificateView workers={workers} />}
        {activeTab === 'verify' && <PublicVerifyView />}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;