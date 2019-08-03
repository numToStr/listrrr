const router = require("express").Router();

const $validator = require("../../middlewares/request.validator");
const { GithubAuth } = require("../../libs/authentication/github.auth");
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require("../../config/keys");
const { signupSchema, loginSchema } = require("./auth.validation");
const {
    authSignup,
    authLogin,
    authGithubSuccess
} = require("./auth.controller");

const githubAuth = new GithubAuth({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET
});

router.post("/signup", $validator(signupSchema), authSignup);
router.post("/login", $validator(loginSchema), authLogin);
router.get("/github", githubAuth.initiate());
router.get(
    "/github/success",
    githubAuth.authenticate({ failureRedirect: "/login" }),
    authGithubSuccess
);

module.exports = router;
