import { SelectionNode } from "graphql";
import { Aliases, GqlAstMongo, GqlNormalAstMongo } from "../../@types/types";

const getKey = (aliases: Aliases, name: string) => {
    return aliases[name] ?? name;
};

export const gqlNormalAstToMongoSelect: GqlNormalAstMongo = (
    aliases,
    gqlAst,
    nodes = gqlAst.fieldNodes
) => {
    const selections = nodes.reduce<SelectionNode[]>((acc, s) => {
        return [...acc, ...(s.selectionSet?.selections ?? [])];
    }, []);

    return selections.reduce((acc, selection) => {
        switch (selection.kind) {
            case "Field":
                return {
                    ...acc,
                    [getKey(aliases, selection.name.value)]: true,
                };
            case "FragmentSpread":
                return {
                    ...acc,
                    ...gqlNormalAstToMongoSelect(aliases, gqlAst, [
                        gqlAst.fragments[selection.name.value],
                    ]),
                };
            case "InlineFragment":
                return {
                    ...acc,
                    ...gqlNormalAstToMongoSelect(aliases, gqlAst, [selection]),
                };
            default:
                throw new Error("Unsuported query selection");
        }
    }, {});
};

export const gqlConnectionAstToMongoSelect: GqlAstMongo = (aliases, gqlAst) => {
    // pick only the edges of the connection;
    // traverse edges to get only the node;
    // pass it as the third argument

    return gqlNormalAstToMongoSelect(aliases, gqlAst);
};

export const gqlAstToMongoSelect: GqlAstMongo = (aliases, gqlAst) => {
    const isConnection = gqlAst.operation.name?.value.includes("Connection");

    if (isConnection) {
        return gqlConnectionAstToMongoSelect(aliases, gqlAst);
    }

    return gqlNormalAstToMongoSelect(aliases, gqlAst);
};
