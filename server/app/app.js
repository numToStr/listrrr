const router = require("express").Router();

const auth = require("./auth/auth.routes");

router.use("/auth", auth);

module.exports = router;
