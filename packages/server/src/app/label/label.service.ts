import { Service } from "typedi";
import { LableDAL } from "./label.dal";
import { Label } from "./label.schema";

@Service()
export class LabelService {
    labels(): Promise<Label[]> {
        return new LableDAL().findAll({
            select: "-createdAt -updatedAt -__v",
        });
    }
}
