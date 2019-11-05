import Dataloader from "dataloader";
import { Types } from "mongoose";
import { Project } from "../../app/project/project.schema";
import { ProjectDAL } from "../../app/project/project.dal";
import { normalizeLoader } from "../fns/object.util";

type OID = Types.ObjectId;

type BatchFn = (IDs: Array<OID>) => Promise<(Project | Error)[]>;

const projectBatchFn: BatchFn = async IDs => {
    if (IDs.length) {
        const response = await new ProjectDAL({
            _id: {
                $in: IDs,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
        }).findAll();

        return normalizeLoader<Project>(IDs, response);
    }

    return [];
};

export const projectLoader = () => new Dataloader<OID, Project>(projectBatchFn);
