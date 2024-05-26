const express = require("express");
const { getAllProducts,createProduct, updateProducts, deleteProduct, getProductDetails, creatProductReview, getAllProductReviews, deleteUserReviews } = require("../controllers/ProductController");
const { isAuthenticatedUser,authorizedRole } = require("../middleware/auth");

const router = express.Router();   //? it can be used to define routes, middleware, and other functionalities specific to a certain group of routes. You can define routes on this router instance using methods like .get(), .post(), .put(), .delete(), etc.

router.route("/admin/products").get(getAllProducts);
router.route("/admin/products/new").post(isAuthenticatedUser,authorizedRole("admin"), createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizedRole("admin"), updateProducts).delete(isAuthenticatedUser,authorizedRole("admin"), deleteProduct);     //? Here Update and delete URL is same(all are concerned with Id) and you can write them collectively

router.route("/products:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, creatProductReview); //? here "isAuthenticatedUser" means only loggedin User can give Review

router.route("/reviews").get(getAllProductReviews).delete(isAuthenticatedUser, deleteUserReviews); //? here "isAuthenticatedUser" means only loggedin User can give Review
module.exports = router;
