import { InputType, Field, ID, ObjectType } from "type-graphql";
import { Types } from "mongoose";
import { prop } from "@typegoose/typegoose";

@InputType("FindInput")
@ObjectType({
    isAbstract: true,
})
export class IDSchema {
    @Field(() => ID)
    _id: Types.ObjectId;
}

@ObjectType("TitleSchema", {
    isAbstract: true,
})
export abstract class TitleSchema extends IDSchema {
    @Field()
    @prop({
        required: true,
        minlength: 5,
        maxlength: 50,
    })
    title: string;
}

@ObjectType("TitleAndDescriptionSchema", {
    isAbstract: true,
})
export abstract class TitleAndDescriptionSchema extends TitleSchema {
    @Field()
    @prop({
        required: true,
        minlength: 10,
        maxlength: 200,
    })
    description: string;
}
