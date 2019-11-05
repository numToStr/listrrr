import { Types } from "mongoose";

/**
 * For deleting properties from a object
 */
export function deleteProps<T extends object>(target: T, props: string[]): T {
    props.forEach(prop => {
        Reflect.deleteProperty(target, prop);
    });

    return target;
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
