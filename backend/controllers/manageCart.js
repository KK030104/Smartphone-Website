const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

exports.addToCart = async(req, res)=>{
    try{
        const {id} = req.user;
        const {prodId} = req.body;
        const user = await User.findById(id);
        const cartItem = {
            product: prodId,
            quantity: 1
        }
        await Cart.findByIdAndUpdate(
            user.cart,
            {
                $push: {
                    items: cartItem,
                },
            },
            {upsert: true,new: true}
        )
        return res.status(200).json({
            success: true,
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}

exports.removeFromCart = async(req, res)=>{
    try{
        const {id} = req.user;
        const {prodId} = req.body;
        const user = await User.findById(id);
        
        await Cart.findByIdAndUpdate(
            user.cart,
            {
                $pull: {
                    items: {
                        product: prodId
                    }
                }
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}

exports.decreaseQuantity = async(req, res)=>{
    try{
        const {id} = req.user;
        const {prodId} = req.body;
        const user = await User.findById(id);
        await Cart.findOneAndUpdate(
            {_id: user.cart, 'items.product': prodId},
            { 
                $inc: { 
                    'items.$.quantity': -1 
                }
            },
            {new: true}
        )
        return res.status(200).json({
            success: true,
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}

exports.increaseQuantity = async(req, res)=>{
    try{
        const {id} = req.user;
        const {prodId} = req.body;
        const user = await User.findById(id);
        await Cart.findOneAndUpdate(
            {_id: user.cart, 'items.product': prodId},
            { 
                $inc: { 
                    'items.$.quantity': 1 
                }
            },
            {new: true}
        )
        return res.status(200).json({
            success: true,
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}