const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
	const { name } = req.body;

	res.send({
		welcome: name
	});
});

module.exports = router;
