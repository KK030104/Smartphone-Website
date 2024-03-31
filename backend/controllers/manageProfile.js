const Cart = require("../models/Cart");
const Image = require("../models/Image");
const PrevOrders = require("../models/PrevOrders");
const Product = require("../models/Product");
const User = require("../models/User")
const { uploadImageToCloudinary, deleteImageFromCloudinary } = require("../utils/imageUploader")

exports.getPrevOrders = async(req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        const prevOrders = await PrevOrders.findById(user.prevOrders);
        const prevOrderItems = [];
        for(const prevOrderObj of prevOrders.items){
            const prodId = prevOrderObj["product"];
            const prod = await Product.findById(prodId);
            prod.quantity = prevOrderObj["quantity"];
            prod.orderDate = prevOrderObj["orderDate"];
            prevOrderItems.push(prod);
        }
        return res.status(200).json({
            success: true,
            products: prevOrderItems
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}

exports.getProfile = async(req, res) => {
    try{
        const {id} = req.user;
        const user = await User.findById(id);
        const imageObj = await Image.findById(user.image);
        const image = imageObj.secure_url;

        const prevOrders = await PrevOrders.findById(user.prevOrders);
        const prevOrderItems = [];
        for(const prevOrderObj of prevOrders.items){
            const prodId = prevOrderObj["product"];
            const prod = await Product.findById(prodId);
            prod.quantity = prevOrderObj["quantity"];
            prod.orderDate = prevOrderObj["orderDate"];
            prevOrderItems.push(prod);
        }

        const cart = await Cart.findById(user.cart);
        const cartItems = [];
        for(const cartObj of cart.items){
            const prodId = cartObj["product"];
            const prod = await Product.findById(prodId);
            prod.quantity = cartObj["quantity"];
            cartItems.push(prod);
        }

        const wishlist = [];
        for(const prodId of user.wishlist){
            const prod = await Product.findById(prodId);
            wishlist.push(prod);
        }

        return res.status(200).json({
            name: user.name,
            image,
            contact: user.contact,
            wishlist: wishlist,
            cartItems: cartItems,
            previousOrders: prevOrderItems
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Profile not found, something went wrong !!",
            error: err.message,
        })
    }
}

// update display picture of the user
exports.updateDisplayPicture = async (req, res) => {
    try {
        const { displayPicture } = req.files
        const { id } = req.user

        const user = await User.findById(id);
        const imageId = user.image;
        const prevImage = await Image.findById(imageId);
        const prevPublicId = prevImage.public_id;

        // delete previous display picture if it is not general DP
        if(prevPublicId !== process.env.GENERAL_DP){
            const deletePrevDP = await deleteImageFromCloudinary(prevPublicId);
        }
        // upload image to cloudinary
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.DP_FOLDER,
            1000,
            1000
        )
        if(!image){
            return res.json({
                success: false,
                message: "Image could not be uploaded on the server !!",
            })
        }

        // update the image of user model
        const updatedImage = await Image.findByIdAndUpdate(
            imageId,
            { public_id: image.public_id, secure_url: image.secure_url },
            { new: true }
        )
        
        return res.status(200).send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedImage,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Image not uploaded, something went wrong !!",
        })
    }
}

exports.updateDetails = async(req, res)=>{
    try{
        const {name, contact} = req.body;
        const {id} = req.user;

        if(!name && !contact){
            return res.json({
              success:false,
              message:"Nothing found to update !!"
            })
        }

        var updatedUser;
        if(name){
            updatedUser = await User.findByIdAndUpdate(
                id,
                {
                    name,
                },
                {new: true}
            )
        }
        if(contact){
            updatedUser = await User.findByIdAndUpdate(
                id,
                {
                    contact,
                },
                {new: true}
            )
        }

        return res.status(200).json({
            success: true,
            message: "Profile details successfully updated !!",
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Could not update details, server error !!",
            Error_message: err.message,
        })
    }
}

// Delete account
exports.deleteAccount = async (req, res) => {
    try {
      const id = req.user.id

      const user = await User.findById({ _id: id })
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }

      // Delete Cart
      await Cart.findByIdAndDelete(user.cart)

      // Delete PrevOrders
      await PrevOrders.findByIdAndDelete(user.prevOrders);

      // Delete Profile
      const prevImage = await Image.findById(user.image);
      const prevPublicId = prevImage.public_id;

      // Delete previous display picture if it is not general DP
      if(prevPublicId !== process.env.GENERAL_DP){
        const deletePrevDP = await deleteImageFromCloudinary(prevPublicId);
      }
      await Image.findByIdAndDelete(user.image);
      
      // Now Delete User
      await User.findByIdAndDelete({ _id: id })

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      })
    }catch(err){
      return res.status(500).json({
        success: false, 
        message: "User Cannot be deleted successfully, server error !!",
        Error_message: err.message,
      })
    }
}