import { Types } from "mongoose";
import { ColumnList, ColumnModel } from "./column.schema";
import { RootDAL } from "../../utils/fns/root.dal";

export class ColumnDAL extends RootDAL<ColumnList> {
    constructor(
        ctx: Partial<
            ColumnList | Record<string, unknown | Record<string, unknown>>
        > = {}
    ) {
        super(ColumnModel, ctx);
    }

    static updateColumnWithIssue(
        columnIds: Array<Types.ObjectId>,
        issueID: Types.ObjectId
    ) {
        return ColumnModel.updateMany(
            {
                "_id": {
                    $in: columnIds,
                },
                "columns.position": 0,
            },
            {
                $push: {
                    "columns.$.issueIDs": issueID,
                },
            }
        );
    }

    static removeIssueFromColumns(issueID: Types.ObjectId) {
        return ColumnModel.updateMany(
            {
                "columns.issueIDs": issueID,
            },
            {
                $pull: {
                    "columns.$.issueIDs": issueID,
                },
            }
        );
    }
}
