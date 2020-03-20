/* eslint-disable import/first */
import "reflect-metadata";
import { PORT, MONGO_URI } from "../config/keys";
// db should be imported before server
import { db } from "../network/db";
import { server } from "../network/server";
import debug from "../utils/fns/debug";

// Responsible for bootstrapping the server and db connections
async function bootstrapApp() {
    await db(MONGO_URI);
    debug.www("[MONGO] >> Connected");

    // When deploying to a Docker (or other type of) container using 0.0.0.0 or :: would be the easiest method for exposing the application.
    await (await server).listen(Number(PORT), "::");
    debug.www(`[SERVER]:${PORT} >> Connected`);

    debug.www(`[PLAYGROUND] >> http://localhost:${PORT}/playground`);
}

// This will connect to db and start-up the server
bootstrapApp();

// Common Error handler for common interruptions
function errorHandler(error: Error | null, event: string) {
    if (error) {
        throw error;
    }

    throw new Error(`${event} caught`);
}

process.on("beforeExit", () => errorHandler(null, "beforeExit"));
process.on("exit", () => errorHandler(null, "exit"));

process.on("unhandledRejection", error => {
    errorHandler(error as Error, "unhandledRejection");
});
process.on("uncaughtException", error =>
    errorHandler(error, "uncaughtException")
);

process.on("SIGINT", () => errorHandler(null, "SIGINT"));
process.on("SIGQUIT", () => errorHandler(null, "SIGQUIT"));
process.on("SIGTERM", () => errorHandler(null, "SIGTERM"));
