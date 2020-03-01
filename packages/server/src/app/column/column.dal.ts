import { Types } from "mongoose";
import { Column, ColumnModel } from "./column.schema";
import { RootDAL } from "../../utils/fns/root.dal";

export interface OK {
    ok: number;
}

type CTX = Partial<Column | Record<string, unknown | Record<string, unknown>>>;

export class ColumnDAL extends RootDAL<Column> {
    constructor(ctx: CTX = {}) {
        super(ColumnModel, ctx);
    }

    static async updateColumnWithIssue(
        columnIds: Array<Types.ObjectId>,
        issueID: Types.ObjectId
    ): Promise<OK> {
        return ColumnModel.updateMany(
            {
                _id: {
                    $in: columnIds,
                },
            },
            {
                $push: {
                    issueIDs: issueID,
                },
            }
        );
    }

    static async removeIssueFromColumns(issueID: Types.ObjectId): Promise<OK> {
        return ColumnModel.updateMany(
            { issueIDs: issueID },
            {
                $pull: {
                    issueIDs: issueID,
                },
            }
        );
    }
}
