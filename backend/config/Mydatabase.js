const mongoose = require("mongoose");

const  connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((data) => {
      console.log(`MongoDB Connected With Server : ${data.connection.host}`);
    }) 
    .catch((err) => {
      console.log("Connection Error is: ",err);
    });
};

module.exports = connectDatabase;
