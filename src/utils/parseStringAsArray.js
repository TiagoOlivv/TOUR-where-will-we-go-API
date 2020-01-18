module.exports = arrayAsString => {
	String(arrayAsString);
	return arrayAsString.split(",").map(local => local.toLowerCase().trim());
};
