const express = require("express");
const router = express.Router();

const { 
    updateDisplayPicture,
    updateDetails,
    deleteAccount,
    getProfile,
    getPrevOrders,
} = require("../controllers/manageProfile");

const { auth } = require("../middlewares/auth");

router.get("/getProfile", auth, getProfile);
router.get("/getPrevOrders", auth, getPrevOrders);
router.post("/updatedp", auth, updateDisplayPicture);
router.post("/updateDetails", auth, updateDetails);
router.delete("/deleteAccount", auth, deleteAccount);

// Export the router for use in the main application
module.exports = router