/* eslint-env node */
/* global process */
import mongoose from 'mongoose';
import colors from 'colors';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to database ${mongoose.connection.host}`.bgCyan);
  } catch (error) {
    console.log(colors.bgRed('DB Error:'), error);
  }
};

export default connectDb;