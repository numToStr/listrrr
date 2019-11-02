import { Types } from "mongoose";
import { ProjectDAL } from "./project.dal";
import { Project } from "./project.schema";
import { CreateProjectInput } from "./project.resolver";
import { Context } from "../../network/context";
import { TemplateDAL } from "../template/template.dal";
import { ColumnDAL } from "../column/column.dal";

export class ProjectService {
    constructor(private ctx: Context) {}

    private get ID() {
        return Types.ObjectId(this.ctx.USER.ID);
    }

    projects(_ids?: Types.ObjectId[]): Promise<Project[]> {
        const query = _ids
            ? {
                  _id: {
                      $in: _ids,
                  },
              }
            : {};

        return new ProjectDAL(query as Partial<Project>).findAll();
    }

    project(_id: Types.ObjectId): Promise<Project> {
        return new ProjectDAL({ _id }).findOne();
    }

    async createProject({
        title,
        description,
        templateID,
    }: Omit<CreateProjectInput, "_id">): Promise<Project> {
        const template = await new TemplateDAL({
            _id: templateID,
        }).findOne();

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
