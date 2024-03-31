const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema(
    {
        secure_url:{
            type: String,
            trim: true,
        },
        public_id:{
            type: String,
            trim: true,
        }
    }
)

module.exports = mongoose.model("Image", imageSchema);