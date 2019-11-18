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
import { ErrorHandler } from "../@types/types";

db(MONGO_URI)
    .then(() => {
        debug.www("[MONGO] >> Connected");

        app.listen(PORT, () => {
            debug.www(`[SERVER] >> Connected`);
        });
    })
    .catch((error: Error) => {
        throw error;
    });

const errorHandler: ErrorHandler = (error, event) => {
    if (error) {
        throw error;
    }

    throw new Error(`${event} caught`);
};

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
