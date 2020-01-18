module.exports = arrayAsString => {
	String(arrayAsString);
	return arrayAsString.split(",").map(local => local.trim());
};
