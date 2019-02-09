const router = require("express").Router();

const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require("./todo.controller");

router
    .route("/")
    // For creating todo
    .post(createTodo)
    // For getting todos list
    .get(getTodos);

router
    .route("/:todoId")
    // For updating todo
    .patch(updateTodo)
    // For deleting todo
    .delete(deleteTodo);

module.exports = router;
