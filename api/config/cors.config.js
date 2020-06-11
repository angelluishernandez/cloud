const cors = require("cors");
const corsMiddleware = cors({
	origin: "http://127.0.0.1:44243",
	allowedHeaders: ["Content-Type", "Origin"],
	credentials: true,
});

module.exports = corsMiddleware;
