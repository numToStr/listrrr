const ProjectModel = require("./project.model");

class ProjectDAL {
    constructor(context = {}) {
        this.context = context;
        this.select = "-__v -author";
        this.sort = { createdAt: -1 };
        this.updateOpt = { new: true };
    }
}

ProjectDAL.prototype.createProject = function createProject(data = {}) {
    const newProject = new ProjectModel(data).save();

    return newProject.toObject();
};

ProjectDAL.prototype.getProject = function getProject() {
    return ProjectModel.findOne(this.context)
        .select(this.select)
        .sort(this.sort)
        .exec();
};

ProjectDAL.prototype.getAllProject = function getAllProject() {
    return ProjectModel.find(this.context)
        .select(this.select)
        .sort(this.sort)
        .exec();
};

ProjectDAL.prototype.updateProject = function updateProject(update = {}) {
    return ProjectModel.findOneAndUpdate(this.context, update, this.updateOpt)
        .select(this.select)
        .exec();
};

ProjectDAL.prototype.deleteProject = function deleteProject() {
    return ProjectModel.findOneAndDelete(this.context).exec();
};

module.exports = ProjectDAL;
