const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
	try {
		mongoose.connect(process.env.MONGODB_URI);
		console.log("Successfully connected to the database !!");
	} catch (err) {
		console.error(err.message);
	}
};