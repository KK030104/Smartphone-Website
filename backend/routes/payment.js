// Import the required modules
const express = require("express")
const router = express.Router()

const {
  capturePayment,
  verifyPayment,
} = require("../controllers/payments")

const { auth } = require("../middlewares/auth")
router.post("/capturePayment", auth, capturePayment)
router.post("/verifyPayment", auth, verifyPayment)

module.exports = router
