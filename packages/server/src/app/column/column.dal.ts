import { Types } from "mongoose";
import { Column, ColumnModel } from "./column.schema";
import { RootDAL } from "../../utils/fns/root.dal";

export class ColumnDAL extends RootDAL<Column> {
    constructor(
        ctx: Partial<
            Column | Record<string, unknown | Record<string, unknown>>
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
