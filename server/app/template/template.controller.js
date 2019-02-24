const TemplateDAL = require("./template.dal");

const createTemplate = async (req, res, next) => {
    try {
        const {
            body: { title, description, columns }
        } = req;

        const template = await new TemplateDAL().createTemplate({
            title,
            description,
            columns
        });

        res.status(201).json({
            success: "Template successfully created",
            template
        });
    } catch (error) {
        next(error);
    }
};

const getTemplateList = async (req, res, next) => {
    try {
        const templates = await new TemplateDAL().getAllTemplate({
            select: "title description"
        });

        res.status(200).json({
            message: "Successful",
            templates
        });
    } catch (error) {
        next(error);
    }
};

const getTemplate = async (req, res, next) => {
    try {
        const {
            params: { templateId }
        } = req;

        const template = await new TemplateDAL({
            _id: templateId
        }).getTemplate();

        res.status(200).json({
            success: "Successful",
            template
        });
    } catch (error) {
        next(error);
    }
};

const updateTemplate = (req, res, next) => {
    try {
        res.status(200).json({
            message: "TODO: To be implemented"
        });
    } catch (error) {
        next(error);
    }
};

const deleteTemplate = async (req, res, next) => {
    try {
        const {
            params: { templateId }
        } = req;

        const template = await new TemplateDAL({
            _id: templateId
        }).deleteProject();

        /**
         * @todo Implement Undo feature
         */

        res.status(200).json({
            success: "Project successfully deleted",
            template
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTemplate,
    getTemplateList,
    getTemplate,
    updateTemplate,
    deleteTemplate
};
