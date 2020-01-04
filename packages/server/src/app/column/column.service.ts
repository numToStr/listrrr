import { Types } from "mongoose";
import { AppContext } from "../../utils/schema/context";
import {
    RearrangeIssueFindInput,
    RearrangeIssueInput,
} from "./column.resolver";
import { ColumnDAL } from "./column.dal";

export class ColumnService {
    constructor(private ctx: AppContext) {}

    private get ID() {
        return Types.ObjectId(this.ctx.USER.ID);
    }

    async rearrangeIssue(
        { columnID, issueID }: RearrangeIssueFindInput,
        {
            destinationColumnID,
            initialPosition,
            finalPosition,
        }: RearrangeIssueInput
    ): Promise<boolean> {
        /**
         * Cases:
         *
         * 1. changes its columns
         *      -> columnID !== destinationColumnID
         * 2. changes its position in the same column
         *      -> columnID === destinationColumnID && initialPosition !== finalPosition
         * 3. doesn't changes its position
         *      -> columnID === destinationColumnID && initialPosition === finalPosition
         */

        const dal = new ColumnDAL({
            _id: columnID,
            userID: this.ID,
        });

        // When issue changes its columns
        // Remove the issue from its column
        // Then update the destination column with issue in finalPosition
        if (columnID.toHexString() !== destinationColumnID.toHexString()) {
            await dal.updateOne(
                {
                    $pull: {
                        issueIDs: issueID,
                    },
                },
                { select: "_id" }
            );

            const isUpdated = await new ColumnDAL({
                _id: destinationColumnID,
                userID: this.ID,
            }).updateOne(
                {
                    $push: {
                        issueIDs: {
                            $each: [issueID],
                            $position: finalPosition,
                        },
                    },
                },
                { select: "_id" }
            );

            return !!isUpdated;
        }

        // When issue doesn't changes its column, but changes its position in the same column
        // Remove the issue from its current position
        // Then push the issue in the final position
        if (initialPosition !== finalPosition) {
            await dal.updateOne(
                {
                    $pull: {
                        issueIDs: issueID,
                    },
                },
                { select: "_id" }
            );

            const isUpdated = await dal.updateOne(
                {
                    $push: {
                        issueIDs: {
                            $each: [issueID],
                            $position: finalPosition,
                        },
                    },
                },
                { select: "_id" }
            );

            return !!isUpdated;
        }

        // When issue neither changes its column nor its position
        return false;
    }
}
