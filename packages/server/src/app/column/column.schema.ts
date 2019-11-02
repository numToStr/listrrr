import { ObjectType, Field } from "type-graphql";
import {
    prop,
    getModelForClass,
    modelOptions,
    arrayProp,
    Ref,
} from "@typegoose/typegoose";
import { Types } from "mongoose";
import { TitleSchema } from "../../utils/schema/schema";
import { Issue } from "../issue/issue.schema";

@ObjectType()
@modelOptions({
    schemaOptions: {
        minimize: true,
        timestamps: true,
    },
})
export class Column extends TitleSchema {
    @Field()
    @prop({
        required: true,
        min: 0,
    })
    position: number;

    @Field(() => [Issue], {
        nullable: "items",
    })
    issues: Issue[];

    @prop({
        // ref is `string` to prevent circular dependencies
        ref: "Issue",
    })
    issueIDs?: Ref<Issue>[];
}

export class ColumnList {
    _id: Types.ObjectId;

    @arrayProp({
        required: true,
        items: Column,
    })
    columns: Column[];
}

export const ColumnModel = getModelForClass(ColumnList, {
    schemaOptions: {
        timestamps: true,
        minimize: true,
    },
});
