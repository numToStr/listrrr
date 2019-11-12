import { Types } from "mongoose";
import { ProjectDAL } from "./project.dal";
import { Project } from "./project.schema";
import { CreateProjectInput } from "./project.resolver";
import { Context } from "../../network/context";
import { TemplateDAL } from "../template/template.dal";
import { ColumnDAL } from "../column/column.dal";
import { DALQuery } from "../../@types/types";

export class ProjectService {
    constructor(private ctx: Context) {}

    private get ID() {
        return Types.ObjectId(this.ctx.USER.ID);
    }

    projects(_ids?: Types.ObjectId[]): Promise<Project[]> {
        const query: DALQuery = {
            userID: this.ID,
        };

        if (_ids) {
            query._id = {
                $in: _ids,
            };
        }

        return new ProjectDAL(query as Partial<Project>).findAll({
            sort: {
                createdAt: -1,
            },
        });
    }

    project(_id: Types.ObjectId): Promise<Project> {
        return new ProjectDAL({ _id, userID: this.ID }).findOne();
    }

    async createProject({
        title,
        description,
        templateID,
    }: Omit<CreateProjectInput, "_id">): Promise<Project> {
        const template = await new TemplateDAL({
            _id: templateID,
        }).findOne({
            select: "columns -_id",
        });

        if (!template) {
            throw new Error("Template not found");
        }

        const { _id: columnsID } = await new ColumnDAL().create({
            columns: template.columns,
        });

        return new ProjectDAL().create({
            title,
            description,
            userID: this.ID,
            templateID,
            columnsID,
        });
    }
}
