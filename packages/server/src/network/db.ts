import mongoose from "mongoose";
import { isDev, MONGO_DEBUG } from "../config/keys";

mongoose.set("debug", MONGO_DEBUG === "true" && isDev);

export const db = async (uri: string) => {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
};
