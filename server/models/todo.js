const mongoose = require("mongoose");

const ToDo = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
		minlength: 6
	},
	reminder: {
		type: Date,
		default: new Date().toUTCString()
	},
	checked: {
		type: Boolean,
		default: false
	},
	author: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User"
	}
});

module.exports = mongoose.model("ToDo", ToDo);
