import { ObjectType, Field, ID } from "type-graphql";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "../user/user.schema";
import { Template } from "../template/template.schema";
import { Column, ColumnList } from "../column/column.schema";

@ObjectType()
export class Project {
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
