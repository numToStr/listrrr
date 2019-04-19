const path = require("path");

const express = require("express");
const app = express();

const api = require("../app/app");
const customError = require("../utils/custom.error");
const middlewares = require("../middlewares/express.middleware");
const { NODE_ENV } = require("../config/keys");

const isProd = NODE_ENV === "production";

/**
 * Binding Custom Error to global
 * It will $Error constructor class to global
 * $Error class extends the native javascript Error Object
 *
 * @returns {Error}
 */
global.$Error = customError;

// Registering middlewares
middlewares(app, express);

app.use("/api", api);

// Serving build files if production */
if (isProd) {
    const staticFiles = path.resolve(__dirname, "./static");

    app.use(express.static(staticFiles));
}

/**
 * Error Handling
 *
 * 1. First block is used to catch error, then
 * 2. Second block is used to handle & send error
 */
app.use((req, res, next) => {
    // eslint-disable-next-line
    const isAPI = /^\/api\//.test(req.url);

    if (!isAPI && isProd) {
        const indexHTML = path.resolve(__dirname, "./static", "index.html");

        return res.sendFile(indexHTML);
    }

    const error = new $Error("URL not found!", 404, "ServerError");
    next(error);
});

app.use((
    {
        message = "Oops! Something went wrong",
        status = 500,
        name = "SeverError"
    },
    req,
    res,
    /* eslint-disable-next-line */
    next
) => {
    return res.status(status).json({
        success: false,
        message,
        name
    });
});

module.exports = app;
