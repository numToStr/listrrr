const IssueModel = require("./issue.model");

class IssueDAL {
    constructor(ctx = {}) {
        this.ctx = ctx;
        this.select = "-author -updatedAt -column -__v";
        this.sort = { createdAt: -1 };
        this.updateOptions = { new: true };
        this.populate = {
            path: "project",
            select: "title",
            options: { lean: true }
        };
    }
}

// For creating issue
IssueDAL.prototype.create = async function create(data = {}) {
    const newDoc = await new IssueModel(data).save();

    const doc = newDoc.toObject();

    Reflect.deleteProperty(doc, "__v");
    Reflect.deleteProperty(doc, "author");
    Reflect.deleteProperty(doc, "column");
    Reflect.deleteProperty(doc, "updatedAt");

    return doc;
};

// For getting single issue details
IssueDAL.prototype.findOne = function findOne(options = {}) {
    const { populate = this.populate } = options;

    return IssueModel.findOne(this.ctx)
        .select(this.select)
        .populate(populate)
        .lean()
        .exec();
};

// For getting all issues
IssueDAL.prototype.findAll = function findAll(options = {}) {
    const { select = this.select } = options;

    return IssueModel.find(this.ctx)
        .select(select)
        .sort(this.sort)
        .lean()
        .exec();
};

// For updating a issue
IssueDAL.prototype.updateOne = function updateOne(update = {}) {
    return IssueModel.findOneAndUpdate(this.ctx, update, this.updateOptions)
        .select(this.select)
        .lean()
        .exec();
};

// For deleting a issue
IssueDAL.prototype.deleteOne = function deleteOne() {
    return IssueModel.deleteOne(this.ctx).exec();
};

IssueDAL.prototype.count = function count() {
    return IssueModel.countDocuments(this.ctx);
};

module.exports = IssueDAL;
