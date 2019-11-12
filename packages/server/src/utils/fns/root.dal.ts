import { ModelType } from "@typegoose/typegoose/lib/types";
import { deleteProps } from "./object.util";
import { DALOptions } from "../../@types/types";

export abstract class RootDAL<SchemaType extends object> {
    private readonly select = "-__v";

    private readonly sort = {};

    private readonly upsert = false;

    constructor(
        private readonly Model: ModelType<SchemaType>,
        private readonly ctx: Partial<SchemaType> = {}
    ) {}

    async create(data: Partial<SchemaType>): Promise<SchemaType> {
        const newDoc = await this.Model.create(data);
        const doc = newDoc.toObject();

        return deleteProps(doc, ["__v"]) as Promise<SchemaType>;
    }

    findOne(options: DALOptions = {}): Promise<SchemaType> {
        const { select = this.select } = options;

        return this.Model.findOne(this.ctx)
            .select(select)
            .lean()
            .exec() as Promise<SchemaType>;
    }

    findAll(options: DALOptions = {}): Promise<SchemaType[]> {
        const { select = this.select, sort = this.sort } = options;

        return this.Model.find(this.ctx)
            .select(select)
            .sort(sort)
            .lean()
            .exec() as Promise<SchemaType[]>;
    }

    updateOne(
        data: Partial<SchemaType>,
        options: DALOptions = {}
    ): Promise<SchemaType> {
        const { select = this.select, upsert = this.upsert } = options;

        return this.Model.findOneAndUpdate(this.ctx, data, {
            new: true,
            upsert,
        })
            .select(select)
            .lean()
            .exec() as Promise<SchemaType>;
    }

    updateMany(data: Partial<SchemaType>) {
        return this.Model.updateMany(this.ctx, data, { multi: true })
            .lean()
            .exec();
    }

    deleteOne(options: DALOptions = {}): Promise<SchemaType> {
        const { select = this.select } = options;

        return this.Model.findOneAndDelete(this.ctx)
            .select(select)
            .lean()
            .exec() as Promise<SchemaType>;
    }
}
