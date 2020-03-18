import { createParamDecorator } from "type-graphql";
import { gqlAstToMongoSelect } from "../schema/ast";
import { Aliases } from "../../@types/types";

export function Selections(aliases: Aliases = {}): ParameterDecorator {
    return createParamDecorator(({ info }) => {
        return gqlAstToMongoSelect(aliases, info);
    });
}
