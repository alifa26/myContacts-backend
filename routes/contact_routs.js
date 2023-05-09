const express = require("express");

const errorHandler = require("../middleware/error_handler");

const router = express.Router();

const {getContacts , postContact , putContact , deleteContact , getContact} = require('../controllers/contact_conroller');

const validateToken = require("../middleware/validate_token_handler");

router.route("/").get(getContacts).post(postContact);

router.use(validateToken);

router.route("/:id").get(getContact).put(putContact).delete(deleteContact);


module.exports = router;