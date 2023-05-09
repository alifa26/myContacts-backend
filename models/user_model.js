const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type : String,
        required : [true,"please add username"]
    },
    email:{
        type : String,
        required : [true , "please add email"],
        unique : [true , "email already in use"]
    } ,
    password:{
        type : String,
        required : [true , "password can\'t be empty"],

    }
},{
    timestamps : true
});

module.exports = mongoose.model("User" , userSchema)