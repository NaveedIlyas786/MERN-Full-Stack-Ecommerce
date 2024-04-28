const express = require("express");

const app = express();
const errorMiddleware = require("./middleware/error")

app.use(express.json())

//! Routes are importing here after setting of product_Controller in Product_Routes 

const product=require("./routes/ProductRoute") 

app.use("/api/v1",product) //? We add here string "/api/v1/" that is using everytime

//! Middleware for Error
app.use(errorMiddleware)
module.exports = app; //? export from here and will import in "Server.js" 