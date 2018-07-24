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
				const token = jwt.sign({ ...user }, "shhhhh");

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

module.exports = { userCreate };
