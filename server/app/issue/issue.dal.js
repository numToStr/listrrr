const IssueModel = require("./issue.model");

class IssueDAL {
    constructor(context = {}) {
        this.context = context;
        this.select = "-author -updatedAt -__v";
        this.sort = { createdAt: -1 };
        this.updateOptions = { new: true };
    }
}

// For creating todo
IssueDAL.prototype.createIssue = async function createIssue(data = {}) {
    const todo = await new IssueModel(data).save();

    return todo.toObject();
};

// For getting all todos
IssueDAL.prototype.getAllIssue = function getAllIssue() {
    return IssueModel.find(this.context)
        .select(this.select)
        .sort(this.sort)
        .lean()
        .exec();
};

// For updating a todo
IssueDAL.prototype.updateIssue = function updateIssue(update = {}) {
    return IssueModel.findOneAndUpdate(this.context, update, this.updateOptions)
        .select(this.select)
        .exec();
};

// For deleting a todo
IssueDAL.prototype.deleteIssue = function deleteIssue() {
    return IssueModel.deleteOne(this.context).exec();
};

module.exports = IssueDAL;
