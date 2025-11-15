import mongoose from 'mongoose';

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;