const jwt = require("jsonwebtoken");

const authRoutes = (req, res, next) => {
	const token = req.cookies.LISTERRTOKEN;

	if (token) {
		try {
			const u = jwt.verify(token, "shhhhh");
			req._user = u;
			next();
		} catch (error) {
			return res.status(401).send({
				error: "Unauthorized Access! Please login."
			});
		}
	} else {
		return res.status(401).send();
	}
};

module.exports = authRoutes;
