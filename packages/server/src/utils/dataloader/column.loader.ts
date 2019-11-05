import Dataloader from "dataloader";
import { Types } from "mongoose";
import { ColumnDAL } from "../../app/column/column.dal";
import { Column, ColumnList } from "../../app/column/column.schema";

type OID = Types.ObjectId;

type BatchFn = (IDs: Array<OID>) => Promise<(Column[] | Error)[]>;

const columnBatchFn: BatchFn = async IDs => {
    if (IDs.length) {
        const response = await new ColumnDAL({
            _id: {
                $in: IDs,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
        }).findAll({ select: "columns" });

        const enitiyMap = new Map<string, Column[]>();

        response.forEach((entity: ColumnList) =>
            enitiyMap.set(entity._id.toHexString(), entity.columns)
        );

        return IDs.map(_id => {
            return (
                enitiyMap.get(_id.toHexString()) ||
                new Error(`Enitity not found for ID: ${_id}`)
            );
        });
    }

    return [];
};

export const columnLoader = () => {
    return new Dataloader<OID, Column[]>(columnBatchFn);
};
