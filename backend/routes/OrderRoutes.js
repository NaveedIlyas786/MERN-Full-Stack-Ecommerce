const express = require("express");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const { newOrder, myOrders, getSingleOrder, getAllOrders, UpdateOrderStatus, deleteOrder } = require("../controllers/OrderController");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser,newOrder)
router.route("/order/:id").get(isAuthenticatedUser,authorizedRole("admin"),getSingleOrder)
router.route("/order/me").get(isAuthenticatedUser,myOrders)

router.route("/admin/orders").get(isAuthenticatedUser,authorizedRole("admin"),getAllOrders)
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizedRole("admin"),UpdateOrderStatus).delete(isAuthenticatedUser,authorizedRole("admin"),deleteOrder)
module.exports = router
 
