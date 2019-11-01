import { ColumnList, ColumnModel } from "./column.schema";
import { RootDAL } from "../../utils/fns/root.dal";
import { AnyObject } from "../../@types/types";

export class ColumnDAL extends RootDAL<ColumnList> {
    constructor(ctx: Partial<ColumnList & AnyObject> = {}) {
        super(ColumnModel, ctx);
    }
}
