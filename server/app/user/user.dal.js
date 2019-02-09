const UserModel = require("./user.model");

class UserDAL {
    constructor(context = {}) {
        this.context = context;
        this.select = "-password -createdAt -updatedAt -__v";
    }
}

UserDAL.prototype.createUser = async function createUser(data) {
    const newUser = await new UserModel(data).save();

    return newUser.toObject();
};

UserDAL.prototype.getUser = function getUser(options = {}) {
    const { select = this.select } = options;

    return UserModel.findOne(this.context)
        .select(select)
        .lean()
        .exec();
};

module.exports = UserDAL;
