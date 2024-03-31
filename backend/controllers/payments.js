const Product = require("../models/Product");
const User = require("../models/User")
const { instance } = require("../config/razorpay")
const crypto = require("crypto");
const Cart = require("../models/Cart");
const PrevOrders = require("../models/PrevOrders");

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const userId = req.user.id
  const user = await User.findById(userId);
  const cart = await Cart.findById(user.cart);
  if (cart.items.length === 0) {
    return res.json({ success: false, message: "Please add something in the cart !!" })
  }

  let total_amount = 0;

  for (const cartObj of cart.items) {
    try {
      const prodId = cartObj["product"];
      // Find the product by its ID
      const product = await Product.findById(prodId)
      const quantity = cartObj["quantity"]
      // If the product is not found, return an error
      if (!product) {
        return res.status(200).json({
          success: false, message: "Could not find the Product"
        })
      }

      const prevOrdersUpdate = await PrevOrders.create({
        items: {
          product: prodId,
          quantity: quantity,
          orderDate: new Date(),
        }
      });

      // Add the price of the product to the total amount
      total_amount += (product.price * quantity)
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false, message: error.message
      })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false, message: "Could not initiate order."
    })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const products = req.body?.products;

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !products ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    for(const prodId of products){
      await Product.findByIdAndUpdate(
        prodId,
        {
          $inc: {
            quantity: -1,
          }
        },
        {new: true}
      )
    }
    return res.status(200).json({
      success: true, message: "Payment Verified"
    })
  }

  return res.status(200).json({
    success: false, message: "Payment Failed"
  })
}