import "reflect-metadata";
import { PORT, MONGO_URI } from "../config/keys";
import { server } from "../network/server";
import { db } from "../network/db";
import debug from "../utils/fns/debug";

db(MONGO_URI)
    .then(async () => {
        debug.www("[MONGO] >> Connected");

        const { url } = await server({
            port: PORT,
        });

        debug.www(`[SERVER] >> Connected ~ ${url}`);
    })
    .catch((error: Error) => {
        throw error;
    });

const errorHandler = (
    error: {} | Error | undefined | null,
    event: string
): never => {
    if (error) {
        throw new Error(`>> [EXIT]:{SERVER} \n${error}`);
    }

    throw new Error(`${event} caught`);
};

process.on("beforeExit", () => errorHandler(null, "beforeExit"));
process.on("exit", () => errorHandler(null, "exit"));

process.on("unhandledRejection", error => {
    errorHandler(error, "unhandledRejection");
});
process.on("uncaughtException", error =>
    errorHandler(error, "uncaughtException")
);

process.on("SIGINT", () => errorHandler(null, "SIGINT"));
process.on("SIGQUIT", () => errorHandler(null, "SIGQUIT"));
process.on("SIGTERM", () => errorHandler(null, "SIGTERM"));
