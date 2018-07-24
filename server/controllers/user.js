const User = require("../models/user");

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
					res.status(201).send({
						user: { _id, email }
					});
				});
			} else {
				res.status(200).send({
					user
				});
			}
		});
};

module.exports = { userCreate };
