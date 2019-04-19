const mongoose = require("mongoose");

const main = uri => {
    return mongoose.connect(uri, {
        // option for removing deprecation warning and preventing further issue
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
};

module.exports = main;
