const User = require('../models/User');

// Register a new Worker or Employer
exports.registerUser = async (req, res) => {
  try {
    const { name, phone, role, businessName, skillType, preferredLanguage } = req.body;

    if (!name || !phone || !role) {
      return res.status(400).json({ success: false, message: 'Name, phone, and role are required.' });
    }

    // Check if phone number is already registered
    const existingUser = await User.findOne({ phone: phone.trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'This phone number is already registered. Please log in directly.'
      });
    }

    const newUser = await User.create({
      name: name.trim(),
      phone: phone.trim(),
      role,
      businessName: businessName ? businessName.trim() : '',
      skillType: skillType || 'General Labor',
      preferredLanguage: preferredLanguage || 'hi'
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful.',
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Login via Phone Number
exports.loginUser = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    const user = await User.findOne({ phone: phone.trim() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this phone number. Please register first.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all workers (for dropdowns when logging work)
exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await User.find({ role: 'worker' }).select('name phone skillType');
    res.status(200).json({ success: true, workers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all employers
exports.getAllEmployers = async (req, res) => {
  try {
    const employers = await User.find({ role: 'employer' }).select('name businessName phone');
    res.status(200).json({ success: true, employers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};