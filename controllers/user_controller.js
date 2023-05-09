const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user_model");

// dsec Register a user
// route Post api/users/register
// access public

const registerUser = asyncHandler(async (req,res)=>{
    const {username , email , password} = req.body;
    if(!username || !email || !password){
        res.statusCode(400);
        throw new Error("all fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.statusCode(400);
        throw new Error("email alrady in use");
    }
    /// hash password 
    const hashedPassword = await bcrypt.hash(password , 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword}
    )
    console.log(`User created ${user}`);
    console.log( "Hashed Password", hashedPassword);
    if(user){
        res.status(201).json({_id: user.id , email : user.email});
    }else{
        res.status(400);
        throw new Error("user dtat is not valid");
    }
    res.json({message:"Register the user"});
});

// dsec Login user
// route Post api/users/login
// access public

const loginUser = asyncHandler(async (req,res)=>{
    const{email , password} = req.body;
    if(!email, !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const user = User.findOne({email});
    /// now we compare password with hashed password
    if(user && (await bcrypt.compare(password , user.password))){
        const accessToken = jwt.sign({
            user:{
                username : user.username,
                email : user.email,
                id : user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"});
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("password is not valid");
    }
    res.json({message:"Login user"});
});

// dsec Current user
// route Post api/users/current
// access private

const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});

module.exports = {registerUser , loginUser , currentUser};