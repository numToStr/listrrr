const { Schema } = require("mongoose");

const templateColumns = (options = {}) => {
    return new Schema(
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
        options
    );
};

module.exports = templateColumns;
