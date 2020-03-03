import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { IDSchema } from "../shared/shared.schema";

@ObjectType()
export class Label extends IDSchema {
    @Field()
    @prop({
        required: true,
        trim: true,
    })
    title: string;

    @Field()
    @prop({
        required: true,
        trim: true,
    })
    description: string;

    @Field()
    @prop({
        required: true,
        trim: true,
    })
    color: string;
}

export const LabelModel = getModelForClass(Label);
