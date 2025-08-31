import express from 'express';
import AuthRouter from "./route/AuthRouter.js"
import "./db/index.js";
import cors from "cors";
import { configDotenv } from 'dotenv';

const app = express()
app.use(express);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))


app.get('/', (req, res, )=>{
    res.send("Archvid Backend is running");
    
})

app.use('/auth', AuthRouter);



const PORT= process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server is listening to the Port: ${PORT}`);
    
})