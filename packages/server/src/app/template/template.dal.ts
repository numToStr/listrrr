import { Template, TemplateModel } from "./template.schema";
import { RootDAL } from "../../utils/fns/root.dal";

export class TemplateDAL extends RootDAL<Template> {
    constructor(ctx: Partial<Template | Record<string, unknown>> = {}) {
        super(TemplateModel, ctx);
    }
}
