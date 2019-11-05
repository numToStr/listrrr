import Dataloader from "dataloader";
import { Types } from "mongoose";
import { Issue } from "../../app/issue/issue.schema";
import { IssueDAL } from "../../app/issue/issue.dal";
import { normalizeLoader } from "../fns/object.util";

type OID = Types.ObjectId;

type BatchFn = (IDs: Array<OID>) => Promise<(Issue | Error)[]>;

const issueBatchFn: BatchFn = async IDs => {
    if (IDs.length) {
        const response = await new IssueDAL({
            _id: {
                $in: IDs,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
        }).findAll();

        return normalizeLoader<Issue>(IDs, response);
    }

    return [];
};

export const issueLoader = () => new Dataloader<OID, Issue>(issueBatchFn);
