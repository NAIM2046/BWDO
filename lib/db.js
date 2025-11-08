import mongoose from "mongoose";

const MONGODB_URI = process.env.db_url;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    // Already connected
    console.log("✅ Already connected to MongoDB");
    return mongoose.connection.asPromise();
  }

  if (mongoose.connection.readyState === 2) {
    // Connecting
    console.log("⏳ MongoDB is connecting...");
    return mongoose.connection.asPromise();
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "bwdo", // change if needed
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
