const { Schema, SchemaTypes, model } = require("mongoose");

const columnSchema = require("../template/column/column.schema");

const schema = new Schema(
    {
        author: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 5
        },
        isOpen: {
            type: Boolean,
            default: true
        },
        template: {
            type: SchemaTypes.ObjectId,
            ref: "Template"
        },
        columns: [
            columnSchema({
                timestamps: true
            })
        ]
    },
    {
        timestamps: true,
        minimize: true
    }
);

module.exports = model("Project", schema);
