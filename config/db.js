const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) {
    throw new Error('MongoDB URI is missing. Set MONGODB_URI in the .env file.');
  }

  try {
    await mongoose.connect(uri, { autoIndex: true });
    console.log('Connected to MongoDB Atlas successfully.');
  } catch (error) {
    if (error.code === 18 || /authentication failed|bad auth/i.test(error.message)) {
      throw new Error(
        'MongoDB authentication failed. Check the Atlas Database Access username and password, ensure the user is active, and percent-encode special characters in the URI password (for example, ! as %21).'
      );
    }
    throw error;
  }
}

module.exports = connectDB;