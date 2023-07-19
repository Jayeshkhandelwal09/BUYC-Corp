const express = require("express");
const { User } = require("../models/usermodel");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const { auth } = require("../middleware/authmiddleware");
const userRoutes = express.Router();

userRoutes.use(bodyParser.json());

// New User Registration
userRoutes.post("/register", async (req, res) => {
    try {
        const { name ,email , password } = req.body;
      let user = await User.find({ email });
      if (user.length > 0) {
        res.send({ 
            message: "User Already Exists" 
        });
      } else {  
        bcrpyt.hash(password, 5, async (error, hash) => {
          if (error) {
            res.send({
                 message: error.message 
            });
          } else {
            let NewUser = User({ name, email, password: hash });
            await NewUser.save();

            let findUser = await User.find({ email });

            jwt.sign({ id: findUser[0]._id }, "Jayesh", async (err, token) => {
              if (err) {
                res.send({
                    msg: error 
                });
              } else {
                res.send({
                    success:true,
                     message: "User Registered Succesfully", 
                     data : token 
                });
              }
            });
          }
        });
      }
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// User Login
userRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let user = await User.find({ email });
    try {
      if (user.length < 1) {
        res.send({ 
            message: "User Does Not Exist" 
        });
      } else {
       bcrpyt.compare(password, user[0].password, async (error, result) => {
          if (error) {
            res.send({ 
                success:False,
                message : error.message 
            });
          } else if (result === true) {
            jwt.sign({ id: user[0]._id }, "Jayesh", async (err, token) => {
              if (err) {
                res.send({ 
                    success:False,
                    message : error.message 
                });
              } else {
                res.send({ 
                    message: "User Logged In Succesfully",
                    data : token 
                });
              }
            });
          } else {
            res.send({ 
                success:false,
                message: "Wrong Password" 
            });
          }
        });
      }
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

userRoutes.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
      let user = await User.findById(id);
      res.send({ 
        data : user 
    });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
  });

module.exports = {
  userRoutes,
};
