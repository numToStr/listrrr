const express = require("express");
const router = express.Router();

const {
	getAllTodo,
	createTodo,
	updateTodo,
	deleteTodo
} = require("../controllers/todo");

const isAuthenticate = require("../middlewares/authRoutes");

router.get("/", isAuthenticate, getAllTodo);

router.post("/", isAuthenticate, createTodo);

router.patch("/:todoId", isAuthenticate, updateTodo);

router.delete("/:todoId", isAuthenticate, deleteTodo);

module.exports = router;
