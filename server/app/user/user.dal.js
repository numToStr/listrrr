const UserModel = require("./user.model");

class UserDAL {
    constructor(ctx = {}) {
        this.ctx = ctx;
        this.select = "-password -createdAt -updatedAt -__v";
    }
}

UserDAL.prototype.create = async function create(data) {
    const newUser = await new UserModel(data).save();

    // Converting mongoose document to js object
    const user = newUser.toObject();

    // Removing extra fields
    Reflect.deleteProperty(user, "createdAt");
    Reflect.deleteProperty(user, "updatedAt");
    Reflect.deleteProperty(user, "__v");
    Reflect.deleteProperty(user, "password");

    return user;
};

UserDAL.prototype.findOne = function findOne(options = {}) {
    const { select = this.select } = options;

    return UserModel.findOne(this.ctx)
        .select(select)
        .lean()
        .exec();
};

module.exports = UserDAL;
