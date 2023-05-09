const express = require("express");

const dotenv = require("dotenv").config();

const errorHandler = require("./middleware/error_handler");

const dbConnection = require("./config/dbConnection")

const app = express();

const port = process.env.PORT || 5000;

dbConnection().catch(console.dir);

app.use(errorHandler);

app.use(express.json()); // parese request body (parse the data stream we receive from the client)

const contact_route = require("./routes/contact_routs");

const user_route = require("./routes/user_routs");

app.use("/api/contacts",contact_route);
app.use("/api/users",user_route);
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
});

