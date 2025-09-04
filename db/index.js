import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDb connect");
    
})
.catch((err)=>{
    console.error("Error connecting MongoDb", err);
    
})

export default mongoose
