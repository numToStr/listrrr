import { LableDAL } from "./label.dal";
import { Label } from "./label.schema";

export class LabelService {
    // constructor(private ctx: AppContext) {}

    // private get ID() {
    //     return Types.ObjectId(this.ctx.USER.ID);
    // }

    labels(): Promise<Label[]> {
        return new LableDAL().findAll({
            select: "-createdAt -updatedAt -__v",
        });
    }
}
