const axios = require("axios");

module.exports = async function instagramData(instagram) {
	const response = await axios.get(
		`${process.env.INSTAGRAM}/${instagram}/${process.env.TOKEN}`
	);

	return response.data.graphql.user;
};
