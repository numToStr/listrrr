const TemplateModel = require("./template.model");

class TemplateDAL {
    constructor(ctx = {}) {
        this.ctx = ctx;
        this.select = "-__v -createdAt -updatedAt";
        this.sort = { createdAt: -1 };
        this.updateOpt = { new: true };
    }
}

TemplateDAL.prototype.createTemplate = async function createTemplate(
    data = {}
) {
    const newTemplate = await new TemplateModel(data).save();

    return newTemplate.toObject();
};

TemplateDAL.prototype.getTemplate = function getTemplate() {
    return TemplateModel.findOne(this.ctx)
        .select(this.select)
        .sort(this.sort)
        .lean()
        .exec();
};

TemplateDAL.prototype.getAllTemplate = function getAllTemplate(options = {}) {
    const { select = this.select } = options;

    return TemplateModel.find(this.ctx)
        .select(select)
        .sort(this.sort)
        .lean()
        .exec();
};

TemplateDAL.prototype.updateTemplate = function updateTemplate(update = {}) {
    return TemplateModel.findOneAndUpdate(this.ctx, update, this.updateOpt)
        .select(this.select)
        .lean()
        .exec();
};

TemplateDAL.prototype.deleteTemplate = function deleteTemplate() {
    return TemplateModel.findOneAndDelete(this.ctx)
        .lean()
        .exec();
};

module.exports = TemplateDAL;
