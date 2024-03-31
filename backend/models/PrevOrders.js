const mongoose = require("mongoose")

const prevOrderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        default: 1,
    },
    orderDate: {
        type: Date,
        default: new Date(),
    }
});

const prevOrderSchema = new mongoose.Schema({
    items: [prevOrderItemSchema]
})

module.exports = mongoose.model("PrevOrder", prevOrderSchema);