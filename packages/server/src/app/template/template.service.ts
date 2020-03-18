import { Service } from "typedi";
import { TemplateDAL } from "./template.dal";
import { Template } from "./template.schema";
import { MongoSelectionSet } from "../../@types/types";

@Service()
export class TemplateService {
    templates(select: MongoSelectionSet): Promise<Template[]> {
        return new TemplateDAL().findAll({
            select,
        });
    }
}
