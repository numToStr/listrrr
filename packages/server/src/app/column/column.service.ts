import { Types } from "mongoose";
import { ColumnDAL } from "./column.dal";
import { Column } from "./column.schema";
import { Issue } from "../issue/issue.schema";
import { IssueDAL } from "../issue/issue.dal";

export class ColumnService {
    async columns(_id: Types.ObjectId): Promise<Column[]> {
        const { columns = [] } = await new ColumnDAL({
            _id,
        }).findOne();

        return columns;
    }

    issues(_ids: Types.ObjectId[]): Promise<Issue[]> {
        return new IssueDAL({
            _id: {
                $in: _ids,
            },
        }).findAll();
    }
}
