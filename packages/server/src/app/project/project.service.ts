import { Types } from "mongoose";
import { ProjectDAL } from "./project.dal";
import { Project } from "./project.schema";

export class ProjectService {
    projects(): Promise<Project[]> {
        return new ProjectDAL().findAll();
    }

    project(_id: Types.ObjectId): Promise<Project> {
        return new ProjectDAL({ _id }).findOne();
    }
}
