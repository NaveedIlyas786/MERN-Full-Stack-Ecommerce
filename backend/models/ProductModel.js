const mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name!"], //? Here 2 values are passed, first represent it is necessary to give product_name, if user not give product_name then diplsay 2nd value "Please Enter Product Name!"
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description!"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price!"],
    maxLength: [8, "Price can't exceed than 8 figures"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    //! here we will get two things 1) image url  2) public id (we will use cloudnary for hosting the images and this "id" will get from the cloudnary)
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],


  category:{
    type:String,
    required:[true,"Please Enter Product Category"],
    // enum : ['Electronics','Clothing', 'Home Appliances'],
  },
  stock:{
    type:Number,
    required:[true,"Please Enter Product stock"],
    maxLength:[5,"Stock can't exceed 5 characters"],
    default:1 //? default number of products for buying purposes in stock should minimum 1 and maximum 5
  },
  numOfReviews:{
    type:Number,
    default:0
  },
  reviews:[
    {
      user: {  
        type: mongoose.Schema.ObjectId,
        ref: "User", //? this "User" we obtained from userModels from last of file in which userSchema is stored
        requird: true
      },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        },
    }
  ],
  
  user: {  //! Here we are adding the user id using (ObjectId), below with userRole("admin") in created product object, who create this product
    type: mongoose.Schema.ObjectId,
    ref: "User", //? this "User" we obtained from userModels from last of file in which userSchema is stored
    requird: true
  },

  createdAt:{
    type:Date,
    default:Date.now
  },




});

//! Now exports the model of it

module.exports=mongoose.model('Product',ProductSchema)