const express = require("express");
const router = express.Router();

const isAuthenticate = require("../middlewares/authRoutes");
const { userCreate, authenticate } = require("../controllers/user");

router.post("/", userCreate);

router.get("/authenticate", isAuthenticate, authenticate);

module.exports = router;
