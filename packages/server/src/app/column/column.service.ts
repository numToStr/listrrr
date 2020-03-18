import { Service, Inject } from "typedi";
import {
    RearrangeIssueFindInput,
    RearrangeIssueInput,
} from "./column.resolver";
import { ColumnDAL } from "./column.dal";
import { TokenPayload } from "../../@types/types";

@Service()
export class ColumnService {
    @Inject("USER")
    private user: TokenPayload;

    async rearrangeIssue(
        findDTO: RearrangeIssueFindInput,
        rearrageIssueDTO: RearrangeIssueInput
    ): Promise<boolean> {
        const { columnID, issueID } = findDTO;
        const {
            destinationColumnID,
            initialPosition,
            finalPosition,
        } = rearrageIssueDTO;

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
            userID: this.user.ID,
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
                userID: this.user.ID,
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
