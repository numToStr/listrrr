import { ObjectType, Field } from "type-graphql";
import {
    prop,
    getModelForClass,
    modelOptions,
    Ref,
    arrayProp,
} from "@typegoose/typegoose";
import { Types } from "mongoose";
import { TitleSchema } from "../../utils/schema/schema";
import { Issue } from "../issue/issue.schema";
import { User } from "../user/user.schema";

@ObjectType()
@modelOptions({})
export class Column extends TitleSchema {
    @prop({
        required: true,
        ref: "User",
        index: true,
    })
    userID: Ref<User>;

    @Field(() => [Issue], {
        nullable: "items",
    })
    issues: Issue[];

    @arrayProp({
        items: Types.ObjectId,
    })
    @prop({
        // ref is `string` to prevent circular dependencies
        ref: "Issue",
    })
    issueIDs?: Ref<Issue>[];
}

export const ColumnModel = getModelForClass(Column);
