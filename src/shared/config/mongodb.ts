import mongoose from "mongoose";
import { envs } from "./envs";

export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(envs.mongoDbUri);

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
}
