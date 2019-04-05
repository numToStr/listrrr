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
IssueDAL.prototype.createIssue = async function createIssue(data = {}) {
    const issue = await new IssueModel(data).save();

    return issue.toObject();
};

// For getting single issue details
IssueDAL.prototype.getIssue = function getIssue(options = {}) {
    const { populate = this.populate } = options;

    const [key, project] = populate;

    return IssueModel.findOne(this.context)
        .select(this.select)
        .populate(key, project)
        .lean()
        .exec();
};

// For getting all issues
IssueDAL.prototype.getAllIssue = function getAllIssue(options = {}) {
    const { select = this.select } = options;

    return IssueModel.find(this.context)
        .select(select)
        .sort(this.sort)
        .lean()
        .exec();
};

// For updating a issue
IssueDAL.prototype.updateIssue = function updateIssue(update = {}) {
    return IssueModel.findOneAndUpdate(this.context, update, this.updateOptions)
        .select(this.select)
        .lean()
        .exec();
};

// For deleting a issue
IssueDAL.prototype.deleteIssue = function deleteIssue() {
    return IssueModel.deleteOne(this.context).exec();
};

module.exports = IssueDAL;
