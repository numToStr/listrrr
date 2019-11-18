import { ObjectType, Field } from "type-graphql";
import {
    prop,
    getModelForClass,
    Ref,
    arrayProp,
    modelOptions,
} from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "../user/user.schema";
import { Template } from "../template/template.schema";
import { Column } from "../column/column.schema";
import { TitleAndDescSchema } from "../../utils/schema/schema";

@ObjectType()
@modelOptions({})
export class Project extends TitleAndDescSchema {
    @Field()
    @prop({
        default: false,
    })
    closed: boolean;

    @prop({
        required: true,
        ref: User,
        index: true,
    })
    userID: Ref<User>;

    @Field(() => User)
    createdBy: User;

    @prop({
        required: true,
        ref: Template,
    })
    templateID: Ref<Template>;

    @arrayProp({
        items: Types.ObjectId,
    })
    @prop({
        required: true,
        ref: "Column",
    })
    columnIDs: Ref<Column>[];

    @Field(() => [Column])
    columns: Column[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

export const ProjectModel = getModelForClass(Project);
