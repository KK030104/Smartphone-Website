const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Image = require("../models/Image");
const Cart = require("../models/Cart");
const PrevOrders = require("../models/PrevOrders");
require("dotenv").config();

exports.signup = async(req, res)=>{
    try {
        // Destructure fields from the request body
        const {
          name,
          email,
          contact,
          password,
          confirmPassword
        } = req.body
        // Check if All Details are there or not
        if (
          !name ||
          !email ||
          !contact ||
          !password ||
          !confirmPassword
        ) {
          return res.status(403).send({
            success: false,
            message: "All Fields are required",
          })
        }
        // Check if password and confirm password match
        if (password !== confirmPassword) {
          return res.status(400).json({
            success: false,
            message:
              "Password and Confirm Password do not match. Please try again.",
          })
        }
    
        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue.",
          })
          
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create default Display Picture for the user
        const imageDetails = await Image.create({
          secure_url: "https://asset.cloudinary.com/dempbr6pc/99e46ce2479532a9cd7e611a604f54f6",
          public_id: "infotrixs_project/userDP/profile_qfbwzd"
        })

        // Create the empty cart
        const newCart = await Cart.create({
          items: []
        })

        // Create the empty previous orders list
        const prevOrdersList = await PrevOrders.create({
          items: []
        })
        
        const user = await User.create({
          name,
          email,
          contact,
          cart: newCart._id,
          prevOrders: prevOrdersList._id,
          password: hashedPassword,
          image: imageDetails._id,
        })
    
        return res.status(200).json({
          success: true,
          message: "User registered successfully",
        })
    }catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "User cannot be registered. Please try again.",
        })
    }
}

exports.login = async(req, res)=>{
    try {
        // Get email and password from request body
        const { email, password } = req.body
    
        // Check if email or password is missing
        if (!email || !password) {
          // Return 400 Bad Request status code with error message
          return res.status(400).json({
            success: false,
            message: `Please Fill up All the Required Fields`,
          })
        }
    
        // Find user with provided email or userName
        const user = await User.findOne({ email })

        // If user not found with provided email
        if (!user) {
          // Return 401 Unauthorized status code with error message
          return res.status(401).json({
            success: false,
            message: `User is not Registered with Us Please SignUp to Continue`,
          })
        }
    
        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "24h",
            }
          )

          user.token = token
          user.password = undefined
          // Set cookie for token and return success response
          const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          }
          res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: `User Login Success`,
          })
        } else {
          return res.status(401).json({
            success: false,
            message: `Password is incorrect`,
          })
        }
      } catch (error) {
        console.error(error)
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
          success: false,
          message: `Login Failure Please Try Again`,
        })
      }
}

exports.changePassword = async (req, res) => {
    try {
      // Get user data from req.user
      const userDetails = await User.findById(req.user.id)

      // Get old password, new password, and confirm new password from req.body
      const { oldPassword, newPassword } = req.body
  
      // Validate old password
      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
      )
      if (!isPasswordMatch) {
        // If old password does not match, return a 401 (Unauthorized) error
        return res
          .status(401)
          .json({ success: false, message: "The password is incorrect" })
      }
  
      // Update password
      const encryptedPassword = await bcrypt.hash(newPassword, 10)
      const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
      )
  
      // Return success response
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" })
    } catch (error) {
      // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while updating password:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
      })
    }
}