const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const middleware = app => {
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(cookieParser());
};

module.exports = middleware;
