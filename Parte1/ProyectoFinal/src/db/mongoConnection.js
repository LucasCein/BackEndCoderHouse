import mongoose from "mongoose";
import 'dotenv/config'
const connectionString=process.env.connectionString

const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};
export default initMongoDB