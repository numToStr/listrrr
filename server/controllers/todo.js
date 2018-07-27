const ToDo = require("../models/todo");

const getAllTodo = (req, res) => {
	const { userId: author } = req.params;

	ToDo.find({ author })
		.sort({ reminder: -1 })
		.populate("author", "_id email")
		.select("_id title description author checked reminder created")
		.then(todos => {
			res.status(200).send({ todos });
		})
		.catch(error => {
			res.status(500).send({ error });
		});
};

const createTodo = (req, res) => {
	const { title, description, reminder, author } = req.body;

	var TD = new ToDo({
		title,
		description,
		reminder,
		author
	});

	TD.save()
		.then(todo => {
			res.status(201).send({
				message: "Todo successfully created",
				todo
			});
		})
		.catch(error => {
			res.status(500).send({ error });
		});
};

const updateTodo = (req, res) => {
	const { todoId: _id } = req.params;

	const update = {};

	for (const field in req.body) {
		update[field] = req.body[field];
	}

	ToDo.findByIdAndUpdate(_id, update, { new: true })
		.populate("author", "_id email")
		.select("_id title description author reminder checked created")
		.then(todo => {
			if (todo) {
				res.status(200).send({
					message: "Todo successfully updated",
					todo
				});
			} else {
				res.status(404).send({
					message: "Todo not found"
				});
			}
		})
		.catch(error => {
			res.status(500).send({ error });
		});
};

const deleteTodo = (req, res) => {
	const { todoId: _id } = req.params;

	ToDo.remove({ _id })
		.then(todo => {
			if (todo.n) {
				res.status(200).send({
					message: "Todo successfully deleted"
				});
			} else {
				res.status(404).send({
					error: "Todo not found"
				});
			}
		})
		.catch(error => {
			res.status(500).send({
				error
			});
		});
};

module.exports = { getAllTodo, createTodo, updateTodo, deleteTodo };
