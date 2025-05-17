import mongoose from "mongoose";

const dbConnection=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully");

    }catch(err){
        console.log("MongoDB connection failed");
        console.log(err);
        
    }
}
export default dbConnection;