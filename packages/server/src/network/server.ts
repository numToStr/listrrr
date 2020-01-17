import { join } from "path";
import { createReadStream } from "fs";
import fastify, { FastifyRequest } from "fastify";
import { ApolloServer } from "apollo-server-fastify";
import fastifyHelmet from "fastify-helmet";
import fastifyCompress from "fastify-compress";
import { buildSchema, emitSchemaDefinitionFile } from "type-graphql";
import { Types } from "mongoose";
import { AppContext } from "../utils/schema/context";
import { authChecker } from "../utils/fns/authChecker";
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

bootstrapSchema().then(schema => {
    const server = new ApolloServer({
        schema,
        context: (request: FastifyRequest) => new AppContext({ request }),
    });

    server.createHandler({
        path: "/gql",
    })(app);
});

app.get("/schema.gql", (_, reply) => {
    const rawSchema = createReadStream(schemaFilePath, {
        encoding: "utf-8",
    });

    reply.header("Content-Type", "text/plain").send(rawSchema);
});
