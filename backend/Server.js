const app = require("./app"); //? Import from "App.js"

const dotenv=require("dotenv");
const connectDatabase=require("./config/Mydatabase")  //?make sure call the "connectDatabase" after //Config below

//Config
dotenv.config({path:"backend/config/config.env"})

//Connecting to database
connectDatabase()

app.listen(process.env.PORT, () => { 
  console.log(
    `Server is Working on port http://localhost:${process.env.PORT}`
  );
});
