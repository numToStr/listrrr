const express = require("express");
const router = express.Router();

const {
	getAllTodo,
	createTodo,
	updateTodo,
	deleteTodo
} = require("../controllers/todo");

router.get("/", getAllTodo);

router.post("/", createTodo);

router.patch("/:todoId", updateTodo);

router.delete("/:todoId", deleteTodo);

module.exports = router;
