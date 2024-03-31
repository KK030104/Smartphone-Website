const Cart = require("../models/Cart");
const Image = require("../models/Image");
const Product = require("../models/Product");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.getAllProducts = async(req, res)=>{
    try{
        const products = await Product.find({});
        return res.status(200).json({
            success: true,
            products: products
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}

exports.getCompany = async(req, res)=>{
    try{
        const {company} = req.body;
        const products = await Product.find(
            {
                company: company,
            },
        );
        return res.status(200).json({
            success: true,
            products: products
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}

exports.getProduct = async(req, res)=>{
    try{
        const {id} = req.body;
        const product = await Product.findById(id);
        return res.status(200).json({
            success: true,
            product: product
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}

exports.getCartProducts = async(req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        const cart = await Cart.findById(user.cart);
        const cartItems = [];
        for(const cartObj of cart.items){
            const prodId = cartObj["product"];
            const prod = await Product.findById(prodId);
            prod.quantity = cartObj["quantity"];
            cartItems.push(prod);
        }
        return res.status(200).json({
            success: true,
            products: cartItems
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}

exports.getWishList = async(req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        const wishlist = [];
        for(const prodId of user.wishlist){
            const prod = await Product.findById(prodId);
            wishlist.push(prod);
        }
        return res.status(200).json({
            success: true,
            products: wishlist
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}

exports.addToWishList = async(req, res)=>{
    try{
        const {id} = req.body;
        const wishlist = await User.findByIdAndUpdate(
            req.user.id,
            {
                $push:{
                    wishlist: id,
                }
            },
            {new: true},
        );
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

exports.removeFromWishList = async(req, res)=>{
    try{
        const {id} = req.body;
        const wishlist = await User.findByIdAndUpdate(
            req.user.id,
            {
                $pull:{
                    wishlist: id,
                }
            },
            {new: true},
        );
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

exports.addProduct = async(req, res)=>{
    try{
        const {name, company, description, price} = req.body;
        const {picture} = req.files;
        console.log(picture);
        const imgArr = [];
        for(const pic of picture){
            const newImage = await uploadImageToCloudinary(
                pic,
                process.env.PROD_FOLDER,
                1000,
                1000
            )
            const uploadedImage = await Image.create({
                public_id: newImage.public_id, 
                secure_url: newImage.secure_url
            })
            imgArr.push(uploadedImage.secure_url);
        }
        const newProd = await Product.create({
            name,
            company,
            description,
            price,
            images: imgArr
        })
        return res.status(200).json({
            success: true,
            message: "New product listed !!",
            newProd,
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}