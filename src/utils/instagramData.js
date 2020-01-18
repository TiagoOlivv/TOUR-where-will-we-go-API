const axios = require("axios");

module.exports = async function instagramData(instagram) {
	const response = await axios.get(
		`https://www.instagram.com/${instagram}/?__a=1`
	);

	return response.data.graphql.user;
};
