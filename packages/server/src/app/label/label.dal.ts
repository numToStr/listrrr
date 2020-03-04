import { RootDAL } from "../../utils/fns/root.dal";
import { Label, LabelModel } from "./label.schema";

export class LableDAL extends RootDAL<Label> {
    constructor(ctx: Partial<Label> = {}) {
        super(LabelModel, ctx);
    }
}
