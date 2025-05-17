import express from 'express';
import dbConnection from './utils/database.js';
import dotenv from 'dotenv'; 
import router from './routes/user.router.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';



dotenv.config();   

const app=express();
const corsOptions = {
    origin: 'http://localhost:5173',  
    credentials: true, 
  };

const port=4000||process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/user",router)


app.listen(port,()=>{
    dbConnection();
    console.log(`Server is running on port ${port}`);
    
    
})
