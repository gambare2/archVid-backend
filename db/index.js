import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDb connect");
    
})
.catch(()=>{
    console.error("Error connecting MongoDb");
    
})

export default mongoose
