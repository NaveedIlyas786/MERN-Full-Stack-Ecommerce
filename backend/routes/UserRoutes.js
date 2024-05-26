const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  UpdatePassword,
  UpdateProfile,
  getAllUsers,
  getSingleUser,
  UpdateUserRole,
  DeleteUser,
} = require("../controllers/UserController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, UpdateProfile);
router.route("/password/update").put(isAuthenticatedUser, UpdatePassword);

router
  .route("/admin/AllUsers")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAllUsers);
router
  .route("/admin/singleUser/:id")
  .get(isAuthenticatedUser, authorizedRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizedRole("admin"), UpdateUserRole)
  .delete(isAuthenticatedUser, authorizedRole("admin"), DeleteUser);
module.exports = router;
