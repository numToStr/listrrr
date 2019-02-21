const ProjectDAL = require("./project.dal");

const createProject = async (req, res, next) => {
    try {
        const {
            $user: { $id },
            body: { title, description, board }
        } = req;

        const project = await new ProjectDAL().createProject({
            author: $id,
            title,
            description,
            board
        });

        res.status(201).json({
            success: "Project successfully created",
            project
        });
    } catch (error) {
        next(error);
    }
};

const getProjectList = async (req, res, next) => {
    try {
        const { $id } = req.$user;

        const projects = await new ProjectDAL({ author: $id }).getAllProject();

        res.status(200).json({
            message: "Successful",
            projects
        });
    } catch (error) {
        next(error);
    }
};

const getProject = async (req, res, next) => {
    try {
        const {
            $user: { $id },
            params: { projectId }
        } = req;

        const project = await new ProjectDAL({
            _id: projectId,
            author: $id
        }).getProject();

        res.status(200).json({
            success: "Successful",
            project
        });
    } catch (error) {
        next(error);
    }
};

const updateProject = (req, res, next) => {
    try {
        res.status(200).json({
            message: "TODO: To be implemented"
        });
    } catch (error) {
        next(error);
    }
};

const deleteProject = async (req, res, next) => {
    try {
        const {
            $user: { $id },
            params: { projectId }
        } = req;

        const project = await new ProjectDAL({
            _id: projectId,
            author: $id
        }).deleteProject();

        /**
         * @todo Implement Undo feature
         */

        res.status(200).json({
            success: "Project successfully deleted",
            project
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProject,
    getProjectList,
    getProject,
    updateProject,
    deleteProject
};
