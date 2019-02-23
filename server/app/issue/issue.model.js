const { Schema, SchemaTypes, model } = require("mongoose");

const schema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            minlength: 5,
            required: true
        },
        description: {
            type: String,
            trim: true,
            minlength: 6,
            required: true
        },
        isOpen: {
            type: Boolean,
            default: true
        },
        author: {
            type: SchemaTypes.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
        minimize: true
    }
);

module.exports = model("Issue", schema);
