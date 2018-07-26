const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../config/keys/index");

const authRoutes = (req, res, next) => {
	const token = req.cookies.LISTERRTOKEN;

	if (token) {
		try {
			const u = jwt.verify(token, TOKEN_KEY);
			req._user = u;
			next();
		} catch (error) {
			return res.status(401).send({
				error: "Unauthorized Access! Please login."
			});
		}
	} else {
		return res.status(200).send();
	}
};

module.exports = authRoutes;
