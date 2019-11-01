import { ObjectType, Field } from "type-graphql";
import {
    prop,
    getModelForClass,
    modelOptions,
    arrayProp,
} from "@typegoose/typegoose";
import { Types } from "mongoose";
import { TitleSchema } from "../../utils/schema/schema";

@ObjectType()
@modelOptions({
    schemaOptions: {
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
    _id: Types.ObjectId;

    @arrayProp({
        required: true,
        items: Column,
    })
    columns: Column[];
}

export const ColumnModel = getModelForClass(ColumnList, {
    schemaOptions: {
        timestamps: true,
        minimize: true,
    },
});
