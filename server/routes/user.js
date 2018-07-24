const express = require("express");
const router = express.Router();

const { userCreate } = require("../controllers/user");

router.post("/", userCreate);

module.exports = router;
