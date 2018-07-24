const bodyParser = require("body-parser");

const middleware = app => {
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
};

module.exports = middleware;
