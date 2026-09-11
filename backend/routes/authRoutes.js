const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllWorkers,
  getAllEmployers
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/workers', getAllWorkers);
router.get('/employers', getAllEmployers);

module.exports = router;