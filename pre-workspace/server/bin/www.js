#!/usr/bin/env node

const http = require("http");

const app = require("../src/server");
const db = require("../src/db");
const { PORT, MONGODB_URI } = require("../config/keys");

// Setting Port in the Express app
app.set("port", PORT);

// Creating the node server
const SERVER = http.createServer(app);

// Connecting MongoDB ============
(async () => {
    try {
        await db(MONGODB_URI);

        console.log(`[MongoDB]::LISTEN`);

        // Firing up the server on selected port
        SERVER.listen(PORT);
    } catch (error) {
        throw new Error(`[MongoDB]::ERROR:${error.message}`);
    }
})();

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
