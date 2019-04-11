const router = require("express").Router();

const $validator = require("../../middlewares/request.validator");
const { issueSchema, issueIdSchema } = require("./issue.validation");

const {
    createIssue,
    getIssue,
    getIssueList,
    updateIssue,
    deleteIssue
} = require("./issue.controller");

// For creating issue
router.post("/", $validator(issueSchema), createIssue);

// For getting issues list
router.get("/list", getIssueList);

router
    .route("/:issueId")
    // For getting issue
    .get($validator(issueIdSchema, "params"), getIssue)
    // For updating issue
    .patch($validator(issueIdSchema, "params"), updateIssue)
    // For deleting issue
    .delete($validator(issueIdSchema, "params"), deleteIssue);

module.exports = router;
