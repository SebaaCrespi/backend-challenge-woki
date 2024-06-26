import mongoose from 'mongoose';

const dbUrl = process.env.MONGODB_URI || 'mongodb+srv://sebastiancrespi99:ItQKTiOZEuQPtVuP@cluster0.eeepuuo.mongodb.net/backend-challenge-woki?retryWrites=true&w=majority&appName=Cluster0';  

export const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
});