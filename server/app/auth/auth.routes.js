const router = require("express").Router();

const isAuth = require("../../middlewares/request.authenticator");
const $validator = require("../../middlewares/request.validator");
const { signupSchema, loginSchema } = require("./auth.validation");

const { authenticate, authSignup, authLogin } = require("./auth.controller");

router.get("/", isAuth, authenticate);
router.post("/signup", $validator(signupSchema), authSignup);
router.post("/login", $validator(loginSchema), authLogin);

module.exports = router;
