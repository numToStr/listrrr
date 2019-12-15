import { ConnectionArguments, fromGlobalId } from "graphql-relay";

export interface IPagingMeta {
    isForwardPaging: boolean;
    isBackwardPaging: boolean;
}

export interface IPagingParameters {
    offset: number;
    limit: number;
}

function checkPagingSanity(args: ConnectionArguments): IPagingMeta {
    const { first, last, after, before } = args;
    const isForwardPaging = !!first || !!after;
    const isBackwardPaging = !!last || !!before;

    if (isForwardPaging && isBackwardPaging) {
        throw new Error(
            "cursor-based pagination cannot be forwards AND backwards"
        );
    }

    if ((isForwardPaging && before) || (isBackwardPaging && after)) {
        throw new Error("paging must use either first/after or last/before");
    }

    if (
        (isForwardPaging && first && first < 0) ||
        (isBackwardPaging && last && last < 0)
    ) {
        throw new Error("paging limit must be positive");
    }

    // This is a weird corner case. We'd have to invert the ordering of query to get the last few items then re-invert it when emitting the results.
    // We'll just ignore it for now.
    if (last && !before) {
        throw new Error(
            "when paging is backwards, a 'before' argument is required"
        );
    }

    return { isForwardPaging, isBackwardPaging };
}

/**
 * Create a 'paging parameters' object with 'limit' and 'offset' fields based on the incoming
 * cursor-paging arguments.
 *
 * TODO: Handle the case when a user uses 'last' alone.
 */
export function getPagingParameters(
    args: ConnectionArguments
): IPagingParameters {
    const { isForwardPaging, isBackwardPaging } = checkPagingSanity(args);
    const { first, last, after, before } = args;

    const getId = (cursor: string) => parseInt(fromGlobalId(cursor).id, 10);
    const nextId = (cursor: string) => getId(cursor) + 1;

    const f = first ?? 10;
    const l = last ?? 10;

    if (isForwardPaging) {
        return {
            limit: f,
            offset: after ? nextId(after) : 0,
        };
    }

    if (isBackwardPaging) {
        let limit = l;
        let offset = before ? getId(before) - l : 0;

        // Check to see if our before-page is underflowing past the 0th item
        if (offset < 0) {
            // Adjust the limit with the underflow value
            limit = Math.max(l + offset, 0);
            offset = 0;
        }

        return { offset, limit };
    }

    return { offset: 0, limit: 0 };
}
