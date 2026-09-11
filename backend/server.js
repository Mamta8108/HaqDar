const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const ledgerRoutes = require('./routes/ledgerRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/ledger', ledgerRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Haqdar Core API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Server] Haqdar running on http://localhost:${PORT}`);
});