import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log(`Database connected successfully ${mongoose.connection.host}`)
    }
    catch (error) {
        console.log(error)
    }
}