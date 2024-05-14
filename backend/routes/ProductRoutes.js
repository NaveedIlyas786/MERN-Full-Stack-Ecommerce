const express = require("express");
const { getAllProducts,createProduct, updateProducts, deleteProduct, getProductDetails } = require("../controllers/ProductController");
const { isAuthenticatedUser,authorizedRole } = require("../middleware/auth");

const router = express.Router();   //? it can be used to define routes, middleware, and other functionalities specific to a certain group of routes. You can define routes on this router instance using methods like .get(), .post(), .put(), .delete(), etc.

router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticatedUser,authorizedRole("admin"), createProduct);
router.route("/products/:id").put(isAuthenticatedUser,authorizedRole("admin"), updateProducts).delete(isAuthenticatedUser,authorizedRole("admin"), deleteProduct).get(getProductDetails);     //? Here Update and delete URL is same(all are concerned with Id) and you can write them collectively
module.exports = router;
