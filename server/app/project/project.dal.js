const ProjectModel = require("./project.model");
const { deleteProps } = require("../../utils/object.utils");

class ProjectDAL {
    constructor(ctx = {}) {
        this.ctx = ctx;
        this.select =
            "-author -template -__v -issues.author -issues.project -issues.__v -columns.createdAt -columns.updatedAt";
        this.sort = { createdAt: -1 };
        this.updateOpt = { new: true };
        this.lookup = {
            from: "__",
            as: "__",
            localField: "__",
            foreignField: "__"
        };
        this.addFields = { __v: 0 };
    }
}

ProjectDAL.prototype.create = async function create(data = {}) {
    const newDoc = await new ProjectModel(data).save();

    const doc = newDoc.toObject();

    return deleteProps(doc, ["__v", "author", "template", "columns"]);
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
    const { select = this.select, sort = this.sort } = options;

    return ProjectModel.find(this.ctx)
        .select(select)
        .sort(sort)
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

ProjectDAL.prototype.count = function count() {
    return ProjectModel.countDocuments(this.ctx);
};

module.exports = ProjectDAL;
