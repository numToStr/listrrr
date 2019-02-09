const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

const schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            minlength: 6
        },
        completed: {
            type: Boolean,
            default: false
        },
        author: {
            type: SchemaTypes.ObjectId,
            ref: "User"
        }
    },
    {
        minimize: true,
        timestamps: true
    }
);

module.exports = model("ToDo", schema);
