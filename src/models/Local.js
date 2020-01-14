const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema");

const LocalSchema = new mongoose.Schema({
	full_name: String,
	instagram_username: String,
	biography: String,
	avatar_url: String,
	acting: String,
	specialties: [String],
	phone: String,
	location: {
		type: PointSchema,
		index: "2dsphere"
	}
});

module.exports = mongoose.model("Local", LocalSchema);
