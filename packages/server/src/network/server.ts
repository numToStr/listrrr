import { join } from "path";
import { createReadStream } from "fs";
import fastify, { FastifyRequest } from "fastify";
import fastifyGQL from "fastify-gql";
import fastifyHelmet from "fastify-helmet";
import fastifyCORS from "fastify-cors";
import fastifyCompress from "fastify-compress";
import { ResolverData, buildSchemaSync } from "type-graphql";
import { Types } from "mongoose";
import { Container } from "typedi";
import { AppContext } from "../utils/schema/context";
import { authChecker } from "../utils/fns/auth.checker";
import { ObjectIdScalar } from "../utils/schema/scalars";

const app = fastify();

const schemaFilePath = join(__dirname, "..", "..", "schema.gql");
const resolversPath = join(__dirname, "..", "app/**/*.resolver.{ts,js}");

const schema = buildSchemaSync({
    resolvers: [resolversPath],
    dateScalarMode: "isoDate",
    validate: false,
    authChecker,
    emitSchemaFile: true,
    container: ({ context }: ResolverData<AppContext>) => context.container,
    scalarsMap: [
        {
            type: Types.ObjectId,
            scalar: ObjectIdScalar,
        },
    ],
});

app.register(fastifyGQL, {
    schema,
    routes: true,
    graphiql: "playground",
    path: "/graphql",
    // Disabling jit as it conflicting with type-graphql especially with Enums
    // For replicating, change jit == 1, and use closeOrOpen mutation
    jit: 0,
    context: (request: FastifyRequest) => new AppContext(request),
});

// For securing headers
app.register(fastifyHelmet);
// Adding compression
app.register(fastifyCompress);
// Adding CORS
app.register(fastifyCORS);

app.get("/schema.gql", (_, reply) => {
    const rawSchema = createReadStream(schemaFilePath, {
        encoding: "utf-8",
    });

    reply.header("Content-Type", "text/plain").send(rawSchema);
});

app.addHook("onResponse", (req, _res, done) => {
    // Just reseting the DI container which is initialized in the AppContext
    Container.reset(req.id);

    done();
});

export { app as server };
