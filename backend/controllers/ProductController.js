const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../models/ProductModel"); //import from "models/ProductModel.js"
const ApiFeatures = require("../utils/ApiFeatures")
//!Create Product (this action would be performed from Admin panel side)
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const productitem = await Product.create(req.body);
  res.status(201).json({
    //? Here "201" means product created
    success: true,
    productitem,
  });
}); //? We shall import it in "ProductRoute".)


//! Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

  const ItemsPerPage = 3;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query).searchItem().filterByCategory().pagenation(ItemsPerPage)
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});  

//! Get Single_Product Details

exports.getProductDetails= catchAsyncErrors(async(req,res,next)=>{
  const productDetails=await Product.findById(req.params.id);
  
  if(!productDetails){
    return next(new ErrorHandler("Product Not found",404));
  }
  
  res.status(200).json({
    success:true,
   productDetails,
   productCount

  })
  });

//! Update Product  --Admin_side (this action would be performed from Admin panel side)

exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
  let updatedproduct = Product.findById(req.params.id);
  if (!updatedproduct){
    return next(new ErrorHandler("Product Not found",404));
  }

  updatedproduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    updatedproduct,
  });
})

//! Delete Product  --Admin_side (this action would be performed from Admin panel side)


exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const DeletedProduct = await Product.findById(req.params.id);

  //? agar product nai milti
  if (!DeletedProduct){
    return next(new ErrorHandler("Product Not found",404));
  }

  await DeletedProduct.remove();

  res.status(200).json({
    success:true,
    message:"Product Deleted Successfully !"
  })
});
