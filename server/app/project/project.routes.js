const router = require("express").Router();

const $validator = require("../../middlewares/request.validator");
const {
    projectSchema,
    projectIdSchema,
    projectRearrangeSchema,
    queryValidation
} = require("./project.validation");

const {
    createProject,
    getProjectList,
    getProject,
    updateProject,
    rearrangeProject,
    deleteProject
} = require("./project.controller");

// For creating project
router.post("/", $validator(projectSchema), createProject);

// For getting project list
router.get("/list", $validator(queryValidation), getProjectList);

// For updating project
router.patch(
    "/:projectId/rearrange",
    $validator(projectIdSchema, "params"),
    $validator(projectRearrangeSchema),
    rearrangeProject
);

router
    .route("/:projectId")
    // For getting project details
    .get($validator(projectIdSchema, "params"), getProject)
    // For updating project
    .patch($validator(projectIdSchema, "params"), updateProject)
    // For deleting project
    .delete($validator(projectIdSchema, "params"), deleteProject);

module.exports = router;
