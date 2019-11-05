import Dataloader from "dataloader";
import { Types } from "mongoose";
import { User } from "../../app/user/user.schema";
import { UserDAL } from "../../app/user/user.dal";
import { normalizeLoader } from "../fns/object.util";

type OID = Types.ObjectId;

type BatchFn = (IDs: Array<OID>) => Promise<(User | Error)[]>;

const userBatchFn: BatchFn = async IDs => {
    if (IDs.length) {
        const response = await new UserDAL({
            _id: {
                $in: IDs,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
        }).findAll();

        return normalizeLoader<User>(IDs, response);
    }

    return [];
};

export const userLoader = () => new Dataloader<OID, User>(userBatchFn);
