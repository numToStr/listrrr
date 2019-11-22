const { Schema } = require("mongoose");

const templateColumns = (options = {}) => {
    return new Schema(
        {
            title: {
                type: String,
                required: true
            },
            order: {
                type: Number,
                required: true,
                min: 0
            }
        },
        options
    );
};

module.exports = templateColumns;
