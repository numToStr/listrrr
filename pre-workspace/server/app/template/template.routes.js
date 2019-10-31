const router = require("express").Router();

const {
    createTemplate,
    getTemplateList,
    getTemplate
} = require("./template.controller");

router.post("/", createTemplate);

router.get("/list", getTemplateList);

router.get("/:projectId", getTemplate);

module.exports = router;
