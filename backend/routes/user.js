const express = require("express");
const router = express.Router();

const {
    login,
    signup,
    changePassword
} = require("../controllers/Auth");

const { auth } = require("../middlewares/auth");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route to change the password
// auth is the middleware to check if the user is logged in or not
router.post("/changepassword", auth, changePassword);

// Export the router for use in the main application
module.exports = router