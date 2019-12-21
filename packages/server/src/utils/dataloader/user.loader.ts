import Dataloader, { BatchLoadFn } from "dataloader";
import { Types } from "mongoose";
import { User } from "../../app/user/user.schema";
import { UserDAL } from "../../app/user/user.dal";
import { normalizeLoader } from "../fns/object.util";

type OID = Types.ObjectId;

const userBatchFn: BatchLoadFn<OID, User> = async IDs => {
    if (IDs.length) {
        const response = await new UserDAL({
            _id: {
                $in: IDs,
            },
        }).findAll({
            select: "_id username email",
        });

        return normalizeLoader<User>(IDs, response);
    }

    return [];
};

export const userLoader = () => new Dataloader<OID, User>(userBatchFn);
