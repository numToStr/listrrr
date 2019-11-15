import { TemplateDAL } from "./template.dal";
import { Template } from "./template.schema";

export class TemplateService {
    templates(): Promise<Template[]> {
        return new TemplateDAL().findAll();
    }
}
