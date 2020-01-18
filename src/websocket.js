const socketio = require("socket.io");
const parseStringAsArray = require("./utils/parseStringAsArray");
const calculateDistance = require("./utils/calculateDistance");

const connections = [];
let io;

exports.setupWebsocket = server => {
	io = socketio(server);

	io.on("connection", socket => {
		const { latitude, longitude, specialties } = socket.handshake.query;

		connections.push({
			id: socket.id,
			coordinates: {
				latitude: Number(latitude),
				longitude: Number(longitude)
			},
			specialties: parseStringAsArray(specialties)
		});
	});
};

exports.findConnections = (coordinates, specialties) => {
	return connections.filter(connection => {
		return (
			calculateDistance(coordinates, connection.coordinates) < 30 &&
			connection.specialties.some(item => specialties.includes(item))
		);
	});
};

exports.sendMessage = (to, message, data) => {
	to.forEach(connection => {
		io.to(connection.id).emit(message, data);
	});
};
