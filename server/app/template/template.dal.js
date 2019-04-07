const TemplateModel = require("./template.model");

class TemplateDAL {
    constructor(ctx = {}) {
        this.ctx = ctx;
        this.select = "-__v -createdAt -updatedAt";
        this.sort = { createdAt: -1 };
        this.updateOpt = { new: true };
    }
}

TemplateDAL.prototype.create = async function create(data = {}) {
    const newTemplate = await new TemplateModel(data).save();

    return newTemplate.toObject();
};

TemplateDAL.prototype.findOne = function findOne() {
    return TemplateModel.findOne(this.ctx)
        .select(this.select)
        .sort(this.sort)
        .lean()
        .exec();
};

TemplateDAL.prototype.findAll = function findAll(options = {}) {
    const { select = this.select } = options;

    return TemplateModel.find(this.ctx)
        .select(select)
        .sort(this.sort)
        .lean()
        .exec();
};

TemplateDAL.prototype.updateOne = function updateOne(update = {}) {
    return TemplateModel.findOneAndUpdate(this.ctx, update, this.updateOpt)
        .select(this.select)
        .lean()
        .exec();
};

TemplateDAL.prototype.deleteOne = function deleteOne() {
    return TemplateModel.findOneAndDelete(this.ctx)
        .lean()
        .exec();
};

module.exports = TemplateDAL;
