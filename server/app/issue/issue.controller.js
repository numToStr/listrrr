const IssueDAL = require("./issue.dal");

// For creating issue
const createIssue = async (req, res, next) => {
    try {
        const {
            $user: { $id },
            body: { title, description }
        } = req;

        const issue = await new IssueDAL().createIssue({
            title,
            description,
            author: $id
        });

        res.status(201).json({
            message: "Issue successfully created",
            issue
        });
    } catch (error) {
        next(error);
    }
};

// For getting issues
const getIssues = async (req, res, next) => {
    try {
        const { $id } = req.$user;

        const issues = await new IssueDAL({ author: $id }).getAllIssue({
            select: "title createdAt"
        });

        res.status(200).json({
            message: "Successful",
            issues
        });
    } catch (error) {
        next(error);
    }
};

// For updating issues
const updateIssue = async (req, res, next) => {
    try {
        const {
            $user: { $id },
            params: { issueId },
            // body: title | desciption | completed
            body
        } = req;

        const issue = await new IssueDAL({
            _id: issueId,
            author: $id
        }).updateIssue(body);

        res.status(200).json({
            message: "To-Do successfully updated",
            issue
        });
    } catch (error) {
        next(error);
    }
};

// For deleting issues
const deleteIssue = async (req, res, next) => {
    try {
        const {
            $user: { $id },
            params: { issueId }
        } = req;

        await new IssueDAL({ _id: issueId, author: $id }).deleteIssue();

        res.status(200).json({
            message: "To-Do successfully deleted"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createIssue,
    getIssues,
    updateIssue,
    deleteIssue
};
