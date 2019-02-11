const router = require("express").Router();

const isAuth = require("../middlewares/request.authenticator");

const auth = require("./auth/auth.routes");
const issue = require("./issue/issue.routes");

router.use("/auth", auth);
router.use("/issue", isAuth, issue);

module.exports = router;
