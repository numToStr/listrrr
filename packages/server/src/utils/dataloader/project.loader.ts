import Dataloader, { BatchLoadFn } from "dataloader";
import { Types } from "mongoose";
import { Project } from "../../app/project/project.schema";
import { ProjectDAL } from "../../app/project/project.dal";
import { normalizeLoader } from "../fns/object.util";

type OID = Types.ObjectId;

const projectBatchFn: BatchLoadFn<OID, Project> = async IDs => {
    if (IDs.length) {
        const response = await new ProjectDAL({
            _id: {
                $in: IDs,
            },
        }).findAll();

        return normalizeLoader<Project>(IDs, response);
    }

    return [];
};

export const projectLoader = () => new Dataloader<OID, Project>(projectBatchFn);
