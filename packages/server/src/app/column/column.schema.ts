import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { TitleSchema } from "../shared/shared.schema";
import { Issue } from "../issue/issue.schema";
import { User } from "../user/user.schema";

@ObjectType({
    simpleResolvers: true,
})
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

    @prop({
        type: Types.ObjectId,
        // ref is `string` to prevent circular dependencies
        ref: "Issue",
    })
    issueIDs?: Ref<Issue>[];
}

export const ColumnModel = getModelForClass(Column);
