const cookieParser = require("cookie-parser");
const helmet = require("helmet");
// const cors = require("cors");

const main = (app, express) => {
    // Setting configuration middlwares ============
    // for securing headers
    app.use(
        helmet({
            // For faking our Tech Stack to show as PHP
            hidePoweredBy: { setTo: "PHP 7.2" }
        })
    );

    // Enabling Pre-flight OPTIONS request
    // app.options("*", cors());

    // for enabling CORS
    // app.use(
    //     cors({
    //         origin: "*",
    //         methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    //         allowedHeaders: [
    //             "Origin",
    //             "X-Requested-With",
    //             "Content-Type",
    //             "Accept",
    //             "Authorization",
    //             "X-Registration"
    //         ],
    //         credentials: true,
    //         preflightContinue: true,
    //         optionsSuccessStatus: 200
    //         // exposedHeaders: ["Content-Range", "X-Content-Range"]
    //     })
    // );

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
