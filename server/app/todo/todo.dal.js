const TodoModel = require("./todo.model");

class TodoDAL {
    constructor(context = {}) {
        this.context = context;
        this.select = "-author -updatedAt -__v";
        this.sort = { createdAt: -1 };
        this.updateOptions = { new: true };
    }
}

// For creating todo
TodoDAL.prototype.createTodo = async function createTodo(data = {}) {
    const todo = await new TodoModel(data).save();

    return todo.toObject();
};

// For getting all todos
TodoDAL.prototype.getAllTodo = function getAllTodo() {
    return TodoModel.find(this.context)
        .select(this.select)
        .sort(this.sort)
        .lean()
        .exec();
};

// For updating a todo
TodoDAL.prototype.updateTodo = function updateTodo(update = {}) {
    return TodoModel.findOneAndUpdate(this.context, update, this.updateOptions)
        .select(this.select)
        .exec();
};

// For deleting a todo
TodoDAL.prototype.deleteTodo = function deleteTodo() {
    return TodoModel.deleteOne(this.context).exec();
};

module.exports = TodoDAL;
