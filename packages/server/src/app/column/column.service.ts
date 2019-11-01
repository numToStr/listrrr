import { Types } from "mongoose";
import { ColumnDAL } from "./column.dal";
import { Column } from "./column.schema";

export class ColumnService {
    async columns(_id: Types.ObjectId): Promise<Column[]> {
        const { columns = [] } = await new ColumnDAL({
            _id,
        }).findOne();

        return columns;
    }
}
