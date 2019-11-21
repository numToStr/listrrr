import {
    InputType,
    Field,
    ID,
    ObjectType,
    registerEnumType,
} from "type-graphql";
import { Types } from "mongoose";
import { prop } from "@typegoose/typegoose";

@ObjectType({
    isAbstract: true,
})
export class IDSchema {
    @Field(() => ID)
    _id: Types.ObjectId;
}

@InputType()
export class FindInput {
    @Field()
    _id: Types.ObjectId;
}

@ObjectType({
    isAbstract: true,
})
@InputType({
    isAbstract: true,
})
export abstract class TitleSchema extends IDSchema {
    @Field()
    @prop({
        required: true,
        minlength: 3,
        maxlength: 50,
    })
    title: string;
}

@ObjectType({
    isAbstract: true,
})
@InputType("TitleAndDescriptionInput")
export abstract class TitleAndDescSchema extends TitleSchema {
    @Field()
    @prop({
        required: true,
        minlength: 10,
        maxlength: 200,
    })
    description: string;
}

@InputType()
export class RearrangeColumnInput {
    @Field()
    initialPosition: number;

    @Field()
    finalPosition: number;
}

@InputType({
    isAbstract: true,
})
export class ColumnIDInput {
    @Field()
    columnID: Types.ObjectId;
}

export enum Sort {
    CREATED_ASC = "created-asc",
    CREATED_DESC = "created-desc",
    UPDATED_DESC = "updated-desc",
}

export enum Status {
    OPEN = "open",
    CLOSED = "closed",
}
@InputType()
export class Filters {
    @Field(() => Sort, {
        defaultValue: Sort.CREATED_DESC,
    })
    sort: Sort;

    @Field(() => Status, {
        defaultValue: Status.OPEN,
    })
    status: Status;
}

registerEnumType(Sort, {
    name: "Sort",
    description: "For specifying sorting options",
});

registerEnumType(Status, {
    name: "Status",
    description: "For specifying a enitity status",
});
