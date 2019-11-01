import { join } from "path";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { Types } from "mongoose";
import { Context } from "./context";
import { authChecker } from "../utils/fns/authChecker";
import { ObjectIdScalar } from "../utils/schema/scalars";

interface ServerOptions {
    port: string | number;
}

export const server = async (options: ServerOptions) => {
    const schema = await buildSchema({
        resolvers: [join(__dirname, "..", "/**/*.resolver.ts")],
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
    }).listen(options);
};
