const express = require('express')
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getSingleProductDetails,
  creatProductReview,
  getAllProductReviews,
  deleteUserReviews,
} = require('../controllers/ProductController')
const { isAuthenticatedUser, authorizedRole } = require('../middleware/auth')

const router = express.Router() //? it can be used to define routes, middleware, and other functionalities specific to a certain group of routes. You can define routes on this router instance using methods like .get(), .post(), .put(), .delete(), etc.

// Get all products
router.route('/admin/products').get(getAllProducts)

// Create new product by --Admin-side
router
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizedRole('admin'), createProduct)

//update and delete =>  single product by id --Admin-side
router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizedRole('admin'), updateProducts)
  .delete(isAuthenticatedUser, authorizedRole('admin'), deleteProduct) //? Here Update and delete URL is same(all are concerned with Id) and you can write them collectively

//get single product by id
router.route('/product/:id').get(getSingleProductDetails)

// loggedin user only can post review
router.route('/review').put(isAuthenticatedUser, creatProductReview) //? here "isAuthenticatedUser" means only loggedin User can give Review

router
  .route('/reviews')
  .get(getAllProductReviews)
  .delete(isAuthenticatedUser, deleteUserReviews) //? here "isAuthenticatedUser" means only loggedin User can give Review
module.exports = router
