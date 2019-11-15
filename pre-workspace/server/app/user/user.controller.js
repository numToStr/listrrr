const UserDAL = require("../user/user.dal");
const ProjectDAL = require("../project/project.dal");
const IssueDAL = require("../issue/issue.dal");

const me = async (req, res, next) => {
    try {
        const { $id } = req.$user;

        const user = await new UserDAL({ _id: $id }).findOne();

        if (!user) {
            throw new $Error("Unauthorized Access! Please login", 401);
        }

        res.status(200).json({
            success: true,
            message: "Authentication successful",
            user
        });
    } catch (error) {
        next(error);
    }
};

const dashboard = async (req, res, next) => {
    try {
        const { $id } = req.$user;

        const pOpenReq = new ProjectDAL({ author: $id, isOpen: true }).count();
        const pClosedReq = new ProjectDAL({
            author: $id,
            isOpen: false
        }).count();

        const iOpenReq = new IssueDAL({ author: $id, isOpen: true }).count();
        const iClosedReq = new IssueDAL({ author: $id, isOpen: false }).count();

        const [pOpen, pClosed, iOpen, iClosed] = await Promise.all([
            pOpenReq,
            pClosedReq,
            iOpenReq,
            iClosedReq
        ]);

        res.status(200).json({
            success: true,
            message: "Successful",
            projects: {
                open: pOpen,
                closed: pClosed,
                total: pOpen + pClosed
            },
            issues: {
                open: iOpen,
                closed: iClosed,
                total: iOpen + iClosed
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    me,
    dashboard
};
