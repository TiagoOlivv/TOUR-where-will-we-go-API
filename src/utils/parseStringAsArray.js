module.exports = arrayAsString => {
	return arrayAsString.split(",").map(local => local.trim());
};
