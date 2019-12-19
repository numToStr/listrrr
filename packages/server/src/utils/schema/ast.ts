import {
    Aliases,
    GqlAstMongoSelect,
    GqlNormalAstMongoSelect,
    GqlNode,
} from "../../@types/types";

const getKey = (aliases: Aliases, name: string) => {
    return aliases[name] ?? name;
};

export const gqlNormalAstToMongoSelect: GqlNormalAstMongoSelect = (
    aliases,
    gqlAst,
    nodes = gqlAst.fieldNodes
) => {
    const selections = nodes.flatMap<GqlNode>(s => {
        if (s.kind === "FragmentSpread") {
            return [];
        }

        return s.selectionSet?.selections ?? [];
    });

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

const makeNode = (edge?: GqlNode) => {
    if (edge?.kind !== "Field") {
        return [];
    }

    return edge.selectionSet?.selections.filter(
        s => s.kind === "Field" && s.name.value === "node"
    );
};

export const gqlConnectionAstToMongoSelect: GqlAstMongoSelect = (
    aliases,
    gqlAst
) => {
    // pick only the edges of the connection;
    // traverse edges to get only the node;
    // pass it as the third argument
    const edge = gqlAst.fieldNodes
        .flatMap<GqlNode>(s => s.selectionSet?.selections ?? [])
        .find(s => s?.kind === "Field" && s.name.value === "edges");

    const node = makeNode(edge);

    return gqlNormalAstToMongoSelect(aliases, gqlAst, node);
};

export const gqlAstToMongoSelect: GqlAstMongoSelect = (aliases, gqlAst) => {
    const isConnection = gqlAst.returnType.toString().includes("Connection");

    if (isConnection) {
        return gqlConnectionAstToMongoSelect(aliases, gqlAst);
    }

    return gqlNormalAstToMongoSelect(aliases, gqlAst);
};
