import { Types } from "mongoose";
import { Project, ProjectModel } from "./project.schema";
import { RootDAL } from "../../utils/fns/root.dal";

export class ProjectDAL extends RootDAL<Project> {
    constructor(ctx: Partial<Project | Record<string, unknown>> = {}) {
        super(ProjectModel, ctx);
    }

    static async columns(projectIDs: Array<Types.ObjectId>) {
        const columnsArray = await ProjectModel.aggregate()
            .match({
                _id: {
                    $in: projectIDs,
                },
            })
            .project({
                _id: 0,
                columnID: {
                    $arrayElemAt: ["$columnIDs", 0],
                },
            });

        return columnsArray.map(column => column.columnID);
    }
}
