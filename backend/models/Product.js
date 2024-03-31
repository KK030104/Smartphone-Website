const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
    }],
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number, 
        default: 100,
    }
});

module.exports = mongoose.model("Product", productSchema);