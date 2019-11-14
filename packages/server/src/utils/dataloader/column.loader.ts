import Dataloader from "dataloader";
import { Types } from "mongoose";
import { Column } from "../../app/column/column.schema";
import { ColumnDAL } from "../../app/column/column.dal";
import { normalizeLoader } from "../fns/object.util";

type OID = Types.ObjectId;

type BatchFn = (IDs: Array<OID>) => Promise<(Column | Error)[]>;

const columnBatchFn: BatchFn = async IDs => {
    if (IDs.length) {
        const response = await new ColumnDAL({
            _id: {
                $in: IDs,
            },
        }).findAll();

        return normalizeLoader<Column>(IDs, response);
    }

    return [];
};

export const columnLoader = () => {
    return new Dataloader<OID, Column>(columnBatchFn);
};
