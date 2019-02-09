const TodoDAL = require("./todo.dal");

// For creating todo
const createTodo = async (req, res, next) => {
    try {
        const {
            $user: { $id },
            body: { title, description }
        } = req;

        const todo = await new TodoDAL().createTodo({
            title,
            description,
            author: $id
        });

        res.status(201).json({
            message: "To-Do successfully created",
            todo
        });
    } catch (error) {
        next(error);
    }
};

// For getting todos
const getTodos = async (req, res, next) => {
    try {
        const { $id } = req.$user;

        const todos = await new TodoDAL({ author: $id }).getAllTodo();

        res.status(200).json({
            message: "Successful",
            todos
        });
    } catch (error) {
        next(error);
    }
};

// For updating todos
const updateTodo = async (req, res, next) => {
    try {
        const {
            $user: { $id },
            params: { todoId },
            // body: title | desciption | completed
            body
        } = req;

        const todo = await new TodoDAL({ _id: todoId, author: $id }).updateTodo(
            body
        );

        res.status(200).json({
            message: "To-Do successfully updated",
            todo
        });
    } catch (error) {
        next(error);
    }
};

// For deleting todos
const deleteTodo = async (req, res, next) => {
    try {
        const {
            $user: { $id },
            params: { todoId }
        } = req;

        await new TodoDAL({ _id: todoId, author: $id }).deleteTodo();

        res.status(200).json({
            message: "To-Do successfully deleted"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};
