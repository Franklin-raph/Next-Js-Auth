import mongoose from "mongoose";

export const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Db connected successfully")
    } catch (error) {
        console.log("Error while connecting to Db", error)
    }
}