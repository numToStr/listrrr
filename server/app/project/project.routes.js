const router = require("express").Router();

const $validator = require("../../middlewares/request.validator");
const { projectSchema, projectIdSchema } = require("./project.validation");

const {
    createProject,
    getProjectList,
    getProject,
    updateProject,
    deleteProject
} = require("./project.controller");

// For creating project
router.post("/", $validator(projectSchema), createProject);

// For getting project list
router.get("/list", getProjectList);

router
    .route("/:projectId")
    // For getting project details
    .get($validator(projectIdSchema, "params"), getProject)
    // For updating project
    .patch($validator(projectIdSchema, "params"), updateProject)
    // For deleting project
    .delete($validator(projectIdSchema, "params"), deleteProject);

module.exports = router;
