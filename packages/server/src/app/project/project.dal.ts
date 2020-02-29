import { Types } from "mongoose";
import { Project, ProjectModel } from "./project.schema";
import { RootDAL } from "../../utils/fns/root.dal";

interface ProjectColumn {
    columnID: Types.ObjectId;
}

type CTX = Partial<Project | Record<string, unknown>>;

export class ProjectDAL extends RootDAL<Project> {
    constructor(ctx: CTX = {}) {
        super(ProjectModel, ctx);
    }

    static async columns(projectIDs: Array<Types.ObjectId>) {
        const columnsArray = await ProjectModel.aggregate<ProjectColumn>()
            .match({
                _id: {
                    $in: projectIDs,
                },
                closed: false,
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
