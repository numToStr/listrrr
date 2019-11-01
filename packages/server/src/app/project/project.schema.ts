import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.schema";
import { Template } from "../template/template.schema";
import { Column, ColumnList } from "../column/column.schema";
import { TitleAndDescriptionSchema } from "../../utils/schema/schema";

@ObjectType()
export class Project extends TitleAndDescriptionSchema {
    @Field()
    @prop({
        default: false,
    })
    closed: boolean;

    @prop({
        required: true,
        ref: User,
    })
    userID: Ref<User>;

    @Field(() => User)
    createdBy: User;

    @prop({
        required: true,
        ref: Template,
    })
    templateID: Ref<Template>;

    @prop({
        required: true,
        ref: ColumnList,
    })
    columnsID: Ref<ColumnList>;

    @Field(() => [Column])
    columns: Column[];
}

export const ProjectModel = getModelForClass(Project, {
    schemaOptions: {
        minimize: true,
        timestamps: true,
    },
});
