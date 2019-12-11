import { join } from "path";
import express, { Request, Response, NextFunction } from "express";
import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import helmet from "helmet";
import { buildSchema } from "type-graphql";
import { Types } from "mongoose";
import { Context } from "./context";
import { authChecker } from "../utils/fns/authChecker";
import { ObjectIdScalar } from "../utils/schema/scalars";
// import { isProd } from "../config/keys";

export const app = express();

// This path will be available after docker image is build
// const staticFilesPath = join(__dirname, "../..", "static");

const gqlPath = "/gql";

// Adding compression
app.use(compression());

// For securing headers
app.use(helmet());

// if (isProd) {
//     // Serving build files if production
//     app.use(express.static(staticFilesPath));
// }

// Handler for redirecting request to server static files or graphql api
app.use((req, res, next) => {
    try {
        const isGQL = req.url.startsWith(gqlPath);

        // If url start with /gql then it jumps to graphql api
        // else it will serve react app
        if (isGQL) {
            return next();
        }

        return res.sendStatus(404)

        // return res.sendFile("index.html", {
        //     root: staticFilesPath,
        //     dotfiles: "deny",
        //     maxAge: "2d",
        //     headers: {
        //         "x-whoami": "Vikas Raj",
        //     },
        // });
    } catch (error) {
        return next(error);
    }
});

(async () => {
    const schema = await buildSchema({
        resolvers: [join(__dirname, "..", "app/**/*.resolver.*")],
        dateScalarMode: "isoDate",
        validate: false,
        authChecker,
        scalarsMap: [
            {
                type: Types.ObjectId,
                scalar: ObjectIdScalar,
            },
        ],
    });

    return new ApolloServer({
        schema,
        context: (ctx): Context => new Context(ctx),
        introspection: true,
    }).applyMiddleware({ app, path: gqlPath });
})();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    const { message = "Oops! Something went wrong" } = error;

    return res.status(400).json({
        success: false,
        message,
    });
});
