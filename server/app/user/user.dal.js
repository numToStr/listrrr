const UserModel = require("./user.model");
const { deleteProps } = require("../../utils/object.utils");

class UserDAL {
    constructor(ctx = {}) {
        this.ctx = ctx;
        this.select = "-createdAt -updatedAt -__v";
    }
}

UserDAL.prototype.create = async function create(data) {
    const newDoc = await new UserModel(data).save();

    // Converting mongoose document to js object
    const doc = newDoc.toObject();

    // Removing extra fields
    return deleteProps(doc, ["__v", "createdAt", "updatedAt", "password"]);
};

UserDAL.prototype.findOne = function findOne(options = {}) {
    const { select = this.select } = options;

    return UserModel.findOne(this.ctx)
        .select(select)
        .lean()
        .exec();
};

module.exports = UserDAL;
