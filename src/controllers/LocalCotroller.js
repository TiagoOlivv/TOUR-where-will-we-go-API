const axios = require("axios");

const Local = require("../models/Local");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
	async index(req, res) {
		const local = await Local.find();

		return res.json(local);
	},

	async store(req, res) {
		const {
			instagram_username,
			acting,
			specialties,
			phone,
			latitude,
			longitude
		} = req.body;

		let local = await Local.findOne({ instagram_username });

		if (!local) {
			const response = await axios.get(
				`https://www.instagram.com/${instagram_username}/?__a=1`
			);

			const {
				full_name,
				biography,
				profile_pic_url_hd
			} = response.data.graphql.user;

			const specialtiesArray = parseStringAsArray(specialties);

			const location = {
				type: "Point",
				coordinates: [longitude, latitude]
			};

			local = await Local.create({
				full_name,
				instagram_username,
				biography,
				avatar_url: profile_pic_url_hd,
				acting,
				specialties: specialtiesArray,
				phone,
				location
			});
		}

		return res.json(local);
	}
};
