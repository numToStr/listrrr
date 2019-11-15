import { Types } from "mongoose";
import { Column } from "../../app/column/column.schema";

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

export const sortByPosition = (columns: Column[]) => {
    return columns.sort((colA, colB) => colA.position - colB.position);
};
