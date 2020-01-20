import { join } from "path";
import { createReadStream } from "fs";
import fastify, { FastifyRequest } from "fastify";
import fastifyGQL from "fastify-gql";
import fastifyHelmet from "fastify-helmet";
import fastifyCORS from "fastify-cors";
import fastifyCompress from "fastify-compress";
import { buildSchema, emitSchemaDefinitionFile } from "type-graphql";
import { Types } from "mongoose";
import { AppContext } from "../utils/schema/context";
import { authChecker } from "../utils/fns/auth.checker";
import { ObjectIdScalar } from "../utils/schema/scalars";

export const app = fastify();

const schemaFilePath = join(__dirname, "..", "..", "schema.gql");

async function bootstrapSchema() {
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

    return schema;
}
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

bootstrapSchema().then(schema => {
    app.register(fastifyGQL, {
        schema,
        routes: true,
        graphiql: "playground",
        path: "/graphql",
        jit: 1,
        context: (request: FastifyRequest) => new AppContext(request),
    });
});
