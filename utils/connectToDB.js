import mongoose from "mongoose";

// Connect to MongoDB using connection string from environment variables
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to mongodb");
  } catch (err) {
    console.log("error connecting mongodb: ", err);
  }
};

export default connectToDB;
