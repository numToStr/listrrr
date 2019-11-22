const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new Schema(
    {
        authType: {
            type: String,
            select: false,
            enum: ["local", "github", "google"],
            default: "local"
        },
        username: {
            type: String,
            required: true,
            minlength: 3,
            unique: true,
            trim: true,
            match: /^[a-zA-Z0-9]*$/
        },
        email: {
            type: String,
            // It is only required for local authentication
            // Because github doesn't provides email
            required() {
                return this.authType === "local";
            },
            minlength: 5,
            unique: true,
            trim: true,
            lowercase: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        password: {
            type: String,
            select: false,
            required() {
                return this.authType === "local";
            },
            minlength: 5
        },
        avatar: {
            type: String,
            required() {
                return this.authType === "github";
            }
        },
        profileID: {
            type: String,
            sparse: true,
            select: false,
            required() {
                return this.authType === "github";
            }
        }
    },
    {
        timestamps: true,
        minimize: true
    }
);

module.exports = model("User", schema);
