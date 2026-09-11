const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('[Database] Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Fail after 5s instead of hanging
    });
    console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Detailed Error]: ${error.message}`);
  }
};

module.exports = connectDB;