
import { User } from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register=async(req,res)=>{
try {
    const {name, email,password,role}=req.body
   
    
    if (!name || !email || !password || !role) {
        return res.status(400).json({
            message:"All fields are required",
            success:false
        })
    }
    const isEmail=await User.findOne({email})
    if(isEmail){
        return res.status(400).json({
            message:"user already exist",
            success:false
        })
    }
    const hashedPassword= await bcrypt.hash(password,10)
    await User.create({
        name,
        email,
        password:hashedPassword,    
        role
    })
    

   
   return res.status(201).json({
        message:"Account created successfully",
        success:true
    })

} catch (error) {
    console.log("error in register controller",error);
    
}
}


export const login=async(req,res)=>{
    try {
        const {email,password,role}=req.body
        if(!email|| !password || !role){
            return res.status(400).json({
                message:"all fields are required",
                success:false
            })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"you don't have an account",
                success:false
            })
        }
        if(role!==user.role){
            return res.status(400).json({
                message:"role is not matched",
                success:false
            })  
        }
        const isPassword=await bcrypt.compare(password,user.password)
        if(!isPassword){
            return res.status(400).json({
                message:"invalid password",
                success:false
            })
        }
        const tokeData={
            UserId:user._id,
        }
        const token=jwt.sign(tokeData,process.env.SECKRET_KEY,{expiresIn:"1d"})
        const userData={
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            
            
        }
        return res.status(200).cookie("token",token,{
            httpOnly:true,
            maxAge:24*60*60*1000,
            sameSite:"strict",
            secure:true
        }).json({
            message:`hello ${user.name}`,
            success:true,
            userData,
            success:true
            
        })
       
    } catch (error) {
        console.log("error in login controller",error);
        
    }
}
export const logout=async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
           message:"user logged out successfully",
           success:true 
        })
    } catch (error) {
        console.log("error in logout controller",error);
        
    }
}