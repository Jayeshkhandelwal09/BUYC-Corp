const express = require("express")

const {User} = require("../models/usermodel")

const bcrpyt = require("bcrypt");

const jwt = require("jsonwebtoken");

const userRoutes = express.Router()

// New User Registration

userRoutes.post("/register" , async(req,res)=>{
    try {
        // Check if user Already exist
        const user = await User.findone({email:req.body.email});
        if(user){
            return res.send({
                success : false,
                message : "User already Exist"
            })
        }
        // Hashing the password
        const salt = await bcrpyt.genSalt(10);
        const hashedpassword = await bcrpyt.hash(req.body.password,salt);
        req.body.password = hashedpassword

        //  Saving user
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success : true,
            message : "User Created Successfully"
        })  

    } catch (error) {
        res.send({
            success : false,
            message : error.message
        })    
    }
})


// User Login

userRoutes.post("/login" , async (req,res)=>{
    try {
        const user = await User.findone({email:req.body.email});
        if(!user){
            return res.send({
                success : false,
                message : "User Does not Exist"
            })
        }
        //  Comparing password with bcrypt
        const validPassword = await bcrpyt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword){
            throw new Error("Invalid Password");
        }
        

        // creating and assigning Token
        const Token = jwt.sign({userId:user._id}, process.env.secretKey)

        // Sending sucess Request

        res.send({
            success : true,
            message : "User Logged In Successfully",
            data : Token
        }) 
    } catch (error) {
        res.send({
            success : false,
            message : error.message
        })
    }
})

module.exports={
    userRoutes
}