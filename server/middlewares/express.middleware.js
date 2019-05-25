const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const main = (app, express) => {
    // Setting configuration middlwares ============
    // for securing headers
    app.use(helmet());

    // for logging requests [Development]
    if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line
        const logger = require("morgan");
        app.use(logger("dev"));
    }

    // for accepting json data
    app.use(
        express.json({
            limit: "50KB"
        })
    );
    // for accepting url encoded data
    app.use(
        express.urlencoded({
            limit: "50KB",
            extended: false
        })
    );
    // for parsing cookie
    app.use(cookieParser());
};

module.exports = main;
