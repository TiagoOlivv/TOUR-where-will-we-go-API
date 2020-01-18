const Local = require("../models/Local");
const parseStringAsArray = require("../utils/parseStringAsArray");
const instagramData = require("../utils/instagramData");
const { findConnections, sendMessage } = require("../websocket");

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
			const response = await instagramData(instagram_username);

			const { full_name, biography, profile_pic_url_hd } = response;

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

			const sendSocketMessageTo = findConnections(
				{ latitude, longitude },
				specialtiesArray
			);

			sendMessage(sendSocketMessageTo, "new-local", local);
		}

		return res.json(local);
	},

	async destroy(req, res) {
		const { _id } = req.params;

		await Local.findByIdAndDelete({ _id: _id });

		return res.json({ message: "usuario deletado" });
	},

	async update(req, res) {
		const { _id } = req.params;

		const {
			instagram_username,
			acting,
			specialties,
			phone,
			latitude,
			longitude
		} = req.body;

		const { biography, profile_pic_url_hd } = await instagramData(
			instagram_username
		);
		const location = {
			type: "Point",
			coordinates: [longitude, latitude]
		};

		const local = await Local.findByIdAndUpdate(
			{ _id },
			{
				acting,
				phone,
				biography,
				location,
				avatar_url: profile_pic_url_hd,
				specialties: [parseStringAsArray(specialties)]
			},
			{
				new: true
			}
		);

		return res.json(local);
	}
};
