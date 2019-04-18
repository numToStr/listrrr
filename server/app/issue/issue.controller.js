const { ObjectId } = require("mongoose").Types;

const IssueDAL = require("./issue.dal");
const ProjectDAL = require("../project/project.dal");

// For creating issue
const createIssue = async (req, res, next) => {
    try {
        const {
            $user: { $id },
            body: { title, description, project }
        } = req;

        let extras = {};
        if (project) {
            const _project = await new ProjectDAL({
                _id: ObjectId(project)
            }).aggregateOne({
                addFields: {
                    column: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: "$columns",
                                    as: "column",
                                    cond: {
                                        $eq: ["$$column.order", 0]
                                    }
                                }
                            },
                            0
                        ]
                    }
                },
                project: {
                    firstColumn: "$column._id"
                }
            });

            if (!_project) {
                throw new $Error("Project not found", 409);
            }

            const issueCount = await new IssueDAL({
                column: _project.firstColumn
            }).count();

            extras = {
                project,
                column: _project.firstColumn,
                columnIndex: issueCount
            };
        }

        const issue = await new IssueDAL().create({
            title,
            description,
            author: $id,
            ...extras
        });

        res.status(201).json({
            message: "Issue successfully created",
            issue
        });
    } catch (error) {
        next(error);
    }
};

// For getting single issue details
const getIssue = async (req, res, next) => {
    try {
        const {
            $user: { $id },
            params: { issueId }
        } = req;

        const issue = await new IssueDAL({
            author: $id,
            _id: issueId
        }).findOne();

        res.status(200).json({
            message: "Successful",
            issue
        });
    } catch (error) {
        next(error);
    }
};

// For getting issues
const getIssueList = async (req, res, next) => {
    try {
        const { $id } = req.$user;

        const issues = await new IssueDAL({ author: $id }).findAll({
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
        }).updateOne(body);

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

        await new IssueDAL({ _id: issueId, author: $id }).deleteOne();

        res.status(200).json({
            message: "To-Do successfully deleted"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createIssue,
    getIssue,
    getIssueList,
    updateIssue,
    deleteIssue
};
