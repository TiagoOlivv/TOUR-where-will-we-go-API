const Local = require("../models/Local");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
	async index(req, res) {
		const { latitude, longitude, specialties } = req.query;

		const specialtiesArray = parseStringAsArray(specialties);

		const locals = await Local.find({
			specialties: {
				$in: specialtiesArray
			},
			location: {
				$near: {
					$geometry: {
						type: "Point",
						coordinates: [longitude, latitude]
					},
					$maxDistance: 10000
				}
			}
		});

		return res.json({ locals });
	}
};
