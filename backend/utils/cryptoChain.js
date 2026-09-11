const crypto = require('crypto');

/**
 * Generates a deterministic SHA-256 hash for a ledger entry.
 * Fields must be normalized so recalculations are identical across servers.
 */
function calculateEntryHash({ workerId, employerId, date, hoursWorked, agreedWage, prevHash }) {
  // Normalize values
  const payload = JSON.stringify({
    workerId: workerId.toString(),
    employerId: employerId.toString(),
    date: new Date(date).toISOString().slice(0, 10), // YYYY-MM-DD
    hoursWorked: Number(hoursWorked || 8),
    agreedWage: Number(agreedWage),
    prevHash: String(prevHash)
  });

  return crypto.createHash('sha256').update(payload).digest('hex');
}

/**
 * Audits the sequential integrity of a worker's ledger entries.
 * Returns valid: true if intact, or flags the exact tampered entry.
 */
function auditWorkerChain(entries) {
  if (!entries || entries.length === 0) {
    return { valid: true, count: 0 };
  }

  let expectedPrevHash = 'GENESIS';

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    // 1. Recalculate hash from raw data to detect data edits
    const recalculated = calculateEntryHash({
      workerId: entry.workerId._id || entry.workerId,
      employerId: entry.employerId._id || entry.employerId,
      date: entry.date,
      hoursWorked: entry.hoursWorked,
      agreedWage: entry.agreedWage,
      prevHash: entry.prevHash
    });

    if (recalculated !== entry.currentHash) {
      return {
        valid: false,
        brokenAtEntryId: entry._id,
        brokenDate: entry.date,
        reason: 'DATA_TAMPERED: Entry contents do not match stored cryptographic hash.'
      };
    }

    // 2. Check that the link to the previous entry is unbroken
    if (entry.prevHash !== expectedPrevHash) {
      return {
        valid: false,
        brokenAtEntryId: entry._id,
        brokenDate: entry.date,
        reason: 'CHAIN_BROKEN: Entry does not link to previous record (entry missing or reordered).'
      };
    }

    expectedPrevHash = entry.currentHash;
  }

  return { valid: true, count: entries.length };
}

module.exports = {
  calculateEntryHash,
  auditWorkerChain
};