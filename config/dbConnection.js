const mongoose = require("mongoose");

const asyncHandler = require("express-async-handler");

const connectDb = asyncHandler(async () => {
    console.log("1st");
        const connect = await mongoose.connect("mongodb+srv://ali_ahmad:0937076359@cluster0.vc0jnhc.mongodb.net/mycontacts-backend?retryWrites=true&w=majority");
        console.log("database connected");
    console.log("2nd");
});

module.exports = connectDb;