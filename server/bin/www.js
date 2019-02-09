#!/usr/bin/env node

const http = require("http");
const mongoose = require("mongoose");

const { PORT, MONGODB_URI } = require("../config/keys");

// Importing Express app
const app = require("../server");

// Setting Port in the Express app
app.set("port", PORT);

// Creating the node server
const SERVER = http.createServer(app);

// Connecting MongoDB ============
mongoose.connect(
    MONGODB_URI,
    {
        // option for removing deprecation warning and preventing further issue
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    error => {
        if (error) {
            throw new Error(`[MongoDB]::ERROR:${error.message}`);
        }

        console.log(`[MongoDB]::LISTEN`);

        // Firing up the server on selected port
        SERVER.listen(PORT);
    }
);

SERVER.on("listening", () => {
    console.log(`[Server]::LISTEN:${PORT}`);
});

// Callback function for checking connecting or error
SERVER.on("error", error => {
    throw new Error(`[Server]::ERROR:${error.message}`);
});

/**
 * For Handling unhandled promise rejection
 *
 * If any rejection occurs in the app,
 * then the server will forcefully shutdown
 * Ex: Like if the app is unable to connect to database
 *     then the app will shutdown.
 */
process.on("unhandledRejection", reason => {
    // I just caught an unhandled promise rejection,
    // since we already have fallback handler for unhandled errors (see below),
    // let throw and let him handle that
    console.log("[unhandledRejection]::", reason.message);

    throw reason;
});

process.on("uncaughtException", error => {
    // I just received an error that was never handled,
    // time to handle it and then decide whether a restart is needed
    console.log("[uncaughtException]::", error.message);

    throw error;
});
