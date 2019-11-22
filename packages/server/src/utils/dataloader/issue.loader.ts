import Dataloader, { BatchLoadFn } from "dataloader";
import { Types } from "mongoose";
import { Issue } from "../../app/issue/issue.schema";
import { IssueDAL } from "../../app/issue/issue.dal";
import { normalizeLoader } from "../fns/object.util";

type OID = Types.ObjectId;

const issueBatchFn: BatchLoadFn<OID, Issue> = async IDs => {
    if (IDs.length) {
        const response = await new IssueDAL({
            _id: {
                $in: IDs,
            },
        }).findAll();

        return normalizeLoader<Issue>(IDs, response);
    }

    return [];
};

export const issueLoader = () => new Dataloader<OID, Issue>(issueBatchFn);
