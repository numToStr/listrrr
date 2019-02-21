const router = require("express").Router();

const {
    createProject,
    getProjectList,
    getProject,
    updateProject,
    deleteProject
} = require("./project.controller");

router.post("/", createProject);

router.get("/list", getProjectList);

router
    .route("/:projectId")
    .get(getProject)
    .patch(updateProject)
    .delete(deleteProject);

module.exports = router;
