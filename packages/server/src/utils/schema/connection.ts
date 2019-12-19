import { Field, ObjectType, ArgsType } from "type-graphql";
import {
    PageInfo,
    ConnectionCursor,
    ConnectionArguments,
    Edge,
    Connection,
} from "graphql-relay";
import { getPagingParameters } from "../lib/relay-cursor-paging";

@ArgsType()
export class ConnectionArgsType implements ConnectionArguments {
    @Field(() => String, {
        nullable: true,
        description: "Paginate before opaque cursor",
    })
    before?: ConnectionCursor;

    @Field(() => String, {
        nullable: true,
        description: "Paginate after opaque cursor",
    })
    after?: ConnectionCursor;

    @Field({ nullable: true, description: "Paginate first" })
    first?: number;

    @Field({ nullable: true, description: "Paginate last" })
    last?: number;

    pagingParams() {
        return getPagingParameters(this);
    }
}

@ObjectType(`PageInfo`)
export class PageInfoType implements PageInfo {
    @Field()
    hasNextPage!: boolean;

    @Field()
    hasPreviousPage!: boolean;

    @Field(() => String)
    startCursor?: ConnectionCursor;

    @Field(() => String)
    endCursor?: ConnectionCursor;
}

export function RawEdgeType<T extends object>(NodeType: T) {
    @ObjectType({ isAbstract: true })
    class EdgeType implements Edge<T> {
        @Field(() => String)
        cursor: ConnectionCursor;

        @Field(() => NodeType)
        node: T;
    }

    return EdgeType;
}

export function RawConnectionType<T extends object>(EdgeType: T) {
    @ObjectType({ isAbstract: true })
    class ConnectionType implements Connection<T> {
        @Field(() => [EdgeType])
        edges: Edge<T>[];

        @Field()
        pageInfo: PageInfoType;
    }

    return ConnectionType;
}

export function ConnectionDefinition<T extends object>(
    name: string,
    NodeType: T
) {
    @ObjectType(`${name}Edge`)
    class EdgeType extends RawEdgeType(NodeType) {}

    @ObjectType(`${name}Connection`)
    class ConnectionType extends RawConnectionType(EdgeType) {}

    return {
        EdgeType,
        ConnectionType,
    };
}
