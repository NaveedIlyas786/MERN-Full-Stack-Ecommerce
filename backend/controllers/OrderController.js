const Order = require("../models/OrderModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../models/ProductModel");

//! Create New Order --Admin
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//! Get Single Order of User --Admin

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); //? here this section *("user","name email")* means that it will pick the name and email of "user" using userId

  if (!order) {
    return next(new ErrorHandler(`Order Not found! with this id`));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//! Get All Orders of Logged in User (User Self)

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//! Get All Orders --Admin

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const AllOrders = await Order.find();

  let totalAmount = 0;

  AllOrders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    AllOrders,
  });
});

//! Update Order Status --Admin

exports.UpdateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`Order Not found! with this id`,404));
  }
  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHandler("You have already Delivered this order!", 400)
    );
  }

  order.orderItems.forEach(async(order) => {
    await updateStock(order.product, order.quantity)
  })

  
  order.orderStatus = req.body.status;
  if(req.body.status === "Delivered"){
    order.deliveredAt = Date.now();
  }
  await order.save({validateBeforeSave: false})
  res.status(200).json({
    success: true,
  });
});


//Todo:  Update Stock function
async function updateStock(id, quantity){
  const product = await Product.findById(id);
  product.stock= product.stock - quantity;
  await product.save({validateBeforeSave: false})
}

//! Delete Order --Admin

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const FindOrder = await Order.findById(req.params.id);

  if (!FindOrder) {
    return next(new ErrorHandler(`Order Not found! with this id`,404));
  }

  await FindOrder.remove();
  res.status(200).json({
    success: true,
  });
});