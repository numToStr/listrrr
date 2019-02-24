const router = require("express").Router();

const isAuth = require("../middlewares/request.authenticator");

const auth = require("./auth/auth.routes");
const issue = require("./issue/issue.routes");
const template = require("./template/template.routes");
const project = require("./project/project.routes");

router.use("/auth", auth);
router.use("/issue", isAuth, issue);
router.use("/template", isAuth, template);
router.use("/project", isAuth, project);

module.exports = router;
