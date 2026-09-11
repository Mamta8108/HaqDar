import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Auth & Users
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (phone) => API.post('/auth/login', { phone });
export const getWorkers = () => API.get('/auth/workers');
export const getEmployers = () => API.get('/auth/employers');

// Ledger & Cryptographic Chain
export const logWorkday = (entryData) => API.post('/ledger/entry', entryData);
export const confirmOtp = (data) => API.post('/ledger/confirm', data);
export const getWorkerPassbook = (workerId) => API.get(`/ledger/passbook/${workerId}`);
export const triggerTamperTest = (data) => API.post('/ledger/tamper-test', data);
export const simulate24Hours = () => API.post('/ledger/simulate-24h');
export const repairWorkerChain = (workerId) => API.post(`/ledger/repair-chain/${workerId}`);

export default API;