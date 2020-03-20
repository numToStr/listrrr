import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Column } from "../column/column.schema";
import { TitleAndDescSchema } from "../shared/shared.schema";

@ObjectType({
    simpleResolvers: true,
})
export class Template extends TitleAndDescSchema {
    @Field(() => [Column])
    @prop({
        required: true,
    })
    columns: Column[];
}

export const TemplateModel = getModelForClass(Template);
