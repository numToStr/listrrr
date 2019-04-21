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

// For rearranging issue

const rearrangeIssue = async (req, res, next) => {
    try {
        const {
            $user: { $id },
            params: { issueId },
            body: {
                projectId,
                sourceColumn,
                sourceIndex,
                destColumn,
                destIndex
            }
        } = req;

        // If doesn't changed column & doesn't changed index => return
        if (sourceColumn === destColumn && sourceIndex === destIndex) {
            throw new $Error("Source and Destination are equal :/", 400);
        }

        const globalQuery = {
            author: $id,
            project: projectId
        };

        const issuesCount = await new IssueDAL({
            ...globalQuery,
            column: destColumn
        }).count();

        // Check if destination index is > count of issue in that column [Note: count is 1 based]
        if (destIndex > issuesCount) {
            throw new $Error("Destination is out of range :/");
        }

        //  If doesn't change column
        if (sourceColumn === destColumn) {
            // If drag BACKWARD i.e. from position 3:{source} --> 1:{destination}
            // Source > Destination
            // Increment by 1, whose position is >= destination and < source
            // Update dragged element index to destination
            let incPosition = 1;
            let query = {
                $gte: destIndex,
                $lt: sourceIndex
            };

            // If drag FORWARD i.e. from position 1:{source} --> 3:{destination}
            // Destination > Source
            // Decrement by 1, whose position is > source and <= destination
            // Update dragged element index to destination
            if (sourceIndex < destIndex) {
                incPosition = -1;
                query = {
                    $gt: sourceIndex,
                    $lte: destIndex
                };
            }

            await new IssueDAL({
                ...globalQuery,
                column: destColumn,
                columnIndex: query
            }).updateMany({
                $inc: {
                    columnIndex: incPosition
                }
            });
        } else {
            // If changed column

            // Inecrement whose index > than source index in source column
            const sourceColumnUpdate = new IssueDAL({
                ...globalQuery,
                column: sourceColumn,
                columnIndex: {
                    $gt: sourceIndex
                }
            }).updateMany({
                $inc: {
                    columnIndex: -1
                }
            });

            // Increment whose index > than destination index in the destination column
            const destColumnUpdate = new IssueDAL({
                ...globalQuery,
                column: destColumn,
                columnIndex: {
                    $gte: destIndex
                }
            }).updateMany({
                $inc: {
                    columnIndex: 1
                }
            });

            await Promise.all([sourceColumnUpdate, destColumnUpdate]);
        }

        // Finally updating the dragged item with the column and index
        const update = await new IssueDAL({
            _id: issueId,
            author: $id,
            project: projectId
        }).updateOne(
            {
                column: destColumn,
                columnIndex: destIndex
            },
            { select: "_id" }
        );

        res.status(200).json({
            success: "Issue successfully update",
            issue: update
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
    rearrangeIssue,
    updateIssue,
    deleteIssue
};
