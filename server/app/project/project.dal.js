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

ProjectDAL.prototype.findOne = function findOne() {
    return ProjectModel.findOne(this.ctx)
        .select(this.select)
        .sort(this.sort)
        .lean()
        .exec();
};

ProjectDAL.prototype.findAll = function findAll(options = {}) {
    const { select = this.select } = options;

    return ProjectModel.find(this.ctx)
        .select(select)
        .sort(this.sort)
        .lean()
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
