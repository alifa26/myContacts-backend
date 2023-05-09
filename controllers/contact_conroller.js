const asyncHandler = require("express-async-handler");
const { findByIdAndUpdate } = require("../models/contact_model");

const Contact = require("../models/contact_model");

// dsec Get All Contacts 
// route Get api/contacts
// access private

const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json({contacts});
});

// dsec Create new contact 
// route Post api/contacts
// access private

const postContact = asyncHandler(async (req,res,next) => {
    console.log('the request body is :' , req.body)
    const {name , phone , email} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const contact = await Contact.create({
        name,email,phone,
        user_id : req.user.id
    })
    res.status(200).json(contact);
});

// dsec Update Contacts 
// route Put api/contacts/:id
// access private

const putContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.statusCode(404);
        console.log("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("this user cant update this contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(updatedContact);
});

// dsec Get  Contact 
// route Get api/contacts/:id
// access private

const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.statusCode(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

// dsec Delete contact 
// route Delete api/contacts/:id
// access private

const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.statusCode(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("this user cant delete this contact");
    }
    await contact.deleteOne({_id : req.params.id});
    res.status(200).json(contact);
});

module.exports = {getContacts , postContact , putContact , deleteContact , getContact}; 