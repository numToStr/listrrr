const ProjectModel = require("./project.model");

class ProjectDAL {
    constructor(ctx = {}) {
        this.ctx = ctx;
        this.select = "-__v -author";
        this.sort = { createdAt: -1 };
        this.updateOpt = { new: true };
    }
}

ProjectDAL.prototype.create = async function create(data = {}) {
    const newProject = await new ProjectModel(data).save();

    return newProject.toObject();
};

ProjectDAL.prototype.findOne = async function findOne() {
    const [project] = await ProjectModel.aggregate()
        .match(this.ctx)
        .lookup({
            from: "issues",
            localField: "_id",
            foreignField: "project",
            as: "issues"
        })
        .project({
            title: 1,
            description: 1,
            "columns._id": 1,
            "columns.title": 1,
            "columns.order": 1,
            "issues._id": 1,
            "issues.title": 1,
            "issues.description": 1,
            "issues.createdAt": 1,
            "issues.column": 1,
            "issues.isOpen": 1,
            createdAt: 1,
            updatedAt: 1
        })
        .exec();

    return project;
};

ProjectDAL.prototype.findAll = function findAll(options = {}) {
    const { select = this.select } = options;

    return ProjectModel.aggregate()
        .match(this.ctx)
        .addFields({
            column: {
                $arrayElemAt: [
                    {
                        $filter: {
                            input: "$columns",
                            as: "column",
                            cond: {
                                $eq: ["$$column.order", "#1"]
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
        .sort(this.sort)
        .exec();
};

ProjectDAL.prototype.updateOne = function updateOne(update = {}) {
    return ProjectModel.findOneAndUpdate(this.ctx, update, this.updateOpt)
        .select(this.select)
        .lean()
        .exec();
};

ProjectDAL.prototype.deleteOne = function deleteOne() {
    return ProjectModel.findOneAndDelete(this.ctx)
        .lean()
        .exec();
};

module.exports = ProjectDAL;
