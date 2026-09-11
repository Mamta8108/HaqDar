const LedgerEntry = require('../models/LedgerEntry');
const User = require('../models/User');
const { calculateEntryHash, auditWorkerChain } = require('../utils/cryptoChain');

// Helper to generate a 6-digit OTP
function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// 1. Log a new workday and link it to the worker's previous hash
exports.createWorkdayEntry = async (req, res) => {
  try {
    const { workerId, employerId, date, hoursWorked, agreedWage, workDescription } = req.body;

    // Validate parties
    const worker = await User.findById(workerId);
    const employer = await User.findById(employerId);

    if (!worker || !employer) {
      return res.status(404).json({ success: false, message: 'Worker or Employer not found.' });
    }

    // Find the latest entry for this worker to link the chain
    const lastEntry = await LedgerEntry.findOne({ workerId }).sort({ createdAt: -1 });
    const prevHash = lastEntry ? lastEntry.currentHash : 'GENESIS';

    // Calculate cryptographic hash
    const currentHash = calculateEntryHash({
      workerId,
      employerId,
      date,
      hoursWorked,
      agreedWage,
      prevHash
    });

    // Generate dual OTPs
    const workerOtp = generateOtp();
    const employerOtp = generateOtp();

    const entry = await LedgerEntry.create({
      workerId,
      employerId,
      date,
      hoursWorked: hoursWorked || 8,
      agreedWage,
      workDescription: workDescription || '',
      workerOtp,
      employerOtp,
      prevHash,
      currentHash,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Workday logged successfully. Dual OTPs generated.',
      entry
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Dual-Consent OTP Verification
exports.verifyOtp = async (req, res) => {
  try {
    const { entryId, role, otp } = req.body;

    const entry = await LedgerEntry.findById(entryId);
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Ledger entry not found.' });
    }

    if (role === 'worker') {
      if (entry.workerOtp !== String(otp).trim()) {
        return res.status(400).json({ success: false, message: 'Invalid Worker OTP.' });
      }
      entry.workerConfirmed = true;
    } else if (role === 'employer') {
      if (entry.employerOtp !== String(otp).trim()) {
        return res.status(400).json({ success: false, message: 'Invalid Employer OTP.' });
      }
      entry.employerConfirmed = true;
    } else {
      return res.status(400).json({ success: false, message: 'Role must be worker or employer.' });
    }

    // If both confirmed, mark the ledger entry as officially CONFIRMED
    if (entry.workerConfirmed && entry.employerConfirmed) {
      entry.status = 'confirmed';
      entry.confirmedAt = new Date();
    }

    await entry.save();

    res.status(200).json({
      success: true,
      status: entry.status,
      workerConfirmed: entry.workerConfirmed,
      employerConfirmed: entry.employerConfirmed
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Get Worker Passbook & Audit Ledger Integrity
exports.getWorkerPassbook = async (req, res) => {
  try {
    const { workerId } = req.params;

    // Fetch all entries for this worker in chronological sequence
    const entries = await LedgerEntry.find({ workerId })
      .populate('employerId', 'name businessName phone')
      .sort({ createdAt: 1 });

    // Run the crypto audit over the entire chain
    const audit = auditWorkerChain(entries);

    res.status(200).json({
      success: true,
      count: entries.length,
      isChainIntact: audit.valid,
      auditReport: audit,
      entries
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. Simulate Tamper (Test endpoint to demonstrate tamper detection to teachers/reviewers)
exports.tamperTestEntry = async (req, res) => {
  try {
    const { entryId, fakeWage } = req.body;

    // Direct database mutation without recomputing currentHash
    await LedgerEntry.updateOne(
      { _id: entryId },
      { $set: { agreedWage: Number(fakeWage) } }
    );

    res.status(200).json({
      success: true,
      message: 'Wage altered directly in DB without recalculating hash. Run audit to test detection.'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 5. Check and expire entries older than 24 hours without employer confirmation
exports.expireUnconfirmedEntries = async (req, res) => {
  try {
    // Look for entries older than 24 hours (or simulation timestamp)
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const result = await LedgerEntry.updateMany(
      {
        status: 'pending',
        employerConfirmed: false,
        createdAt: { $lte: cutoffTime },
      },
      {
        $set: { status: 'unconfirmed' },
      }
    );

    res.status(200).json({
      success: true,
      message: `Processed expired shifts. Flagged ${result.modifiedCount} entries as unconfirmed.`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 6. Fast-forward simulation (instantly marks all pending entries older than 0 seconds as unconfirmed)
exports.simulateFastForward24h = async (req, res) => {
  try {
    const result = await LedgerEntry.updateMany(
      {
        status: 'pending',
        employerConfirmed: false,
      },
      {
        $set: { status: 'unconfirmed' },
      }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} shift(s) timed out without contractor confirmation and are now flagged as unconfirmed disputes.`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 7. Chain Integrity Repair (Recalculate genuine SHA-256 hashes)
exports.repairChain = async (req, res) => {
  try {
    const { workerId } = req.params;
    const entries = await LedgerEntry.find({ workerId }).sort({ createdAt: 1 });

    let currentPrev = 'GENESIS';
    for (const entry of entries) {
      const genuineHash = calculateEntryHash({
        workerId: entry.workerId.toString(),
        employerId: entry.employerId.toString(),
        date: entry.date,
        hoursWorked: entry.hoursWorked || 8,
        agreedWage: entry.agreedWage,
        prevHash: currentPrev,
      });

      entry.prevHash = currentPrev;
      entry.currentHash = genuineHash;
      await entry.save();
      currentPrev = genuineHash;
    }

    res.status(200).json({
      success: true,
      message: 'Cryptographic chain recalculated and restored to valid state.',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};