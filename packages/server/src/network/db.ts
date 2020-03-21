import mongoose from "mongoose";
import { setGlobalOptions } from "@typegoose/typegoose";
import { isDev, MONGO_DEBUG } from "../config/keys";

mongoose.set("debug", MONGO_DEBUG === "true" && isDev);

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

export const db = async (uri: string) => {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
};
