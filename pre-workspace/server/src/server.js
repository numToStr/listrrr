const path = require("path");
const express = require("express");

const api = require("../app/app.routes");
const customError = require("../utils/custom.error");
const middlewares = require("../middlewares/express.middleware");
const pkg = require("../package.json");
const { NODE_ENV } = require("../config/keys");

const app = express();
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
    const staticFiles = path.join(__dirname, "..", "static");

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
        // This path will be available after docker image is build
        const indexPath = path.join(__dirname, "..", "static");

        return res.sendFile("index.html", {
            root: indexPath,
            dotfiles: "deny",
            maxAge: "2d",
            headers: {
                "x-whoami": pkg.author
            }
        });
    }

    const error = new $Error("URL not found!", 404, "ServerError");
    next(error);
});

// eslint-disable-next-line
app.use((error, req, res, next) => {
    const {
        message = "Oops! Something went wrong",
        status = 500,
        name = "SeverError"
    } = error;

    return res.status(status).json({
        success: false,
        message,
        name
    });
});

module.exports = app;
