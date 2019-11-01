import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { TitleSchema } from "../../utils/schema/schema";

@ObjectType()
@modelOptions({
    schemaOptions: {
        _id: true,
        minimize: true,
        timestamps: true,
    },
})
export class Column extends TitleSchema {
    @Field()
    @prop({
        required: true,
        min: 0,
    })
    position: number;
}

export class ColumnList {
    @prop()
    columns: Column[];
}

export const ColumnModel = getModelForClass(ColumnList, {
    schemaOptions: {
        timestamps: true,
        minimize: true,
    },
});
