const IssueModel = require("./issue.model");

class IssueDAL {
    constructor(context = {}) {
        this.context = context;
        this.select = "-author -updatedAt -column -__v";
        this.sort = { createdAt: -1 };
        this.updateOptions = { new: true };
        this.populate = ["project", "title"];
    }
}

// For creating issue
IssueDAL.prototype.create = async function create(data = {}) {
    const issue = await new IssueModel(data).save();

    return issue.toObject();
};

// For getting single issue details
IssueDAL.prototype.findOne = function findOne(options = {}) {
    const { populate = this.populate } = options;

    const [key, project] = populate;

    return IssueModel.findOne(this.context)
        .select(this.select)
        .populate(key, project)
        .lean()
        .exec();
};

// For getting all issues
IssueDAL.prototype.findAll = function findAll(options = {}) {
    const { select = this.select } = options;

    return IssueModel.find(this.context)
        .select(select)
        .sort(this.sort)
        .lean()
        .exec();
};

// For updating a issue
IssueDAL.prototype.updateOne = function updateOne(update = {}) {
    return IssueModel.findOneAndUpdate(this.context, update, this.updateOptions)
        .select(this.select)
        .lean()
        .exec();
};

// For deleting a issue
IssueDAL.prototype.deleteOne = function deleteOne() {
    return IssueModel.deleteOne(this.context).exec();
};

module.exports = IssueDAL;
