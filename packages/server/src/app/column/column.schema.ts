import { ObjectType, Field, ID } from "type-graphql";
import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Types } from "mongoose";

@ObjectType()
@modelOptions({
    schemaOptions: {
        _id: true,
        minimize: true,
        timestamps: true,
    },
})
export class Column {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field()
    @prop({
        required: true,
        minlength: 5,
        maxlength: 50,
    })
    title: string;

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
