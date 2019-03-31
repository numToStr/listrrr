const { Schema, model } = require("mongoose");

const templateColumns = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        order: {
            type: String,
            required: true,
            enum: ["#1", "#2", "#3", "#4", "#5"]
        }
    },
    {
        _id: false
    }
);

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
        columns: [templateColumns]
    },
    {
        minimize: true,
        timestamps: true
    }
);

module.exports = model("Template", schema);
