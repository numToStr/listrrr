import { Types } from "mongoose";
import { Project, ProjectModel } from "./project.schema";
import { RootDAL } from "../../utils/fns/root.dal";

export class ProjectDAL extends RootDAL<Project> {
    constructor(ctx: Partial<Project | Record<string, unknown>> = {}) {
        super(ProjectModel, ctx);
    }

    static async firstColumnID(projectID: Types.ObjectId) {
        const [project] = await ProjectModel.aggregate()
            .match({
                _id: projectID,
            })
            .lookup({
                localField: "columnsID",
                foreignField: "_id",
                from: "columnlists",
                as: "columns",
            })
            .project({
                column: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: {
                                    $arrayElemAt: ["$columns.columns", 0],
                                },
                                as: "column",
                                cond: {
                                    $eq: ["$$column.position", 0],
                                },
                            },
                        },
                        0,
                    ],
                },
            })
            .project({
                _id: 0,
                firstColumn: "$column._id",
            });

        return project && project.firstColumn;
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
