import { join } from "path";
import { pipeline } from "stream";
import { createReadStream } from "fs";
import { promisify } from "util";
import express, { Request, Response, NextFunction } from "express";
import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import helmet from "helmet";
import { buildSchema, emitSchemaDefinitionFile } from "type-graphql";
import { Types } from "mongoose";
import { AppContext, GQLContext } from "../utils/schema/context";
import { authChecker } from "../utils/fns/auth.checker";
import { ObjectIdScalar } from "../utils/schema/scalars";

export const app = express();

const pipelineAsync = promisify(pipeline);
const schemaFilePath = join(__dirname, "..", "..", "schema.gql");
const gqlPath = "/gql";

// Adding compression
app.use(compression());

// For securing headers
app.use(helmet());

app.get("/schema.gql", async (_, res: Response, next: NextFunction) => {
    try {
        await pipelineAsync(
            createReadStream(schemaFilePath, {
                encoding: "utf-8",
            }),
            res.header("Content-Type", "text/plain")
        );
    } catch (error) {
        next(error);
    }
});

// Handler for redirecting request to server static files or graphql api
app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        const isGQL = req.url.startsWith(gqlPath);

        // If url start with /gql then it jumps to graphql api
        // else it will serve react app
        if (isGQL) {
            return next();
        }

        return res.sendStatus(200);
    } catch (error) {
        return next(error);
    }
});

(async function bootstrap() {
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

    await emitSchemaDefinitionFile(schemaFilePath, schema);

    return new ApolloServer({
        schema,
        context: (ctx: GQLContext): AppContext => new AppContext(ctx),
    }).applyMiddleware({ app, path: gqlPath });
})();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, _: Request, res: Response, _next: NextFunction) => {
    const { message = "Oops! Something went wrong" } = error;

    return res.status(400).json({
        success: false,
        message,
    });
});
