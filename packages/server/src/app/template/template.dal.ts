import { Template, TemplateModel } from "./template.schema";
import { RootDAL } from "../../utils/fns/root.dal";
import { AnyObject } from "../../@types/types";

export class TemplateDAL extends RootDAL<Template> {
    constructor(ctx: Partial<Template & AnyObject> = {}) {
        super(TemplateModel, ctx);
    }
}
