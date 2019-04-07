const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            unique: true,
            trim: true,
            match: /^[a-zA-Z]*$/
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            unique: true,
            trim: true,
            lowercase: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        }
    },
    {
        timestamps: true,
        minimize: true
    }
);

module.exports = model("User", schema);
