const express = require("express");
const { getAllProducts,createProduct, updateProducts, deleteProduct, getProductDetails } = require("../controllers/ProductController");

const router = express.Router();   //? it can be used to define routes, middleware, and other functionalities specific to a certain group of routes. You can define routes on this router instance using methods like .get(), .post(), .put(), .delete(), etc.

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/products/:id").put(updateProducts).delete(deleteProduct).get(getProductDetails);     //? Here Update and delete URL is same(all are concerned with Id) and you can write them collectively
module.exports = router;
