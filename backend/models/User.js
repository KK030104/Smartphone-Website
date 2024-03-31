const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },    
        password: {
            type: String,
            required: true,
        },
        contact: {
            type: Number,
            required: true,
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image",
        },
        prevOrders: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PrevOrder",
        },
        wishlist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }],
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", userSchema);