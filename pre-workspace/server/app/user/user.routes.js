const router = require("express").Router();

const { me, dashboard } = require("./user.controller");

router.get("/", me);
router.get("/dashboard", dashboard);

module.exports = router;
