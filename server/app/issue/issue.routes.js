const router = require("express").Router();

const {
    createIssue,
    getIssue,
    getIssueList,
    updateIssue,
    deleteIssue
} = require("./issue.controller");

router
    .route("/")
    // For creating issue
    .post(createIssue)
    // For getting issues list
    .get(getIssueList);

router
    .route("/:issueId")
    // For getting issue
    .get(getIssue)
    // For updating issue
    .patch(updateIssue)
    // For deleting issue
    .delete(deleteIssue);

module.exports = router;
