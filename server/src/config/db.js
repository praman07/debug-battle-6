import mongoose from 'mongoose';
import dns from 'node:dns';
import { env } from './env.js';

// Configure DNS servers to reliably resolve MongoDB Atlas SRV records on Windows networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (dnsErr) {
  console.warn('Could not set custom DNS servers:', dnsErr.message);
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Exits the process on failure to prevent a partially initialised app.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`✅ MongoDB connected to: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Primary MongoDB Atlas connection failed:`, error.message);
    console.log(`⚠️ Trying local fallback...`);
    try {
      const conn = await mongoose.connect('mongodb://127.0.0.1:27017/xogame');
      console.log(`✅ MongoDB connected to local: ${conn.connection.host}`);
    } catch (fallbackError) {
      console.error(`❌ MongoDB connection failed:`, fallbackError.message);
      process.exit(1);
    }
  }
};

export default connectDB;
