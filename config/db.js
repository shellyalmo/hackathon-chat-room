import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Load environment variables
dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongo Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.log(`${error}`.red.bold);
  }
};
export default connectDB;
