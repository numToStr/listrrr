const router = require("express").Router();

const {
    createIssue,
    getIssues,
    updateIssue,
    deleteIssue
} = require("./issue.controller");

router
    .route("/")
    // For creating issue
    .post(createIssue)
    // For getting issues list
    .get(getIssues);

router
    .route("/:issueId")
    // For updating issue
    .patch(updateIssue)
    // For deleting issue
    .delete(deleteIssue);

module.exports = router;
