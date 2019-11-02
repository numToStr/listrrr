import { InputType, Field, ID, ObjectType } from "type-graphql";
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
