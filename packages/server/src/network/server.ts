import { join } from "path";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { Context } from "./context";

interface ServerOptions {
    port: string | number;
}

export const server = async (options: ServerOptions) => {
    const schema = await buildSchema({
        resolvers: [join(__dirname, "..", "/**/*.resolver.ts")],
        dateScalarMode: "isoDate",
        validate: false,
    });

    return new ApolloServer({
        schema,
        context: (ctx): Context => new Context(ctx),
        introspection: true,
    }).listen(options);
};
