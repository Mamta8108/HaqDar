const mongoose = require('mongoose');

const LedgerEntrySchema = new mongoose.Schema(
  {
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    hoursWorked: {
      type: Number,
      default: 8,
      min: 1,
      max: 24,
    },
    agreedWage: {
      type: Number,
      required: [true, 'Agreed wage is mandatory'],
      min: 0,
    },
    workDescription: {
      type: String,
      trim: true,
      default: '',
    },

    // Dual-Consent Handshake State
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'unconfirmed', 'disputed'],
      default: 'pending',
      index: true,
    },
    workerOtp: {
      type: String,
      required: true,
    },
    employerOtp: {
      type: String,
      required: true,
    },
    workerConfirmed: {
      type: Boolean,
      default: false,
    },
    employerConfirmed: {
      type: Boolean,
      default: false,
    },
    confirmedAt: {
      type: Date,
    },

    // Cryptographic Chain Linkage
    prevHash: {
      type: String,
      required: true,
    },
    currentHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LedgerEntry', LedgerEntrySchema);