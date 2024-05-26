const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../models/ProductModel"); //import from "models/ProductModel.js"
const ApiFeatures = require("../utils/ApiFeatures");
//!Create Product (this action would be performed from Admin panel side)
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

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

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .searchItem()
    .filterByCategory()
    .pagenation(ItemsPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});

//! Get Single_Product Details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const productDetails = await Product.findById(req.params.id);

  if (!productDetails) {
    return next(new ErrorHandler("Product Not found", 404));
  }

  res.status(200).json({
    success: true,
    productDetails,
    productCount,
  });
});

//! Update Product  --Admin_side (this action would be performed from Admin panel side)

exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
  let updatedproduct = Product.findById(req.params.id);
  if (!updatedproduct) {
    return next(new ErrorHandler("Product Not found", 404));
  }

  updatedproduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    // useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    updatedproduct,
  });
});

//! Delete Product  --Admin_side (this action would be performed from Admin panel side)

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const DeletedProduct = await Product.findById(req.params.id);

  //? agar product nai milti
  if (!DeletedProduct) {
    return next(new ErrorHandler("Product Not found", 404));
  }

  await DeletedProduct.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully !",
  });
});

//! Create the New Review or Update the Review of Products

exports.creatProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productID } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating), //? It means rating should number
    comment,
  };

  const FindedProduct = await Product.findById(productID); //? means that product which is having rating/review

  const isReviewed = await FindedProduct.reviews.find(
    (a) => a.user.toString() === req.user._id.toString()
  ); //? it means if the id's are equal then you have reviewed it already, otherwise not
  if (isReviewed) {
    FindedProduct.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    FindedProduct.reviews.push(review);
    FindedProduct.numOfReviews = FindedProduct.reviews.length;
  }

  let average = 0;
  FindedProduct.reviews.forEach((rev) => {
    average += rev.rating;
  });

  FindedProduct.ratings = average / FindedProduct.reviews.length;

  await FindedProduct.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//! Get All Reviews of Product

exports.getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
  const productReviews = await Product.findById(req.query.id);
  if(!productReviews){
    return next(new ErrorHandler(`Product not found! with id ${req.query.id}`))
  }

  res.status(200).json({
    success: true,
    reviews: productReviews.reviews
  })
})

//! Delete the Review of Product

exports.deleteUserReviews = catchAsyncErrors(async (req, res, next) => {
  const productReviews = await Product.findById(req.query.productID);
  if(!productReviews){
    return next(new ErrorHandler(`Product not found! with id ${req.query.productID}`))
  }

  const reviews = productReviews.reviews.filter(a => a?._id.toString() !== req.query.reviewID.toString()) //? Here "req.query.id" is the review id
//? Here we are filtering the reviews which we don't want to delete and save them, but this review "req.query.id" would not include

let average = 0;
reviews.forEach((rev) => {
  average += rev.rating;
});

const ratings = average / reviews.length;

const numOfReviews = reviews.length;

await Product.findByIdAndUpdate(req.query.productID, {
  ratings,
  reviews,
  numOfReviews
},{
  new: true,
  runValidators: true,
  // useFindAndModify: false
})

  res.status(200).json({
    success: true,
  })
})