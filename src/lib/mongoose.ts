import mongoose from "mongoose";

// 1. Define the cache type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// 2. Augment the global type
declare global {
  var mongoose: MongooseCache;
}

// 3. Get the MongoDB URI with proper type checking
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// 4. Initialize the cache with proper typing
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// 5. Define the dbConnect function with return type
async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Reset promise on error to allow retries
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default dbConnect;
