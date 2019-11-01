import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Column } from "../column/column.schema";
import { TitleAndDescSchema } from "../../utils/schema/schema";

@ObjectType()
export class Template extends TitleAndDescSchema {
    @Field(() => [Column])
    @prop({
        required: true,
    })
    columns: Column[];
}

export const TemplateModel = getModelForClass(Template, {
    schemaOptions: {
        timestamps: true,
        minimize: true,
    },
});
