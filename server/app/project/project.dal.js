const ProjectModel = require("./project.model");

class ProjectDAL {
    constructor(ctx = {}) {
        this.ctx = ctx;
        this.select =
            "-author -template -__v -column -firstColumn -issues.author -issues.project -issues.__v -issues.updatedAt -columns.createdAt -columns.updatedAt";
        this.sort = { createdAt: -1 };
        this.updateOpt = { new: true };
    }
}

ProjectDAL.prototype.create = async function create(data = {}) {
    const newDoc = await new ProjectModel(data).save();

    const doc = newDoc.toObject();

    Reflect.deleteProperty(doc, "__v");
    Reflect.deleteProperty(doc, "author");
    Reflect.deleteProperty(doc, "template");
    Reflect.deleteProperty(doc, "columns");

    return doc;
};

ProjectDAL.prototype.findOne = async function findOne(options = {}) {
    const { select = this.select } = options;

    const [project] = await ProjectModel.aggregate()
        .match(this.ctx)
        .lookup({
            from: "issues",
            localField: "_id",
            foreignField: "project",
            as: "issues"
        })
        .addFields({
            column: {
                $arrayElemAt: [
                    {
                        $filter: {
                            input: "$columns",
                            as: "column",
                            cond: {
                                $eq: ["$$column.order", 0]
                            }
                        }
                    },
                    0
                ]
            }
        })
        .addFields({
            firstColumn: "$column._id"
        })
        .project(select)
        .exec();

    return project ? project : null;
};

ProjectDAL.prototype.findAll = function findAll(options = {}) {
    const { select = this.select } = options;

    return ProjectModel.find(this.ctx)
        .select(select)
        .sort(this.sort)
        .lean()
        .exec();
};

ProjectDAL.prototype.updateOne = function updateOne(update = {}, options = {}) {
    const { select = this.select, updateOpt = this.updateOpt } = options;

    return ProjectModel.findOneAndUpdate(this.ctx, update, updateOpt)
        .select(select)
        .lean()
        .exec();
};

ProjectDAL.prototype.deleteOne = function deleteOne() {
    return ProjectModel.findOneAndDelete(this.ctx)
        .lean()
        .exec();
};

module.exports = ProjectDAL;
