import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from the environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure code
  }
};

export { connectDB };
