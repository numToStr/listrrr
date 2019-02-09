const router = require("express").Router();

const isAuth = require("../middlewares/request.authenticator");

const auth = require("./auth/auth.routes");
const todo = require("./todo/todo.routes");

router.use("/auth", auth);
router.use("/todo", isAuth, todo);

module.exports = router;
