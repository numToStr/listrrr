const ProjectModel = require("./project.model");

class ProjectDAL {
    constructor(ctx = {}) {
        this.ctx = ctx;
        this.select =
            "-author -template -__v -issues.author -issues.project -issues.__v -issues.updatedAt -columns.createdAt -columns.updatedAt";
        this.sort = { createdAt: -1 };
        this.updateOpt = { new: true };
        this.lookup = {};
        this.addFields = { __v: 0 };
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

ProjectDAL.prototype.aggregateOne = async function aggregateOne(options = {}) {
    const {
        project = this.select,
        addFields = this.addFields,
        lookup = this.lookup
    } = options;

    const [doc] = await ProjectModel.aggregate()
        .match(this.ctx)
        .lookup(lookup)
        .addFields(addFields)
        .project(project)
        .exec();

    return doc ? doc : null;
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
