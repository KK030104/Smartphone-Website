// Import the required modules
const express = require("express")
const router = express.Router()

const {
  getAllProducts,
  getCompany,
  getCartProducts,
  getProduct,
  getWishList,
  addToWishList,
  removeFromWishList,
  addProduct
} = require("../controllers/manageProducts")

const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
} = require("../controllers/manageCart");

const { auth } = require("../middlewares/auth")
router.get("/getAllProducts", getAllProducts)
router.get("/getCompany", getCompany)
router.get("/getProduct", getProduct)
router.get("/getWishlist", auth, getWishList)
router.get("/getCart", auth, getCartProducts)
router.post("/addToWishlist", auth, addToWishList)
router.post("/removeFromWishlist", auth, removeFromWishList)
router.post("/addProduct", addProduct)

router.post("/addToCart", auth, addToCart)
router.post("/removeFromCart", auth, removeFromCart)
router.post("/increaseQuantity", auth, increaseQuantity)
router.post("/decreaseQuantity", auth, decreaseQuantity)

module.exports = router
