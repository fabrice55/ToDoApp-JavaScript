import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

if (!process.env.CONNECTIONSTRING) {
  console.error("CONNECTIONSTRING is not defined in the environment variables!");
  process.exit(1);
}

mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log("Connected to MongoDB Atlas via Mongoose");
  })
  .catch(err => {
    console.error("Database connection error", err);
  });

export default mongoose;
