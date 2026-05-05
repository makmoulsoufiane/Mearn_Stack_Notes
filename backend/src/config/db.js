import mongoose from "mongoose"
export const connectDB = async () => {
  try {
    mongoose.set("bufferCommands", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo db successfull");
  } catch (error) {
    console.error("error connecting to mongodb")
    process.exit(1);//exit with failure
  }
}
