const express = require("express");
const router = express.Router();

const isAuthenticate = require("../middlewares/authRoutes");
const { userCreate, authenticate, userLogout } = require("../controllers/user");

router.post("/", userCreate);

router.get("/authenticate", isAuthenticate, authenticate);

router.get("/logout", isAuthenticate, userLogout);

module.exports = router;
