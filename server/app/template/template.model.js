const { Schema, model } = require("mongoose");

const columnSchema = require("./column/column.schema");

const schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        columns: [
            columnSchema({
                _id: false
            })
        ]
    },
    {
        minimize: true,
        timestamps: true
    }
);

module.exports = model("Template", schema);
