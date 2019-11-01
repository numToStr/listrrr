import { ObjectType, Field, ID } from "type-graphql";
import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Types } from "mongoose";

@ObjectType()
@modelOptions({
    schemaOptions: {
        _id: true,
        timestamps: true,
    },
})
export class Column {
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

@ObjectType()
export class Template {
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
        minlength: 10,
        maxlength: 200,
    })
    description: string;

    @Field(() => [Column])
    @prop({
        required: true,
    })
    columns: Column[];
}

export const TemplateModel = getModelForClass(Template);
