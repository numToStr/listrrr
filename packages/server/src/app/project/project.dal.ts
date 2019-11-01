import { Project, ProjectModel } from "./project.schema";
import { RootDAL } from "../../utils/fns/root.dal";
import { AnyObject } from "../../@types/types";

export class ProjectDAL extends RootDAL<Project> {
    constructor(ctx: Partial<Project & AnyObject> = {}) {
        super(ProjectModel, ctx);
    }
}
