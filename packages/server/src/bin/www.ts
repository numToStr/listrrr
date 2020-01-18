/* eslint-disable import/first */
import "reflect-metadata";
import { setGlobalOptions } from "@typegoose/typegoose";

setGlobalOptions({
    schemaOptions: {
        timestamps: true,
        minimize: true,
        id: false,
    },
    globalOptions: {
        useNewEnum: true,
    },
});

import { PORT, MONGO_URI } from "../config/keys";
import { app } from "../network/server";
import { db } from "../network/db";
import debug from "../utils/fns/debug";

// Responsible for bootstrapping the server and db connections
async function bootstrapApp() {
    await db(MONGO_URI);
    debug.www("[MONGO] >> Connected");

    await app.listen(PORT);
    debug.www(`[SERVER]:${PORT} >> Connected`);

    debug.www(`>> Playground: http://localhost:${PORT}/gql`);
}

// Common Error handler for common interruptions
function errorHandler(error: Error | null, event: string) {
    if (error) {
        throw error;
    }

    throw new Error(`${event} caught`);
}

// This will connect to db and start-up the server
bootstrapApp();

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
