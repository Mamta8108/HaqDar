const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['worker', 'employer'],
      required: [true, 'Role must be worker or employer'],
    },
    businessName: {
      type: String,
      trim: true,
      default: '',
    },
    skillType: {
      type: String,
      trim: true,
      default: 'General Labor',
    },
    preferredLanguage: {
      type: String,
      enum: ['en', 'hi'],
      default: 'hi',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);