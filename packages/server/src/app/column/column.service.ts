import { Types } from "mongoose";
import { UserInputError } from "apollo-server";
import { ColumnDAL } from "./column.dal";
import { Column } from "./column.schema";
import { FindInput } from "../../utils/schema/schema";
import { RearrangeColumnInput } from "./column.resolver";
import { Context } from "../../network/context";

type RearrangeColumnQuery = {
    $gte?: number;
    $gt?: number;
    $lt?: number;
    $lte?: number;
};

const sortByPosition = (columns: Column[]) => {
    return columns.sort((colA, colB) => colA.position - colB.position);
};

export class ColumnService {
    constructor(private ctx: Context) {}

    private get ID() {
        return Types.ObjectId(this.ctx.USER.ID);
    }

    async columns(_id: Types.ObjectId): Promise<Column[]> {
        const { columns = [] } = await new ColumnDAL({
            _id,
        }).findOne({
            select: "columns -_id",
        });

        return sortByPosition(columns);
    }

    async rearrangeColumn(
        { _id }: FindInput,
        { initialPosition, finalPosition }: RearrangeColumnInput
    ) {
        if (initialPosition === finalPosition) {
            throw new UserInputError("Initial and Final position are equal :/");
        }

        /**
         * Cases:
         * 1. Column doesn't changed its position
         * 2. Column changed its position
         *  - It goes forward i.e. initial < final
         *  - It goes backward i.e. initial > final
         */

        // If drag BACKWARD i.e. from position 3:{source} --> 1:{destination}
        // Source > Destination
        // Increment by 1, whose position is >= destination and < source
        // Update dragged element index to destination
        let computedPosition = 1;
        let query: RearrangeColumnQuery = {
            $gte: finalPosition,
            $lt: initialPosition,
        };

        // If drag FORWARD i.e. from position 1:{source} --> 3:{destination}
        // Destination > Source
        // Decrement by 1, whose position is > source and <= destination
        // Update dragged element index to destination
        if (initialPosition < finalPosition) {
            computedPosition = -1;
            query = {
                $gt: initialPosition,
                $lte: finalPosition,
            };
        }

        const result = await new ColumnDAL({
            columns: {
                $elemMatch: {
                    _id,
                    position: initialPosition,
                },
            },
        }).updateOne(
            {
                "columns.$[w].position": finalPosition,
                "$inc": {
                    "columns.$[t].position": computedPosition,
                },
            },
            {
                arrayFilters: [
                    {
                        "w._id": _id,
                    },
                    {
                        "t.position": query,
                    },
                ],
            }
        );

        return sortByPosition(result?.columns ?? []);
    }
}
