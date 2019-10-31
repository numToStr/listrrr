import { connect } from "mongoose";

export const db = (uri: string) => {
    return connect(
        uri,
        {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    );
};
