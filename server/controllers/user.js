const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userCreate = (req, res) => {
	const { email } = req.body;

	const U = new User({
		email
	});

	User.findOne({ email })
		.select("_id email")
		.then(user => {
			if (!user) {
				U.save().then(({ _id, email }) => {
					const token = jwt.sign({ _id, email }, "shhhhh");

					res.cookie("LISTERRTOKEN", token, {
						sameSite: true,
						httpOnly: true,
						expires: ""
					})
						.status(201)
						.send({
							user: { _id, email }
						});
				});
			} else {
				const { _id, email } = user;
				const token = jwt.sign({ _id, email }, "shhhhh");

				res.cookie("LISTERRTOKEN", token, {
					sameSite: true,
					httpOnly: true,
					expires: ""
				})
					.status(200)
					.send({
						user
					});
			}
		});
};

const authenticate = (req, res, next) => {
	const u = req._user;
	User.findById(u._id)
		.select("_id email")
		.then(user => {
			if (user) {
				return res.status(200).send({
					user,
					message: "Authentication Successful"
				});
			} else {
				return res.status(401).send({
					error: "Unauthorized Access! Please login."
				});
			}
		});
};

module.exports = { userCreate, authenticate };
