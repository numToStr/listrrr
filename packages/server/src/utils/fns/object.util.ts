import { Types } from "mongoose";
import { Filters, Sort, Status } from "../schema/schema";

/**
 * For deleting properties from a object
 * @returns {Object} Shallow copy of the input object
 */
export function deleteProps<T extends object>(target: T, props: string[]): T {
    const freezed = { ...target };

    props.forEach(prop => {
        Reflect.deleteProperty(freezed, prop);
    });

    return freezed;
}

/**
 * For normalizing the values for the dataloader to be in sequence with IDs
 */
export const normalizeLoader = <T extends { _id: Types.ObjectId }>(
    IDs: Array<Types.ObjectId>,
    response: T[]
) => {
    const enitiyMap = new Map<string, T>();

    response.forEach((d: T) => enitiyMap.set(d._id.toHexString(), d));

    return IDs.map(_id => {
        return (
            enitiyMap.get(_id.toHexString()) ||
            new Error(`Enitity not found for ID: ${_id}`)
        );
    });
};

const SortMap: Map<Sort, Record<string, unknown>> = new Map([
    // Sorting on _id will be faster than createdAt
    [Sort.CREATED_ASC, { _id: 1 }],
    [Sort.CREATED_DESC, { _id: -1 }],
    [Sort.UPDATED_DESC, { updatedAt: -1 }],
]);

const StatusMap: Map<Status, boolean> = new Map([
    [Status.OPEN, false],
    [Status.CLOSED, true],
]);

export const parseQueryFilters = (filters: Filters) => {
    const sort = SortMap.get(filters.sort);
    const closed = StatusMap.get(filters.status);

    return { sort, closed };
};
